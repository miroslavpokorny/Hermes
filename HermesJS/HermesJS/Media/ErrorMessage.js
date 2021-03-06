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
/// <reference path="./Media.ts" />
goog.provide("HermesJS.Media.ErrorMessage");
goog.require("HermesJS.Media");
var HermesJS;
(function (HermesJS) {
    var Media;
    (function (Media) {
        /**
         * Namespace which contains error messages
         */
        var ErrorMessage;
        (function (ErrorMessage) {
            /**
             * Error message which says that local stream id is undefined.
             * @type {string}
             */
            ErrorMessage.UNDEFINED_LOCAL_STREAM_ID = "localStreamId is undefined!";
            /**
             * Error message which says that connection is not ready.
             * @type {string}
             */
            ErrorMessage.NOT_READY = "Connection is not in ready state!";
            /**
             * Error message which says that MediaRecorder does not support required codecs or format.
             * @type {string}
             */
            ErrorMessage.MEDIA_RECORDER_UNSUPPORTED_CODEC_OR_FORMAT = "MediaRecorder does not support required codecs or formats!";
            /**
             * Error message which say that audio data type is not allowed
             * @type {string}
             */
            ErrorMessage.AUDIO_DATA_TYPE_NOT_ALLOWED = "Audio data type is not allowed for sending!";
            /**
             * Error message which say that video data type is not allowed
             * @type {string}
             */
            ErrorMessage.VIDEO_DATA_TYPE_NOT_ALLOWED = "Video data type is not allowed for sending!";
            /**
             * Error message which say that binary data type is not allowed
             * @type {string}
             */
            ErrorMessage.BINARY_DATA_TYPE_NOT_ALLOWED = "Binary data type is not allowed for sending!";
        })(ErrorMessage = Media.ErrorMessage || (Media.ErrorMessage = {}));
    })(Media = HermesJS.Media || (HermesJS.Media = {}));
})(HermesJS || (HermesJS = {}));
