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
/// <reference path="../HermesJS.ts" />
goog.provide("HermesJS.Connection");
goog.require("HermesJS");
var HermesJS;
(function (HermesJS) {
    var Connection;
    (function (Connection) {
        /**
         * Name of URL parameter which is used for session id
         * @type {string}
         */
        Connection.SESSION_ID_NAME = "SESSION_ID";
        /**
         * Id out of range of valid IDs used as non specified ID for callback which may be called only based on data
         * type (in some use cases ID is not known at start).
         * @type {number}
         */
        Connection.NOT_SPECIFIED_ID = -1;
        /**
         * Maximal size of data. SignalR has recommendation that message is not larger than 32kB, two bytes are used
         * for marking chunks
         * @type {number}
         */
        Connection.CHUNK_SIZE = 1024 * 32 - 2;
    })(Connection = HermesJS.Connection || (HermesJS.Connection = {}));
})(HermesJS || (HermesJS = {}));
