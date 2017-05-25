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
goog.provide("HermesJS.Connection.CommunicationConstraint");
goog.require("HermesJS.Connection");
var HermesJS;
(function (HermesJS) {
    var Connection;
    (function (Connection) {
        /**
         * Class which contains communication constraints
         */
        var CommunicationConstraint = (function () {
            function CommunicationConstraint() {
                /**
                 * Indicates if sending of data with data type Text is allowed
                 * True if sending is allowed, otherwise is false
                 * @type {boolean}
                 */
                this.TextDataTypeAllowed = false;
                /**
                 * Indicates if sending of data with data type Binary is allowed
                 * True if sending is allowed, otherwise is false
                 * @type {boolean}
                 */
                this.BinaryDataTypeAllowed = false;
                /**
                 * Indicates if sending of data with data type Audio is allowed
                 * True if sending is allowed, otherwise is false
                 * @type {boolean}
                 */
                this.AudioDataTypeAllowed = false;
                /**
                 * Indicates if sending of data with data type Video is allowed
                 * True if sending is allowed, otherwise is false
                 * @type {boolean}
                 */
                this.VideoDataTypeAllowed = false;
                /**
                 * Indicates if sending of request for stream ID is allowed
                 * True if sending is allowed, otherwise is false
                 * @type {boolean}
                 */
                this.RequestStreamIdAllowed = false;
            }
            return CommunicationConstraint;
        }());
        Connection.CommunicationConstraint = CommunicationConstraint;
    })(Connection = HermesJS.Connection || (HermesJS.Connection = {}));
})(HermesJS || (HermesJS = {}));
