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

/// <reference path="./ControlObject.ts" />
/// <reference path="../Connection/CommunicationConstraint.ts" />

goog.provide("HermesJS.Control.ConnectControlObject");

goog.require("HermesJS.Control.ControlObject");
goog.require("HermesJS.Connection.CommunicationConstraint");

namespace HermesJS.Control {
    /**
     * Connect control object which is received when client establish connection with server
     */
    export class ConnectControlObject extends ControlObject {
        /**
         * Indicates status of connection (eg. ready, waiting, full, disconnected)
         * @type {string}
         */
        Status: string = "";
        /**
         * ID of communication session returned by server
         * @type {string}
         */
        SessionId: string = "";
        /**
         * Constraints returned by server
         */
        Constraint: Connection.CommunicationConstraint;
    }
}