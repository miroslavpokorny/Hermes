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
using System.Threading;
using Hermes.Protoc.Messages;

namespace Hermes.Communication
{
    /// <summary>
    /// Base class for communication classes 
    /// </summary>
    public abstract class BaseCommunication : ICommunication
    {
        /// <summary>
        /// Range start of unique IDs, which could be assigned when requested
        /// </summary>
        public const uint UniqueIdRangeStart = 50000;

        /// <summary>
        /// Master connection is first connection which is added to communication
        /// </summary>
        private string _masterConnection;

        /// <summary>
        /// Last assigned unique ID
        /// </summary>
        private int _uniqueId = (int) UniqueIdRangeStart;

        /// <summary>
        /// Boolean value which indicate if master connection is still connected or not
        /// </summary>
        private bool _isMasterConnected;

        /// <summary>
        /// All connection IDs participating in communication
        /// </summary>
        protected readonly SynchronizedCollection<string> ConnectionIds = new SynchronizedCollection<string>();

        /// <summary>
        /// Dictionary which store generated stream IDs. Key is Connection ID which request stream ID, and value is collection of IDs.
        /// </summary>
        protected readonly ConcurrentDictionary<string, SynchronizedCollection<uint>> ConnectionGeneratedStreamIds =
            new ConcurrentDictionary<string, SynchronizedCollection<uint>>();

        /// <summary>
        /// Dictionary which store media header. Key is ID of stream, value is byte array containing media header data.
        /// </summary>
        protected readonly ConcurrentDictionary<uint, byte[]> MediaHeaders = new ConcurrentDictionary<uint, byte[]>();

        /// <summary>
        /// Dictionary which store disabled mime types for connections. Key is connection ID, value is collection of disabled mime types.
        /// </summary>
        protected readonly ConcurrentDictionary<string, SynchronizedCollection<string>> DisabledMimeTypes =
            new ConcurrentDictionary<string, SynchronizedCollection<string>>();

        /// <inheritdoc />
        public virtual Action<ICommunication, string> AddConnectionCallback { get; set; }

        /// <inheritdoc />
        public virtual Action<ICommunication, string> RemoveConnectionCallback { get; set; }

        /// <inheritdoc />
        public virtual string MasterConnection
        {
            get { return _masterConnection; }
        }

        /// <inheritdoc />
        public virtual CommunicationConstraint MasterConstraint { get; } = new CommunicationConstraint();

        /// <inheritdoc />
        public abstract uint MaxConnections { get; }

        /// <inheritdoc />
        public CommunicationConstraint SlaveConstraint { get; } = new CommunicationConstraint();

        /// <inheritdoc />
        public virtual string SessionId { get; set; }

        /// <inheritdoc />
        public abstract string Status { get; }

        /// <inheritdoc />
        public virtual bool AddConnection(string connectionId)
        {
            if (ConnectionIds.Count >= MaxConnections)
            {
                return false;
            }
            if (ConnectionIds.Count == 0)
            {
                _masterConnection = connectionId;
                _isMasterConnected = true;
            }
            ConnectionIds.Add(connectionId);
            AddConnectionCallback?.Invoke(this, connectionId);
            return true;
        }

        /// <inheritdoc />
        public virtual void DisableSendingData(string connectionId, string mimeType)
        {
            if (!ConnectionIds.Contains(connectionId))
            {
                return;
            }
            if (!DisabledMimeTypes.ContainsKey(connectionId))
            {
                DisabledMimeTypes[connectionId] = new SynchronizedCollection<string>();
            }
            if (!DisabledMimeTypes[connectionId].Contains(mimeType))
            {
                DisabledMimeTypes[connectionId].Add(mimeType);
            }
        }

        /// <inheritdoc />
        public virtual string[] GetConnectionIds()
        {
            return ConnectionIds.ToArray();
        }

        /// <inheritdoc />
        public virtual string[] GetConnectionIdsSupportMimeType(string mimeType)
        {
            var ids = new List<string>();
            foreach (var connectionId in ConnectionIds)
            {
                if (IsMimeTypeEnabled(connectionId, mimeType))
                {
                    ids.Add(connectionId);
                }
            }
            return ids.ToArray();
        }

        /// <inheritdoc />
        public virtual uint[] GetConnectionStreamIds(string connectionId)
        {
            return ConnectionGeneratedStreamIds.ContainsKey(connectionId)
                ? ConnectionGeneratedStreamIds[connectionId].ToArray()
                : new uint[0];
        }

        /// <inheritdoc />
        public virtual byte[] GetMediaStreamHeader(uint streamId)
        {
            return MediaHeaders.ContainsKey(streamId) ? MediaHeaders[streamId] : new byte[0];
        }

        /// <inheritdoc />
        public virtual uint GetNewUniqueStreamId(string applicantConnectionId)
        {
            if (!ConnectionIds.Contains(applicantConnectionId))
            {
                return 0;
            }
            var id = (uint) Interlocked.Increment(ref _uniqueId);
            if (!ConnectionGeneratedStreamIds.ContainsKey(applicantConnectionId))
            {
                ConnectionGeneratedStreamIds[applicantConnectionId] = new SynchronizedCollection<uint>();
            }
            ConnectionGeneratedStreamIds[applicantConnectionId].Add(id);
            return id;
        }

        /// <inheritdoc />
        public virtual bool IsCommunicationAllowed(string connectionId, Message.Types.DataType dataType)
        {
            return dataType == Message.Types.DataType.Control ||
                   (connectionId == MasterConnection && MasterConstraint.IsDataTypeAllowed(dataType)) ||
                   (MasterConstraint.IsDataTypeAllowed(dataType) && SlaveConstraint.IsDataTypeAllowed(dataType));
        }

        /// <inheritdoc />
        public virtual bool IsCommunicationFull()
        {
            return ConnectionIds.Count >= MaxConnections;
        }

        /// <inheritdoc />
        public virtual bool IsMasterConnected()
        {
            return _isMasterConnected;
        }

        /// <inheritdoc />
        public virtual bool IsMediaStreamHeaderExist(uint streamId)
        {
            return MediaHeaders.ContainsKey(streamId);
        }

        /// <inheritdoc />
        public virtual bool IsMimeTypeEnabled(string connctionId, string mimeType)
        {
            return !DisabledMimeTypes.ContainsKey(connctionId) || !DisabledMimeTypes[connctionId].Contains(mimeType);
        }

        /// <inheritdoc />
        public virtual bool IsRequestStreamIdAllowed(string connectionId)
        {
            return connectionId == MasterConnection && MasterConstraint.RequestStreamIdAllowed ||
                   MasterConstraint.RequestStreamIdAllowed && SlaveConstraint.RequestStreamIdAllowed;
        }

        /// <inheritdoc />
        public virtual void RemoveConnection(string connectionId)
        {
            ConnectionIds.Remove(connectionId);
            SynchronizedCollection<uint> streamIds;
            if (ConnectionGeneratedStreamIds.TryRemove(connectionId, out streamIds))
            {
                foreach (var streamId in streamIds)
                {
                    byte[] header;
                    MediaHeaders.TryRemove(streamId, out header);
                }
            }
            SynchronizedCollection<string> mimeTypes;
            DisabledMimeTypes.TryRemove(connectionId, out mimeTypes);
            if (connectionId == MasterConnection)
            {
                _isMasterConnected = false;
            }
            RemoveConnectionCallback?.Invoke(this, connectionId);
        }

        /// <inheritdoc />
        public virtual void SetMasterConstraint(CommunicationConstraint constraint)
        {
            MasterConstraint.SetConstraints(constraint);
        }

        /// <inheritdoc />
        public virtual void SetMediaStreamHeader(uint streamId, byte[] headerBytes)
        {
            MediaHeaders[streamId] = headerBytes;
        }

        /// <inheritdoc />
        public virtual void SetSlaveConstraint(CommunicationConstraint constraint)
        {
            SlaveConstraint.SetConstraints(constraint);
        }

        /// <inheritdoc />
        public virtual bool StopStream(uint streamId, string connectionId)
        {
            if (!ConnectionGeneratedStreamIds.ContainsKey(connectionId) ||
                !ConnectionGeneratedStreamIds[connectionId].Contains(streamId))
            {
                return false;
            }
            ConnectionGeneratedStreamIds[connectionId].Remove(streamId);
            if (MediaHeaders.ContainsKey(streamId))
            {
                byte[] header;
                MediaHeaders.TryRemove(streamId, out header);
            }
            return true;
        }
    }
}