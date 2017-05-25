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

namespace Hermes.Connection
{
    /// <summary>
    /// Default IDs for streams
    /// </summary>
    public enum DefaultStreamId
    {
        /// <summary>
        /// Default control stream ID, value = 1
        /// </summary>
        Control = 1,

        /// <summary>
        /// Default text stream ID, value = 2
        /// </summary>
        Text = 2,

        /// <summary>
        /// Default binary stream ID, value = 3
        /// </summary>
        Binary = 3,

        /// <summary>
        /// Default audio stream ID, value = 4
        /// </summary>
        Audio = 4,

        /// <summary>
        /// Default video stream ID, value = 5
        /// </summary>
        Video = 5,
    }
}