
declare module jspb {

    class BinaryReader extends BinaryReader__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BinaryReader__Class  {

        /**
         * BinaryReader implements the decoders for all the wire types specified in
         * https://developers.google.com/protocol-buffers/docs/encoding.
         *
         * @param {jspb.ByteSource=} opt_bytes The bytes we're reading from.
         * @param {number=} opt_start The optional offset to start reading at.
         * @param {number=} opt_length The optional length of the block to read -
         *     we'll throw an assertion if we go off the end of the block.
         * @constructor
         * @struct
         */
        constructor(opt_bytes?: jspb.ByteSource, opt_start?: number, opt_length?: number);

        /**
         * Alias for the above method.
         * @param {jspb.ByteSource=} opt_bytes The bytes we're reading from.
         * @param {number=} opt_start The optional offset to start reading at.
         * @param {number=} opt_length The optional length of the block to read -
         *     we'll throw an assertion if we go off the end of the block.
         * @return {!jspb.BinaryReader}
         */
        alloc(opt_bytes?: jspb.ByteSource, opt_start?: number, opt_length?: number): jspb.BinaryReader;

        /**
         * Puts this instance back in the instance cache.
         */
        free(): void;

        /**
         * Returns the cursor immediately before the current field's tag.
         * @return {number} The internal read cursor.
         */
        getFieldCursor(): number;

        /**
         * Returns the internal read cursor.
         * @return {number} The internal read cursor.
         */
        getCursor(): number;

        /**
         * Returns the raw buffer.
         * @return {?Uint8Array} The raw buffer.
         */
        getBuffer(): Uint8Array;

        /**
         * @return {number} The field number of the next field in the buffer, or
         *     INVALID_FIELD_NUMBER if there is no next field.
         */
        getFieldNumber(): number;

        /**
         * @return {jspb.BinaryConstants.WireType} The wire type of the next field
         *     in the stream, or WireType.INVALID if there is no next field.
         */
        getWireType(): jspb.BinaryConstants.WireType;

        /**
         * @return {boolean} Whether the current wire type is an end-group tag. Used as
         * an exit condition in decoder loops in generated code.
         */
        isEndGroup(): boolean;

        /**
         * Returns true if this reader hit an error due to corrupt data.
         * @return {boolean}
         */
        getError(): boolean;

        /**
         * Points this reader at a new block of bytes.
         * @param {!Uint8Array} bytes The block of bytes we're reading from.
         * @param {number} start The offset to start reading at.
         * @param {number} length The length of the block to read.
         */
        setBlock(bytes: Uint8Array, start: number, length: number): void;

        /**
         * Rewinds the stream cursor to the beginning of the buffer and resets all
         * internal state.
         */
        reset(): void;

        /**
         * Advances the stream cursor by the given number of bytes.
         * @param {number} count The number of bytes to advance by.
         */
        advance(count: number): void;

        /**
         * Reads the next field header in the stream if there is one, returns true if
         * we saw a valid field header or false if we've read the whole stream.
         * Throws an error if we encountered a deprecated START_GROUP/END_GROUP field.
         * @return {boolean} True if the stream contains more fields.
         */
        nextField(): boolean;

        /**
         * Winds the reader back to just before this field's header.
         */
        unskipHeader(): void;

        /**
         * Skips all contiguous fields whose header matches the one we just read.
         */
        skipMatchingFields(): void;

        /**
         * Skips over the next varint field in the binary stream.
         */
        skipVarintField(): void;

        /**
         * Skips over the next delimited field in the binary stream.
         */
        skipDelimitedField(): void;

        /**
         * Skips over the next fixed32 field in the binary stream.
         */
        skipFixed32Field(): void;

        /**
         * Skips over the next fixed64 field in the binary stream.
         */
        skipFixed64Field(): void;

        /**
         * Skips over the next group field in the binary stream.
         */
        skipGroup(): void;

        /**
         * Skips over the next field in the binary stream - this is useful if we're
         * decoding a message that contain unknown fields.
         */
        skipField(): void;

        /**
         * Registers a user-defined read callback.
         * @param {string} callbackName
         * @param {function(!jspb.BinaryReader):*} callback
         */
        registerReadCallback(callbackName: string, callback: { (_0: jspb.BinaryReader): any }): void;

        /**
         * Runs a registered read callback.
         * @param {string} callbackName The name the callback is registered under.
         * @return {*} The value returned by the callback.
         */
        runReadCallback(callbackName: string): any;

        /**
         * Reads a field of any valid non-message type from the binary stream.
         * @param {jspb.BinaryConstants.FieldType} fieldType
         * @return {jspb.AnyFieldType}
         */
        readAny(fieldType: jspb.BinaryConstants.FieldType): jspb.AnyFieldType;

        /**
         * Deserialize a proto into the provided message object using the provided
         * reader function. This function is templated as we currently have one client
         * who is using manual deserialization instead of the code-generated versions.
         * @template T
         * @param {T} message
         * @param {function(T, !jspb.BinaryReader)} reader
         */
        readMessage<T>(message: T, reader: { (_0: T, _1: jspb.BinaryReader): any /*missing*/ }): void;

        /**
         * Deserialize a proto into the provided message object using the provided
         * reader function, assuming that the message is serialized as a group
         * with the given tag.
         * @template T
         * @param {number} field
         * @param {T} message
         * @param {function(T, !jspb.BinaryReader)} reader
         */
        readGroup<T>(field: number, message: T, reader: { (_0: T, _1: jspb.BinaryReader): any /*missing*/ }): void;

        /**
         * Return a decoder that wraps the current delimited field.
         * @return {!jspb.BinaryDecoder}
         */
        getFieldDecoder(): jspb.BinaryDecoder;

        /**
         * Reads a signed 32-bit integer field from the binary stream, or throws an
         * error if the next field in the stream is not of the correct wire type.
         *
         * @return {number} The value of the signed 32-bit integer field.
         */
        readInt32(): number;

        /**
         * Reads a signed 32-bit integer field from the binary stream, or throws an
         * error if the next field in the stream is not of the correct wire type.
         *
         * Returns the value as a string.
         *
         * @return {string} The value of the signed 32-bit integer field as a decimal
         * string.
         */
        readInt32String(): string;

        /**
         * Reads a signed 64-bit integer field from the binary stream, or throws an
         * error if the next field in the stream is not of the correct wire type.
         *
         * @return {number} The value of the signed 64-bit integer field.
         */
        readInt64(): number;

        /**
         * Reads a signed 64-bit integer field from the binary stream, or throws an
         * error if the next field in the stream is not of the correct wire type.
         *
         * Returns the value as a string.
         *
         * @return {string} The value of the signed 64-bit integer field as a decimal
         * string.
         */
        readInt64String(): string;

        /**
         * Reads an unsigned 32-bit integer field from the binary stream, or throws an
         * error if the next field in the stream is not of the correct wire type.
         *
         * @return {number} The value of the unsigned 32-bit integer field.
         */
        readUint32(): number;

        /**
         * Reads an unsigned 32-bit integer field from the binary stream, or throws an
         * error if the next field in the stream is not of the correct wire type.
         *
         * Returns the value as a string.
         *
         * @return {string} The value of the unsigned 32-bit integer field as a decimal
         * string.
         */
        readUint32String(): string;

        /**
         * Reads an unsigned 64-bit integer field from the binary stream, or throws an
         * error if the next field in the stream is not of the correct wire type.
         *
         * @return {number} The value of the unsigned 64-bit integer field.
         */
        readUint64(): number;

        /**
         * Reads an unsigned 64-bit integer field from the binary stream, or throws an
         * error if the next field in the stream is not of the correct wire type.
         *
         * Returns the value as a string.
         *
         * @return {string} The value of the unsigned 64-bit integer field as a decimal
         * string.
         */
        readUint64String(): string;

        /**
         * Reads a signed zigzag-encoded 32-bit integer field from the binary stream,
         * or throws an error if the next field in the stream is not of the correct
         * wire type.
         *
         * @return {number} The value of the signed 32-bit integer field.
         */
        readSint32(): number;

        /**
         * Reads a signed zigzag-encoded 64-bit integer field from the binary stream,
         * or throws an error if the next field in the stream is not of the correct
         * wire type.
         *
         * @return {number} The value of the signed 64-bit integer field.
         */
        readSint64(): number;

        /**
         * Reads an unsigned 32-bit fixed-length integer fiield from the binary stream,
         * or throws an error if the next field in the stream is not of the correct
         * wire type.
         *
         * @return {number} The value of the double field.
         */
        readFixed32(): number;

        /**
         * Reads an unsigned 64-bit fixed-length integer fiield from the binary stream,
         * or throws an error if the next field in the stream is not of the correct
         * wire type.
         *
         * @return {number} The value of the float field.
         */
        readFixed64(): number;

        /**
         * Reads a signed 32-bit fixed-length integer fiield from the binary stream, or
         * throws an error if the next field in the stream is not of the correct wire
         * type.
         *
         * @return {number} The value of the double field.
         */
        readSfixed32(): number;

        /**
         * Reads a signed 64-bit fixed-length integer fiield from the binary stream, or
         * throws an error if the next field in the stream is not of the correct wire
         * type.
         *
         * @return {number} The value of the float field.
         */
        readSfixed64(): number;

        /**
         * Reads a 32-bit floating-point field from the binary stream, or throws an
         * error if the next field in the stream is not of the correct wire type.
         *
         * @return {number} The value of the float field.
         */
        readFloat(): number;

        /**
         * Reads a 64-bit floating-point field from the binary stream, or throws an
         * error if the next field in the stream is not of the correct wire type.
         *
         * @return {number} The value of the double field.
         */
        readDouble(): number;

        /**
         * Reads a boolean field from the binary stream, or throws an error if the next
         * field in the stream is not of the correct wire type.
         *
         * @return {boolean} The value of the boolean field.
         */
        readBool(): boolean;

        /**
         * Reads an enum field from the binary stream, or throws an error if the next
         * field in the stream is not of the correct wire type.
         *
         * @return {number} The value of the enum field.
         */
        readEnum(): number;

        /**
         * Reads a string field from the binary stream, or throws an error if the next
         * field in the stream is not of the correct wire type.
         *
         * @return {string} The value of the string field.
         */
        readString(): string;

        /**
         * Reads a length-prefixed block of bytes from the binary stream, or returns
         * null if the next field in the stream has an invalid length value.
         *
         * @return {!Uint8Array} The block of bytes.
         */
        readBytes(): Uint8Array;

        /**
         * Reads a 64-bit varint or fixed64 field from the stream and returns it as a
         * 8-character Unicode string for use as a hash table key, or throws an error
         * if the next field in the stream is not of the correct wire type.
         *
         * @return {string} The hash value.
         */
        readVarintHash64(): string;

        /**
         * Reads a 64-bit varint or fixed64 field from the stream and returns it as a
         * 8-character Unicode string for use as a hash table key, or throws an error
         * if the next field in the stream is not of the correct wire type.
         *
         * @return {string} The hash value.
         */
        readFixedHash64(): string;

        /**
         * Reads a packed int32 field, which consists of a length header and a list of
         * signed varints.
         * @return {!Array.<number>}
         */
        readPackedInt32(): number[];

        /**
         * Reads a packed int32 field, which consists of a length header and a list of
         * signed varints. Returns a list of strings.
         * @return {!Array.<string>}
         */
        readPackedInt32String(): string[];

        /**
         * Reads a packed int64 field, which consists of a length header and a list of
         * signed varints.
         * @return {!Array.<number>}
         */
        readPackedInt64(): number[];

        /**
         * Reads a packed int64 field, which consists of a length header and a list of
         * signed varints. Returns a list of strings.
         * @return {!Array.<string>}
         */
        readPackedInt64String(): string[];

        /**
         * Reads a packed uint32 field, which consists of a length header and a list of
         * unsigned varints.
         * @return {!Array.<number>}
         */
        readPackedUint32(): number[];

        /**
         * Reads a packed uint32 field, which consists of a length header and a list of
         * unsigned varints. Returns a list of strings.
         * @return {!Array.<string>}
         */
        readPackedUint32String(): string[];

        /**
         * Reads a packed uint64 field, which consists of a length header and a list of
         * unsigned varints.
         * @return {!Array.<number>}
         */
        readPackedUint64(): number[];

        /**
         * Reads a packed uint64 field, which consists of a length header and a list of
         * unsigned varints. Returns a list of strings.
         * @return {!Array.<string>}
         */
        readPackedUint64String(): string[];

        /**
         * Reads a packed sint32 field, which consists of a length header and a list of
         * zigzag varints.
         * @return {!Array.<number>}
         */
        readPackedSint32(): number[];

        /**
         * Reads a packed sint64 field, which consists of a length header and a list of
         * zigzag varints.
         * @return {!Array.<number>}
         */
        readPackedSint64(): number[];

        /**
         * Reads a packed fixed32 field, which consists of a length header and a list
         * of unsigned 32-bit ints.
         * @return {!Array.<number>}
         */
        readPackedFixed32(): number[];

        /**
         * Reads a packed fixed64 field, which consists of a length header and a list
         * of unsigned 64-bit ints.
         * @return {!Array.<number>}
         */
        readPackedFixed64(): number[];

        /**
         * Reads a packed sfixed32 field, which consists of a length header and a list
         * of 32-bit ints.
         * @return {!Array.<number>}
         */
        readPackedSfixed32(): number[];

        /**
         * Reads a packed sfixed64 field, which consists of a length header and a list
         * of 64-bit ints.
         * @return {!Array.<number>}
         */
        readPackedSfixed64(): number[];

        /**
         * Reads a packed float field, which consists of a length header and a list of
         * floats.
         * @return {!Array.<number>}
         */
        readPackedFloat(): number[];

        /**
         * Reads a packed double field, which consists of a length header and a list of
         * doubles.
         * @return {!Array.<number>}
         */
        readPackedDouble(): number[];

        /**
         * Reads a packed bool field, which consists of a length header and a list of
         * unsigned varints.
         * @return {!Array.<boolean>}
         */
        readPackedBool(): boolean[];

        /**
         * Reads a packed enum field, which consists of a length header and a list of
         * unsigned varints.
         * @return {!Array.<number>}
         */
        readPackedEnum(): number[];

        /**
         * Reads a packed varint hash64 field, which consists of a length header and a
         * list of varint hash64s.
         * @return {!Array.<string>}
         */
        readPackedVarintHash64(): string[];

        /**
         * Reads a packed fixed hash64 field, which consists of a length header and a
         * list of fixed hash64s.
         * @return {!Array.<string>}
         */
        readPackedFixedHash64(): string[];
    }

}

declare module jspb.BinaryReader {

    /**
     * Pops an instance off the instance cache, or creates one if the cache is
     * empty.
     * @param {jspb.ByteSource=} opt_bytes The bytes we're reading from.
     * @param {number=} opt_start The optional offset to start reading at.
     * @param {number=} opt_length The optional length of the block to read -
     *     we'll throw an assertion if we go off the end of the block.
     * @return {!jspb.BinaryReader}
     */
    function alloc(opt_bytes?: jspb.ByteSource, opt_start?: number, opt_length?: number): jspb.BinaryReader;
}
