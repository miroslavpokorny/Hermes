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
/// <reference path="../Media/EventName.ts" />

goog.provide("HermesJS.Event.MediaSharedEvent");

goog.require("HermesJS.Event.HermesEvent");
goog.require("HermesJS.Media.EventName");

namespace HermesJS.Event {
    /**
     * Media event class is event class used as parameter in dispatch event methods
     */
    export class MediaSharedEvent extends HermesEvent {
        /**
         * Local media stream, backing field of localStream property. Do not access directly!
         * @type {MediaStream}
         * @private
         */
        private _localStream: MediaStream = null;


        /**
         * Create new Media event object
         * @param {MediaStream} localStream Local media stream returned by mediaDevices.getUserMedia()
         * @param {string} origin Origin of event
         */
        constructor(localStream: MediaStream, origin: string) {
            super(Media.EventName.MEDIA_SHARED, origin);
            this._localStream = localStream;
        }

        /**
         * Get local media stream
         * @return {MediaStream}
         */
        get localStream(): MediaStream {
            return this._localStream;
        }
    }
}