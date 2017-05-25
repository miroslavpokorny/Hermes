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
/// <reference path="./Media.ts" />
goog.provide("HermesJS.Media.WebMElement");
goog.require("HermesJS.Media");
var HermesJS;
(function (HermesJS) {
    var Media;
    (function (Media) {
        /**
         * Namespace which contains WebM container element identifier values
         */
        var WebMElement;
        (function (WebMElement) {
            /**
             * Main element of WebM file (4 Bytes value)
             * @type {number}
             */
            WebMElement.EBML = 0x1a45dfa3;
            /**
             * Cluster element of WebM file (4 Bytes value)
             * @type {number}
             */
            WebMElement.CLUSTER = 0x1f43b675;
            /**
             * Cluster element of WebM file (4 Bytes value) (Chrome like browsers (Chrome, Opera) send first byte of
             * next cluster in previous data chunk and has unknown size of cluster [unknown size of cluster is in EBML
             * file value 01 FF FF FF FF FF FF FF] so start of chrome cluster look like 3 bytes from cluster and 1
             * (first) byte from cluster size)
             * @type {number}
             */
            WebMElement.CHROME_CLUSTER = 0x43b67501;
        })(WebMElement = Media.WebMElement || (Media.WebMElement = {}));
    })(Media = HermesJS.Media || (HermesJS.Media = {}));
})(HermesJS || (HermesJS = {}));
