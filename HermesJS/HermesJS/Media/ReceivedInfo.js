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
/// <reference path="./Media.ts"/>
goog.provide("HermesJS.Media.ReceivedInfo");
goog.require("HermesJS.Media");
var HermesJS;
(function (HermesJS) {
    var Media;
    (function (Media) {
        /**
         * Class used to encapsulate information (objects) for received stream
         */
        var ReceivedInfo = (function () {
            /**
             * Create new ReceivedInfo object
             * @param {number} streamId ID of stream
             */
            function ReceivedInfo(streamId) {
                this._streamId = streamId;
            }
            Object.defineProperty(ReceivedInfo.prototype, "streamId", {
                /**
                 * Get stream ID
                 * @return {number}
                 */
                get: function () {
                    return this._streamId;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ReceivedInfo.prototype, "element", {
                /**
                 * Get HTML element
                 * @return {HTMLVideoElement|HTMLAudioElement|HTMLMediaElement}
                 */
                get: function () {
                    return this._element;
                },
                /**
                 * Set HTML element
                 * @param {HTMLVideoElement|HTMLAudioElement|HTMLMediaElement} value HTML element
                 */
                set: function (value) {
                    this._element = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ReceivedInfo.prototype, "sourceBuffer", {
                /**
                 * Get source buffer
                 * @return {SourceBuffer}
                 */
                get: function () {
                    return this._sourceBuffer;
                },
                /**
                 * Set source buffer
                 * @param {SourceBuffer} value Source buffer
                 */
                set: function (value) {
                    this._sourceBuffer = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ReceivedInfo.prototype, "mediaSource", {
                /**
                 * Get media source
                 * @return {MediaSource}
                 */
                get: function () {
                    return this._mediaSource;
                },
                /**
                 * Set media source
                 * @param {MediaSource} value
                 */
                set: function (value) {
                    this._mediaSource = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ReceivedInfo.prototype, "queue", {
                /**
                 * Get data queue
                 * @return {Array<Uint8Array>}
                 */
                get: function () {
                    return this._queue;
                },
                /**
                 * Set data queue
                 * @param {array} value Array of Uint8Array
                 */
                set: function (value) {
                    this._queue = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ReceivedInfo.prototype, "isAppendedFirstCluster", {
                /**
                 * Get boolean value which indicate if first cluster were appended. (it is useful for chrome browser which
                 * send data as simple block, and only some times send cluster, first appended data to source buffer may be
                 * cluster)
                 * @return {boolean}
                 */
                get: function () {
                    return this._isAppendedFirstCluster;
                },
                /**
                 * Set boolean value which indicate if first cluster were appended.
                 * @param {boolean} value Boolean value
                 */
                set: function (value) {
                    this._isAppendedFirstCluster = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ReceivedInfo.prototype, "origin", {
                /**
                 * Get origin of received data
                 * @return {string}
                 */
                get: function () {
                    return this._origin;
                },
                /**
                 * Set origin of received data
                 * @param {string} value Origin of connection
                 */
                set: function (value) {
                    this._origin = value;
                },
                enumerable: true,
                configurable: true
            });
            return ReceivedInfo;
        }());
        Media.ReceivedInfo = ReceivedInfo;
    })(Media = HermesJS.Media || (HermesJS.Media = {}));
})(HermesJS || (HermesJS = {}));
