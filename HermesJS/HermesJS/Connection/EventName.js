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
var HermesJS;
(function (HermesJS) {
    var Connection;
    (function (Connection) {
        /**
         * Namespace which contain name of events
         */
        var EventName;
        (function (EventName) {
            /**
             * Event which is fired on connect
             * @type {string}
             */
            EventName.CONNECT = "connect";
            /**
             * Event which is fired on disconnect
             * @type {string}
             */
            EventName.DISCONNECT = "disconnect";
            /**
             * Event which is fired when connection is waiting for another connections
             * @type {string}
             */
            EventName.WAITING = "waiting";
            /**
             * Event which is fired when communication session is full and connection could not participate in
             * communication
             * @type {string}
             */
            EventName.FULL = "full";
            /**
             * Event which is fired when communication session is connected and ready for communicate
             * @type {string}
             */
            EventName.READY = "ready";
            /**
             * Event which is fired when message are received. For more precise targeting of event
             * addReceivedEventListener should be used
             * @type {string}
             */
            EventName.RECEIVED = "received";
        })(EventName = Connection.EventName || (Connection.EventName = {}));
        /**
         * Array which contain all valid event names for addEventListener method
         * @type {[string,string,string,string,string,string]}
         */
        Connection.VALID_EVENT_NAMES = [EventName.CONNECT, EventName.DISCONNECT, EventName.WAITING, EventName.FULL, EventName.READY, EventName.RECEIVED];
    })(Connection = HermesJS.Connection || (HermesJS.Connection = {}));
})(HermesJS || (HermesJS = {}));
