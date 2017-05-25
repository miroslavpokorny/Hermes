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

/// <reference path="./Connection.ts" />

goog.provide("HermesJS.Connection.ErrorMessage");

goog.require("HermesJS.Connection");

namespace HermesJS.Connection {
    /**
     * Namespace which contains error messages
     */
    export namespace ErrorMessage {
        /**
         * Error message which say that frequency is >0
         * @type {string}
         */
        export const FREQUENCY_RANGE = "Frequency must be number grater than zero (>0)!";
        /**
         * Error message which say that connection is not connected to server
         * @type {string}
         */
        export const NOT_CONNECTED = "Connection is not connected to server!";
        /**
         * Error message which say that ID is >= 0
         * @type {string}
         */
        export const ID_RANGE = "ID must be grater or equal to zero (>=0)!";
        /**
         * Error message which say that argument is out of range
         * @type {string}
         */
        export const ARGUMENT_OUT_OF_RANGE = "Argument out of range!";
        /**
         * Error message which say that data type is not allowed in CommunicationConstraint object
         * @type {string}
         */
        export const DATA_TYPE_ALLOWED = "Attempt to send data type that is not allowed!";
        /**
         * Error message which say that request for stream id is not allowed in CommunicationConstraint object
         * @type {string}
         */
        export const REQUEST_STREAM_ID_ALLOWED = "Attempt to request stream id is not allowed!";
        /**
         * Error message which say thaht connection is already connected, and could not connect again
         * @type {string}
         */
        export const CONNECTION_ALREADY_STARTED = "The connection is already started! The connection must be disconnected before establishing a new connection.";
    }
}