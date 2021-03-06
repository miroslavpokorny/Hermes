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
/// <reference path="../../Scripts/typings/media-recorder/media-recorder.d.ts" />
/// <reference path="./Media.ts" />
/// <reference path="../Connection/HermesConnection.ts" />
/// <reference path="./ReceivedInfo.ts" />
/// <reference path="./ReceivedVideoToImageFallbackInfo.ts" />
/// <reference path="./VideoToImageFallback.ts" />
/// <reference path="../DataType.ts" />
/// <reference path="../Event/ReceivedEvent.ts" />
/// <reference path="../Connection/EventName.ts" />
/// <reference path="../Connection/DefaultStreamId.ts" />
/// <reference path="./VideoToImageFallbackOptions.ts" />
/// <reference path="./ErrorMessage.ts" />
/// <reference path="../Connection/ErrorMessage.ts" />
/// <reference path="../Control/ControlObject.ts" />
/// <reference path="../Control/Action.ts" />
/// <reference path="../Control/StopStreamControlObject.ts" />
/// <reference path="../Event/MediaEvent.ts" />
/// <reference path="./EventName.ts" />
/// <reference path="../Control/RequestStreamIdControlObject.ts" />
/// <reference path="../Control/RequestMediaHeaderControlObject.ts" />
/// <reference path="../Control/DisconnectControlObject.ts" />
/// <reference path="../Connection/Status.ts" />
/// <reference path="../Event/NewStreamEvent.ts" />
/// <reference path="./WebMElement.ts" />
/// <reference path="../Control/MediaNotSupportedControlObject.ts" />
/// <reference path="../Event/MediaSharedEvent.ts" />
goog.provide("HermesJS.Media.MediaHandler");
goog.require("HermesJS.Media");
goog.require("HermesJS.Connection.HermesConnection");
goog.require("HermesJS.Media.ReceivedInfo");
goog.require("HermesJS.Media.ReceivedVideoToImageFallbackInfo");
goog.require("HermesJS.Media.VideoToImageFallback");
goog.require("HermesJS.DataType");
goog.require("HermesJS.Event.ReceivedEvent");
goog.require("HermesJS.Connection.EventName");
goog.require("HermesJS.Media.VideoToImageFallbackOptions");
goog.require("HermesJS.Connection.ErrorMessage");
goog.require("HermesJS.Media.ErrorMessage");
goog.require("HermesJS.Control.ControlObject");
goog.require("HermesJS.Control.Action");
goog.require("HermesJS.Control.StopStreamControlObject");
goog.require("HermesJS.Event.MediaEvent");
goog.require("HermesJS.Media.EventName");
goog.require("HermesJS.Control.RequestStreamIdControlObject");
goog.require("HermesJS.Control.RequestMediaHeaderControlObject");
goog.require("HermesJS.Control.DisconnectControlObject");
goog.require("HermesJS.Connection.Status");
goog.require("HermesJS.Event.NewStreamEvent");
goog.require("HermesJS.Media.WebMElement");
goog.require("HermesJS.Control.MediaNotSupportedControlObject");
goog.require("HermesJS.Event.MediaSharedEvent");
goog.require("goog.crypt.base64");
var HermesJS;
(function (HermesJS) {
    var Media;
    (function (Media) {
        /**
         * MediaHandler class has functionality for share user media with other connections and automatic handling of
         * received media from other connections
         */
        var MediaHandler = (function () {
            /**
             * Create new HermesJS.MediaHandler object
             * @param {Connection.HermesConnection} connection HermesJS.Connection.HermesConnection used to communicate
             *     with server
             * @param {number} controlStreamId Control stream ID used by this object. Default value is
             *     Media.HERMESJS_MEDIA_CONTROL_STREAM_ID (6)
             */
            function MediaHandler(connection, controlStreamId) {
                var _this = this;
                if (controlStreamId === void 0) { controlStreamId = Media.HERMESJS_MEDIA_CONTROL_STREAM_ID; }
                /**
                 * Boolean value which indicate if logging is enabled or not, backing field for logging property. Do not access
                 * directly!
                 * @type {boolean}
                 * @private
                 */
                this._logging = false;
                /**
                 * 2 layer array, first array contain event name, second array contain callback functions
                 * @type {Array}
                 * @private
                 */
                this._callbacks = [];
                /**
                 * Boolean variable which indicate if audio is shared
                 * @type {boolean}
                 * @private
                 */
                this._isCaptureAudio = false;
                /**
                 * Boolean variable which indicate if video is shared
                 * @type {boolean}
                 * @private
                 */
                this._isCaptureVideo = false;
                /**
                 * Array which contains ReceivedInfo objects about received media
                 * @type {Array}
                 * @private
                 */
                this._receivedInfo = [];
                /**
                 * Array which store requested headers for media streams
                 * @type {Array}
                 * @private
                 */
                this._requestedMediaHeaders = [];
                /**
                 * Array which store received Image elements (used only if received fallback image data)
                 * @type {Array}
                 * @private
                 */
                this._receivedVideoToImageFallbackInfo = [];
                /**
                 * Object which store settings about video to image fallback
                 * @type {Media.VideoToImageFallback}
                 * @private
                 */
                this._videoToImageFallback = null;
                connection.checkIdRange(controlStreamId);
                this._connection = connection;
                this._controlStreamId = controlStreamId;
                this._videoToImageFallback = new Media.VideoToImageFallback();
                this._connection.addReceivedEventListener(HermesJS.DataType.CONTROL, function (event) { return _this.controlStreamHandler(event); }, controlStreamId);
                this._connection.addReceivedEventListener(HermesJS.DataType.VIDEO, function (event) { return _this.receivedVideoData(event); });
                this._connection.addReceivedEventListener(HermesJS.DataType.AUDIO, function (event) { return _this.receivedAudioData(event); });
                this._connection.addReceivedEventListener(HermesJS.DataType.BINARY, function (event) { return _this.receivedBinaryData(event); });
                this._connection.addEventListener(HermesJS.Connection.EventName.DISCONNECT, function () { return _this.onDisconnect(); });
                this._connection.addReceivedEventListener(HermesJS.DataType.CONTROL, function (event) { return _this.defaultControlStreamHandler(event); }, HermesJS.Connection.DefaultStreamId.CONTROL);
                if (this._connection.isConnected) {
                    this.connectionConnectCallback();
                }
                this._connection.addEventListener(HermesJS.Connection.EventName.CONNECT, function () { return _this.connectionConnectCallback(); });
            }
            Object.defineProperty(MediaHandler.prototype, "connection", {
                /**
                 * Get HermesJS.Connection used to communicate with server
                 * @return {Connection.HermesConnection}
                 */
                get: function () {
                    return this._connection;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MediaHandler.prototype, "localStream", {
                /**
                 * Get local media stream get from MediaDevices.getUserMedia() browser function
                 * @return {MediaStream}
                 */
                get: function () {
                    return this._localStream;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MediaHandler.prototype, "controlStreamId", {
                /**
                 * Get control stream ID used by this object to send control messages to server
                 * @return {number}
                 */
                get: function () {
                    return this._controlStreamId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MediaHandler.prototype, "localStreamId", {
                /**
                 * Get local stream ID which is used to share user media
                 * @return {number}
                 */
                get: function () {
                    return this._localStreamId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MediaHandler.prototype, "logging", {
                /**
                 * Get boolean value which indicate if logging is enabled or not
                 * @return {boolean}
                 */
                get: function () {
                    return this._logging;
                },
                /**
                 * Set boolean value which indicate if logging is enabled or not
                 * @param {boolean} value
                 */
                set: function (value) {
                    this._logging = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MediaHandler.prototype, "isVideoToImageFallbackEnabled", {
                /**
                 * Get boolean value which indicate if video to image fallback is enabled
                 * @return {boolean}
                 */
                get: function () {
                    return this._videoToImageFallback.enabled;
                },
                /**
                 * Set boolean value which indicate if video to image fallback is enabled
                 * @param {boolean} value
                 */
                set: function (value) {
                    this._videoToImageFallback.enabled = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MediaHandler.prototype, "videoToImageFallbackOptions", {
                /**
                 * Get VideoToImageFallbackOptions object of video to image fallback
                 * @return {HermesJS.VideoToImageFallbackOptions}
                 */
                get: function () {
                    return this._videoToImageFallback.options;
                },
                /**
                 * Set VideoToImageFallbackOptions object of video to image fallback
                 * @param value
                 */
                set: function (value) {
                    this._videoToImageFallback.options = value;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * Get media element associated with stream ID
             * @param {number} streamId ID of stream
             * @return {HTMLAudioElement|HTMLVideoElement|HTMLImageElement|null} return media element or null if no media
             *     element with streamId exist.
             */
            MediaHandler.prototype.getMediaElement = function (streamId) {
                if (streamId in this._receivedInfo) {
                    return typeof this._receivedInfo[streamId].element !== "undefined" ? this._receivedInfo[streamId].element : null;
                }
                return streamId in this._receivedVideoToImageFallbackInfo && typeof this._receivedVideoToImageFallbackInfo[streamId] !== "undefined" ? this._receivedVideoToImageFallbackInfo[streamId].element : null;
            };
            /**
             * Get source buffer associated with stream ID
             * @param {number} streamId ID of stream
             * @return {SourceBuffer} return source buffer or null if no source buffer with streamId exist
             */
            MediaHandler.prototype.getSourceBuffer = function (streamId) {
                return streamId in this._receivedInfo && typeof this._receivedInfo[streamId].sourceBuffer !== "undefined" ? this._receivedInfo[streamId].sourceBuffer : null;
            };
            /**
             * Get media source associated with stream ID
             * @param {number} streamId ID of stream
             * @return {MediaSource} return media source or null if no media source with streamId exist
             */
            MediaHandler.prototype.getMediaSource = function (streamId) {
                return streamId in this._receivedInfo && typeof this._receivedInfo[streamId].mediaSource !== "undefined" ? this._receivedInfo[streamId].mediaSource : null;
            };
            /**
             * Get origin of received data associated with stream ID
             * @param {number} streamId ID of stream
             * @return {string} return origin of received data or null if origin is not set
             */
            MediaHandler.prototype.getOriginOfStream = function (streamId) {
                return streamId in this._receivedInfo && typeof this._receivedInfo[streamId].origin !== "undefined" ? this._receivedInfo[streamId].origin : null;
            };
            /**
             * Share user media through server to other connections. On success event "mediashared" will be fired
             * @param {MediaStreamConstraints} constraints Media stream constraints
             */
            MediaHandler.prototype.shareUserMedia = function (constraints) {
                var _this = this;
                if (!this._connection.isConnected) {
                    this.logging && this.log("Connection must be connected before share user media!");
                    throw new Error(HermesJS.Connection.ErrorMessage.NOT_CONNECTED);
                }
                if (!this._connection.isReady) {
                    this.logging && this.log("Connection must be ready before share user media!");
                    throw new Error(Media.ErrorMessage.NOT_READY);
                }
                if (typeof this._localStreamId === "undefined" || this._localStreamId === null) {
                    this.logging && this.log("Can not share user media, localStreamId is undefined!");
                    throw new Error(Media.ErrorMessage.UNDEFINED_LOCAL_STREAM_ID);
                }
                if (!!constraints.audio && !this._connection.isAudioDataTypeAllowed) {
                    this.logging && this.log("Audio data type must be allowed to share user media!");
                    throw new Error(Media.ErrorMessage.AUDIO_DATA_TYPE_NOT_ALLOWED);
                }
                if (!!constraints.video && !this._connection.isVideoDataTypeAllowed) {
                    this.logging && this.log("Video data type must be allowed to share user media!");
                    throw new Error(Media.ErrorMessage.VIDEO_DATA_TYPE_NOT_ALLOWED);
                }
                this._isCaptureAudio = !!constraints.audio;
                this._isCaptureVideo = !!constraints.video;
                navigator.mediaDevices.getUserMedia(constraints).then(function (stream) { return _this.getUserMediaOnSuccess(stream); }, function (error) { return _this.getUserMediaOnError(error); });
            };
            /**
             * Unshare user media, shared by shareUserMedia method
             */
            MediaHandler.prototype.unshareUserMedia = function () {
                if (!(this._isCaptureVideo || this._isCaptureAudio)) {
                    return;
                }
                this._isCaptureAudio = false;
                this._isCaptureVideo = false;
                if (typeof this._videoToImageFallback.intervalId !== "undefined" && this._videoToImageFallback.intervalId !== null) {
                    clearInterval(this._videoToImageFallback.intervalId);
                    this._videoToImageFallback.intervalId = null;
                    this._videoToImageFallback.pngLimited = false;
                    this._videoToImageFallback.canvas = null;
                    window.URL.revokeObjectURL(this._videoToImageFallback.video.src);
                    this._videoToImageFallback.video = null;
                    this._videoToImageFallback.element = null;
                }
                if (typeof this._mediaRecorder !== "undefined" && this._mediaRecorder !== null) {
                    this._mediaRecorder.stop();
                }
                if (typeof this._localStream !== "undefined" && this._localStream !== null) {
                    this._localStream.getTracks().forEach(function (value, index, array) {
                        value.stop();
                    });
                    if (this.connection.isConnected) {
                        var controlObject = new HermesJS.Control.StopStreamControlObject();
                        controlObject.StreamId = this._localStreamId;
                        this.connection.sendControl(controlObject, this.controlStreamId);
                    }
                }
                delete this._mediaRecorder;
                delete this._localStream;
                delete this._localRecordMimeType;
                delete this._localStreamId;
                delete this._unsentSmallData;
                if (this.connection.isConnected) {
                    this.connectionConnectCallback();
                }
            };
            /**
             * Method which is called on disconnect, unshare user media and clear received objects (release resources)
             */
            MediaHandler.prototype.onDisconnect = function () {
                var _this = this;
                this.unshareUserMedia();
                var indices = [];
                this._receivedInfo.forEach(function (value, index, array) {
                    indices.push(index);
                });
                indices.forEach(function (value) {
                    _this.removeReceivedStream(value);
                });
                this._receivedInfo.length = 0;
                this._requestedMediaHeaders.length = 0;
            };
            /**
             * Clear all info about received stream identified by stream ID
             * @param {number} streamId ID of stream to remove
             */
            MediaHandler.prototype.removeReceivedStream = function (streamId) {
                var origin;
                if (streamId in this._receivedInfo) {
                    if (this._receivedInfo[streamId] === null) {
                        return;
                    }
                    origin = this._receivedInfo[streamId].origin;
                    this._receivedInfo[streamId].mediaSource.endOfStream();
                    this._receivedInfo[streamId] = null;
                    if (streamId in this._requestedMediaHeaders) {
                        this._requestedMediaHeaders[streamId] = null;
                    }
                }
                else if (streamId in this._receivedVideoToImageFallbackInfo) {
                    if (this._receivedVideoToImageFallbackInfo[streamId] === null) {
                        return;
                    }
                    origin = this._receivedVideoToImageFallbackInfo[streamId].origin;
                    this._receivedVideoToImageFallbackInfo[streamId] = null;
                }
                else {
                    return;
                }
                this.dispatchEvent(new HermesJS.Event.MediaEvent(Media.EventName.END_STREAM, streamId, origin));
            };
            /**
             * Method used as callback function for connection event on connect
             */
            MediaHandler.prototype.connectionConnectCallback = function () {
                if (this._connection.isRequestStreamIdAllowed) {
                    this._connection.requestStreamId(this._controlStreamId);
                }
            };
            /**
             * Method called when localMediaStream is successfully obtained
             * @param {MediaStream} stream Media stream get from MediaDevices.getUserMedia() browser function
             */
            MediaHandler.prototype.getUserMediaOnSuccess = function (stream) {
                var _this = this;
                this._localStream = stream;
                try {
                    this._mediaRecorder = this.createMediaRecorder(stream);
                    this.logging && this.log("MediaRecorder created with mimeType = '" + this._localRecordMimeType + "'");
                    this._mediaRecorder.addEventListener("dataavailable", function (event) { return _this.dataAvailableHandler(event); });
                    this._mediaRecorder.start(this._connection.frequency);
                    this.dispatchEvent(new HermesJS.Event.MediaSharedEvent(stream, this._connection.localConnectionId));
                }
                catch (error) {
                    if (!(this.isVideoToImageFallbackEnabled && !this._isCaptureAudio && this._isCaptureVideo)) {
                        throw error;
                    }
                    if (!this._connection.isBinaryDataTypeAllowed) {
                        this.logging && this.log("Binary data type must be allowed to share user media (through fallback)!");
                        throw new Error(Media.ErrorMessage.BINARY_DATA_TYPE_NOT_ALLOWED);
                    }
                    this.fallbackCaptureVideo();
                    this.dispatchEvent(new HermesJS.Event.MediaSharedEvent(stream, this._connection.localConnectionId));
                }
            };
            /**
             * Method called when media recorder is not available in browser and video to image fallback is enabled. Method
             * start sharing media using canvas and images.
             */
            MediaHandler.prototype.fallbackCaptureVideo = function () {
                var _this = this;
                this._videoToImageFallback.pngLimited = false;
                this._videoToImageFallback.video = document.createElement("video");
                this._videoToImageFallback.video.autoplay = true;
                this._videoToImageFallback.video.src = window.URL.createObjectURL(this._localStream);
                this._videoToImageFallback.canvas = document.createElement("canvas");
                var frequency = Math.max(this.videoToImageFallbackOptions.frequency, this._connection.frequency);
                this._videoToImageFallback.intervalId = setInterval(function () { return _this.captureVideoToImage(); }, frequency);
            };
            /**
             * Method called on interval, on every interval. Draw video to canvas and draw from canvas to image data
             */
            MediaHandler.prototype.captureVideoToImage = function () {
                var _this = this;
                if (typeof this._localRecordMimeType !== "undefined" && this._localRecordMimeType === HermesJS.MimeType.IMAGE_PNG &&
                    this._videoToImageFallback.options.enabledPngLimit && !this._videoToImageFallback.pngLimited) {
                    this._videoToImageFallback.pngLimited = true;
                    if (this._videoToImageFallback.options.frequency >= this._videoToImageFallback.options.pngLimitFrequency) {
                        return;
                    }
                    var frequency = Math.max(this._videoToImageFallback.options.pngLimitFrequency, this._connection.frequency);
                    clearInterval(this._videoToImageFallback.intervalId);
                    this._videoToImageFallback.intervalId = setInterval(function () { return _this.captureVideoToImage(); }, frequency);
                }
                var width = Math.min(this._videoToImageFallback.options.width, this._videoToImageFallback.video.videoWidth);
                var aspect = this._videoToImageFallback.video.videoWidth / this._videoToImageFallback.video.videoHeight;
                this._videoToImageFallback.canvas.width = width;
                this._videoToImageFallback.canvas.height = width / aspect;
                this._videoToImageFallback.canvas.getContext("2d").drawImage(this._videoToImageFallback.video, 0, 0, this._videoToImageFallback.video.videoWidth, this._videoToImageFallback.video.videoHeight, 0, 0, this._videoToImageFallback.canvas.width, this._videoToImageFallback.canvas.height);
                if (typeof this._videoToImageFallback.canvas.toBlob === "undefined") {
                    //Polyfill for browsers which does not support toBlob method
                    var dataURL = this._videoToImageFallback.canvas.toDataURL(this._videoToImageFallback.options.mimeType, this._videoToImageFallback.options.quality).split(',');
                    this._localRecordMimeType = dataURL[0].substring(5, dataURL[0].indexOf(";"));
                    var data = goog.crypt.base64.decodeStringToUint8Array(dataURL[1]);
                    this._connection.sendBinary(data, this._localStreamId, this._localRecordMimeType);
                    return;
                }
                this._videoToImageFallback.canvas.toBlob(function (result) {
                    _this._localRecordMimeType = result.type;
                    _this.dataAvailableHandler(new BlobEvent("captureVideoToImage", { data: result }));
                }, this._videoToImageFallback.options.mimeType, this._videoToImageFallback.options.quality);
            };
            /**
             * Try to create and return MediaRecorder for localMediaStream, try to use better available format and codecs
             * @param {MediaStream} stream Local media stream
             * @return {MediaRecorder} return created media recorder
             */
            MediaHandler.prototype.createMediaRecorder = function (stream) {
                if (this._isCaptureAudio && this._isCaptureVideo) {
                    //Audio and video
                    if (MediaRecorder.isTypeSupported(HermesJS.MimeType.VIDEO_WEBM_VP9_OPUS)) {
                        this._localRecordMimeType = HermesJS.MimeType.VIDEO_WEBM_VP9_OPUS;
                        return new MediaRecorder(stream, { mimeType: HermesJS.MimeType.VIDEO_WEBM_VP9_OPUS });
                    }
                    else if (MediaRecorder.isTypeSupported(HermesJS.MimeType.VIDEO_WEBM_VP8_OPUS)) {
                        this._localRecordMimeType = HermesJS.MimeType.VIDEO_WEBM_VP8_OPUS;
                        return new MediaRecorder(stream, { mimeType: HermesJS.MimeType.VIDEO_WEBM_VP8_OPUS });
                    }
                    else {
                        throw new Error(Media.ErrorMessage.MEDIA_RECORDER_UNSUPPORTED_CODEC_OR_FORMAT);
                    }
                }
                else if (!this._isCaptureAudio && this._isCaptureVideo) {
                    //Video only
                    if (MediaRecorder.isTypeSupported(HermesJS.MimeType.VIDEO_WEBM_VP9)) {
                        this._localRecordMimeType = HermesJS.MimeType.VIDEO_WEBM_VP9;
                        return new MediaRecorder(stream, { mimeType: HermesJS.MimeType.VIDEO_WEBM_VP9 });
                    }
                    else if (MediaRecorder.isTypeSupported(HermesJS.MimeType.VIDEO_WEBM_VP8)) {
                        this._localRecordMimeType = HermesJS.MimeType.VIDEO_WEBM_VP8;
                        return new MediaRecorder(stream, { mimeType: HermesJS.MimeType.VIDEO_WEBM_VP8 });
                    }
                    else {
                        throw new Error(Media.ErrorMessage.MEDIA_RECORDER_UNSUPPORTED_CODEC_OR_FORMAT);
                    }
                }
                else {
                    //Audio only
                    if (MediaRecorder.isTypeSupported(HermesJS.MimeType.AUDIO_WEBM_OPUS)) {
                        this._localRecordMimeType = HermesJS.MimeType.AUDIO_WEBM_OPUS;
                        return new MediaRecorder(stream, { mimeType: HermesJS.MimeType.AUDIO_WEBM_OPUS });
                    }
                    else if (MediaRecorder.isTypeSupported(HermesJS.MimeType.AUDIO_OGG)) {
                        this._localRecordMimeType = HermesJS.MimeType.AUDIO_OGG;
                        return new MediaRecorder(stream, { mimeType: HermesJS.MimeType.AUDIO_OGG });
                    }
                    else {
                        throw new Error(Media.ErrorMessage.MEDIA_RECORDER_UNSUPPORTED_CODEC_OR_FORMAT);
                    }
                }
            };
            /**
             * Method called when MediaRecorder has available data (used as MediaRecorder.ondataavailable callback function)
             * @param {BlobEvent} event Data encapsulated in BlobEvent
             */
            MediaHandler.prototype.dataAvailableHandler = function (event) {
                var _this = this;
                if (!(this._connection.isConnected)) {
                    return;
                }
                var blob = event.data;
                if (typeof this._unsentSmallData !== "undefined" && this._unsentSmallData !== null) {
                    this._unsentSmallData = new Blob([this._unsentSmallData, event.data]);
                    if (this._unsentSmallData.size < 4) {
                        return;
                    }
                    blob = this._unsentSmallData;
                    this._unsentSmallData = null;
                }
                else if (event.data.size < 4) {
                    this._unsentSmallData = event.data;
                    return;
                }
                var reader = new FileReader();
                reader.onload = function (event) { return _this.dataArrayBufferAvailableHandler(event); };
                reader.readAsArrayBuffer(blob);
            };
            /**
             * Method called when data from blob are extracted to ArrayBuffer (used as FileReader.onload callback
             * function). Send binary data to server.
             * @param {Event} event Event object generated by FileReader onload event
             */
            MediaHandler.prototype.dataArrayBufferAvailableHandler = function (event) {
                if (this._isCaptureVideo) {
                    //Video + audio or video only
                    if (typeof this._mediaRecorder === "undefined" || this._mediaRecorder === null) {
                        this._connection.sendBinary(new Uint8Array(event.target.result), this._localStreamId, this._localRecordMimeType);
                        return;
                    }
                    this._connection.sendVideo(new Uint8Array(event.target.result), this._localStreamId, this._localRecordMimeType);
                }
                else {
                    //audio only
                    this._connection.sendAudio(new Uint8Array(event.target.result), this._localStreamId, this._localRecordMimeType);
                }
            };
            /**
             * Method which is used as control stream handler. Called every time where control object is received
             * @param {Event.ReceivedEvent} event Received event object
             */
            MediaHandler.prototype.controlStreamHandler = function (event) {
                var controlObject = event.data;
                switch (controlObject.Action) {
                    case HermesJS.Control.Action.REQUEST_STREAM_ID:
                        var requestStreamIdControlObject = controlObject;
                        this._localStreamId = requestStreamIdControlObject.StreamId;
                        this.logging && this.log("Received unique stream id = " + this._localStreamId);
                        break;
                    case HermesJS.Control.Action.REQUEST_MEDIA_HEADER:
                        var requestMediaHeader = controlObject;
                        this._requestedMediaHeaders[requestMediaHeader.StreamId] = goog.crypt.base64.decodeStringToUint8Array(requestMediaHeader.MediaHeader);
                        this.logging && this.log("Received media header for stream " + requestMediaHeader.StreamId + ". Media header size: " + this._requestedMediaHeaders[requestMediaHeader.StreamId].byteLength);
                        break;
                    case HermesJS.Control.Action.STOP_STREAM:
                        var stopStreamControlObject = controlObject;
                        this.removeReceivedStream(stopStreamControlObject.StreamId);
                        break;
                }
            };
            /**
             * Method which monitoring default control stream and check connection status after some connection is
             * disconnected
             * @param {Event.ReceivedEvent} event Received event object
             */
            MediaHandler.prototype.defaultControlStreamHandler = function (event) {
                var _this = this;
                var controlObject = event.data;
                if (controlObject.Action !== HermesJS.Control.Action.DISCONNECT) {
                    return;
                }
                switch (controlObject.Status) {
                    case HermesJS.Connection.Status.WAITING:
                        this.unshareUserMedia();
                        controlObject.DisconnectedStreamIds.forEach(function (value) {
                            _this.removeReceivedStream(value);
                        });
                        break;
                    case HermesJS.Connection.Status.READY:
                        controlObject.DisconnectedStreamIds.forEach(function (value) {
                            _this.removeReceivedStream(value);
                        });
                        break;
                }
            };
            /**
             * Method called when received binary data, it check ID (if is grater or equal than
             * Media.UNIQUE_ID_RANGE_START) and if range is OK then handle or update data to image element
             * @param {Event.ReceivedEvent} event Received event object
             */
            MediaHandler.prototype.receivedBinaryData = function (event) {
                if (event.id === this._localStreamId || event.id < Media.UNIQUE_ID_RANGE_START) {
                    return;
                }
                if (event.id in this._receivedVideoToImageFallbackInfo) {
                    window.URL.revokeObjectURL(this._receivedVideoToImageFallbackInfo[event.id].element.src);
                    this._receivedVideoToImageFallbackInfo[event.id].element.src = window.URL.createObjectURL(new Blob([event.data]));
                    return;
                }
                this._receivedVideoToImageFallbackInfo[event.id] = new Media.ReceivedVideoToImageFallbackInfo(event.id);
                var element = document.createElement("img");
                element.alt = "received image id=" + event.id;
                element.src = window.URL.createObjectURL(new Blob([event.data]));
                this._receivedVideoToImageFallbackInfo[event.id].element = element;
                this._receivedVideoToImageFallbackInfo[event.id].origin = event.origin;
                this.dispatchEvent(new HermesJS.Event.NewStreamEvent(event.id, element, event.mimeType, event.origin));
            };
            /**
             * Method called when received video data
             * @param {Event.ReceivedEvent} event
             */
            MediaHandler.prototype.receivedVideoData = function (event) {
                this.receivedMediaData(event, "video");
            };
            /**
             * Method called when received audio data
             * @param {Event.ReceivedEvent} event
             */
            MediaHandler.prototype.receivedAudioData = function (event) {
                this.receivedMediaData(event, "audio");
            };
            /**
             * Method which handle receive of audio and video data, based on elementName. If stream already exist then
             * append data. If stream does not exist then try to create new ReceivedInfo object
             * @param {Event.ReceivedEvent} event Received event object
             * @param {string} elementName Name of media element (should be audio or video)
             */
            MediaHandler.prototype.receivedMediaData = function (event, elementName) {
                if (event.id === this._localStreamId || event.id < Media.UNIQUE_ID_RANGE_START) {
                    return;
                }
                if (event.id in this._receivedInfo && this._receivedInfo[event.id] !== null) {
                    if (typeof this._receivedInfo[event.id].sourceBuffer === "undefined" || this._receivedInfo[event.id].sourceBuffer === null) {
                        return;
                    }
                    if (!this._receivedInfo[event.id].sourceBuffer.updating && this._receivedInfo[event.id].queue.length === 0) {
                        if (!this._receivedInfo[event.id].isAppendedFirstCluster) {
                            var dataStart = new DataView(event.data.buffer, event.data.byteOffset, 4).getInt32(0, false);
                            if (dataStart === Media.WebMElement.CLUSTER || dataStart === Media.WebMElement.CHROME_CLUSTER) {
                                this._receivedInfo[event.id].isAppendedFirstCluster = true;
                                this._receivedInfo[event.id].sourceBuffer.appendBuffer(new Uint8Array(event.data));
                            }
                            return;
                        }
                        this._receivedInfo[event.id].sourceBuffer.appendBuffer(new Uint8Array(event.data));
                    }
                    else {
                        if (!this._receivedInfo[event.id].isAppendedFirstCluster) {
                            return;
                        }
                        this._receivedInfo[event.id].queue.push(event.data);
                        if (!this._receivedInfo[event.id].sourceBuffer.updating && this._receivedInfo[event.id].queue.length > 0) {
                            this._receivedInfo[event.id].sourceBuffer.appendBuffer(this._receivedInfo[event.id].queue.shift());
                        }
                    }
                    return;
                }
                this.receivedUnhandledMedia(event, elementName);
            };
            /**
             * Method called when received unhandled media stream. If media source support received mime type then check if
             * data contain header if not then request header from server. If data has header or header already received
             * from server then create new ReceivedInfo objects and dispatch new stream event.
             * @param {Event.ReceivedEvent} event Received event object
             * @param {string} elementName
             */
            MediaHandler.prototype.receivedUnhandledMedia = function (event, elementName) {
                if (!this.checkMediaSourceMimeTypeSupport(event.mimeType)) {
                    return;
                }
                var isWebM = (event.mimeType.toLowerCase().indexOf("webm") !== -1);
                var isWebMHeaderMissing = (Media.WebMElement.EBML !== new DataView(event.data.buffer, event.data.byteOffset, 4).getInt32(0, false));
                if (isWebM && isWebMHeaderMissing) {
                    //NOT begin of WebM data
                    if (typeof this._requestedMediaHeaders[event.id] === "undefined" || this._requestedMediaHeaders[event.id] === null) {
                        var controlObject = new HermesJS.Control.RequestMediaHeaderControlObject();
                        controlObject.StreamId = event.id;
                        this._connection.sendControl(controlObject, this._controlStreamId);
                        this.logging && this.log("Received unhandled media. Data does not contain header, request for header was send!");
                        return;
                    }
                }
                this.logging && this.log("Received unhandled media, with mimeType = '" + event.mimeType + "', streamId = " + event.id);
                this.initReceivedObjects(event, elementName);
                this.dispatchEvent(new HermesJS.Event.NewStreamEvent(event.id, this._receivedInfo[event.id].element, elementName, event.origin));
            };
            /**
             * Check if MediaSource supports mimeType if not then inform server about unsupported mime type
             * @param {string} mimeType Mime type to test
             * @return {boolean} Return true if mime type is supported, otherwise return false
             */
            MediaHandler.prototype.checkMediaSourceMimeTypeSupport = function (mimeType) {
                if (!MediaSource.isTypeSupported(mimeType)) {
                    this.logging && this.log("Received media, with mimeType = '" + mimeType + "' is not supported by browsers MediaSource");
                    var controlObject = new HermesJS.Control.MediaNotSupportedControlObject();
                    controlObject.MimeType = mimeType;
                    this._connection.sendControl(controlObject, this._controlStreamId);
                    return false;
                }
                return true;
            };
            /**
             * Create object required for receive audio or video data (mediaElement, MediaSource, Data Queue, SourceBuffer)
             * @param {Event.ReceivedEvent} event Received event object
             * @param {string} elementName Name of media element (should be audio or video)
             */
            MediaHandler.prototype.initReceivedObjects = function (event, elementName) {
                var _this = this;
                var mediaElement = document.createElement(elementName);
                var mediaSource = new MediaSource();
                var receivedInfo = new Media.ReceivedInfo(event.id);
                receivedInfo.origin = event.origin;
                this._receivedInfo[event.id] = receivedInfo;
                receivedInfo.element = mediaElement;
                receivedInfo.mediaSource = mediaSource;
                receivedInfo.queue = [];
                mediaSource.addEventListener("sourceopen", function () {
                    var sourceBuffer = mediaSource.addSourceBuffer(event.mimeType);
                    sourceBuffer.mode = "sequence";
                    sourceBuffer.addEventListener("update", function () {
                        if (receivedInfo.queue.length > 0 && !sourceBuffer.updating) {
                            sourceBuffer.appendBuffer(receivedInfo.queue.shift());
                        }
                    });
                    receivedInfo.sourceBuffer = sourceBuffer;
                    var isWebM = (event.mimeType.toLowerCase().indexOf("webm") !== -1);
                    var isWebMHeaderMissing = (Media.WebMElement.EBML !== new DataView(event.data.buffer, event.data.byteOffset, 4).getInt32(0, false));
                    if (isWebM && isWebMHeaderMissing) {
                        receivedInfo.isAppendedFirstCluster = false;
                        sourceBuffer.appendBuffer(new Uint8Array(_this._requestedMediaHeaders[event.id]));
                        return;
                    }
                    receivedInfo.isAppendedFirstCluster = true;
                    sourceBuffer.appendBuffer(new Uint8Array(event.data));
                });
                mediaElement.src = window.URL.createObjectURL(mediaSource);
            };
            /**
             * Method which is used as error handling for MediaDevices.getUserMedia() browser function
             * @param error
             */
            MediaHandler.prototype.getUserMediaOnError = function (error) {
                throw new Error(error);
            };
            /**
             * Add listener function which will be called when specified event is triggered
             * @param {string} type name of event. Supported events {newstream, endstream, ...} supported events are
             *     defined in Media.VALID_EVENT_NAMES static property
             * @param {()=>void} callback Callback function which will be called when event is triggered
             */
            MediaHandler.prototype.addEventListener = function (type, callback) {
                type = type.toLowerCase();
                if (Media.VALID_EVENT_NAMES.indexOf(type) === -1) {
                    this.logging && this.log("Type '" + type + "' is not supported event of HermesJS.Media");
                    return;
                }
                if (!(type in this._callbacks)) {
                    this._callbacks[type] = [];
                }
                this._callbacks[type].push(callback);
            };
            /**
             * Call all callbacks associated with specified event name
             * @param {Event.HermesEvent} event Event object which will be available in callback function
             */
            MediaHandler.prototype.dispatchEvent = function (event) {
                var type = event.type.toLowerCase();
                if (!(type in this._callbacks)) {
                    return;
                }
                for (var i = 0; i < this._callbacks[type].length; i++) {
                    this._callbacks[type][i](event);
                }
            };
            /**
             * Remove event listener added by addEventListener method
             * @param {string} type Name of event (valid event names are specified in Media.EventName namespace)
             * @param {()=>void} callback Callback function
             */
            MediaHandler.prototype.removeEventListener = function (type, callback) {
                type = type.toLowerCase();
                if (!(type in this._callbacks)) {
                    return;
                }
                for (var i = this._callbacks[type].length - 1; i >= 0; i--) {
                    if (this._callbacks[type][i] === callback) {
                        this._callbacks[type].splice(i, 1);
                    }
                }
            };
            /**
             * Write message to browser's console, also add header (date + library information) before message
             * @param {string} message Message which will be written to console
             * @param {boolean} forceLog If set to true then write message to console if logging is disabled (logging
             *     property is set to true), if set to false write message only if logging is enabled, default = false
             */
            MediaHandler.prototype.log = function (message, forceLog) {
                if (forceLog === void 0) { forceLog = false; }
                if (this.logging || forceLog) {
                    console.log("[" + new Date().toTimeString() + "] HermesJS: " + message);
                }
            };
            return MediaHandler;
        }());
        Media.MediaHandler = MediaHandler;
    })(Media = HermesJS.Media || (HermesJS.Media = {}));
})(HermesJS || (HermesJS = {}));
