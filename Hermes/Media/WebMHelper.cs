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
using System.Linq;
using System.Text;

namespace Hermes.Media
{
    /// <summary>
    /// Class used to work with WebM data
    /// </summary>
    public class WebMHelper
    {
        /// <summary>
        /// EBML element IDs
        /// </summary>
        private enum Element
        {
            Ebml = 0x1a45dfa3,
            Segment = 0x18538067,
            SeekHead = 0x114d9b74,
            Info = 0x1549a966,
            TimecodeScale = 0x2ad7b1,
            Duration = 0x4489,
            DateUtc = 0x4461,
            Title = 0x7ba9,
            MuxingApp = 0x4d80,
            WritingApp = 0x5741,
            Tracks = 0x1654ae6b,
            Cluster = 0x1f43b675,
        }

        /// <summary>
        /// Bytes of WebM file, passed by constructor
        /// </summary>
        private byte[] _fileBytes;

        /// <summary>
        /// Current seek position in _fileBytes data
        /// </summary>
        private long _seek = 0;

        /// <summary>
        /// Header of segment element of WebM file, backing field for SegmentHeader property
        /// </summary>
        private WebMSegmentHeader _segmentHeader;

        /// <summary>
        /// Create new WebMHeleper object
        /// </summary>
        /// <param name="fileBytes">File bytes or start of file bytes, (for extracting header full file is not necessary)</param>
        public WebMHelper(byte[] fileBytes)
        {
            _fileBytes = fileBytes;
        }

        /// <summary>
        /// Currently read element
        /// </summary>
        private int ElementId { get; set; }

        /// <summary>
        /// Currently read size of data
        /// </summary>
        private long DataSize { get; set; }

        /// <summary>
        /// Currently read data
        /// </summary>
        public byte[] Data
            => DataSize == 0 ? new byte[0] : _fileBytes.ToList().GetRange((int) _seek, (int) DataSize).ToArray();

        /// <summary>
        /// Header of segment element of WebM file
        /// </summary>
        public WebMSegmentHeader SegmentHeader
        {
            get
            {
                if (_segmentHeader == null)
                {
                    GetWebMFileHeader();
                }
                return _segmentHeader;
            }
            private set { _segmentHeader = value; }
        }

        /// <summary>
        /// Read next element
        /// </summary>
        private void ReadElement()
        {
            int id;
            ReadId(out id, ref _seek);
            ElementId = id;
            long size;
            ReadDataSize(out size, ref _seek);
            DataSize = size;
        }

        /// <summary>
        /// Read ID and move seek
        /// </summary>
        /// <param name="id">read ID</param>
        /// <param name="seek">seek position to fileBytes</param>
        private void ReadId(out int id, ref long seek)
        {
            byte[] bytes;
            //1xxx xxxx ; 1 Byte
            if ((_fileBytes[seek] & 0x80) == 0x80)
            {
                bytes = new byte[4] {0, 0, 0, _fileBytes[seek]};
                seek += 1;
            }
            //01xx xxxx xxxx xxxx ; 2 Bytes
            else if ((_fileBytes[seek] & 0x40) == 0x40)
            {
                bytes = new byte[] {0, 0, _fileBytes[seek], _fileBytes[seek + 1]};
                seek += 2;
            }
            //001x xxxx xxxx xxxx xxxx xxxx ; 3 Bytes
            else if ((_fileBytes[seek] & 0x20) == 0x20)
            {
                bytes = new byte[] {0, _fileBytes[seek], _fileBytes[seek + 1], _fileBytes[seek + 2]};
                seek += 3;
            }
            //0001 xxxx xxxx xxxx xxxx xxxx xxxx xxxx ; 4 Bytes
            else if ((_fileBytes[seek] & 0x10) == 0x10)
            {
                bytes = new byte[] {_fileBytes[seek], _fileBytes[seek + 1], _fileBytes[seek + 2], _fileBytes[seek + 3]};
                seek += 4;
            }
            else
            {
                throw new EbmlFormatException("Id could not be recognized!");
            }
            if (BitConverter.IsLittleEndian)
            {
                Array.Reverse(bytes);
            }
            id = BitConverter.ToInt32(bytes, 0);
        }

        /// <summary>
        /// Read data size and move seek
        /// </summary>
        /// <param name="size">read size</param>
        /// <param name="seek">seek position to fileBytes</param>
        private void ReadDataSize(out long size, ref long seek)
        {
            byte[] bytes;
            //1xxx xxxx ; 1 Byte
            if ((_fileBytes[seek] & 0x80) == 0x80)
            {
                bytes = new byte[8] {0, 0, 0, 0, 0, 0, 0, (byte) (_fileBytes[seek] & 0x7f)};
                seek += 1;
            }
            //01xx xxxx xxxx xxxx ; 2 Bytes
            else if ((_fileBytes[seek] & 0x40) == 0x40)
            {
                bytes = new byte[8] {0, 0, 0, 0, 0, 0, (byte) (_fileBytes[seek] & 0x3f), _fileBytes[seek + 1]};
                seek += 2;
            }
            //001x xxxx xxxx xxxx xxxx xxxx ; 3 Bytes
            else if ((_fileBytes[seek] & 0x20) == 0x20)
            {
                bytes = new byte[8]
                    {0, 0, 0, 0, 0, (byte) (_fileBytes[seek] & 0x1f), _fileBytes[seek + 1], _fileBytes[seek + 2]};
                seek += 3;
            }
            //0001 xxxx xxxx xxxx xxxx xxxx xxxx xxxx ; 4 Bytes
            else if ((_fileBytes[seek] & 0x10) == 0x10)
            {
                bytes = new byte[8]
                {
                    0, 0, 0, 0, (byte) (_fileBytes[seek] & 0xf), _fileBytes[seek + 1], _fileBytes[seek + 2],
                    _fileBytes[seek + 3]
                };
                seek += 4;
            }
            //0000 1xxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx ; 5 Bytes
            else if ((_fileBytes[seek] & 0x8) == 0x8)
            {
                bytes = new byte[8]
                {
                    0, 0, 0, (byte) (_fileBytes[seek] & 0x7), _fileBytes[seek + 1], _fileBytes[seek + 2],
                    _fileBytes[seek + 3], _fileBytes[seek + 4]
                };
                seek += 5;
            }
            //0000 01xx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx ; 6 Bytes
            else if ((_fileBytes[seek] & 0x4) == 0x4)
            {
                bytes = new byte[8]
                {
                    0, 0, (byte) (_fileBytes[seek] & 0x3), _fileBytes[seek + 1], _fileBytes[seek + 2],
                    _fileBytes[seek + 3], _fileBytes[seek + 4], _fileBytes[seek + 5]
                };
                seek += 6;
            }
            //0000 001x xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx ; 7 Bytes
            else if ((_fileBytes[seek] & 0x2) == 0x2)
            {
                bytes = new byte[8]
                {
                    0, (byte) (_fileBytes[seek] & 0x1), _fileBytes[seek + 1], _fileBytes[seek + 2],
                    _fileBytes[seek + 3], _fileBytes[seek + 4], _fileBytes[seek + 5], _fileBytes[seek + 6]
                };
                seek += 7;
            }
            //0000 0001 xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx ; 8 Bytes
            else if ((_fileBytes[seek] & 0x1) == 0x1)
            {
                // (_fileBytes[_seek] & 0x0) = 0
                bytes = new byte[8]
                {
                    0, _fileBytes[seek + 1], _fileBytes[seek + 2], _fileBytes[seek + 3], _fileBytes[seek + 4],
                    _fileBytes[seek + 5], _fileBytes[seek + 6], _fileBytes[seek + 7]
                };
                seek += 8;
            }
            else
            {
                throw new EbmlFormatException("Data size could not be recognized!");
            }
            if (BitConverter.IsLittleEndian)
            {
                Array.Reverse(bytes);
            }
            size = BitConverter.ToInt64(bytes, 0);
        }

        /// <summary>
        /// Read data and move seek
        /// </summary>
        /// <param name="data">read data</param>
        /// <param name="seek">seek position to fileBytes</param>
        /// <param name="dataSize">size of data</param>
        private void ReadData(out byte[] data, ref long seek, long dataSize)
        {
            data = _fileBytes.ToList().GetRange((int) seek, (int) dataSize).ToArray();
            seek += dataSize;
        }

        /// <summary>
        /// Move seek at end of data
        /// </summary>
        private void MoveSeekAtEndOfData()
        {
            _seek += DataSize;
        }

        /// <summary>
        /// Parse segment element header
        /// </summary>
        /// <param name="segmentDataStartSeek">Seek position at first segment data byte</param>
        /// <returns></returns>
        private WebMSegmentHeader ParseSegmentHeader(long segmentDataStartSeek)
        {
            var seek = segmentDataStartSeek;
            var segmentHeader = new WebMSegmentHeader();
            while (true)
            {
                int id;
                long size;
                ReadId(out id, ref seek);
                ReadDataSize(out size, ref seek);
                if (id == (int) Element.Cluster)
                {
                    break;
                }
                switch (id)
                {
                    case (int) Element.Info:
                        segmentHeader.Info = ParseInfoElement(seek, size);
                        break;
                    //Add parsing of another elements if needed
                }
                seek += size;
            }
            return segmentHeader;
        }

        /// <summary>
        /// Parse info element, contained in segment header
        /// Return WebM info parsed to WebMInfo object
        /// </summary>
        /// <param name="infoDataStart">First byte of info element</param>
        /// <param name="dataSize">Size of info element</param>
        /// <returns>Return WebM info parsed to WebMInfo object</returns>
        private WebMInfo ParseInfoElement(long infoDataStart, long dataSize)
        {
            var seek = infoDataStart;
            var info = new WebMInfo();
            while (seek < infoDataStart + dataSize)
            {
                int id;
                long size;
                byte[] data;
                ReadId(out id, ref seek);
                ReadDataSize(out size, ref seek);
                if (size == 0)
                {
                    continue;
                }
                ReadData(out data, ref seek, size);
                switch (id)
                {
                    case (int) Element.TimecodeScale:
                        info.TimecodeScale = ConvertBytesToUlong(data);
                        break;
                    case (int) Element.Duration:
                        info.Duration = data.Length == 4 ? ConvertBytesToFloat(data) : ConvertBytesToDouble(data);
                        break;
                    case (int) Element.DateUtc:
                        info.DateUtc = MilleniumTimeStampToUtcDateTime(data);
                        break;
                    case (int) Element.Title:
                        info.Title = ConvertBytesToString(data);
                        break;
                    case (int) Element.MuxingApp:
                        info.MuxingApp = ConvertBytesToString(data);
                        break;
                    case (int) Element.WritingApp:
                        info.WritingApp = ConvertBytesToString(data);
                        break;
                    default:
                        throw new ArgumentOutOfRangeException("Unsupported id found in info element");
                }
            }
            return info;
        }

        /// <summary>
        /// Get webM file header.
        /// Return byte array which represent WebM file header
        /// </summary>
        /// <returns>Return byte array which represent WebM file header</returns>
        public byte[] GetWebMFileHeader()
        {
            long seek = 0;
            _seek = 0;
            //EBML element
            ReadElement();
            if (ElementId != (int) Element.Ebml)
            {
                throw new EbmlFormatException("File does not start with EBML element!");
            }
            MoveSeekAtEndOfData();
            seek = _seek;
            //Segment element (whole file)
            ReadElement();
            if (ElementId != (int) Element.Segment)
            {
                throw new EbmlFormatException("Unexpected id start at: " + seek + "position");
            }
            SegmentHeader = ParseSegmentHeader(seek + 4 + 8);
            //Seek on first byte of data
            while (ElementId != (int) Element.Cluster)
            {
                seek = _seek;
                ReadElement();
                MoveSeekAtEndOfData();
                if (ElementId != (int) Element.Cluster)
                {
                    seek = _seek;
                }
            }
            var header = _fileBytes.ToList().GetRange(0, (int) seek);
            if (SegmentHeader.Info.WritingApp == "Chrome")
            {
                //Because first cluster byte were sent in previous message (chrome message ends with start of cluster or simpleblock [in Google chrome 56 and opera 42])
                header.Add(0x1F);
            }
            return header.ToArray();
        }

        /// <summary>
        /// Convert EBML MilleniumTimeStamp to UtcDateTime
        /// Return converted date time
        /// </summary>
        /// <param name="bytes">Bytes of time stamp</param>
        /// <returns>Return converted date time</returns>
        private static DateTime MilleniumTimeStampToUtcDateTime(byte[] bytes)
        {
            var begin = new DateTime(2001, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            if (BitConverter.IsLittleEndian)
            {
                Array.Reverse(bytes);
            }
            var nanoSeconds = BitConverter.ToInt64(bytes, 0);
            return nanoSeconds >= 0
                ? begin.AddTicks(nanoSeconds / 100)
                : begin.Subtract(new TimeSpan(nanoSeconds / 100));
        }

        /// <summary>
        /// Convert bytes to UTF8 string
        /// </summary>
        /// <param name="bytes">Bytes to convert</param>
        /// <returns></returns>
        private static string ConvertBytesToString(byte[] bytes)
        {
            return Encoding.UTF8.GetString(bytes);
        }

        /// <summary>
        /// Convert EBML bytes to unsigned long
        /// </summary>
        /// <param name="bytes">bytes of unsigned long</param>
        /// <returns></returns>
        private static ulong ConvertBytesToUlong(byte[] bytes)
        {
            var data = new byte[8] {0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0};
            for (var i = 0; bytes.Length - 1 - i >= 0; i++)
            {
                data[7 - i] = bytes[bytes.Length - 1 - i];
            }
            if (BitConverter.IsLittleEndian)
            {
                Array.Reverse(data);
            }
            return BitConverter.ToUInt64(data, 0);
        }

        /// <summary>
        /// Convert EBML bytes to float
        /// </summary>
        /// <param name="bytes">bytes of float</param>
        /// <returns></returns>
        private static float ConvertBytesToFloat(byte[] bytes)
        {
            if (BitConverter.IsLittleEndian)
            {
                Array.Reverse(bytes);
            }
            return BitConverter.ToSingle(bytes, 0);
        }

        /// <summary>
        /// Convert EBML bytes to double
        /// </summary>
        /// <param name="bytes">bytes of double</param>
        /// <returns></returns>
        private static double ConvertBytesToDouble(byte[] bytes)
        {
            if (BitConverter.IsLittleEndian)
            {
                Array.Reverse(bytes);
            }
            return BitConverter.ToDouble(bytes, 0);
        }
    }
}