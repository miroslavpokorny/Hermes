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

goog.provide("HermesJS.Connection.Status");

goog.require("HermesJS.Connection");

namespace HermesJS.Connection {
    /**
     * Namespace which contains possible status of ConnectControlObject or DisconnectControlObject
     */
    export namespace Status {
        /**
         * Status which indicate that communication is ready
         * @type {string}
         */
        export const READY = "Ready";
        /**
         * Status which indicate that communication is waiting for another connection(s)
         * @type {string}
         */
        export const WAITING = "Waiting";
        /**
         * Status which indicate that communication is disconnected (communication ended)
         * @type {string}
         */
        export const DISCONNECTED = "Disconnected";
        /**
         * Status which indicate that communication is full and connection could not participate in communication
         * @type {string}
         */
        export const FULL = "Full";
    }
}