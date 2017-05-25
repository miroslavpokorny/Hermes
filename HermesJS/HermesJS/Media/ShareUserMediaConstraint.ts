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

namespace HermesJS.Media {
    /**
     * ShareUserMediaConstraint namespace contain constant values which cloud be used as constraint for
     * Media.shareUserMedia() method
     */
    export namespace ShareUserMediaConstraint {
        /**
         * Constraint which try to share audio only
         * @type {MediaStreamConstraints}
         */
        export const AUDIO_ONLY: MediaStreamConstraints = {audio: true, video: false};
        /**
         * Constraint which try to share video only
         * @type {MediaStreamConstraints}
         */
        export const VIDEO_ONLY: MediaStreamConstraints = {audio: false, video: true};
        /**
         * Constraint which try to share audio and video
         * @type {MediaStreamConstraints}
         */
        export const AUDIO_AND_VIDEO: MediaStreamConstraints = {audio: true, video: true};
    }
}