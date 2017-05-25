
# HermesJS

TypeScript/JavaScript client for Hermes communication library. With support for binary and multimedia data.

## Connection
*HermesJS.Connection.HermesConnection* is main class used to establish a connection. Providing methods for sending data to a server:

* sendAudio(data: Uint8Array, id?: number, mimeType?: string): void
* sendBinary(data: Uint8Array, id?: number, mimeType?: string): void
* sendControl(data: ControlObject, id?: number): void
* sendText(data: string, id?: number, mimeType?: string): void
* sendVideo(data: Uint8Array, id?: number, mimeType?: string): void

For more info look at documentation at *doc* directory.

### Events
*HermesJS.Connection.HermesConnection* class support multiple events registred by *addEventListener* method. Available evetns are in table below.

Event Name | Description | Callback event object
-----------|-------------|--------------
connect | event dispatched when connection with the server is established | *HermesEvent*
disconnect | event dispatched when connection disconnect from the server | *HermesEvent*
full | event called after connect event when the communication session is full and host can not participate in communication | *HermesEvent*
ready | event called after connect event when the communication session is ready for receiving and sending data | *HermesEvent*
received | event called when some data are received (for more precise targeting of received data use *addReceivedEventListener* method) | *ReceivedEvent*
waiting | event called after connect event when the communication session is waiting for another connection before receiving and sending data | *HermesEvent*

More precise targeting of received data could be achieved by *addReceivedEventListener* method.
* addReceivedEventListener(eventType: DataType, callback: function, id?: number): void
where first parameter specify data type of received data, second specify callback function and third optional parameter ID of received data. If id parameter is omitted event will be called on all IDs filtering only data type.
The callback function for received event listener is a function with one parameter of *HermesJS.Event.ReceivedEvent* type. For more info look at documentation located at *doc* directory.

### Usage
To use this library you need to add a HermesJS.js reference to your page. HermesJS is dependent on SignalR JavaScript client so SignalR JS client library may be referenced before HermesJS. The SignalR client requires the jQuery library.
The example code below shows browser code used to establish the connection with a server.
```JavaScript
<script src="~/Scripts/jquery-1.10.2.min.js"></script>
<script src="~/Scripts/jquery.signalR-2.2.1.min.js"></script>
<script src="~/Scripts/hermesJS.js"></script>
<script type="text/javascript">
    var connection = new HermesJS.Connection.HermesConnection("/hermes");
    //TODO Set required properties of connection (sessionId, logging,...)
    connection.start();
    connection.addEventListener("ready", function () {console.log("READY")});
    connection.addReceivedEventListener(HermesJS.DataType.TEXT, function(event) {
        //TODO listener code, for text with id 132
    }, 132);
</script>
```
## Media
*HermesJS.Media.MediaHandler* is class used to share user media (webcam, microphone or both) and automatic handling of received media from another connections. For share local media use *shareUserMedia* method for stop sharing use *unshareUserMedia* method.
### Events
MediaHandler class supports two events. These two evetns are in table below.

| Event Name  | Description                                                   | Callback Event Object |
|-------------|---------------------------------------------------------------|-----------------------|
| endstream   | Event dispatched when the stream with specific ID ends        | *MediaEvent*          |
| newstream   | Event dispatched after receive and handle the new data stream | *NewStreamEvent*      |
| mediashared | Event dispatched when local media stream are being shared     | *MediaSharedEvent*    |

### Usage
```JavaScript
var media = new HermesJS.Media.MediaHandler(connection);
media.addEventListener("newstream", function (event) {...});
media.shareUserMedia({audio: false, video: true});
```
## Supported browsers
Library uses modern JavaScript APIs which may not be supported in older browsers. The HermesJS library is tested and works on:

* Firefox 51
* Google Chrome 56
* Opera 43
* EdgeHTML 14 (Edge has only partial support. Edge needs [text-encoding polyfill](https://github.com/inexorabletash/text-encoding) for basic functionality, for receiving video [vp9 codec must be enabled](https://blogs.windows.com/msedgedev/2016/04/18/webm-vp9-and-opus-support-in-microsoft-edge/#ShayI80b5XDrg2xY.97) [video with vp8 codec is not supported], sending of video is fallback-ed to sending of images)

## Edit code
The code is written in TypeScript divided into multiple files using Closure-style imports (*goog.provide* and *goog.require*). Compiled version of the library could be found in *out* directory. For more info how to download dependencies and compiler look at *SOURCE_README.md*.

## License
This project is licensed under [Apache License, Version 2.0](http://www.apache.org/licenses)
