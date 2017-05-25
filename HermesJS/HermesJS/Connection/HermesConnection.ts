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

/// <reference path="./Connection.ts" />
/// <reference path="../proto/hermes/hermes-message.d.ts" />
/// <reference path="../../Scripts/typings/signalr/signalr.d.ts" />
/// <reference path="../../Scripts/typings/text-encoding/text-encoding.d.ts" />
/// <reference path="./CommunicationConstraint.ts" />
/// <reference path="../Event/HermesEvent.ts" />
/// <reference path="../Event/ReceivedEvent.ts" />
/// <reference path="./ErrorMessage.ts" />
/// <reference path="./EventName.ts" />
/// <reference path="./DefaultStreamId.ts" />
/// <reference path="../Control/ControlObject.ts" />
/// <reference path="../MimeType.ts" />
/// <reference path="../Control/ConnectControlObject.ts" />
/// <reference path="../Control/DisconnectControlObject.ts" />
/// <reference path="../Control/Action.ts" />
/// <reference path="../DataType.ts" />
/// <reference path="./Status.ts" />
/// <reference path="../Control/RequestStreamIdControlObject.ts" />

goog.provide("HermesJS.Connection.HermesConnection");

goog.require("HermesJS.Connection");
goog.require("proto.hermes.Message");
goog.require("proto.hermes.Message.DataType");
goog.require("proto.hermes.MessageCollection");
goog.require("HermesJS.Connection.CommunicationConstraint");
goog.require("HermesJS.Event.HermesEvent");
goog.require("HermesJS.Event.ReceivedEvent");
goog.require("HermesJS.Connection.ErrorMessage");
goog.require("HermesJS.Connection.EventName");
goog.require("HermesJS.Connection.DefaultStreamId");
goog.require("HermesJS.Control.ControlObject");
goog.require("HermesJS.MimeType");
goog.require("HermesJS.Control.ConnectControlObject");
goog.require("HermesJS.Control.DisconnectControlObject");
goog.require("HermesJS.Control.Action");
goog.require("HermesJS.DataType");
goog.require("HermesJS.Connection.Status");
goog.require("HermesJS.Control.RequestStreamIdControlObject");

namespace HermesJS.Connection {
    /**
     * HermesConnection class which provide main functionality for open/close connection and sending/receiving data
     */
    export class HermesConnection implements EventTarget {
        /**
         * Object which contains current communication constraints received from server after connection is established
         * @type {HermesJS.CommunicationConstraint}
         * @private
         */
        private readonly _communicationConstraint: CommunicationConstraint = new CommunicationConstraint();
        /**
         * Backing field for logging property
         * @type {boolean}
         * @private
         */
        private _logging: boolean = false;
        /**
         * URL associated with connection (communication end point)
         * @type {string}
         * @private
         */
        private readonly _url: string = "";
        /**
         * Backing field for queryString property
         * @type {string}
         * @private
         */
        private _queryString: string = "";
        /**
         * Backing field for sessionId property
         * @type {string}
         * @private
         */
        private _sessionId: string = "";
        /**
         * SignalR connection, used by this connection
         * @type {SignalR.Connection}
         * @private
         */
        private _connection: SignalR.Connection = null;
        /**
         * Backing filed for isReady property
         * @type {boolean}
         * @private
         */
        private _isReady: boolean = false;
        /**
         * Backing filed for frequency property
         * @type {number}
         * @private
         */
        private _frequency: number = 1000 / 15;
        /**
         * Array of Message which contains unsent (buffered) messages, which is flushed on interval
         * @type {Array}
         * @private
         */
        private _buffer: Array<proto.hermes.Message> = [];
        /**
         * Text encoder used to encode text messages
         * @type {TextEncoding.TextEncoderStatic}
         * @private
         */
        private _textEncoder = new TextEncoder();
        /**
         * Text decoder used to decode text messages
         * @type {TextEncoding.TextDecoderStatic}
         * @private
         */
        private _textDecoder = new TextDecoder("UTF-8");
        /**
         * 3 layer array which store received event callback functions. First array contains dataType, second array
         * contains ID of stream, third array contains callbacks
         * @type {Array}
         * @private
         */
        private _receivedCallbacks: Array<Array<Array<(event: Event.ReceivedEvent) => void>>> = [];
        /**
         * 2 layer array which store event callback functions. First array contains eventType (name), second array
         * contains callbacks
         * @type {Array}
         * @private
         */
        private _eventCallbacks: Array<Array<(event: Event.HermesEvent) => void>> = [];
        /**
         * Private property which indicate if Connect event were already fired or not.
         * @type {boolean}
         * @private
         */
        private _isEventConnectFired: boolean = false;
        /**
         * ID returned by setInterval() browser function, used for OnInterval method
         * @type {number}
         * @private
         */
        private _intervalId: number = null;

        /**
         * Get local connection ID (this is ID associated with this connection during current session)
         * @return {string}
         */
        get localConnectionId(): string {
            return this._connection.id;
        }

        /**
         * If set to true some events will be logged to console, default = false
         * @return {boolean} true if logging is enabled, false if loggign is disabled
         */
        get logging(): boolean {
            return this._logging;
        }

        /**
         * Set value of logging.
         * @param {boolean} value true for enable, false for disable
         */
        set logging(value: boolean) {
            this._logging = value;
        }

        /**
         * Gets URL of SignalR/Hermes service
         */
        get url(): string {
            return this._url;
        }

        /**
         * Gets QueryString which will be sent to server when connection is being established
         * @return {string} Query string
         */
        get queryString(): string {
            return this._queryString;
        }

        /**
         * Sets QueryString which will be sent to server when connection is being established
         * @param {string} value Query string
         */
        set queryString(value: string) {
            this._queryString = value;
        }

        /**
         * Property which indicate if connection is connected to server or not connected
         * @return {boolean} Return true if connection is connected to server otherwise return false
         */
        get isConnected(): boolean {
            return typeof this._connection !== "undefined" && this._connection !== null && this._connection.state === 1;
        }

        /**
         * Gets Session ID, used to identify connection session. Value of this property is added at begging of
         * queryString during connection start
         * @return {string} Return session ID
         */
        get sessionId(): string {
            return this._sessionId;
        }

        /**
         * Sets Session ID
         * @param {string } value Session ID
         */
        set sessionId(value: string) {
            this._sessionId = value;
        }

        /**
         * Gets SignalR connection object
         * @return {SignalR.Connection} Return SignalR connection
         */
        get connection(): SignalR.Connection {
            return this._connection;
        }

        /**
         * Indicate if connection is ready
         * @return {boolean} Return true if connection is ready, otherwise return false
         */
        get isReady(): boolean {
            return this.isConnected && this._isReady;
        }

        /**
         * Get maximal frequency of sending data to server in milliseconds, Default value is ca 66ms
         * @return {number} Return frequency in milliseconds
         */
        get frequency(): number {
            return this._frequency;
        }

        /**
         * Set maximal frequency of sending data to server in milliseconds
         * @param {number} value Frequency in milliseconds
         */
        set frequency(value: number) {
            if (value <= 0) {
                throw new RangeError(Connection.ErrorMessage.FREQUENCY_RANGE);
            }
            this._frequency = value;
        }

        /**
         * Get boolean value which says if text data type is allowed to send
         * @return {boolean} Return true if text data type is allowed, otherwise return false
         */
        get isTextDataTypeAllowed(): boolean {
            return this._communicationConstraint.TextDataTypeAllowed;
        }

        /**
         * Get boolean value which says if binary data type is allowed to send
         * @return {boolean} Return true if binary data type is allowed, otherwise return false
         */
        get isBinaryDataTypeAllowed(): boolean {
            return this._communicationConstraint.BinaryDataTypeAllowed;
        }

        /**
         * Get boolean value which says if audio data type is allowed to send
         * @return {boolean} Return true if audio data type is allowed, otherwise return false
         */
        get isAudioDataTypeAllowed(): boolean {
            return this._communicationConstraint.AudioDataTypeAllowed;
        }

        /**
         * Get boolean value which says if video data type is allowed to send
         * @return {boolean} Return true if video data type is allowed, otherwise return false
         */
        get isVideoDataTypeAllowed(): boolean {
            return this._communicationConstraint.VideoDataTypeAllowed;
        }

        /**
         * Get boolean value which says if request for stream ID is allowed
         * @return {boolean} Return true if request fo stream ID is allowed, otherwise return false
         */
        get isRequestStreamIdAllowed(): boolean {
            return this._communicationConstraint.RequestStreamIdAllowed;
        }

        /**
         * Create new instance of HermesConnection class
         * @param {string} url URL of SignalR/Hermes service
         */
        constructor(url: string) {
            this._url = url;
        }

        /**
         * Method on interval is called by interval with frequency specified in frequency property
         * @private
         */
        private onInterval() {
            if (this._buffer.length === 0) {
                return;
            }
            let messages = new proto.hermes.MessageCollection();
            for (let i = 0; i < this._buffer.length; i++) {
                let data = <Uint8Array>this._buffer[i].getData();
                if (data.byteLength === 0) {
                    continue;
                }
                messages.addMessages(this._buffer[i]);
            }
            this._buffer = [];
            let binaryWriter = new jspb.BinaryWriter();
            messages.serializeBinaryToWriter(binaryWriter);
            this.sendChunked(binaryWriter.getResultBase64String());
        }

        /**
         * Check length of data which will be send to server. If length is less than Connection.CHUNK_SIZE then send
         * data without modification. If length is grater or equal to Connection.CHUNK_SIZE then split message to
         * chunks (with size of Connection.CHUNK_SIZE) and mark each chunk with "!" at begin to indicate that data is
         * not complete. Last chunk is also marked at end with "!" char.
         * @param data
         */
        private sendChunked(data: string) {
            if (data.length < Connection.CHUNK_SIZE) {
                this.connection.send(data);
                return;
            }
            let chunks = [];
            for (let i = 0; i < data.length; i += Connection.CHUNK_SIZE) {
                chunks.push(data.substring(i, i + Connection.CHUNK_SIZE));
            }
            chunks.forEach((chunk, index, array) => {
                chunk = "!" + chunk;
                if (index === array.length - 1) {
                    chunk += "!";
                }
                this.connection.send(chunk);
            });
        }

        /**
         * Establish new connection to server based on object properties
         */
        start() {
            if (typeof this._connection !== "undefined" && this._connection !== null && this._connection.state !== 4) {
                let message = Connection.ErrorMessage.CONNECTION_ALREADY_STARTED;
                throw new Error(message);
            }
            let qs = "";
            qs += this.sessionId !== "" ? Connection.SESSION_ID_NAME + "=" + this.sessionId : "";
            qs += this.queryString !== "" ? (qs !== "" ? "&" + this.queryString : this.queryString) : "";
            this._connection = (<any>$.connection(this.url, qs, this.logging) as SignalR.Connection);
            this._connection.received((data) => this.receivedData(data));
            this._connection.start();
            this._isEventConnectFired = false;
            if (typeof this._intervalId === "undefined" || this._intervalId !== null) {
                clearInterval(this._intervalId);
            }
            this._intervalId = setInterval(() => this.onInterval(), this.frequency);
        }

        /**
         * Stop connection between client and server
         */
        stop() {
            if (typeof this._connection === "undefined" || this._connection === null || this._connection.state === 4) {
                throw new Error(Connection.ErrorMessage.NOT_CONNECTED);
            }
            clearInterval(this._intervalId);
            this._intervalId = null;
            this._connection.stop();
            this.logging && this.log("Disconnected!");
            this.callEventCallback(Connection.EventName.DISCONNECT, this._connection.id);
        }

        /**
         * Send text data to server
         * @param {string} data Text which will be sent to server
         * @param {number} id Non negative number (>=0) identifying stream Default = IConnection.DEFAULT_TEXT_STREAM_ID
         *     (2)
         * @param {string} mimeType MimeType of data, default value is empty string
         */
        sendText(data: string, id: number = Connection.DefaultStreamId.TEXT, mimeType: string = "") {
            this.checkConnection();
            if (!this.isTextDataTypeAllowed) {
                this.logging && this.log("Text data type is not allowed!");
                throw new Error(Connection.ErrorMessage.DATA_TYPE_ALLOWED);
            }
            this.checkIdRange(id);
            let message = new proto.hermes.Message();
            message.setDatatype(proto.hermes.Message.DataType.TEXT);
            message.setData(this._textEncoder.encode(data));
            message.setId(id);
            message.setMimetype(mimeType);
            this._buffer.push(message);
        }

        /**
         * Send binary data to server
         * @param {Uint8Array} data Binary data which will be sent to server
         * @param {number} id Non negative number (>=0) identifying stream Default =
         *     IConnection.DEFAULT_BINARY_STREAM_ID (3)
         * @param {string} mimeType MimeType of data, default value is empty string
         */
        sendBinary(data: Uint8Array, id: number = Connection.DefaultStreamId.BINARY, mimeType: string = "") {
            this.checkConnection();
            if (!this.isBinaryDataTypeAllowed) {
                this.logging && this.log("Binary data type is not allowed!");
                throw new Error(Connection.ErrorMessage.DATA_TYPE_ALLOWED);
            }
            this.checkIdRange(id);
            let message = new proto.hermes.Message();
            message.setDatatype(proto.hermes.Message.DataType.BINARY);
            message.setData(new Uint8Array(data));
            message.setId(id);
            message.setMimetype(mimeType);
            this._buffer.push(message);
        }

        /**
         * Send audio data to server
         * @param {Uint8Array} data Binary audio data which will be sent to server
         * @param {number} id Non negative number (>=0) identifying stream Default =
         *     IConnection.DEFAULT_AUDIO_STREAM_ID (4)
         * @param {string} mimeType MimeType of data, default value is empty string
         */
        sendAudio(data: Uint8Array, id: number = Connection.DefaultStreamId.AUDIO, mimeType: string = "") {
            this.checkConnection();
            if (!this.isAudioDataTypeAllowed) {
                this.logging && this.log("Audio data type is not allowed!");
                throw new Error(Connection.ErrorMessage.DATA_TYPE_ALLOWED);
            }
            this.checkIdRange(id);
            let message = new proto.hermes.Message();
            message.setDatatype(proto.hermes.Message.DataType.AUDIO);
            message.setData(new Uint8Array(data));
            message.setId(id);
            message.setMimetype(mimeType);
            this._buffer.push(message);
        }

        /**
         * Send video data to server (video could contain audio track)
         * @param {Uint8Array} data Binary video data which will be sent to server
         * @param {number} id Non negative number (>=0) identifying stream Default =
         *     IConnection.DEFAULT_VIDEO_STREAM_ID (5)
         * @param {string} mimeType MimeType of data, default value is empty string
         */
        sendVideo(data: Uint8Array, id: number = Connection.DefaultStreamId.VIDEO, mimeType: string = "") {
            this.checkConnection();
            if (!this.isVideoDataTypeAllowed) {
                this.logging && this.log("Video data type is not allowed!");
                throw new Error(Connection.ErrorMessage.DATA_TYPE_ALLOWED);
            }
            this.checkIdRange(id);
            let message = new proto.hermes.Message();
            message.setDatatype(proto.hermes.Message.DataType.VIDEO);
            message.setData(new Uint8Array(data));
            message.setId(id);
            message.setMimetype(mimeType);
            this._buffer.push(message);
        }

        /**
         * Send control message to server
         * @param {Control.ControlObject} data ControlObject which will be parsed to JSON and send to server Default =
         *     IConnection.DEFAULT_CONTROL_STREAM_ID (1)
         * @param {string} id Non negative number (>=0) identifying stream
         */
        sendControl(data: Control.ControlObject, id: number = Connection.DefaultStreamId.CONTROL) {
            this.checkConnection();
            this.checkIdRange(id);
            let message = new proto.hermes.Message();
            message.setDatatype(proto.hermes.Message.DataType.CONTROL);
            message.setData(this._textEncoder.encode(JSON.stringify(data)));
            message.setId(id);
            message.setMimetype(HermesJS.MimeType.APPLICATION_JSON);
            this._buffer.push(message);
        }

        /**
         * Check range of ID, only unsigned integer is allowed
         * @param {number} id
         */
        public checkIdRange(id: number) {
            if (id < 0) {
                throw new RangeError(Connection.ErrorMessage.ID_RANGE);
            }
        }

        /**
         * Check if is connected to server and throw error if not.
         * Error message is Connection.Error.NOT_CONNECTED
         */
        private checkConnection() {
            if (!this.isConnected) {
                throw new Error(Connection.ErrorMessage.NOT_CONNECTED);
            }
        }

        /**
         * Add listener function which will be called when specified message is received
         * @param {number | HermesJS.DataType} eventType Datatype of event which will be handled by callback
         * @param {(event: ReceivedEvent) => void} callback Function which will be called if specified message
         * @param {number=} id [optional] Id of stream, must be >= 0 (unsigned int), if not specified then callback
         *     function will be called on every ids.
         */
        addReceivedEventListener(eventType: HermesJS.DataType, callback: (event: Event.ReceivedEvent) => void, id?: number) {
            if (typeof id === "undefined") {
                id = Connection.NOT_SPECIFIED_ID;
            } else {
                this.checkIdRange(id);
            }
            if (!(eventType in this._receivedCallbacks)) {
                this._receivedCallbacks[eventType] = [];
            }
            if (!(id in this._receivedCallbacks[eventType])) {
                this._receivedCallbacks[eventType][id] = [];
            }
            this._receivedCallbacks[eventType][id].push(callback);
        }

        /**
         * Remove listener added by addReceivedEventListener
         * @param {number | HermesJS.DataType} eventType DataType of event
         * @param {(event: ReceivedEvent) => void} callback Callback function
         * @param {number=} id Id of stream, must be >= 0 (unsigned int), if not specified default (for all streams) id
         *     is used.
         */
        removeReceivedEventListener(eventType: proto.hermes.Message.DataType, callback: (event: Event.ReceivedEvent) => void, id?: number) {
            if (typeof id === "undefined") {
                id = Connection.NOT_SPECIFIED_ID;
            }
            if (!(eventType in this._receivedCallbacks)) {
                return;
            }
            if (!(id in this._receivedCallbacks[eventType])) {
                return;
            }
            for (let i = this._receivedCallbacks[eventType][id].length - 1; i >= 0; i--) {
                if (this._receivedCallbacks[eventType][id][i] === callback) {
                    this._receivedCallbacks[eventType][id].splice(i, 1);
                }
            }
        }

        /**
         * Call all callback functions based on DataType and Id
         * @param {Event.ReceivedEvent} event Event object which will be available in callback function
         */
        dispatchReceivedEvent(event: Event.ReceivedEvent) {
            let eventType = event.dataType;
            let id = event.id;
            if (!(eventType in this._receivedCallbacks)) {
                return;
            }
            if (id in this._receivedCallbacks[eventType]) {
                for (let i = 0; i < this._receivedCallbacks[eventType][id].length; i++) {
                    this._receivedCallbacks[eventType][id][i](event);
                }
            }
            if (Connection.NOT_SPECIFIED_ID in this._receivedCallbacks[eventType]) {
                for (let i = 0; i < this._receivedCallbacks[eventType][Connection.NOT_SPECIFIED_ID].length; i++) {
                    this._receivedCallbacks[eventType][Connection.NOT_SPECIFIED_ID][i](event);
                }
            }
        }

        /**
         * Add listener function which will be called when specified event is triggered
         * @param {string} eventName name of event. Supported events {Connect, Disconnect, ...} supported events are
         *     defined in Connection.VALID_EVENT_NAMES static property
         * @param {() => void} callback Callback function which will be called when event is triggered
         */
        addEventListener(eventName: string, callback: () => void) {
            eventName = eventName.toLowerCase();
            if (Connection.VALID_EVENT_NAMES.indexOf(eventName) === -1) {
                this.logging && this.log("EventName '" + eventName + "' is not supported event of HermesJS.Connection!");
                return;
            }
            if (!(eventName in this._eventCallbacks)) {
                this._eventCallbacks[eventName] = [];
            }
            this._eventCallbacks[eventName].push(callback);
        }

        /**
         * Remove event listener added by addEventListener method
         * @param {string} eventName Name of event (valid event names are specified in Connection.EventName namespace)
         * @param {(event: HermesEvent)=>void} callback Callback function
         */
        removeEventListener(eventName: string, callback: (event: Event|Event.HermesEvent) => void) {
            eventName = eventName.toLowerCase();
            if (!(eventName in this._eventCallbacks)) {
                return;
            }
            for (let i = this._eventCallbacks[eventName].length - 1; i >= 0; i--) {
                if (this._eventCallbacks[eventName][i] === callback) {
                    this._eventCallbacks[eventName].splice(i, 1);
                }
            }
        }

        /**
         * Call all callbacks associated with specified event name
         * @param {Event.HermesEvent} event Event object which will be available in callback function
         */
        dispatchEvent(event: Event|Event.HermesEvent): boolean {
            let type = event.type.toLowerCase();
            if (!(type in this._eventCallbacks)) {
                return;
            }
            for (let i = 0; i < this._eventCallbacks[type].length; i++) {
                this._eventCallbacks[type][i](event);
            }
        }

        /**
         * Method which trigger event
         * @param {string} eventName Name of event
         * @param {string} origin Connection ID which is responsible for event
         */
        private callEventCallback(eventName: string, origin: string = "") {
            let event = new Event.HermesEvent(eventName.toLowerCase(), origin);
            this.dispatchEvent(event);
        }

        /**
         * Method which is called when data are received from server. This method deserialize data and execute next
         * method based on dataType (eg. receivedText, receivedBinary,...).
         * @param data Data received from server
         */
        private receivedData(data: any) {
            let messages = proto.hermes.MessageCollection.deserializeBinary(data);
            messages.getMessagesList().forEach((message) => {
                switch (message.getDatatype()) {
                    case proto.hermes.Message.DataType.TEXT:
                        this.receivedText(this._textDecoder.decode(<Uint8Array>message.getData()), message.getId(), message.getMimetype(), message.getOrigin());
                        break;
                    case proto.hermes.Message.DataType.BINARY:
                        this.receivedBinary(<Uint8Array>message.getData(), message.getId(), message.getMimetype(), message.getOrigin());
                        break;
                    case proto.hermes.Message.DataType.CONTROL:
                        this.receivedControl(this._textDecoder.decode(<Uint8Array>message.getData()), message.getId(), message.getMimetype(), message.getOrigin());
                        break;
                    case proto.hermes.Message.DataType.AUDIO:
                        this.receivedAudio(<Uint8Array>message.getData(), message.getId(), message.getMimetype(), message.getOrigin());
                        break;
                    case proto.hermes.Message.DataType.VIDEO:
                        this.receivedVideo(<Uint8Array>message.getData(), message.getId(), message.getMimetype(), message.getOrigin());
                        break;
                    default:
                        throw new Error(Connection.ErrorMessage.ARGUMENT_OUT_OF_RANGE);
                }
            });
        }

        /**
         * Method which is called when control message is received. It catch some default (connect, disconnect) control
         * message and process them. If some non default control message is received then received callback is called.
         * @param {string} data Received data in textual representation
         * @param {number} id Stream ID of received message
         * @param {string} mimeType Mime type of received data
         * @param {string} origin Connection ID which is responsible for control message
         */
        private receivedControl(data: string, id: number, mimeType: string, origin: string) {
            let controlObject = <Control.ControlObject>JSON.parse(data);
            switch (controlObject.Action) {
                case Control.Action.CONNECT:
                    if (!this._isEventConnectFired) {
                        this._isEventConnectFired = true;
                        this.logging && this.log("Connected!");
                        this.setConstraints((<Control.ConnectControlObject>controlObject).Constraint);
                        this.callEventCallback(Connection.EventName.CONNECT);
                    }
                    this.receivedControlConnect(<Control.ConnectControlObject>controlObject, id, mimeType, origin);
                    break;
                case Control.Action.DISCONNECT:
                    this.receivedControlDisconnect(<Control.DisconnectControlObject>controlObject, id, mimeType, origin);
                    break;
                default:
                    this.receivedCallback(DataType.CONTROL, controlObject, id, mimeType, origin);
            }
        }

        /**
         * Method called when connect control object is received. It check status of connection and fire event.
         * Possible events are: waiting, ready, full (after full disconnect is also fired)
         * @param {Control.ConnectControlObject} controlObject Connect control object
         * @param {number} id Stream ID of received control object
         * @param {string} mimeType Mime type of received data
         * @param {string} origin Connection ID which is responsible for control message
         */
        private receivedControlConnect(controlObject: Control.ConnectControlObject, id: number, mimeType: string, origin: string) {
            switch (controlObject.Status) {
                case Connection.Status.WAITING:
                    this.sessionId = controlObject.SessionId;
                    this.logging && this.log("Waiting for another connection!");
                    this.callEventCallback(Connection.EventName.WAITING, origin);
                    break;
                case Connection.Status.READY:
                    if (this._isReady === true) {
                        return;
                    }
                    this.sessionId = controlObject.SessionId;
                    this._isReady = true;
                    this.logging && this.log("Connection is ready!");
                    this.callEventCallback(Connection.EventName.READY, origin);
                    break;
                case Connection.Status.FULL:
                    clearInterval(this._intervalId);
                    this._intervalId = null;
                    this.connection.stop();
                    this.logging && this.log("Connection session is full!");
                    this.callEventCallback(Connection.EventName.FULL, origin);
                    this.callEventCallback(Connection.EventName.DISCONNECT, origin);
                    break;
                case Connection.Status.DISCONNECTED:
                    clearInterval(this._intervalId);
                    this._intervalId = null;
                    this.connection.stop();
                    this.logging && this.log("Disconnected!");
                    this.callEventCallback(Connection.EventName.DISCONNECT, origin);
                    break;
                default:
                    throw new Error(Connection.ErrorMessage.ARGUMENT_OUT_OF_RANGE);
            }
        }

        /**
         * Set properties of readonly variable _communicationConstraint
         * @param {CommunicationConstraint} constraints Constraint object
         */
        private setConstraints(constraints: CommunicationConstraint) {
            this._communicationConstraint.AudioDataTypeAllowed = constraints.AudioDataTypeAllowed;
            this._communicationConstraint.VideoDataTypeAllowed = constraints.VideoDataTypeAllowed;
            this._communicationConstraint.BinaryDataTypeAllowed = constraints.BinaryDataTypeAllowed;
            this._communicationConstraint.TextDataTypeAllowed = constraints.TextDataTypeAllowed;
            this._communicationConstraint.RequestStreamIdAllowed = constraints.RequestStreamIdAllowed
        }

        /**
         * Method called when disconnect control object is received. It check status of connection, if status is
         * disconnect then stop connection with server and fire disconnect event. If status is ready or waiting then
         * fire Received event callback, if connection status is waiting then also waiting event is fired
         * @param {Control.DisconnectControlObject} controlObject
         * @param {number} id Stream ID of received control object
         * @param {string} mimeType Mime type of received data
         * @param {string} origin Connection ID which is responsible for control message
         */
        private receivedControlDisconnect(controlObject: Control.DisconnectControlObject, id: number, mimeType: string, origin: string) {
            switch (controlObject.Status) {
                case Connection.Status.DISCONNECTED:
                    clearInterval(this._intervalId);
                    this._intervalId = null;
                    this.connection.stop();
                    this.logging && this.log("Disconnected!");
                    this.callEventCallback(Connection.EventName.DISCONNECT, origin);
                    break;
                case Connection.Status.READY:
                    this.logging && this.log("Somebody has disconnected, connection is still in ready state!");
                    this.receivedCallback(DataType.CONTROL, controlObject, id, mimeType, origin);
                    break;
                case Connection.Status.WAITING:
                    this.logging && this.log("Somebody has disconnected, connection is in waiting state!");
                    this.receivedCallback(DataType.CONTROL, controlObject, id, mimeType, origin);
                    this._isReady = false;
                    this.callEventCallback(Connection.EventName.WAITING, origin);
                    break;
                default:
                    throw new Error(Connection.ErrorMessage.ARGUMENT_OUT_OF_RANGE);
            }
        }

        /**
         * Method which is called when Textual data are received. Call registered received callback functions.
         * @param {string} data Received data in textual representation
         * @param {number} id Stream ID of received data
         * @param {string} mimeType Mime type of received data
         * @param {string} origin Connection ID which originate data (message)
         */
        private receivedText(data: string, id: number, mimeType: string, origin: string) {
            this.receivedCallback(HermesJS.DataType.TEXT, data, id, mimeType, origin);
        }

        /**
         * Method which is called when Binary data are received. Call registered received callback functions.
         * @param {Uint8Array} data Received data in binary representation
         * @param {number} id Stream ID of received data
         * @param {string} mimeType Mime type of received data
         * @param {string} origin Connection ID which originate data (message)
         */
        private receivedBinary(data: Uint8Array, id: number, mimeType: string, origin: string) {
            this.receivedCallback(HermesJS.DataType.BINARY, data, id, mimeType, origin);
        }

        /**
         * Method which is called when Audio data are received. Call registered received callback functions.
         * @param {Uint8Array} data Received audio data in binary representation
         * @param {number} id Stream ID of received data
         * @param {string} mimeType Mime type of received data
         * @param {string} origin Connection ID which originate data (message)
         */
        private receivedAudio(data: Uint8Array, id: number, mimeType: string, origin: string) {
            this.receivedCallback(HermesJS.DataType.AUDIO, data, id, mimeType, origin);
        }

        /**
         * Method which is called when Video data are received. Call registered received callback functions.
         * @param {Uint8Array} data Received video data in binary representation
         * @param {number} id Stream ID of received data
         * @param {string} mimeType Mime type of received data
         * @param {string} origin Connection ID which originate data (message)
         */
        private receivedVideo(data: Uint8Array, id: number, mimeType: string, origin: string) {
            this.receivedCallback(HermesJS.DataType.VIDEO, data, id, mimeType, origin);
        }

        /**
         * Create ReceivedEvent and dispatch ReceivedEvent callbacks + dispatchEvent
         * @param {HermesJS.DataType} dataType Data type of received data
         * @param {string|Uint8Array|Control.ControlObject} data Received data in textual, binary or ControlObject form
         * @param {number} id Stream ID of received data
         * @param {string} mimeType Mime type of received data
         * @param {string} origin Connection ID which originate data (message)
         */
        private receivedCallback(dataType: HermesJS.DataType, data: string|Uint8Array|Control.ControlObject, id: number, mimeType: string, origin: string) {
            let event = new Event.ReceivedEvent(data, dataType, id, mimeType, origin);
            this.dispatchReceivedEvent(event);
            this.dispatchEvent(event);
        }

        /**
         * Send request for new unique stream ID to server. Server may send unique id in Control message
         * @param {number=} controlStreamId ID of control stream used by this request. Response come with same message
         *     ID. If not used Default control stream is used.
         */
        requestStreamId(controlStreamId: number = Connection.DefaultStreamId.CONTROL) {
            if (!this.isRequestStreamIdAllowed) {
                throw new Error(Connection.ErrorMessage.REQUEST_STREAM_ID_ALLOWED);
            }
            let requestStreamIdControlObject = new Control.RequestStreamIdControlObject();
            this.sendControl(requestStreamIdControlObject, controlStreamId);
        }

        /**
         * Write message to browser's console, also add header (date + library information) before message
         * @param {string} message Message which will be written to console
         * @param {boolean} forceLog If set to true then write message to console if logging is disabled (logging
         *     property is set to true), if set to false write message only if logging is enabled, default = false
         */
        private log(message: string, forceLog: boolean = false) {
            if (this.logging || forceLog) {
                console.log("[" + new Date().toTimeString() + "] HermesJS: " + message);
            }
        }
    }
}