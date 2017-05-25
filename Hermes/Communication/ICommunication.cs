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
using Hermes.Protoc.Messages;

namespace Hermes.Communication
{
    /// <summary>
    /// Interface which represent Communication session
    /// </summary>
    public interface ICommunication
    {
        /// <summary>
        /// Action which may be invoked on success in method AddConnection 
        /// </summary>
        Action<ICommunication, string> AddConnectionCallback { get; set; }

        /// <summary>
        /// Action which may be invoked after removing connection from ICommunication
        /// </summary>
        Action<ICommunication, string> RemoveConnectionCallback { get; set; }

        /// <summary>
        /// Master connection is connection which is first connection in communication (communication responsible for creating communication session)
        /// </summary>
        string MasterConnection { get; }

        /// <summary>
        /// Communication constraints for master connection
        /// </summary>
        CommunicationConstraint MasterConstraint { get; }

        /// <summary>
        /// Communication constraints for slave connections
        /// </summary>
        CommunicationConstraint SlaveConstraint { get; }

        /// <summary>
        /// Maximal number of parallel connections per one communication session
        /// </summary>
        uint MaxConnections { get; }

        /// <summary>
        /// Communication Session ID
        /// </summary>
        string SessionId { get; set; }

        /// <summary>
        /// Current status of communication eg. Ready, Waiting, Disconnected
        /// </summary>
        string Status { get; }

        /// <summary>
        /// Add new connection to communication process
        /// Return true on success, false if connection was not added to communication
        /// </summary>
        /// <param name="connectionId">ID of connection which will be added to communication</param>
        /// <returns>Return true on success, false if connection was not added to communication</returns>
        bool AddConnection(string connectionId);

        /// <summary>
        /// Disable sending data with specific mimeType to connection specified by connectionId
        /// </summary>
        /// <param name="connectionId">End point which will not receive specified mimeType</param>
        /// <param name="mimeType">MimeType which will not being send to client (for example not supported video format.)</param>
        void DisableSendingData(string connectionId, string mimeType);

        /// <summary>
        /// Get all connection IDs participating in this communication
        /// Return array of string with all connection IDs participating in this communication
        /// </summary>
        /// <returns>Return array of string with all connection IDs participating in this communication</returns>
        string[] GetConnectionIds();

        /// <summary>
        /// Get all connections IDs which has enabled specified mimeType
        /// Return array of string with connection IDs which support specified mimeType
        /// </summary>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns>Return array of string with connection IDs which support specified mimeType</returns>
        string[] GetConnectionIdsSupportMimeType(string mimeType);

        /// <summary>
        /// Get all generated stream IDs associated with one specified connection
        /// Return array of IDs associated with specified connection. If there is no generated ID associated with connection, then return empty array
        /// </summary>
        /// <param name="connectionId">Connection ID</param>
        /// <returns>Return array of IDs associated with specified connection. If there is no generated ID associated with connection, then return empty array</returns>
        uint[] GetConnectionStreamIds(string connectionId);

        /// <summary>
        /// Get media header (first bytes of video/audio, eg. Initialization segment) for specified streamId
        /// Return First bytes of stream or empty byte array if header is not stored
        /// </summary>
        /// <param name="streamId">ID of stream</param>
        /// <returns>Return First bytes of stream or empty byte array if header is not stored</returns>
        byte[] GetMediaStreamHeader(uint streamId);

        /// <summary>
        /// Return unique id for new stream. Range of ids is > 50000.
        /// </summary>
        /// <param name="applicantConnectionId">Id of connection, which require new id.</param>
        /// <returns>Return new unique id (unique in ICommunication object) or return 0 if there is some error (connectionId not participating in communication).</returns>
        uint GetNewUniqueStreamId(string applicantConnectionId);

        /// <summary>
        /// Check constraints if communication is allowed (check is done based on Master an Slave constraints)
        /// Return true if communication is allowed, otherwise return false
        /// </summary>
        /// <param name="connectionId"></param>
        /// <param name="dataType"></param>
        /// <returns>Return true if communication is allowed, otherwise return false</returns>
        bool IsCommunicationAllowed(string connectionId, Message.Types.DataType dataType);

        /// <summary>
        /// Check if connection is full 
        /// Return true if connection is full, otherwise return false
        /// </summary>
        /// <returns>Return true if connection is full, otherwise return false</returns>
        bool IsCommunicationFull();

        /// <summary>
        /// Check if master is still connected to server
        /// Return true if master is connected to server, otherwise return false
        /// </summary>
        /// <returns>Return true if master is connected to server, otherwise return false</returns>
        bool IsMasterConnected();

        /// <summary>
        /// Check if media stream header exist
        /// Return true if exist, otherwise false
        /// </summary>
        /// <param name="streamId">ID of stream</param>
        /// <returns>Return true if exist, otherwise false</returns>
        bool IsMediaStreamHeaderExist(uint streamId);

        /// <summary>
        /// Check if specified mimeType is enabled for specified connection (by default all mimeTypes should be enabled)
        /// Return true if mime type is enabled, otherwise return false
        /// </summary>
        /// <param name="connctionId">End point connection ID (receiver)</param>
        /// <param name="mimeType">Mime type of data</param>
        /// <returns>Return true if mime type is enabled, otherwise return false</returns>
        bool IsMimeTypeEnabled(string connctionId, string mimeType);

        /// <summary>
        /// Check if requestStreamId action is allowed by specific connection
        /// Return true if requestStreamId is allowed, otherwise return false
        /// </summary>
        /// <param name="connectionId">Connection ID</param>
        /// <returns>Return true if requestStreamId is allowed, otherwise return false</returns>
        bool IsRequestStreamIdAllowed(string connectionId);

        /// <summary>
        /// Remove connection from communication process
        /// </summary>
        /// <param name="connectionId">ID of connection which will be removed from communication</param>
        void RemoveConnection(string connectionId);

        /// <summary>
        /// Set constraints for master connection (has higher priority than slave constraints, [for example if master has disabled video then slaves also has disabled video])
        /// </summary>
        /// <param name="constraint"></param>
        void SetMasterConstraint(CommunicationConstraint constraint);

        /// <summary>
        /// Set media header for specific streamId
        /// </summary>
        /// <param name="streamId">ID of stream</param>
        /// <param name="headerBytes">First bytes of media (Initialization segment)</param>
        void SetMediaStreamHeader(uint streamId, byte[] headerBytes);

        /// <summary>
        /// Set constraints for slave connection (has lower priory than master constraints, [for example if slave has disabled video, master could have video enabled])
        /// </summary>
        /// <param name="constraint"></param>
        void SetSlaveConstraint(CommunicationConstraint constraint);

        /// <summary>
        /// Stop stream. Check if stream is associated with specific connection. On success release resources associated with stream.
        /// Return true on success, otherwise return false.
        /// </summary>
        /// <param name="streamId">Stream ID to stop</param>
        /// <param name="connectionId">Connection which want to stop stream</param>
        /// <returns>Return true on success, otherwise return false.</returns>
        bool StopStream(uint streamId, string connectionId);
    }
}