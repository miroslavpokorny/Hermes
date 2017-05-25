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

namespace HermesJS {
    /**
     * Exported proto.hermes.Message.DataType values for better accessibility
     */
    export enum DataType {
        TEXT = <number>proto.hermes.Message.DataType.TEXT,
        BINARY = <number>proto.hermes.Message.DataType.BINARY,
        CONTROL = <number>proto.hermes.Message.DataType.CONTROL,
        AUDIO = <number>proto.hermes.Message.DataType.AUDIO,
        VIDEO = <number>proto.hermes.Message.DataType.VIDEO,
    }
}