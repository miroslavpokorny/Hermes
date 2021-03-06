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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="./ControlObject.ts" />
/// <reference path="../Connection/CommunicationConstraint.ts" />
goog.provide("HermesJS.Control.ConnectControlObject");
goog.require("HermesJS.Control.ControlObject");
goog.require("HermesJS.Connection.CommunicationConstraint");
var HermesJS;
(function (HermesJS) {
    var Control;
    (function (Control) {
        /**
         * Connect control object which is received when client establish connection with server
         */
        var ConnectControlObject = (function (_super) {
            __extends(ConnectControlObject, _super);
            function ConnectControlObject() {
                _super.apply(this, arguments);
                /**
                 * Indicates status of connection (eg. ready, waiting, full, disconnected)
                 * @type {string}
                 */
                this.Status = "";
                /**
                 * ID of communication session returned by server
                 * @type {string}
                 */
                this.SessionId = "";
            }
            return ConnectControlObject;
        }(Control.ControlObject));
        Control.ConnectControlObject = ConnectControlObject;
    })(Control = HermesJS.Control || (HermesJS.Control = {}));
})(HermesJS || (HermesJS = {}));
