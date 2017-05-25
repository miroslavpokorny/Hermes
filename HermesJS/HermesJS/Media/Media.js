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
goog.provide("HermesJS.Media");
goog.require("HermesJS");
var HermesJS;
(function (HermesJS) {
    var Media;
    (function (Media) {
        /**
         * Default stream ID for HermesJS.Media control communication
         * @type {number}
         */
        Media.HERMESJS_MEDIA_CONTROL_STREAM_ID = 6;
        /**
         * Begin of range for unique ID generation
         * @type {number}
         */
        Media.UNIQUE_ID_RANGE_START = 50000;
    })(Media = HermesJS.Media || (HermesJS.Media = {}));
})(HermesJS || (HermesJS = {}));
