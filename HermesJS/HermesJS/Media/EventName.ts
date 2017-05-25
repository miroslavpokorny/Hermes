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

/// <reference path="./Media.ts" />

goog.provide("HermesJS.Media.EventName");

goog.require("HermesJS.Media");

namespace HermesJS.Media {
    /**
     * Namespace which contain name of events
     */
    export namespace EventName {
        /**
         * Event which is fired when unhandled stream are received and are handled.
         * @type {string}
         */
        export const NEW_STREAM = "newstream";
        /**
         * Event which is fired when stream ends.
         * @type {string}
         */
        export const END_STREAM = "endstream";
        /***
         * Evnet which is fired when local media is shared.
         * @type {string}
         */
        export const MEDIA_SHARED = "mediashared";
    }
    /**
     * Array which contain all valid event names for Media.addEventListener method
     * @type {[string,string]}
     */
    export const VALID_EVENT_NAMES = [EventName.NEW_STREAM, EventName.END_STREAM, EventName.MEDIA_SHARED];
}