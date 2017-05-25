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
/// <reference path="../MimeType.ts"/>
goog.provide("HermesJS.Media.VideoToImageFallbackOptions");
goog.require("HermesJS.Media");
goog.require("HermesJS.MimeType");
var HermesJS;
(function (HermesJS) {
    var Media;
    (function (Media) {
        /**
         * Video to image fallback options class is used as parameters when MediaRecorder is not supported by browser, so
         * instead of video images are send
         */
        var VideoToImageFallbackOptions = (function () {
            function VideoToImageFallbackOptions() {
                /**
                 * Preferred mime type of fallback media, backing field for property mimeType. Do not access directly!
                 * Default value is image/jpeg
                 * @type {string}
                 * @private
                 */
                this._mimeType = HermesJS.MimeType.IMAGE_JPEG;
                /**
                 * Minimal frequency of generating new images, backing field for property frequency. Do not access directly!
                 * @type {number}
                 * @private
                 */
                this._frequency = 150;
                /**
                 * Quality of image, backing field for property quality. Do not access directly!
                 * @type {number}
                 * @private
                 */
                this._quality = 0.5;
                /**
                 * Maximal width of generated image, backing filed for width property width. Do not access directly!
                 * @type {number}
                 * @private
                 */
                this._width = 400;
                /**
                 * Boolean which indicate that update frequency will be limited when PNG format is used, backing filed for width property enabledPngLimit. Do not access directly!
                 * @type {boolean}
                 * @private
                 */
                this._enabledPngLimit = true;
                /**
                 * Minimal frequency of generating new PNG images, if PNG limit is enabled, backing filed for width property pngLimitFrequency. Do not access directly!
                 * @type {number}
                 * @private
                 */
                this._pngLimitFrequency = 1000;
            }
            Object.defineProperty(VideoToImageFallbackOptions.prototype, "mimeType", {
                /**
                 * Get preferred mime type of fallback media, if mime type is not supported then image/png will be used
                 * Default value is image/jpeg
                 * @return {string}
                 */
                get: function () {
                    return this._mimeType;
                },
                /**
                 * Set preferred mime type of fallback media, if mime type is not supported then image/png will be used
                 * @param {string} value Preferred mime type
                 */
                set: function (value) {
                    this._mimeType = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoToImageFallbackOptions.prototype, "frequency", {
                /**
                 * Get minimal frequency of generating new images (in milliseconds)
                 * @return {number}
                 */
                get: function () {
                    return this._frequency;
                },
                /**
                 * Set minimal frequency of generating new images
                 * @param {number} value Minimal frequency of generating new images (in milliseconds)
                 */
                set: function (value) {
                    this._frequency = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoToImageFallbackOptions.prototype, "quality", {
                /**
                 * Get requested quality of image (has effect only with some lossy image mime types, like image/jpeg,...)
                 * @return {number}
                 */
                get: function () {
                    return this._quality;
                },
                /**
                 * Set requested quality of image
                 * @param {number} value Value is in range between 0 to 1.
                 */
                set: function (value) {
                    value = Math.max(value, 0);
                    value = Math.min(value, 1);
                    this._quality = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoToImageFallbackOptions.prototype, "width", {
                /**
                 * Get maximal width of image (if original video has smaller width, then video width will be used), height will
                 * be automatically counted based on aspect ratio of original video
                 * @return {number}
                 */
                get: function () {
                    return this._width;
                },
                /**
                 * Set maximal width of image
                 * @param value
                 */
                set: function (value) {
                    this._width = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoToImageFallbackOptions.prototype, "enabledPngLimit", {
                /**
                 * Get boolean which indicate that update frequency will be limited when PNG format is used
                 * @return {boolean}
                 */
                get: function () {
                    return this._enabledPngLimit;
                },
                /**
                 * Set boolean which indicate that update frequency will be limited when PNG format is used
                 * @param {boolean} value Boolean value true for enable, false for disable
                 */
                set: function (value) {
                    this._enabledPngLimit = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(VideoToImageFallbackOptions.prototype, "pngLimitFrequency", {
                /**
                 * Get minimal frequency of generating new PNG images, if PNG limit is enabled.
                 * @return {number}
                 */
                get: function () {
                    return this._pngLimitFrequency;
                },
                /**
                 * Set minimal frequency of generating new PNG images, if PNG limit is enabled.
                 * @param {number} value Frequency of generation new PNG images in milliseconds
                 */
                set: function (value) {
                    this._pngLimitFrequency = value;
                },
                enumerable: true,
                configurable: true
            });
            return VideoToImageFallbackOptions;
        }());
        Media.VideoToImageFallbackOptions = VideoToImageFallbackOptions;
    })(Media = HermesJS.Media || (HermesJS.Media = {}));
})(HermesJS || (HermesJS = {}));
