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

/// <reference path="./Control.ts" />

goog.provide("HermesJS.Control.Action");

goog.require("HermesJS.Control");

namespace HermesJS.Control {
    /**
     * Namespace which contains names of possible actions received from server in ControlObject.
     */
    export namespace Action {
        /**
         * Connect action
         * @type {string}
         */
        export const CONNECT = "connect";
        /**
         * Disconnect action
         * @type {string}
         */
        export const DISCONNECT = "disconnect";
        /**
         * Request stream ID action
         * @type {string}
         */
        export const REQUEST_STREAM_ID = "requestStreamId";
        /**
         * Media is not supported action
         * @type {string}
         */
        export const MEDIA_NOT_SUPPORTED = "mediaNotSupported";
        /**
         * Request header of media action
         * @type {string}
         */
        export const REQUEST_MEDIA_HEADER = "requestMediaHeader";
        /**
         * Stream stopped (ended) action
         * @type {string}
         */
        export const STOP_STREAM = "stopStream";
    }
}