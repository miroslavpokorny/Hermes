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
/// <reference path="../Control/ControlObject.ts" />
/// <reference path="../DataType.ts" />
/// <reference path="../Connection/EventName.ts" />

goog.provide("HermesJS.Event.ReceivedEvent");

goog.require("HermesJS.Event.HermesEvent");
goog.require("HermesJS.Control.ControlObject");
goog.require("HermesJS.DataType");
goog.require("HermesJS.Connection.EventName");

namespace HermesJS.Event {
    /**
     * Received event class is used as parameter of received event listener
     */
    export class ReceivedEvent extends HermesEvent {
        /**
         * Data associated with event, backing field of data property. Do not access directly!
         * @private
         */
        private readonly _data: string|Uint8Array|Control.ControlObject;
        /**
         * Data type associated with event, backing field of dataType property. Do not access directly!
         * @private
         */
        private readonly _dataType: HermesJS.DataType;
        /**
         * ID associated with event, backing field of id property. Do not access directly!
         * @private
         */
        private readonly _id: number;
        /**
         * Mime type associated with event, backing field of mimeType property. Do not access directly!
         * @private
         */
        private readonly _mimeType: string;

        /**
         * Get received data
         * @return {string|Uint8Array|Control.ControlObject} Received data based on DataType could be string (Text data type),
         *     Uint8Array (Binary, Audio or Video data type), or ControlObject (Control data type)
         */
        get data(): string|Uint8Array|Control.ControlObject {
            return this._data;
        }

        /**
         * Get data type of event
         * @return {HermesJS.DataType}
         */
        get dataType(): HermesJS.DataType {
            return this._dataType;
        }

        /**
         * Get ID of received stream
         * @return {number}
         */
        get id(): number {
            return this._id;
        }

        /**
         * Get mimeType associated with received data
         * @return {string}
         */
        get mimeType(): string {
            return this._mimeType;
        }

        /**
         * Create new Received event object
         * @param {string|Uint8Array|Control.ControlObject} data received data
         * @param {HermesJS.DataType} dataType received data type
         * @param {number} id received stream ID
         * @param {string} mimeType received mime type
         * @param {string} origin received origin of message
         */
        constructor(data: string|Uint8Array|Control.ControlObject, dataType: HermesJS.DataType, id: number, mimeType: string, origin: string) {
            super(Connection.EventName.RECEIVED, origin);
            this._data = data;
            this._dataType = dataType;
            this._id = id;
            this._mimeType = mimeType;
        }
    }
}