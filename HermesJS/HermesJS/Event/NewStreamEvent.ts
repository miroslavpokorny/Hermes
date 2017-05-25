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

/// <reference path="./MediaEvent.ts" />
/// <reference path="../Media/EventName.ts" />

goog.provide("HermesJS.Event.NewStreamEvent");

goog.require("HermesJS.Event.MediaEvent");
goog.require("HermesJS.Media.EventName");

namespace HermesJS.Event {
    /**
     * New stream event is event which is dispatched when received media stream which is not handled yet.
     */
    export class NewStreamEvent extends MediaEvent {
        /**
         * Media element, backing field for mediaElement property. Do not access directly!
         * @type {HTMLAudioElement|HTMLVideoElement|HTMLImageElement}
         * @private
         */
        private readonly _mediaElement: HTMLAudioElement|HTMLVideoElement|HTMLImageElement = null;
        /**
         * Mime type of stream, backing field for mediaElement property. Do not access directly!
         * @type {string}
         * @private
         */
        private readonly _mediaType: string = "";

        /**
         * Create new NewStreamEvent object
         * @param {number} streamId ID of stream
         * @param {HTMLAudioElement|HTMLVideoElement|HTMLImageElement} mediaElement media element which will be
         *     automatically updated on next data received
         * @param {string} mediaType Mime type of stream data
         * @param {string} origin Origin of event
         */
        constructor(streamId: number, mediaElement: HTMLAudioElement|HTMLVideoElement|HTMLImageElement, mediaType: string, origin: string) {
            super(Media.EventName.NEW_STREAM, streamId, origin);
            this._mediaElement = mediaElement;
            this._mediaType = mediaType;
        }

        /**
         * Get media element
         * @return {HTMLAudioElement|HTMLVideoElement|HTMLImageElement} Return type is dependent on mime type (video
         *     for video mime types, audio for audio mime types, image for image mime types)
         */
        get mediaElement(): HTMLAudioElement|HTMLVideoElement|HTMLImageElement {
            return this._mediaElement;
        }

        /**
         * Mime type of media
         * @return {string}
         */
        get mediaType(): string {
            return this._mediaType;
        }
    }
}