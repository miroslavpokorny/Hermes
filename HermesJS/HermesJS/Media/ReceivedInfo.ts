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

namespace HermesJS.Media {
    /**
     * Class used to encapsulate information (objects) for received stream
     */
    export class ReceivedInfo {
        /**
         * HTML element, backing filed for element property. Do not access directly!
         * @type {HTMLVideoElement|HTMLAudioElement|HTMLMediaElement}
         * @private
         */
        private _element: HTMLVideoElement|HTMLAudioElement|HTMLMediaElement;
        /**
         * Source buffer associated with streamId, backing field for sourceBuffer property. Do not access directly!
         * @type {SourceBuffer}
         * @private
         */
        private _sourceBuffer: SourceBuffer;
        /**
         * Media source associated with streamId, backing field for mediaSource property. Do not access directly!
         * @type {MediaSource}
         * @private
         */
        private _mediaSource: MediaSource;
        /**
         * Queue (array of Uint8Array) associated with streamId, backing field for queue property. Do not access
         * directly!
         * @type {Array}
         * @private
         */
        private _queue: Array<Uint8Array>;
        /**
         * Boolean value which indicate if first cluster were appended, backing field for isAppendedFirstCluster
         * property. Do not access directly!
         */
        private _isAppendedFirstCluster: boolean;
        /**
         * ID of stream
         * @type {number}
         * @private
         */
        private _streamId: number;
        /**
         * Connection ID of origin of received data
         * @type {string}
         * @private
         */
        private _origin: string;

        /**
         * Create new ReceivedInfo object
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
         * @return {HTMLVideoElement|HTMLAudioElement|HTMLMediaElement}
         */
        get element(): HTMLVideoElement|HTMLAudioElement|HTMLMediaElement {
            return this._element;
        }

        /**
         * Set HTML element
         * @param {HTMLVideoElement|HTMLAudioElement|HTMLMediaElement} value HTML element
         */
        set element(value: HTMLVideoElement|HTMLAudioElement|HTMLMediaElement) {
            this._element = value;
        }

        /**
         * Get source buffer
         * @return {SourceBuffer}
         */
        get sourceBuffer(): SourceBuffer {
            return this._sourceBuffer;
        }

        /**
         * Set source buffer
         * @param {SourceBuffer} value Source buffer
         */
        set sourceBuffer(value: SourceBuffer) {
            this._sourceBuffer = value;
        }

        /**
         * Get media source
         * @return {MediaSource}
         */
        get mediaSource(): MediaSource {
            return this._mediaSource;
        }

        /**
         * Set media source
         * @param {MediaSource} value
         */
        set mediaSource(value: MediaSource) {
            this._mediaSource = value;
        }

        /**
         * Get data queue
         * @return {Array<Uint8Array>}
         */
        get queue(): Array<Uint8Array> {
            return this._queue;
        }

        /**
         * Set data queue
         * @param {array} value Array of Uint8Array
         */
        set queue(value: Array<Uint8Array>) {
            this._queue = value;
        }

        /**
         * Get boolean value which indicate if first cluster were appended. (it is useful for chrome browser which
         * send data as simple block, and only some times send cluster, first appended data to source buffer may be
         * cluster)
         * @return {boolean}
         */
        get isAppendedFirstCluster(): boolean {
            return this._isAppendedFirstCluster;
        }

        /**
         * Set boolean value which indicate if first cluster were appended.
         * @param {boolean} value Boolean value
         */
        set isAppendedFirstCluster(value: boolean) {
            this._isAppendedFirstCluster = value;
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