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

goog.provide("HermesJS.Connection.EventName");

goog.require("HermesJS.Connection");

namespace HermesJS.Connection {
    /**
     * Namespace which contain name of events
     */
    export namespace EventName {
        /**
         * Event which is fired on connect
         * @type {string}
         */
        export const CONNECT = "connect";
        /**
         * Event which is fired on disconnect
         * @type {string}
         */
        export const DISCONNECT = "disconnect";
        /**
         * Event which is fired when connection is waiting for another connections
         * @type {string}
         */
        export const WAITING = "waiting";
        /**
         * Event which is fired when communication session is full and connection could not participate in
         * communication
         * @type {string}
         */
        export const FULL = "full";
        /**
         * Event which is fired when communication session is connected and ready for communicate
         * @type {string}
         */
        export const READY = "ready";
        /**
         * Event which is fired when message are received. For more precise targeting of event
         * addReceivedEventListener should be used
         * @type {string}
         */
        export const RECEIVED = "received";
    }
    /**
     * Array which contain all valid event names for addEventListener method
     * @type {[string,string,string,string,string,string]}
     */
    export const VALID_EVENT_NAMES = [EventName.CONNECT, EventName.DISCONNECT, EventName.WAITING, EventName.FULL, EventName.READY, EventName.RECEIVED];
}