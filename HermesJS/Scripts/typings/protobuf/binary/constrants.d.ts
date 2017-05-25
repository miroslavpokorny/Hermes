
declare module jsproto {
    interface BinaryExtension{}
}
declare module jspb {

    interface ConstBinaryMessage {
    }

    interface BinaryMessage extends jspb.ConstBinaryMessage {
    }

    /**
     * The types convertible to Uint8Arrays. Strings are assumed to be
     * base64-encoded.
     * @typedef {ArrayBuffer|Uint8Array|Array<number>|string}
     */
    type ByteSource = ArrayBuffer|Uint8Array|number[]|string;

    /**
     * A scalar field in jspb can be a boolean, number, or string.
     * @typedef {boolean|number|string}
     */
    type ScalarFieldType = boolean|number|string;

    /**
     * A repeated field in jspb is an array of scalars, blobs, or messages.
     * @typedef {!Array<jspb.ScalarFieldType>|
                 !Array<!Uint8Array>|
                 !Array<!jspb.BinaryMessage>}
     */
    type RepeatedFieldType = jspb.ScalarFieldType[]|Uint8Array[]|jspb.BinaryMessage[];

    /**
     * A field in jspb can be a scalar, a block of bytes, another proto, or an
     * array of any of the above.
     * @typedef {jspb.ScalarFieldType|
                 jspb.RepeatedFieldType|
                 !Uint8Array|
                 !jspb.BinaryMessage|
                 !jsproto.BinaryExtension}
     */
    type AnyFieldType = jspb.ScalarFieldType|jspb.RepeatedFieldType|Uint8Array|jspb.BinaryMessage|jsproto.BinaryExtension;

    /**
     * A builder function creates an instance of a message object.
     * @typedef {function():!jspb.BinaryMessage}
     */
    interface BuilderFunction {
        (): jspb.BinaryMessage
    }

    /**
     * A cloner function creates a deep copy of a message object.
     * @typedef {function(jspb.ConstBinaryMessage):jspb.BinaryMessage}
     */
    interface ClonerFunction {
        (_0: jspb.ConstBinaryMessage): jspb.BinaryMessage
    }

    /**
     * A recycler function destroys an instance of a message object.
     * @typedef {function(!jspb.BinaryMessage):void}
     */
    interface RecyclerFunction {
        (_0: jspb.BinaryMessage): void
    }

    /**
     * A reader function initializes a message using data from a BinaryReader.
     * @typedef {function(!jspb.BinaryMessage, !jspb.BinaryReader):void}
     */
    interface ReaderFunction {
        (_0: jspb.BinaryMessage, _1: jspb.BinaryReader): void
    }

    /**
     * A writer function serializes a message to a BinaryWriter.
     * @typedef {function((!jspb.Message|!jspb.ConstBinaryMessage),
     *                    !jspb.BinaryWriter):void}
     */
    interface WriterFunction {
        (_0: jspb.Message|jspb.ConstBinaryMessage, _1: jspb.BinaryWriter): void
    }

    /**
     * A pruner function removes default-valued fields and empty submessages from a
     * message and returns either the pruned message or null if the entire message
     * was pruned away.
     * @typedef {function(?jspb.BinaryMessage):?jspb.BinaryMessage}
     */
    interface PrunerFunction {
        (_0: jspb.BinaryMessage): jspb.BinaryMessage
    }

    /**
     * A comparer function returns true if two protos are equal.
     * @typedef {!function(?jspb.ConstBinaryMessage,
     *                     ?jspb.ConstBinaryMessage):boolean}
     */
    interface ComparerFunction {
        (_0: jspb.ConstBinaryMessage, _1: jspb.ConstBinaryMessage): boolean
    }
}

declare module jspb.BinaryConstants {

    /**
     * Field type codes, taken from proto2/public/wire_format_lite.h.
     * @enum {number}
     */
    enum FieldType { INVALID, DOUBLE, FLOAT, INT64, UINT64, INT32, FIXED64, FIXED32, BOOL, STRING, GROUP, MESSAGE, BYTES, UINT32, ENUM, SFIXED32, SFIXED64, SINT32, SINT64, FHASH64, VHASH64 }

    /**
     * Wire-format type codes, taken from proto2/public/wire_format_lite.h.
     * @enum {number}
     */
    enum WireType { INVALID, VARINT, FIXED64, DELIMITED, START_GROUP, END_GROUP, FIXED32 }

    /**
     * Translates field type to wire type.
     * @param {jspb.BinaryConstants.FieldType} fieldType
     * @return {jspb.BinaryConstants.WireType}
     */
    function FieldTypeToWireType(fieldType: jspb.BinaryConstants.FieldType): jspb.BinaryConstants.WireType;

    /**
     * Flag to indicate a missing field.
     * @const {number}
     */
    var INVALID_FIELD_NUMBER: any /*missing*/;

    /**
     * The smallest denormal float32 value.
     * @const {number}
     */
    var FLOAT32_EPS: any /*missing*/;

    /**
     * The smallest normal float64 value.
     * @const {number}
     */
    var FLOAT32_MIN: any /*missing*/;

    /**
     * The largest finite float32 value.
     * @const {number}
     */
    var FLOAT32_MAX: any /*missing*/;

    /**
     * The smallest denormal float64 value.
     * @const {number}
     */
    var FLOAT64_EPS: any /*missing*/;

    /**
     * The smallest normal float64 value.
     * @const {number}
     */
    var FLOAT64_MIN: any /*missing*/;

    /**
     * The largest finite float64 value.
     * @const {number}
     */
    var FLOAT64_MAX: any /*missing*/;

    /**
     * Convenience constant equal to 2^20.
     * @const {number}
     */
    var TWO_TO_20: any /*missing*/;

    /**
     * Convenience constant equal to 2^23.
     * @const {number}
     */
    var TWO_TO_23: any /*missing*/;

    /**
     * Convenience constant equal to 2^31.
     * @const {number}
     */
    var TWO_TO_31: any /*missing*/;

    /**
     * Convenience constant equal to 2^32.
     * @const {number}
     */
    var TWO_TO_32: any /*missing*/;

    /**
     * Convenience constant equal to 2^52.
     * @const {number}
     */
    var TWO_TO_52: any /*missing*/;

    /**
     * Convenience constant equal to 2^63.
     * @const {number}
     */
    var TWO_TO_63: any /*missing*/;

    /**
     * Convenience constant equal to 2^64.
     * @const {number}
     */
    var TWO_TO_64: any /*missing*/;

    /**
     * Eight-character string of zeros, used as the default 64-bit hash value.
     * @const {string}
     */
    var ZERO_HASH: any /*missing*/;
}
