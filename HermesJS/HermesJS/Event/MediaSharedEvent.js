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
/// <reference path="./HermesEvent.ts" />
/// <reference path="../Media/EventName.ts" />
goog.provide("HermesJS.Event.MediaSharedEvent");
goog.require("HermesJS.Event.HermesEvent");
goog.require("HermesJS.Media.EventName");
var HermesJS;
(function (HermesJS) {
    var Event;
    (function (Event) {
        /**
         * Media event class is event class used as parameter in dispatch event methods
         */
        var MediaSharedEvent = (function (_super) {
            __extends(MediaSharedEvent, _super);
            /**
             * Create new Media event object
             * @param {MediaStream} localStream Local media stream returned by mediaDevices.getUserMedia()
             * @param {string} origin Origin of event
             */
            function MediaSharedEvent(localStream, origin) {
                _super.call(this, HermesJS.Media.EventName.MEDIA_SHARED, origin);
                /**
                 * Local media stream, backing field of localStream property. Do not access directly!
                 * @type {MediaStream}
                 * @private
                 */
                this._localStream = null;
                this._localStream = localStream;
            }
            Object.defineProperty(MediaSharedEvent.prototype, "localStream", {
                /**
                 * Get local media stream
                 * @return {MediaStream}
                 */
                get: function () {
                    return this._localStream;
                },
                enumerable: true,
                configurable: true
            });
            return MediaSharedEvent;
        }(Event.HermesEvent));
        Event.MediaSharedEvent = MediaSharedEvent;
    })(Event = HermesJS.Event || (HermesJS.Event = {}));
})(HermesJS || (HermesJS = {}));
