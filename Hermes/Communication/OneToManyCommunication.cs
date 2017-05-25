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
    /// Communication where one communicate with many (default behavior is that slave connection can't send any data). Example use case could be on-line radio broadcasting,...
    /// </summary>
    public class OneToManyCommunication : BaseCommunication
    {
        /// <inheritdoc />
        public override uint MaxConnections { get; } = uint.MaxValue;

        /// <inheritdoc />
        public override string Status
            => IsMasterConnected() ? Communication.Status.Ready : Communication.Status.Disconnected;

        /// <summary>
        /// Crete new OneToManyCommunication object. Initialize constraints.
        /// </summary>
        public OneToManyCommunication()
        {
            SetSlaveConstraint(new CommunicationConstraint()
            {
                AudioDataTypeAllowed = false,
                VideoDataTypeAllowed = false,
                BinaryDataTypeAllowed = false,
                RequestStreamIdAllowed = false,
                TextDataTypeAllowed = false
            });
        }
    }
}