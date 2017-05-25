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
goog.provide("HermesJS.Media.ReceivedVideoToImageFallbackInfo");
goog.require("HermesJS.Media");
var HermesJS;
(function (HermesJS) {
    var Media;
    (function (Media) {
        /**
         * Class used to encapsulate information (objects) for received fallback stream
         */
        var ReceivedVideoToImageFallbackInfo = (function () {
            /**
             * Create new ReceivedVideoTiImageFallbackInfo object
             * @param {number} streamId ID of stream
             */
            function ReceivedVideoToImageFallbackInfo(streamId) {
                this._streamId = streamId;
            }
            Object.defineProperty(ReceivedVideoToImageFallbackInfo.prototype, "streamId", {
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
            Object.defineProperty(ReceivedVideoToImageFallbackInfo.prototype, "element", {
                /**
                 * Get HTML element
                 * @return {HTMLImageElement}
                 */
                get: function () {
                    return this._element;
                },
                /**
                 * Set HTML element
                 * @param {HTMLImageElement} value HTML image element
                 */
                set: function (value) {
                    this._element = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ReceivedVideoToImageFallbackInfo.prototype, "origin", {
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
            return ReceivedVideoToImageFallbackInfo;
        }());
        Media.ReceivedVideoToImageFallbackInfo = ReceivedVideoToImageFallbackInfo;
    })(Media = HermesJS.Media || (HermesJS.Media = {}));
})(HermesJS || (HermesJS = {}));
