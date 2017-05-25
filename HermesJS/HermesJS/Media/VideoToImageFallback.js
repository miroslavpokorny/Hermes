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
/// <reference path="./VideoToImageFallbackOptions.ts" />
goog.provide("HermesJS.Media.VideoToImageFallback");
goog.require("HermesJS.Media");
goog.require("HermesJS.Media.VideoToImageFallbackOptions");
var HermesJS;
(function (HermesJS) {
    var Media;
    (function (Media) {
        /**
         * Class used to encapsulate information (objects) for received stream (if video to image fallback is used)
         */
        var VideoToImageFallback = (function () {
            function VideoToImageFallback() {
                /**
                 * Boolean value which indicate if video to image fallback is enabled, backing field for enabled property.
                 * Do not access directly!
                 * @type {boolean}
                 * @private
                 */
                this._enabled = true;
                /**
                 * Boolean value which indicate if sending images as png were limited, backing filed for pngLimited
                 * property. Do not access directly!
                 * @type {boolean}
                 * @private
                 */
                this._pngLimited = false;
                /**
                 * Object which contain properties of video to image fallback, backing field for options property. Do not
                 * access directly!
                 * @type {HermesJS.VideoToImageFallbackOptions}
                 * @private
                 */
                this._options = new Media.VideoToImageFallbackOptions();
            }
            Object.defineProperty(VideoToImageFallback.prototype, "element", {
                /**
                 * Get HTML image element
                 * @return {HTMLImageElement}
                 */
                get: function () {
                    return this._element;
                },
                /**
                 * Set HTML image element
                 * @param {HTMLImageElement} value HTML image element
                 */
                set: function (value) {
                    this._element = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoToImageFallback.prototype, "canvas", {
                /**
                 * Get HTML canvas element
                 * @return {HTMLCanvasElement}
                 */
                get: function () {
                    return this._canvas;
                },
                /**
                 * Set HTML canvas element
                 * @param {HTMLCanvasElement} value HTML canvas element
                 */
                set: function (value) {
                    this._canvas = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoToImageFallback.prototype, "video", {
                /**
                 * Get HTML video element
                 * @return {HTMLVideoElement}
                 */
                get: function () {
                    return this._video;
                },
                /**
                 * Set HTML video element
                 * @param {HTMLVideoElement} value HTML video element
                 */
                set: function (value) {
                    this._video = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoToImageFallback.prototype, "enabled", {
                /**
                 * Get boolean value which indicate if video to image fallback is enabled
                 * @return {boolean}
                 */
                get: function () {
                    return this._enabled;
                },
                /**
                 * Set boolean value which indicate if video to image fallback is enabled
                 * @param {boolean} value Boolean value
                 */
                set: function (value) {
                    this._enabled = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoToImageFallback.prototype, "pngLimited", {
                /**
                 * Get boolean value which indicate if sending images as png were limited, to prevent multiple limitations
                 * (PNG is lossless format, it has bigger sizes than JPEG,... so if is fallback to PNG then frequency
                 * should be limited to reduce bandwidth usage)
                 * @return {boolean}
                 */
                get: function () {
                    return this._pngLimited;
                },
                /**
                 * Set boolean value which indicate if sending images as png were limited
                 * @param value
                 */
                set: function (value) {
                    this._pngLimited = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoToImageFallback.prototype, "options", {
                /**
                 * Get VideoToImageFallbackOptions object which contain properties of video to image fallback
                 * @return {VideoToImageFallbackOptions}
                 */
                get: function () {
                    return this._options;
                },
                /**
                 * Set VideoToImageFallbackOptions object which contain properties of video to image fallback
                 * @param {VideoToImageFallbackOptions} value Video to image fallback options
                 */
                set: function (value) {
                    this._options = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoToImageFallback.prototype, "intervalId", {
                /**
                 * Get ID returned by setInterval() browser function
                 * @return {number}
                 */
                get: function () {
                    return this._intervalId;
                },
                /**
                 * Set ID returned by setInterval() browser function
                 * @param {number} value ID returned by setInterval() browser function
                 */
                set: function (value) {
                    this._intervalId = value;
                },
                enumerable: true,
                configurable: true
            });
            return VideoToImageFallback;
        }());
        Media.VideoToImageFallback = VideoToImageFallback;
    })(Media = HermesJS.Media || (HermesJS.Media = {}));
})(HermesJS || (HermesJS = {}));
