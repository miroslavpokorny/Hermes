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

goog.provide("HermesJS.Control.StopStreamControlObject");

goog.require("HermesJS.Control.ControlObject");
goog.require("HermesJS.Control.Action");

namespace HermesJS.Control {
    /**
     * Stop stream control object class is used when client stop sending some media stream (audio, video). Server use
     * this control object to inform all clients that stream ended.
     */
    export class StopStreamControlObject extends ControlObject {
        /**
         * ID of stream which end
         */
        StreamId: number;

        constructor() {
            super();
            this.Action = Action.STOP_STREAM
        }
    }
}