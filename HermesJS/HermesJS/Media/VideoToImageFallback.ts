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

namespace HermesJS.Media {
    /**
     * Class used to encapsulate information (objects) for received stream (if video to image fallback is used)
     */
    export class VideoToImageFallback {
        /**
         * HTML element, backing filed for element property. Do not access directly!
         * @type{HTMLImageElement}
         * @private
         */
        private _element: HTMLImageElement;
        /**
         * HTML canvas, backing filed for canvas property. Do not access directly!
         * @type{HTMLCanvasElement}
         * @private
         */
        private _canvas: HTMLCanvasElement;
        /**
         * HTML video, backing filed for video property. Do not access directly!
         * @type{HTMLVideoElement}
         * @private
         */
        private _video: HTMLVideoElement;
        /**
         * Boolean value which indicate if video to image fallback is enabled, backing field for enabled property.
         * Do not access directly!
         * @type {boolean}
         * @private
         */
        private _enabled: boolean = true;
        /**
         * Boolean value which indicate if sending images as png were limited, backing filed for pngLimited
         * property. Do not access directly!
         * @type {boolean}
         * @private
         */
        private _pngLimited: boolean = false;
        /**
         * Object which contain properties of video to image fallback, backing field for options property. Do not
         * access directly!
         * @type {HermesJS.VideoToImageFallbackOptions}
         * @private
         */
        private _options: VideoToImageFallbackOptions = new VideoToImageFallbackOptions();
        /**
         * ID returned by setInterval() browser function, backing field for intervalId property. Do not access
         * directly!
         * @type{number}
         * @private
         */
        private _intervalId: number;

        /**
         * Get HTML image element
         * @return {HTMLImageElement}
         */
        get element(): HTMLImageElement {
            return this._element;
        }

        /**
         * Set HTML image element
         * @param {HTMLImageElement} value HTML image element
         */
        set element(value: HTMLImageElement) {
            this._element = value;
        }

        /**
         * Get HTML canvas element
         * @return {HTMLCanvasElement}
         */
        get canvas(): HTMLCanvasElement {
            return this._canvas;
        }

        /**
         * Set HTML canvas element
         * @param {HTMLCanvasElement} value HTML canvas element
         */
        set canvas(value: HTMLCanvasElement) {
            this._canvas = value;
        }

        /**
         * Get HTML video element
         * @return {HTMLVideoElement}
         */
        get video(): HTMLVideoElement {
            return this._video;
        }

        /**
         * Set HTML video element
         * @param {HTMLVideoElement} value HTML video element
         */
        set video(value: HTMLVideoElement) {
            this._video = value;
        }

        /**
         * Get boolean value which indicate if video to image fallback is enabled
         * @return {boolean}
         */
        get enabled(): boolean {
            return this._enabled;
        }

        /**
         * Set boolean value which indicate if video to image fallback is enabled
         * @param {boolean} value Boolean value
         */
        set enabled(value: boolean) {
            this._enabled = value;
        }

        /**
         * Get boolean value which indicate if sending images as png were limited, to prevent multiple limitations
         * (PNG is lossless format, it has bigger sizes than JPEG,... so if is fallback to PNG then frequency
         * should be limited to reduce bandwidth usage)
         * @return {boolean}
         */
        get pngLimited(): boolean {
            return this._pngLimited;
        }

        /**
         * Set boolean value which indicate if sending images as png were limited
         * @param value
         */
        set pngLimited(value: boolean) {
            this._pngLimited = value;
        }

        /**
         * Get VideoToImageFallbackOptions object which contain properties of video to image fallback
         * @return {VideoToImageFallbackOptions}
         */
        get options(): VideoToImageFallbackOptions {
            return this._options;
        }

        /**
         * Set VideoToImageFallbackOptions object which contain properties of video to image fallback
         * @param {VideoToImageFallbackOptions} value Video to image fallback options
         */
        set options(value: VideoToImageFallbackOptions) {
            this._options = value;
        }

        /**
         * Get ID returned by setInterval() browser function
         * @return {number}
         */
        get intervalId(): number {
            return this._intervalId;
        }

        /**
         * Set ID returned by setInterval() browser function
         * @param {number} value ID returned by setInterval() browser function
         */
        set intervalId(value: number) {
            this._intervalId = value;
        }
    }
}