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

using System.Collections.Generic;
using Hermes.Protoc.Messages;

namespace Hermes.Communication
{
    /// <summary>
    /// Class which represent communication constraints. Which data could client send...
    /// </summary>
    public class CommunicationConstraint
    {
        /// <summary>
        /// Dictionary where is stored which data types are allowed
        /// </summary>
        private readonly Dictionary<Message.Types.DataType, bool> _dataTypeAllowed =
            new Dictionary<Message.Types.DataType, bool>(4);

        /// <summary>
        /// Property which indicate if text data type is allowed
        /// </summary>
        public bool TextDataTypeAllowed
        {
            get { return _dataTypeAllowed[Message.Types.DataType.Text]; }
            set { _dataTypeAllowed[Message.Types.DataType.Text] = value; }
        }

        /// <summary>
        /// Property which indicate if binary data type is allowed
        /// </summary>
        public bool BinaryDataTypeAllowed
        {
            get { return _dataTypeAllowed[Message.Types.DataType.Binary]; }
            set { _dataTypeAllowed[Message.Types.DataType.Binary] = value; }
        }

        /// <summary>
        /// Property which indicate if audio data type is allowed
        /// </summary>
        public bool AudioDataTypeAllowed
        {
            get { return _dataTypeAllowed[Message.Types.DataType.Audio]; }
            set { _dataTypeAllowed[Message.Types.DataType.Audio] = value; }
        }

        /// <summary>
        /// Property which indicate if video data type is allowed
        /// </summary>
        public bool VideoDataTypeAllowed
        {
            get { return _dataTypeAllowed[Message.Types.DataType.Video]; }
            set { _dataTypeAllowed[Message.Types.DataType.Video] = value; }
        }

        /// <summary>
        /// Property which indicate if requesting for stream id is allowed
        /// </summary>
        public bool RequestStreamIdAllowed { get; set; }

        /// <summary>
        /// Create new communication constrain object
        /// </summary>
        public CommunicationConstraint()
        {
            TextDataTypeAllowed = true;
            BinaryDataTypeAllowed = true;
            AudioDataTypeAllowed = true;
            VideoDataTypeAllowed = true;
            RequestStreamIdAllowed = true;
        }

        /// <summary>
        /// Check if data type is allowed
        /// Return true if data type is allowed, otherwise return false
        /// </summary>
        /// <param name="dataType">Data type to test</param>
        /// <returns>Return true if data type is allowed, otherwise return false</returns>
        public bool IsDataTypeAllowed(Message.Types.DataType dataType)
        {
            return _dataTypeAllowed.ContainsKey(dataType) && _dataTypeAllowed[dataType];
        }

        /// <summary>
        /// This method "copy" constraints from another constraint object to this object
        /// </summary>
        /// <param name="constraint">Communication constraints object which values will be copied</param>
        public void SetConstraints(CommunicationConstraint constraint)
        {
            TextDataTypeAllowed = constraint.TextDataTypeAllowed;
            BinaryDataTypeAllowed = constraint.BinaryDataTypeAllowed;
            AudioDataTypeAllowed = constraint.AudioDataTypeAllowed;
            VideoDataTypeAllowed = constraint.VideoDataTypeAllowed;
            RequestStreamIdAllowed = constraint.RequestStreamIdAllowed;
        }
    }
}