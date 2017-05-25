/**
 * Copyright 2017 Miroslav Pokorný
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Google.Protobuf;
using Hermes.Communication;
using Hermes.Control;
using Hermes.Media;
using Hermes.Protoc.Messages;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;

namespace Hermes.Connection
{
    /// <summary>
    /// Base class for Hermes connections. Handle basic data manipulation.
    /// </summary>
    public abstract class BaseConnection : PersistentConnection
    {
        /// <summary>
        /// Static variable which is used to store chunks until all data are received from client. Key is connection ID, value is StringBuiledr which is appended with received chunks.
        /// </summary>
        private static readonly ConcurrentDictionary<string, StringBuilder> ChunksBuilders =
            new ConcurrentDictionary<string, StringBuilder>();

        /// <summary>
        /// Static variable which is used to cache media at start of stream broadcast (main purpose is to catch media header for later resending to clients). 
        /// </summary>
        private static readonly ConcurrentDictionary<string, Dictionary<uint, List<byte>>> MediaReceiveCache =
            new ConcurrentDictionary<string, Dictionary<uint, List<byte>>>();

        /// <summary>
        /// JSON mime type
        /// </summary>
        private const string JsonMimeType = "application/json";

        /// <summary>
        /// Name of session id in URL parameter used when client connects to server
        /// </summary>
        private const string SessionIdName = "SESSION_ID";

        /// <summary>
        /// Property which store connectionID which invoke current action (which is connect, disconnect or send data).
        /// </summary>
        protected string OriginConnection { get; private set; }

        /// <summary>
        /// Static variable which store all communications object (all communication sessions)
        /// </summary>
        protected static readonly CommunicationCollection Communications = new CommunicationCollection();

        /// <summary>
        /// Method called when new client connect to server
        /// </summary>
        /// <param name="info">ConnectionInfo object containing info about current session</param>
        /// <returns></returns>
        protected abstract Task OnConnected(ConnectionInfo info);

        /// <summary>
        /// Method called when client disconnect from server
        /// </summary>
        /// <param name="info">ConnectionInfo object containing info about current session</param>
        /// <returns></returns>
        protected abstract Task OnDisconnected(ConnectionInfo info);

        /// <summary>
        /// Method called when client reconnect to server and was not disconnected due time out, etc...
        /// </summary>
        /// <param name="info">ConnectionInfo object containing info about current session</param>
        /// <returns></returns>
        protected virtual Task OnReconnected(ConnectionInfo info)
        {
            return Task.FromResult<object>(null);
        }

        /// <summary>
        /// SignalR OnConnect method called when client connect to server
        /// </summary>
        /// <param name="request"></param>
        /// <param name="connectionId"></param>
        /// <returns>Return result of OnConnected(ConnectionInfo) method</returns>
        protected sealed override Task OnConnected(IRequest request, string connectionId)
        {
            OriginConnection = connectionId;
            return OnConnected(new ConnectionInfo()
            {
                SessionId = request.QueryString[SessionIdName],
                ConnectionId = connectionId,
                Communication = Communications.GetCommunicationBySessionId(request.QueryString[SessionIdName])
            });
        }

        /// <summary>
        /// SignalR OnDisconnect method called when client disconnect from server
        /// </summary>
        /// <param name="request"></param>
        /// <param name="connectionId"></param>
        /// <param name="stopCalled"></param>
        /// <returns>Return result of OnDisconnected(ConnectionInfo) method or empty task if connection not participating in any communication</returns>
        protected sealed override Task OnDisconnected(IRequest request, string connectionId, bool stopCalled)
        {
            OriginConnection = connectionId;
            var communication = Communications.GetCommunicationByConnectionId(connectionId);
            if (communication == null)
            {
                return Task.FromResult<object>(null);
            }
            return OnDisconnected(new ConnectionInfo()
            {
                SessionId = request.QueryString[SessionIdName],
                ConnectionId = connectionId,
                Communication = Communications.GetCommunicationByConnectionId(connectionId)
            });
        }

        /// <summary>
        /// SignalR OnReconnect method called when clients reconnect to server
        /// </summary>
        /// <param name="request"></param>
        /// <param name="connectionId"></param>
        /// <returns>Return result of OnReconnected(ConnectionInfo) method or empty task if connection was already disconnected from server (eg. not participating in any communication)</returns>
        protected sealed override Task OnReconnected(IRequest request, string connectionId)
        {
            OriginConnection = connectionId;
            var communication = Communications.GetCommunicationByConnectionId(connectionId);
            if (communication == null)
            {
                return SendControlMessage(connectionId,
                    new ConnectControlObject()
                    {
                        Action = Control.Action.Connect,
                        Status = Status.Disconnected,
                        SessionId = request.QueryString[SessionIdName]
                    });
            }
            return OnReconnected(new ConnectionInfo()
            {
                SessionId = request.QueryString[SessionIdName], ConnectionId = connectionId, Communication = communication
            });
        }

        /// <summary>
        /// Process chunk
        /// Return true if last chunk received and all data is stored in chunk parameter, return false if not last chunk received
        /// </summary>
        /// <param name="chunk">Chunk data</param>
        /// <param name="connectionId">Connection ID</param>
        /// <returns>Return true if last chunk received and all data is stored in chunk parameter, return false if not last chunk received</returns>
        private bool ReceivedChunk(ref string chunk, string connectionId)
        {
            StringBuilder sb;
            if (!ChunksBuilders.TryGetValue(connectionId, out sb))
            {
                sb = new StringBuilder();
                ChunksBuilders.TryAdd(connectionId, sb);
            }
            bool lastChunk = chunk.EndsWith("!");
            sb.Append(lastChunk ? chunk.Substring(1, chunk.Length - 2) : chunk.Substring(1));
            if (!lastChunk)
            {
                return false;
            }
            StringBuilder stringBuilder;
            ChunksBuilders.TryRemove(connectionId, out stringBuilder);
            chunk = sb.ToString();
            return true;
        }

        /// <summary>
        /// SignalR OnReceived method called when data are received from client. This method process received data and call more specific method based on data type.
        /// </summary>
        /// <param name="request"></param>
        /// <param name="connectionId"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        protected sealed override Task OnReceived(IRequest request, string connectionId, string data)
        {
            OriginConnection = connectionId;
            var communication = Communications.GetCommunicationByConnectionId(connectionId);
            if (communication == null)
            {
                return Task.FromResult<object>(null);
            }
            if (data.StartsWith("!") && !ReceivedChunk(ref data, connectionId))
            {
                return Task.FromResult<object>(null);
            }
            var connectionInfo = new ConnectionInfo()
            {
                ConnectionId = connectionId,
                SessionId = request.QueryString[SessionIdName],
                Communication = communication
            };
            var messages = MessageCollection.Parser.ParseFrom(ByteString.FromBase64(data));
            var tasks = new List<Task>(messages.Messages.Count);
            foreach (var message in messages.Messages)
            {
                if (!communication.IsCommunicationAllowed(connectionId, message.DataType))
                {
                    continue;
                }
                switch (message.DataType)
                {
                    case Message.Types.DataType.Text:
                        tasks.Add(OnReceivedText(connectionInfo, message.Id, message.Data.ToStringUtf8(), message.MimeType));
                        break;
                    case Message.Types.DataType.Binary:
                        tasks.Add(OnReceivedBinary(connectionInfo, message.Id, message.Data.ToByteArray(), message.MimeType));
                        break;
                    case Message.Types.DataType.Control:
                        tasks.Add(OnReceivedControl(connectionInfo, message.Id,
                            GetControlObjectFromJson(message.Data.ToStringUtf8())));
                        break;
                    case Message.Types.DataType.Audio:
                        tasks.Add(OnReceivedMedia(Message.Types.DataType.Audio, connectionInfo, message.Id,
                            message.Data.ToByteArray(), message.MimeType));
                        break;
                    case Message.Types.DataType.Video:
                        tasks.Add(OnReceivedMedia(Message.Types.DataType.Video, connectionInfo, message.Id,
                            message.Data.ToByteArray(), message.MimeType));
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
            return Task.WhenAll(tasks);
        }

        /// <summary>
        /// Method called when media data are received. Method try to catch media header at begin of stream
        /// </summary>
        /// <param name="dataType">Type of data should by Video or Audio</param>
        /// <param name="info">Connection info object</param>
        /// <param name="id">Stream ID</param>
        /// <param name="data">Received binary data</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        private Task OnReceivedMedia(Message.Types.DataType dataType, ConnectionInfo info, uint id, byte[] data,
            string mimeType)
        {
            CacheMediaHeader(info.Communication, id, data, mimeType);
            if (dataType == Message.Types.DataType.Video)
            {
                return OnReceivedVideo(info, id, data, mimeType);
            }
            return OnReceivedAudio(info, id, data, mimeType);
        }

        /// <summary>
        /// Method called when control message is received.
        /// </summary>
        /// <param name="info">Connection info object</param>
        /// <param name="id">Stream ID</param>
        /// <param name="controlObject">Control object (received data parsed from JSON to ControlObject)</param>
        /// <returns></returns>
        protected virtual Task OnReceivedControl(ConnectionInfo info, uint id, ControlObject controlObject)
        {
            switch (controlObject.Action)
            {
                case Control.Action.RequestStreamId:
                    if (!info.Communication.IsRequestStreamIdAllowed(info.ConnectionId))
                    {
                        return Task.FromResult<object>(null);
                    }
                    var requestStreamIdControlObject = (RequestStreamIdControlObject) controlObject;
                    requestStreamIdControlObject.StreamId = info.Communication.GetNewUniqueStreamId(info.ConnectionId);
                    return SendControlMessage(info.ConnectionId, requestStreamIdControlObject, id);
                case Control.Action.MediaNotSupported:
                    info.Communication.DisableSendingData(info.ConnectionId,
                        ((MediaNotSupportedControlObject) controlObject).MimeType);
                    return Task.FromResult<object>(null);
                case Control.Action.RequestMediaHeader:
                    var requestMediaHeaderControlObject = (RequestMediaHeaderControlObject) controlObject;
                    if (!info.Communication.IsMediaStreamHeaderExist(requestMediaHeaderControlObject.StreamId))
                    {
                        return Task.FromResult<object>(null);
                    }
                    requestMediaHeaderControlObject.MediaHeader =
                        Convert.ToBase64String(
                            info.Communication.GetMediaStreamHeader(requestMediaHeaderControlObject.StreamId));
                    return SendControlMessage(info.ConnectionId, requestMediaHeaderControlObject, id);
                case Control.Action.StopStream:
                    var stopStreamControlObject = (StopStreamControlObject) controlObject;
                    if (info.Communication.StopStream(stopStreamControlObject.StreamId, info.ConnectionId))
                    {
                        return BroadcastControlMessage(info.Communication, stopStreamControlObject, id,
                            new[] {info.ConnectionId});
                    }
                    return Task.FromResult<object>(null);
                case Control.Action.Connect:
                case Control.Action.Disconnect:
                    //Not supported as OnReceivedControl this actions is allowed only on client as result of connecting or disconnecting.
                    return Task.FromResult<object>(null);
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        /// <summary>
        /// Method called when text message is received.
        /// </summary>
        /// <param name="info">Connection info object</param>
        /// <param name="id">Stream ID</param>
        /// <param name="data">Received text data</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected virtual Task OnReceivedText(ConnectionInfo info, uint id, string data, string mimeType)
        {
            if (info.Communication.Status != Status.Ready)
            {
                return Task.FromResult<object>(null);
            }
            return BroadcastTextMessage(info.Communication, data, new[] {info.ConnectionId}, id, mimeType);
        }

        /// <summary>
        /// Method called when binary message is received.
        /// </summary>
        /// <param name="info">Connection info object</param>
        /// <param name="id">Stream ID</param>
        /// <param name="data">Received binary data</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected virtual Task OnReceivedBinary(ConnectionInfo info, uint id, byte[] data, string mimeType)
        {
            if (info.Communication.Status != Status.Ready)
            {
                return Task.FromResult<object>(null);
            }
            return BroadcastBinaryMessage(info.Communication, data, new[] {info.ConnectionId}, id, mimeType);
        }

        /// <summary>
        /// Method called when audio message is received.
        /// </summary>
        /// <param name="info">Connection info object</param>
        /// <param name="id">Stream ID</param>
        /// <param name="data">Received audio data</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected virtual Task OnReceivedAudio(ConnectionInfo info, uint id, byte[] data, string mimeType)
        {
            if (info.Communication.Status != Status.Ready)
            {
                return Task.FromResult<object>(null);
            }
            return BroadcastAudioMessage(info.Communication, data, new[] {info.ConnectionId}, id, mimeType);
        }

        /// <summary>
        /// Method called when video message is received.
        /// </summary>
        /// <param name="info">Connection info object</param>
        /// <param name="id">Stream ID</param>
        /// <param name="data">Received video data</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected virtual Task OnReceivedVideo(ConnectionInfo info, uint id, byte[] data, string mimeType)
        {
            if (info.Communication.Status != Status.Ready)
            {
                return Task.FromResult<object>(null);
            }
            return BroadcastVideoMessage(info.Communication, data, new[] {info.ConnectionId}, id, mimeType);
        }

        /// <summary>
        /// Parse JSON string and return ControlObject object
        /// </summary>
        /// <param name="jsonObject">string containing JSON object</param>
        /// <returns></returns>
        private ControlObject GetControlObjectFromJson(string jsonObject)
        {
            dynamic parsedObject = JsonConvert.DeserializeObject(jsonObject);
            switch ((string) parsedObject.Action)
            {
                case Control.Action.RequestStreamId:
                    return new RequestStreamIdControlObject()
                    {
                        Action = (string) parsedObject.Action
                    };
                case Control.Action.MediaNotSupported:
                    return new MediaNotSupportedControlObject()
                    {
                        Action = (string) parsedObject.Action,
                        MimeType = (string) parsedObject.MimeType
                    };
                case Control.Action.RequestMediaHeader:
                    return new RequestMediaHeaderControlObject()
                    {
                        Action = (string) parsedObject.Action,
                        StreamId = (uint) parsedObject.StreamId
                    };
                case Control.Action.StopStream:
                    return new StopStreamControlObject()
                    {
                        Action = (string) parsedObject.Action,
                        StreamId = (uint) parsedObject.StreamId
                    };
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        /// <summary>
        /// Get all connection IDs from ICommunication object which support specified mime type and are not in excludedConnections array.
        /// Return all connections which support specified mime type from ICommunication except excluded connections
        /// </summary>
        /// <param name="communication">ICommunication object</param>
        /// <param name="mimeType">Mime type which may be supported by returned connections</param>
        /// <param name="excludedConnections">Array of connection which will be excluded from returned array</param>
        /// <returns></returns>
        private string[] GetConnectionIds(ICommunication communication, string mimeType,
            string[] excludedConnections = null)
        {
            var connectionIds = communication.GetConnectionIdsSupportMimeType(mimeType);
            if (excludedConnections != null)
            {
                connectionIds = connectionIds.Except(excludedConnections).ToArray();
            }
            return connectionIds;
        }

        /// <summary>
        /// Send (broadcast) text message to all connections participating in Communication except excluded connections
        /// </summary>
        /// <param name="communication">ICommunication object (current communication session)</param>
        /// <param name="data">Text data to send</param>
        /// <param name="excludedConnections">Array of connection IDs which will be excluded from broadcasting</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected Task BroadcastTextMessage(ICommunication communication, string data,
            string[] excludedConnections = null, uint streamId = (uint) DefaultStreamId.Text, string mimeType = "")
        {
            return BroadcastMessage(Message.Types.DataType.Text, communication, ByteString.CopyFromUtf8(data),
                excludedConnections, streamId, mimeType);
        }

        /// <summary>
        /// Send text message to one specified connection
        /// </summary>
        /// <param name="connectionId">Connection ID of destination</param>
        /// <param name="data">Text data to send</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected Task SendTextMessage(string connectionId, string data, uint streamId = (uint) DefaultStreamId.Text,
            string mimeType = "")
        {
            return SendTextMessage(new[] {connectionId}, data, streamId, mimeType);
        }

        /// <summary>
        /// Send text message to specified connections
        /// </summary>
        /// <param name="connectionIds">Array of connection IDs, used as destination</param>
        /// <param name="data">Text data to send</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected Task SendTextMessage(string[] connectionIds, string data, uint streamId = (uint) DefaultStreamId.Text,
            string mimeType = "")
        {
            return SendMessage(Message.Types.DataType.Text, connectionIds, ByteString.CopyFromUtf8(data), streamId,
                mimeType);
        }

        /// <summary>
        /// Send (broadcast) binary message to all connections participating in Communication except excluded connections
        /// </summary>
        /// <param name="communication">ICommunication object (current communication session)</param>
        /// <param name="data">Binary data to send</param>
        /// <param name="excludedConnections">Array of connection IDs which will be excluded from broadcasting</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected Task BroadcastBinaryMessage(ICommunication communication, byte[] data,
            string[] excludedConnections = null, uint streamId = (uint) DefaultStreamId.Binary, string mimeType = "")
        {
            return BroadcastMessage(Message.Types.DataType.Binary, communication, ByteString.CopyFrom(data),
                excludedConnections, streamId, mimeType);
        }

        /// <summary>
        /// Send binary message to one specified connection
        /// </summary>
        /// <param name="connectionId">Connection ID of destination</param>
        /// <param name="data">Binary data to send</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected Task SendBinaryMessage(string connectionId, byte[] data, uint streamId = (uint) DefaultStreamId.Text,
            string mimeType = "")
        {
            return SendBinaryMessage(new[] {connectionId}, data, streamId, mimeType);
        }

        /// <summary>
        /// Send binary message to specified connections
        /// </summary>
        /// <param name="connectionIds">Array of connection IDs, used as destination</param>
        /// <param name="data">Binary data to send</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected Task SendBinaryMessage(string[] connectionIds, byte[] data,
            uint streamId = (uint) DefaultStreamId.Text, string mimeType = "")
        {
            return SendMessage(Message.Types.DataType.Binary, connectionIds, ByteString.CopyFrom(data), streamId,
                mimeType);
        }

        /// <summary>
        /// Send (broadcast) control message to all connections participating in Communication except excluded connections
        /// </summary>
        /// <param name="communication">ICommunication object (current communication session)</param>
        /// <param name="controlObject">Control object which will be serialized to JSON and send to clients</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="excludedConnections">Array of connection IDs which will be excluded from broadcasting</param>
        /// <returns></returns>
        protected Task BroadcastControlMessage(ICommunication communication, ControlObject controlObject,
            uint streamId = (uint) DefaultStreamId.Control, string[] excludedConnections = null)
        {
            return BroadcastMessage(Message.Types.DataType.Control, communication,
                ByteString.CopyFromUtf8(JsonConvert.SerializeObject(controlObject)), excludedConnections, streamId,
                JsonMimeType);
        }

        /// <summary>
        /// Send control message to one specified connection
        /// </summary>
        /// <param name="connetionId">Connection ID of destination</param>
        /// <param name="controlObject">Control object which will be serialized to JSON and send to clients</param>
        /// <param name="streamId">ID of stream</param>
        /// <returns></returns>
        protected Task SendControlMessage(string connetionId, ControlObject controlObject,
            uint streamId = (uint) DefaultStreamId.Control)
        {
            return SendControlMessage(new[] {connetionId}, controlObject, streamId);
        }

        /// <summary>
        /// Send binary message to specified connections
        /// </summary>
        /// <param name="connectionIds">Array of connection IDs, used as destination</param>
        /// <param name="controlObject">Control object which will be serialized to JSON and send to clients</param>
        /// <param name="streamId">ID of stream</param>
        /// <returns></returns>
        protected Task SendControlMessage(string[] connectionIds, ControlObject controlObject,
            uint streamId = (uint) DefaultStreamId.Control)
        {
            return SendMessage(Message.Types.DataType.Control, connectionIds,
                ByteString.CopyFromUtf8(JsonConvert.SerializeObject(controlObject)), streamId, JsonMimeType);
        }

        /// <summary>
        /// Send (broadcast) audio message to all connections participating in Communication except excluded connections
        /// </summary>
        /// <param name="communication">ICommunication object (current communication session)</param>
        /// <param name="data">Audio data to send</param>
        /// <param name="excludedConnections">Array of connection IDs which will be excluded from broadcasting</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected Task BroadcastAudioMessage(ICommunication communication, byte[] data,
            string[] excludedConnections = null, uint streamId = (uint) DefaultStreamId.Audio, string mimeType = "")
        {
            return BroadcastMessage(Message.Types.DataType.Audio, communication, ByteString.CopyFrom(data),
                excludedConnections, streamId, mimeType);
        }

        /// <summary>
        /// Send audio message to one specified connection
        /// </summary>
        /// <param name="connectionId">Connection ID of destination</param>
        /// <param name="data">Audio data to send</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected Task SendAudioMessage(string connectionId, byte[] data, uint streamId = (uint) DefaultStreamId.Text,
            string mimeType = "")
        {
            return SendAudioMessage(new[] {connectionId}, data, streamId, mimeType);
        }

        /// <summary>
        /// Send audio message to specified connections
        /// </summary>
        /// <param name="connectionIds">Array of connection IDs, used as destination</param>
        /// <param name="data">Audio data to send</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected Task SendAudioMessage(string[] connectionIds, byte[] data, uint streamId = (uint) DefaultStreamId.Text,
            string mimeType = "")
        {
            return SendMessage(Message.Types.DataType.Audio, connectionIds, ByteString.CopyFrom(data), streamId,
                mimeType);
        }

        /// <summary>
        /// Send (broadcast) video message to all connections participating in Communication except excluded connections
        /// </summary>
        /// <param name="communication">ICommunication object (current communication session)</param>
        /// <param name="data">Video data to send</param>
        /// <param name="excludedConnections">Array of connection IDs which will be excluded from broadcasting</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected Task BroadcastVideoMessage(ICommunication communication, byte[] data,
            string[] excludedConnections = null, uint streamId = (uint) DefaultStreamId.Video, string mimeType = "")
        {
            return BroadcastMessage(Message.Types.DataType.Video, communication, ByteString.CopyFrom(data),
                excludedConnections, streamId, mimeType);
        }

        /// <summary>
        /// Send video message to one specified connection
        /// </summary>
        /// <param name="connectionId">Connection ID of destination</param>
        /// <param name="data">Video data to send</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected Task SendVideoMessage(string connectionId, byte[] data, uint streamId = (uint) DefaultStreamId.Text,
            string mimeType = "")
        {
            return SendVideoMessage(new[] {connectionId}, data, streamId, mimeType);
        }

        /// <summary>
        /// Send video message to specified connections
        /// </summary>
        /// <param name="connectionIds">Array of connection IDs, used as destination</param>
        /// <param name="data">Video data to send</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns></returns>
        protected Task SendVideoMessage(string[] connectionIds, byte[] data, uint streamId = (uint) DefaultStreamId.Text,
            string mimeType = "")
        {
            return SendMessage(Message.Types.DataType.Video, connectionIds, ByteString.CopyFrom(data), streamId,
                mimeType);
        }

        /// <summary>
        /// Send (broadcast) message to all connections participating in Communication except excluded connections
        /// </summary>
        /// <param name="dataType">Data type of message</param>
        /// <param name="communication">ICommunication object (current communication session)</param>
        /// <param name="data">Data to send</param>
        /// <param name="excludedConnections">Array of connection IDs which will be excluded from broadcasting</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of stream</param>
        /// <returns></returns>
        private Task BroadcastMessage(Message.Types.DataType dataType, ICommunication communication, ByteString data,
            string[] excludedConnections, uint streamId, string mimeType)
        {
            var connectionIds = GetConnectionIds(communication, mimeType, excludedConnections);
            if (connectionIds.Length == 0)
            {
                return Task.FromResult<object>(null);
            }
            var messages = new MessageCollection();
            messages.Messages.Add(new Message()
            {
                Data = data,
                DataType = dataType,
                Id = streamId,
                MimeType = mimeType,
                Origin = OriginConnection
            });
            return Connection.Send(connectionIds, messages.ToByteString().ToBase64());
        }

        /// <summary>
        /// Send message to specified connections
        /// </summary>
        /// <param name="dataType">Data type of message</param>
        /// <param name="connectionIds">Array of connection IDs, used as destination</param>
        /// <param name="data">Data to send</param>
        /// <param name="streamId">ID of stream</param>
        /// <param name="mimeType">Mime type of stream</param>
        /// <returns></returns>
        private Task SendMessage(Message.Types.DataType dataType, string[] connectionIds, ByteString data, uint streamId,
            string mimeType)
        {
            var messages = new MessageCollection();
            messages.Messages.Add(new Message()
            {
                Data = data,
                DataType = dataType,
                Id = streamId,
                MimeType = mimeType,
                Origin = OriginConnection
            });
            return Connection.Send(connectionIds, messages.ToByteString().ToBase64());
        }

        /// <summary>
        /// This method catch media stream, extract and store media header. Media header then could be sent to clients if they need it.
        /// </summary>
        /// <param name="communication">ICommunication object (current communication session)</param>
        /// <param name="id">ID of received stream</param>
        /// <param name="data">Received data</param>
        /// <param name="mimeType">Received mime type</param>
        private void CacheMediaHeader(ICommunication communication, uint id, byte[] data, string mimeType)
        {
            if (communication.IsMediaStreamHeaderExist(id) || !mimeType.ToLower().Contains("webm"))
                //Currently handle only WebM file container
            {
                return;
            }
            if (MediaReceiveCache.ContainsKey(communication.SessionId) &&
                MediaReceiveCache[communication.SessionId].ContainsKey(id))
            {
                MediaReceiveCache[communication.SessionId][id].AddRange(data);
                if (MediaReceiveCache[communication.SessionId][id].Count > 2048)
                {
                    var webmHelper = new WebMHelper(MediaReceiveCache[communication.SessionId][id].ToArray());
                    byte[] header;
                    try
                    {
                        header = webmHelper.GetWebMFileHeader();
                    }
                    catch (EbmlFormatException)
                    {
                        header = new byte[0];
                    }
                    communication.SetMediaStreamHeader(id, header);
                    MediaReceiveCache[communication.SessionId].Remove(id);
                    if (MediaReceiveCache[communication.SessionId].Count == 0)
                    {
                        Dictionary<uint, List<byte>> dictionary;
                        MediaReceiveCache.TryRemove(communication.SessionId, out dictionary);
                    }
                }
                return;
            }
            if (!MediaReceiveCache.ContainsKey(communication.SessionId))
            {
                MediaReceiveCache[communication.SessionId] = new Dictionary<uint, List<byte>>();
            }
            if (!MediaReceiveCache[communication.SessionId].ContainsKey(id))
            {
                MediaReceiveCache[communication.SessionId][id] = new List<byte>();
            }
            MediaReceiveCache[communication.SessionId][id].AddRange(data);
        }
    }
}