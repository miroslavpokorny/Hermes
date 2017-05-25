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

namespace HermesJS.Event {
    /**
     * Base event class for this library
     */
    export class HermesEvent {
        /**
         * Type of event, backing field of type property. Do not access directly!
         * @private
         */
        private readonly _type: string;
        /**
         * Origin of event, backing field of origin property. Do not access directly!
         * @private
         */
        private readonly _origin: string;

        /**
         * Get type of event
         * @return {string} Type of event
         */
        get type(): string {
            return this._type;
        }

        /**
         * Get origin of event.
         * @return {string}
         */
        get origin(): string {
            return this._origin;
        }

        /**
         * Create new hermes event object
         * @param {string} type type of event
         * @param {string} origin origin of event (connection ID which originate event)
         */
        constructor(type: string, origin: string) {
            this._type = type;
            this._origin = origin;
        }
    }
}