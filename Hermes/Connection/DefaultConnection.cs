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
using System.Threading.Tasks;
using Hermes.Communication;
using Hermes.Control;
using Action = Hermes.Control.Action;

namespace Hermes.Connection
{
    /// <summary>
    /// Default connection class. Extends BaseConnections and implement default behavior of connect and disconnect
    /// </summary>
    /// <typeparam name="TCommunication">ICommunication class which will be instantiated when new communication session is requested</typeparam>
    public class DefaultConnection<TCommunication> : BaseConnection where TCommunication : ICommunication, new()
    {
        /// <inheritdoc />
        protected override Task OnConnected(ConnectionInfo info)
        {
            var controlObject = new ConnectControlObject()
            {
                Action = Action.Connect
            };
            if (string.IsNullOrEmpty(info.SessionId) || info.Communication == null)
            {
                var id = Guid.NewGuid();
                var communication = new TCommunication {SessionId = id.ToString()};
                communication.AddConnection(info.ConnectionId);
                Communications.AddCommunication(communication);
                //Connection should waiting
                controlObject.Status = communication.Status;
                controlObject.SessionId = communication.SessionId;
                controlObject.Constraint = communication.MasterConstraint;
                return SendControlMessage(info.ConnectionId, controlObject);
            }
            if (info.Communication.IsCommunicationFull() || !info.Communication.AddConnection(info.ConnectionId))
            {
                //Connection is full or adding new connection fail
                controlObject.Status = Status.Full;
                controlObject.SessionId = info.SessionId;
                controlObject.Constraint = new CommunicationConstraint()
                {
                    AudioDataTypeAllowed = false,
                    BinaryDataTypeAllowed = false,
                    RequestStreamIdAllowed = false,
                    TextDataTypeAllowed = false,
                    VideoDataTypeAllowed = false
                };
                return SendControlMessage(info.ConnectionId, controlObject);
            }
            //Connection should be ready
            controlObject.Status = info.Communication.Status;
            controlObject.SessionId = info.SessionId;
            controlObject.Constraint = info.Communication.SlaveConstraint;
            return BroadcastControlMessage(info.Communication, controlObject);
        }

        /// <inheritdoc />
        protected override Task OnDisconnected(ConnectionInfo info)
        {
            var ids = info.Communication.GetConnectionStreamIds(info.ConnectionId);
            info.Communication.RemoveConnection(info.ConnectionId);
            if (info.Communication.GetConnectionIds().Length == 0)
            {
                return Task.FromResult<object>(null);
            }
            var controlObject = new DisconnectControlObject()
            {
                Action = Action.Disconnect,
                Status = info.Communication.Status,
                SessionId = info.SessionId,
                DisconnectedStreamIds = ids
            };
            return BroadcastControlMessage(info.Communication, controlObject);
        }
    }
}