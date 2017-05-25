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

/// <reference path="./HermesEvent.ts" />

goog.provide("HermesJS.Event.MediaEvent");

goog.require("HermesJS.Event.HermesEvent");

namespace HermesJS.Event {
    /**
     * Media event class is event class used as parameter in dispatch event methods
     */
    export class MediaEvent extends HermesEvent {
        /**
         * ID of stream, backing filed for property streamId. Do not access directly!
         * @type {number}
         * @private
         */
        private readonly _streamId: number = 0;

        /**
         * Create new Media event object
         * @param {string} type Type of event
         * @param {number} streamId ID of stream
         * @param {string} origin Origin of event
         */
        constructor(type: string, streamId: number, origin: string) {
            super(type, origin);
            this._streamId = streamId;
        }

        /**
         * Get stream ID
         * @return {number} Stream ID
         */
        get streamId(): number {
            return this._streamId;
        }
    }
}