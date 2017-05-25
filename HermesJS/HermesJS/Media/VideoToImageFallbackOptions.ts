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

namespace HermesJS.Media {
    /**
     * Video to image fallback options class is used as parameters when MediaRecorder is not supported by browser, so
     * instead of video images are send
     */
    export class VideoToImageFallbackOptions {
        /**
         * Preferred mime type of fallback media, backing field for property mimeType. Do not access directly!
         * Default value is image/jpeg
         * @type {string}
         * @private
         */
        private _mimeType: string = MimeType.IMAGE_JPEG;
        /**
         * Minimal frequency of generating new images, backing field for property frequency. Do not access directly!
         * @type {number}
         * @private
         */
        private _frequency: number = 150;
        /**
         * Quality of image, backing field for property quality. Do not access directly!
         * @type {number}
         * @private
         */
        private _quality: number = 0.5;
        /**
         * Maximal width of generated image, backing filed for width property width. Do not access directly!
         * @type {number}
         * @private
         */
        private _width: number = 400;
        /**
         * Boolean which indicate that update frequency will be limited when PNG format is used, backing filed for width property enabledPngLimit. Do not access directly!
         * @type {boolean}
         * @private
         */
        private _enabledPngLimit: boolean = true;
        /**
         * Minimal frequency of generating new PNG images, if PNG limit is enabled, backing filed for width property pngLimitFrequency. Do not access directly!
         * @type {number}
         * @private
         */
        private _pngLimitFrequency: number = 1000;

        /**
         * Get preferred mime type of fallback media, if mime type is not supported then image/png will be used
         * Default value is image/jpeg
         * @return {string}
         */
        get mimeType(): string {
            return this._mimeType;
        }

        /**
         * Set preferred mime type of fallback media, if mime type is not supported then image/png will be used
         * @param {string} value Preferred mime type
         */
        set mimeType(value: string) {
            this._mimeType = value;
        }

        /**
         * Get minimal frequency of generating new images (in milliseconds)
         * @return {number}
         */
        get frequency(): number {
            return this._frequency;
        }

        /**
         * Set minimal frequency of generating new images
         * @param {number} value Minimal frequency of generating new images (in milliseconds)
         */
        set frequency(value: number) {
            this._frequency = value;
        }

        /**
         * Get requested quality of image (has effect only with some lossy image mime types, like image/jpeg,...)
         * @return {number}
         */
        get quality(): number {
            return this._quality;
        }

        /**
         * Set requested quality of image
         * @param {number} value Value is in range between 0 to 1.
         */
        set quality(value: number) {
            value = Math.max(value, 0);
            value = Math.min(value, 1);
            this._quality = value;
        }

        /**
         * Get maximal width of image (if original video has smaller width, then video width will be used), height will
         * be automatically counted based on aspect ratio of original video
         * @return {number}
         */
        get width(): number {
            return this._width;
        }

        /**
         * Set maximal width of image
         * @param value
         */
        set width(value: number) {
            this._width = value;
        }

        /**
         * Get boolean which indicate that update frequency will be limited when PNG format is used
         * @return {boolean}
         */
        get enabledPngLimit(): boolean {
            return this._enabledPngLimit;
        }

        /**
         * Set boolean which indicate that update frequency will be limited when PNG format is used
         * @param {boolean} value Boolean value true for enable, false for disable
         */
        set enabledPngLimit(value: boolean) {
            this._enabledPngLimit = value;
        }

        /**
         * Get minimal frequency of generating new PNG images, if PNG limit is enabled.
         * @return {number}
         */
        get pngLimitFrequency(): number {
            return this._pngLimitFrequency;
        }

        /**
         * Set minimal frequency of generating new PNG images, if PNG limit is enabled.
         * @param {number} value Frequency of generation new PNG images in milliseconds
         */
        set pngLimitFrequency(value: number) {
            this._pngLimitFrequency = value;
        }
    }
}