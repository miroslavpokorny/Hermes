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
goog.provide("HermesJS.Connection.DefaultStreamId");
goog.require("HermesJS.Connection");
var HermesJS;
(function (HermesJS) {
    var Connection;
    (function (Connection) {
        /**
         * Namespace which contain default stream IDs this stream IDs is used when no ID is specified in send methods
         */
        var DefaultStreamId;
        (function (DefaultStreamId) {
            /**
             * Default control stream ID
             * @type {number}
             */
            DefaultStreamId.CONTROL = 1;
            /**
             * Default text stream ID
             * @type {number}
             */
            DefaultStreamId.TEXT = 2;
            /**
             * Default binary stream ID
             * @type {number}
             */
            DefaultStreamId.BINARY = 3;
            /**
             * Default audio stream ID
             * @type {number}
             */
            DefaultStreamId.AUDIO = 4;
            /**
             * Default video stream ID
             * @type {number}
             */
            DefaultStreamId.VIDEO = 5;
        })(DefaultStreamId = Connection.DefaultStreamId || (Connection.DefaultStreamId = {}));
    })(Connection = HermesJS.Connection || (HermesJS.Connection = {}));
})(HermesJS || (HermesJS = {}));
