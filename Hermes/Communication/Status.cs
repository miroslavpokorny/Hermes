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
    /// Static class representing possible communication statuses 
    /// </summary>
    public static class Status
    {
        /// <summary>
        /// Ready to communicate
        /// </summary>
        public const string Ready = "Ready";

        /// <summary>
        /// Waiting for another connections to communicate
        /// </summary>
        public const string Waiting = "Waiting";

        /// <summary>
        /// Communication ended
        /// </summary>
        public const string Disconnected = "Disconnected";

        /// <summary>
        /// Communication is full
        /// </summary>
        public const string Full = "Full";
    }
}