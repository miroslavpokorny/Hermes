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
/// <reference path="./ConnectControlObject.ts" />
goog.provide("HermesJS.Control.DisconnectControlObject");
goog.require("HermesJS.Control.ConnectControlObject");
var HermesJS;
(function (HermesJS) {
    var Control;
    (function (Control) {
        /**
         * Disconnect control object which is received when some client participating in communication disconnect from
         * server
         */
        var DisconnectControlObject = (function (_super) {
            __extends(DisconnectControlObject, _super);
            function DisconnectControlObject() {
                _super.apply(this, arguments);
                /**
                 * Stream IDs associated with disconnected connection.
                 * @type {Array} Array of numbers (stream IDs)
                 */
                this.DisconnectedStreamIds = [];
            }
            return DisconnectControlObject;
        }(Control.ConnectControlObject));
        Control.DisconnectControlObject = DisconnectControlObject;
    })(Control = HermesJS.Control || (HermesJS.Control = {}));
})(HermesJS || (HermesJS = {}));
