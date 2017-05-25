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

using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Hermes.Communication
{
    /// <summary>
    /// Class used to store ICommunication objects and provide them based on ConnectionID or SessionID
    /// </summary>
    public class CommunicationCollection : IEnumerable<ICommunication>
    {
        /// <summary>
        /// Dictionary where key represent ID of session and value represent object with more info about session
        /// </summary>
        private readonly ConcurrentDictionary<string, ICommunication> _communicationSessions =
            new ConcurrentDictionary<string, ICommunication>();

        /// <summary>
        /// Key represent ID of connection (User id) and value represent ID of session (Key in Connection Groups)
        /// </summary>
        private readonly ConcurrentDictionary<string, string> _userSessionId =
            new ConcurrentDictionary<string, string>();

        /// <summary>
        /// Add ICommunication object to this collection
        /// </summary>
        /// <param name="communication"></param>
        public void AddCommunication(ICommunication communication)
        {
            _communicationSessions[communication.SessionId] = communication;
            foreach (var connectionId in communication.GetConnectionIds())
            {
                _userSessionId[connectionId] = communication.SessionId;
            }
            communication.AddConnectionCallback = AddConnectionCallback;
            communication.RemoveConnectionCallback = RemoveConnectionCallback;
        }

        /// <summary>
        /// Get ICommunication object based on connectionId
        /// Return ICommunication on success, or null if no communication is found
        /// </summary>
        /// <param name="connectionId">ID of connection participating in communication</param>
        /// <returns>Return ICommunication on success, or null if no communication is found</returns>
        public ICommunication GetCommunicationByConnectionId(string connectionId)
        {
            return _userSessionId.ContainsKey(connectionId) &&
                   _communicationSessions.ContainsKey(_userSessionId[connectionId])
                ? _communicationSessions[_userSessionId[connectionId]]
                : null;
        }

        /// <summary>
        /// Get ICommunication object based on connectionId
        /// Return ICommunication on success, or null if no communication is found
        /// </summary>
        /// <param name="sessionId">ID of communication session</param>
        /// <returns>Return ICommunication on success, or null if no communication is found</returns>
        public ICommunication GetCommunicationBySessionId(string sessionId)
        {
            if (sessionId == null)
            {
                sessionId = string.Empty;
            }
            return _communicationSessions.ContainsKey(sessionId) ? _communicationSessions[sessionId] : null;
        }

        /// <summary>
        /// This method may be invoked after adding connection to ICommunication object
        /// </summary>
        /// <param name="communication">Connection object which was edited</param>
        /// <param name="connectionId">Added id</param>
        private void AddConnectionCallback(ICommunication communication, string connectionId)
        {
            _userSessionId[connectionId] = communication.SessionId;
        }

        /// <summary>
        /// /// This method may be invoked after removing connection to ICommunication object
        /// </summary>
        /// <param name="communication">Connection object which was edited</param>
        /// <param name="connectionId">Deleted id</param>
        private void RemoveConnectionCallback(ICommunication communication, string connectionId)
        {
            if (!_userSessionId.ContainsKey(connectionId))
            {
                return;
            }
            string sessionId;
            _userSessionId.TryRemove(connectionId, out sessionId);
            if (communication.GetConnectionIds().Length == 0)
            {
                _communicationSessions.TryRemove(communication.SessionId, out communication);
            }
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public IEnumerator<ICommunication> GetEnumerator()
        {
            return _communicationSessions.Values.GetEnumerator();
        }
    }
}