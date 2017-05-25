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

/// <reference path="./ControlObject.ts"/>
/// <reference path="./Action.ts"/>

goog.provide("HermesJS.Control.RequestMediaHeaderControlObject");

goog.require("HermesJS.Control.ControlObject");
goog.require("HermesJS.Control.Action");

namespace HermesJS.Control {
    /**
     * Request media header control object which is send to server when received media does not contain required header
     * (client connect during broadcasting). Server send this class back with media header.
     */
    export class RequestMediaHeaderControlObject extends ControlObject {
        /**
         * Received stream ID which does not contain header
         */
        StreamId: number;
        /**
         * Media header encoded as Base64 string, used only in server response
         */
        MediaHeader: string;

        constructor() {
            super();
            this.Action = Action.REQUEST_MEDIA_HEADER;
        }
    }
}