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
goog.provide("HermesJS.Event.MediaEvent");
goog.require("HermesJS.Event.HermesEvent");
var HermesJS;
(function (HermesJS) {
    var Event;
    (function (Event) {
        /**
         * Media event class is event class used as parameter in dispatch event methods
         */
        var MediaEvent = (function (_super) {
            __extends(MediaEvent, _super);
            /**
             * Create new Media event object
             * @param {string} type Type of event
             * @param {number} streamId ID of stream
             * @param {string} origin Origin of event
             */
            function MediaEvent(type, streamId, origin) {
                _super.call(this, type, origin);
                /**
                 * ID of stream, backing filed for property streamId. Do not access directly!
                 * @type {number}
                 * @private
                 */
                this._streamId = 0;
                this._streamId = streamId;
            }
            Object.defineProperty(MediaEvent.prototype, "streamId", {
                /**
                 * Get stream ID
                 * @return {number} Stream ID
                 */
                get: function () {
                    return this._streamId;
                },
                enumerable: true,
                configurable: true
            });
            return MediaEvent;
        }(Event.HermesEvent));
        Event.MediaEvent = MediaEvent;
    })(Event = HermesJS.Event || (HermesJS.Event = {}));
})(HermesJS || (HermesJS = {}));
