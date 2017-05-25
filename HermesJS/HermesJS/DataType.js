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
/// <reference path="./HermesJS.ts" />
/// <reference path="./proto/hermes/hermes-message.d.ts" />
goog.provide("HermesJS.DataType");
goog.require("HermesJS");
goog.require("proto.hermes.Message.DataType");
var HermesJS;
(function (HermesJS) {
    /**
     * Exported proto.hermes.Message.DataType values for better accessibility
     */
    (function (DataType) {
        DataType[DataType["TEXT"] = proto.hermes.Message.DataType.TEXT] = "TEXT";
        DataType[DataType["BINARY"] = proto.hermes.Message.DataType.BINARY] = "BINARY";
        DataType[DataType["CONTROL"] = proto.hermes.Message.DataType.CONTROL] = "CONTROL";
        DataType[DataType["AUDIO"] = proto.hermes.Message.DataType.AUDIO] = "AUDIO";
        DataType[DataType["VIDEO"] = proto.hermes.Message.DataType.VIDEO] = "VIDEO";
    })(HermesJS.DataType || (HermesJS.DataType = {}));
    var DataType = HermesJS.DataType;
})(HermesJS || (HermesJS = {}));
