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

namespace HermesJS.Media {
    /**
     * Class used to encapsulate information (objects) for received fallback stream
     */
    export class ReceivedVideoToImageFallbackInfo {
        /**
         * HTML image element, backing field for element property. Do not access directly!
         * @type {HTMLImageElement}
         * @private
         */
        private _element: HTMLImageElement;
        /**
         * Connection ID of origin of received data
         * @type {string}
         * @private
         */
        private _origin: string;

        /**
         * ID of stream
         * @type {number}
         * @private
         */
        private _streamId: number;

        /**
         * Create new ReceivedVideoTiImageFallbackInfo object
         * @param {number} streamId ID of stream
         */
        constructor(streamId: number) {
            this._streamId = streamId;
        }

        /**
         * Get stream ID
         * @return {number}
         */
        get streamId(): number {
            return this._streamId;
        }

        /**
         * Get HTML element
         * @return {HTMLImageElement}
         */
        get element(): HTMLImageElement {
            return this._element;
        }

        /**
         * Set HTML element
         * @param {HTMLImageElement} value HTML image element
         */
        set element(value: HTMLImageElement) {
            this._element = value;
        }

        /**
         * Get origin of received data
         * @return {string}
         */
        get origin(): string {
            return this._origin;
        }

        /**
         * Set origin of received data
         * @param {string} value Origin of connection
         */
        set origin(value: string) {
            this._origin = value;
        }
    }
}