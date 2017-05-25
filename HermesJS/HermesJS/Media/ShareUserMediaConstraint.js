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
goog.provide("HermesJS.Media.ShareUserMediaConstraint");
goog.require("HermesJS.Media");
var HermesJS;
(function (HermesJS) {
    var Media;
    (function (Media) {
        /**
         * ShareUserMediaConstraint namespace contain constant values which cloud be used as constraint for
         * Media.shareUserMedia() method
         */
        var ShareUserMediaConstraint;
        (function (ShareUserMediaConstraint) {
            /**
             * Constraint which try to share audio only
             * @type {MediaStreamConstraints}
             */
            ShareUserMediaConstraint.AUDIO_ONLY = { audio: true, video: false };
            /**
             * Constraint which try to share video only
             * @type {MediaStreamConstraints}
             */
            ShareUserMediaConstraint.VIDEO_ONLY = { audio: false, video: true };
            /**
             * Constraint which try to share audio and video
             * @type {MediaStreamConstraints}
             */
            ShareUserMediaConstraint.AUDIO_AND_VIDEO = { audio: true, video: true };
        })(ShareUserMediaConstraint = Media.ShareUserMediaConstraint || (Media.ShareUserMediaConstraint = {}));
    })(Media = HermesJS.Media || (HermesJS.Media = {}));
})(HermesJS || (HermesJS = {}));
