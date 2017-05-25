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
/// <reference path="./Action.ts" />
goog.provide("HermesJS.Control.RequestStreamIdControlObject");
goog.require("HermesJS.Control.ControlObject");
goog.require("HermesJS.Control.Action");
var HermesJS;
(function (HermesJS) {
    var Control;
    (function (Control) {
        /**
         * Control object used when client request or receive stream ID
         */
        var RequestStreamIdControlObject = (function (_super) {
            __extends(RequestStreamIdControlObject, _super);
            function RequestStreamIdControlObject() {
                _super.call(this);
                this.Action = Control.Action.REQUEST_STREAM_ID;
            }
            return RequestStreamIdControlObject;
        }(Control.ControlObject));
        Control.RequestStreamIdControlObject = RequestStreamIdControlObject;
    })(Control = HermesJS.Control || (HermesJS.Control = {}));
})(HermesJS || (HermesJS = {}));
