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

/// <reference path="./ConnectControlObject.ts" />

goog.provide("HermesJS.Control.DisconnectControlObject");

goog.require("HermesJS.Control.ConnectControlObject");

namespace HermesJS.Control {

    /**
     * Disconnect control object which is received when some client participating in communication disconnect from
     * server
     */
    export class DisconnectControlObject extends ConnectControlObject {
        /**
         * Stream IDs associated with disconnected connection.
         * @type {Array} Array of numbers (stream IDs)
         */
        DisconnectedStreamIds: Array<number> = [];
    }
}