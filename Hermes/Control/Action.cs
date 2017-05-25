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

namespace Hermes.Control
{
    /// <summary>
    /// Static class containing possible actions in Action property of ControlObject
    /// </summary>
    public static class Action
    {
        /// <summary>
        /// New connection is connected to server
        /// </summary>
        public const string Connect = "connect";

        /// <summary>
        /// Some connection has disconnect from server
        /// </summary>
        public const string Disconnect = "disconnect";

        /// <summary>
        /// Connection has requested stream ID
        /// </summary>
        public const string RequestStreamId = "requestStreamId";

        /// <summary>
        /// Client received mime type which cannot play because it is not supported
        /// </summary>
        public const string MediaNotSupported = "mediaNotSupported";

        /// <summary>
        /// Client request header of media data
        /// </summary>
        public const string RequestMediaHeader = "requestMediaHeader";

        /// <summary>
        /// Client has stop sending data
        /// </summary>
        public const string StopStream = "stopStream";
    }
}