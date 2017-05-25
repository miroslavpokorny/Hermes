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

namespace Hermes.Communication
{
    /// <summary>
    /// Communication where one communicate with one (2 connections only). Example use case could be private chat,...
    /// </summary>
    public class OneToOneCommunication : BaseCommunication
    {
        /// <summary>
        /// State during previous status query
        /// </summary>
        private string _lastState = string.Empty;

        /// <inheritdoc />
        public override uint MaxConnections { get; } = 2;

        /// <inheritdoc />
        public override string Status
        {
            get
            {
                var state = string.Empty;
                switch (ConnectionIds.Count)
                {
                    case 1:
                        state = _lastState == Communication.Status.Ready ||
                                _lastState == Communication.Status.Disconnected
                            ? Communication.Status.Disconnected
                            : Communication.Status.Waiting;
                        break;
                    case 2:
                        state = Communication.Status.Ready;
                        break;
                }
                _lastState = state;
                return state;
            }
        }
    }
}