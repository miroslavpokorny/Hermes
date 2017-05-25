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
/// <reference path="../Control/ControlObject.ts" />
/// <reference path="../DataType.ts" />
/// <reference path="../Connection/EventName.ts" />
goog.provide("HermesJS.Event.ReceivedEvent");
goog.require("HermesJS.Event.HermesEvent");
goog.require("HermesJS.Control.ControlObject");
goog.require("HermesJS.DataType");
goog.require("HermesJS.Connection.EventName");
var HermesJS;
(function (HermesJS) {
    var Event;
    (function (Event) {
        /**
         * Received event class is used as parameter of received event listener
         */
        var ReceivedEvent = (function (_super) {
            __extends(ReceivedEvent, _super);
            /**
             * Create new Received event object
             * @param {string|Uint8Array|Control.ControlObject} data received data
             * @param {HermesJS.DataType} dataType received data type
             * @param {number} id received stream ID
             * @param {string} mimeType received mime type
             * @param {string} origin received origin of message
             */
            function ReceivedEvent(data, dataType, id, mimeType, origin) {
                _super.call(this, HermesJS.Connection.EventName.RECEIVED, origin);
                this._data = data;
                this._dataType = dataType;
                this._id = id;
                this._mimeType = mimeType;
            }
            Object.defineProperty(ReceivedEvent.prototype, "data", {
                /**
                 * Get received data
                 * @return {string|Uint8Array|Control.ControlObject} Received data based on DataType could be string (Text data type),
                 *     Uint8Array (Binary, Audio or Video data type), or ControlObject (Control data type)
                 */
                get: function () {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ReceivedEvent.prototype, "dataType", {
                /**
                 * Get data type of event
                 * @return {HermesJS.DataType}
                 */
                get: function () {
                    return this._dataType;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ReceivedEvent.prototype, "id", {
                /**
                 * Get ID of received stream
                 * @return {number}
                 */
                get: function () {
                    return this._id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ReceivedEvent.prototype, "mimeType", {
                /**
                 * Get mimeType associated with received data
                 * @return {string}
                 */
                get: function () {
                    return this._mimeType;
                },
                enumerable: true,
                configurable: true
            });
            return ReceivedEvent;
        }(Event.HermesEvent));
        Event.ReceivedEvent = ReceivedEvent;
    })(Event = HermesJS.Event || (HermesJS.Event = {}));
})(HermesJS || (HermesJS = {}));
