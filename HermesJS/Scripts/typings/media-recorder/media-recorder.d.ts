//Type definitions for MediaRecorder API
/**
 * Copyright (c) 2017 Miroslav Pokorný
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

interface MediaRecorderOptions {
    mimeType?: string;
    audioBitsPerSecond?: number;
    videoBitsPerSecond?: number;
    bitsPerSecond?: number;
}

interface BlobEvent extends Event {
    //constructor(type: string, {data: Blob});
    data: Blob;
}

declare var BlobEvent: {
    prototype: BlobEvent,
    new(type: string, {data: blob}): BlobEvent
}

interface MediaRecorder extends EventTarget {
    //constructor (stream: MediaStream, options?: MediaRecorderOptions);
    readonly mimeType: string;
    readonly state: string;
    readonly stream: MediaStream;
    ignoreMutedMedia: boolean;
    readonly videoBitsPerSecond: number;
    readonly audioBitsPerSecond: number;
    //static isTypeSupported(mimeType: string): boolean;
    pause();
    requestData();
    resume();
    start(timeslice?: number);
    stop();
    ondataavailable: (event: BlobEvent) => void;
    onerror: (event: ErrorEvent) => void;
    onpause: (event: Event) => void;
    onresume: (event: Event) => void;
    onstart: (event: Event) => void;
    onstop: (event: Event) => void;
}

declare var MediaRecorder: {
    prototype: MediaRecorder,
    new (stream: MediaStream, options?: MediaRecorderOptions): MediaRecorder,
    isTypeSupported(mimeType: string): boolean;
}
