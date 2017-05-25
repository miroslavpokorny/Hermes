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
goog.provide("HermesJS.MimeType");
goog.require("HermesJS");
var HermesJS;
(function (HermesJS) {
    /**
     * Namespace which contains some useful mime types
     */
    var MimeType;
    (function (MimeType) {
        /**
         * Mime type for plain text
         * @type {string}
         */
        MimeType.TEXT_PLAIN = "text/plain";
        /**
         * Mime type for JSON
         * @type {string}
         */
        MimeType.APPLICATION_JSON = "application/json";
        /**
         * Mime type for WebM video with VP8 codec for video and OPUS codec for audio
         * @type {string}
         */
        MimeType.VIDEO_WEBM_VP8_OPUS = 'video/webm; codecs="opus,vp8"';
        /**
         * Mime type for WebM video with VP9 codec for video and OPUS codec for audio
         * @type {string}
         */
        MimeType.VIDEO_WEBM_VP9_OPUS = 'video/webm; codecs="opus,vp9"';
        /**
         * Mime type for WebM video with VP8 codec
         * @type {string}
         */
        MimeType.VIDEO_WEBM_VP8 = 'video/webm; codecs="vp8"';
        /**
         * Mime type for WebM video with VP9 codec
         * @type {string}
         */
        MimeType.VIDEO_WEBM_VP9 = 'video/webm; codecs="vp9"';
        /**
         * Mime type for WebM audio with OPUS codec
         * @type {string}
         */
        MimeType.AUDIO_WEBM_OPUS = 'audio/webm; codecs="opus"';
        /**
         * Mime type for Ogg audio
         * @type {string}
         */
        MimeType.AUDIO_OGG = 'audio/ogg';
        /**
         * Mime type for JPEG image
         * @type {string}
         */
        MimeType.IMAGE_JPEG = "image/jpeg";
        /**
         * Mime type for PNG image
         * @type {string}
         */
        MimeType.IMAGE_PNG = "image/png";
    })(MimeType = HermesJS.MimeType || (HermesJS.MimeType = {}));
})(HermesJS || (HermesJS = {}));
