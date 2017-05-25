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
    /// Communication where everyone communicate with everyone. Example use cases could be on-line gaming, chat room,...
    /// </summary>
    public class ManyToManyCommunication : BaseCommunication
    {
        /// <inheritdoc />
        public override uint MaxConnections { get; } = uint.MaxValue;

        /// <inheritdoc />
        public override string Status
        {
            get
            {
                switch (ConnectionIds.Count)
                {
                    case 0:
                        return Communication.Status.Disconnected;
                    case 1:
                        return Communication.Status.Waiting;
                    default:
                        return Communication.Status.Ready;
                }
            }
        }
    }
}