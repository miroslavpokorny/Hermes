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

namespace Hermes.Media
{
    /// <summary>
    /// Class representing Info EBML element contained in segment element header
    /// </summary>
    public class WebMInfo
    {
        /// <summary>
        /// Time code scale
        /// </summary>
        public ulong TimecodeScale { get; set; } = 1000000;

        /// <summary>
        /// Duration of media
        /// </summary>
        public double Duration { get; set; }

        /// <summary>
        /// Date time UTC
        /// </summary>
        public DateTime DateUtc { get; set; }

        /// <summary>
        /// Title of media
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Multiplexing application
        /// </summary>
        public string MuxingApp { get; set; }

        /// <summary>
        /// Writing application
        /// </summary>
        public string WritingApp { get; set; }
    }
}