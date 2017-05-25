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
/// <reference path="./Event.ts" />
goog.provide("HermesJS.Event.HermesEvent");
goog.require("HermesJS.Event");
var HermesJS;
(function (HermesJS) {
    var Event;
    (function (Event) {
        /**
         * Base event class for this library
         */
        var HermesEvent = (function () {
            /**
             * Create new hermes event object
             * @param {string} type type of event
             * @param {string} origin origin of event (connection ID which originate event)
             */
            function HermesEvent(type, origin) {
                this._type = type;
                this._origin = origin;
            }
            Object.defineProperty(HermesEvent.prototype, "type", {
                /**
                 * Get type of event
                 * @return {string} Type of event
                 */
                get: function () {
                    return this._type;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(HermesEvent.prototype, "origin", {
                /**
                 * Get origin of event.
                 * @return {string}
                 */
                get: function () {
                    return this._origin;
                },
                enumerable: true,
                configurable: true
            });
            return HermesEvent;
        }());
        Event.HermesEvent = HermesEvent;
    })(Event = HermesJS.Event || (HermesJS.Event = {}));
})(HermesJS || (HermesJS = {}));
