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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./MediaEvent.ts" />
/// <reference path="../Media/EventName.ts" />
goog.provide("HermesJS.Event.NewStreamEvent");
goog.require("HermesJS.Event.MediaEvent");
goog.require("HermesJS.Media.EventName");
var HermesJS;
(function (HermesJS) {
    var Event;
    (function (Event) {
        /**
         * New stream event is event which is dispatched when received media stream which is not handled yet.
         */
        var NewStreamEvent = (function (_super) {
            __extends(NewStreamEvent, _super);
            /**
             * Create new NewStreamEvent object
             * @param {number} streamId ID of stream
             * @param {HTMLAudioElement|HTMLVideoElement|HTMLImageElement} mediaElement media element which will be
             *     automatically updated on next data received
             * @param {string} mediaType Mime type of stream data
             * @param {string} origin Origin of event
             */
            function NewStreamEvent(streamId, mediaElement, mediaType, origin) {
                _super.call(this, HermesJS.Media.EventName.NEW_STREAM, streamId, origin);
                /**
                 * Media element, backing field for mediaElement property. Do not access directly!
                 * @type {HTMLAudioElement|HTMLVideoElement|HTMLImageElement}
                 * @private
                 */
                this._mediaElement = null;
                /**
                 * Mime type of stream, backing field for mediaElement property. Do not access directly!
                 * @type {string}
                 * @private
                 */
                this._mediaType = "";
                this._mediaElement = mediaElement;
                this._mediaType = mediaType;
            }
            Object.defineProperty(NewStreamEvent.prototype, "mediaElement", {
                /**
                 * Get media element
                 * @return {HTMLAudioElement|HTMLVideoElement|HTMLImageElement} Return type is dependent on mime type (video
                 *     for video mime types, audio for audio mime types, image for image mime types)
                 */
                get: function () {
                    return this._mediaElement;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NewStreamEvent.prototype, "mediaType", {
                /**
                 * Mime type of media
                 * @return {string}
                 */
                get: function () {
                    return this._mediaType;
                },
                enumerable: true,
                configurable: true
            });
            return NewStreamEvent;
        }(Event.MediaEvent));
        Event.NewStreamEvent = NewStreamEvent;
    })(Event = HermesJS.Event || (HermesJS.Event = {}));
})(HermesJS || (HermesJS = {}));
