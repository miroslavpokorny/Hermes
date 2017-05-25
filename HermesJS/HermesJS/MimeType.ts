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

namespace HermesJS {
    /**
     * Namespace which contains some useful mime types
     */
    export namespace MimeType {
        /**
         * Mime type for plain text
         * @type {string}
         */
        export const TEXT_PLAIN = "text/plain";
        /**
         * Mime type for JSON
         * @type {string}
         */
        export const APPLICATION_JSON = "application/json";
        /**
         * Mime type for WebM video with VP8 codec for video and OPUS codec for audio
         * @type {string}
         */
        export const VIDEO_WEBM_VP8_OPUS = 'video/webm; codecs="opus,vp8"';
        /**
         * Mime type for WebM video with VP9 codec for video and OPUS codec for audio
         * @type {string}
         */
        export const VIDEO_WEBM_VP9_OPUS = 'video/webm; codecs="opus,vp9"';
        /**
         * Mime type for WebM video with VP8 codec
         * @type {string}
         */
        export const VIDEO_WEBM_VP8 = 'video/webm; codecs="vp8"';
        /**
         * Mime type for WebM video with VP9 codec
         * @type {string}
         */
        export const VIDEO_WEBM_VP9 = 'video/webm; codecs="vp9"';
        /**
         * Mime type for WebM audio with OPUS codec
         * @type {string}
         */
        export const AUDIO_WEBM_OPUS = 'audio/webm; codecs="opus"';
        /**
         * Mime type for Ogg audio
         * @type {string}
         */
        export const AUDIO_OGG = 'audio/ogg';
        /**
         * Mime type for JPEG image
         * @type {string}
         */
        export const IMAGE_JPEG = "image/jpeg";
        /**
         * Mime type for PNG image
         * @type {string}
         */
        export const IMAGE_PNG = "image/png";
    }
}