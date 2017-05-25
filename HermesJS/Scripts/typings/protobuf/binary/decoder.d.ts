
declare module jspb {

    class BinaryIterator extends BinaryIterator__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BinaryIterator__Class  {

        /**
         * Simple helper class for traversing the contents of repeated scalar fields.
         * that may or may not have been packed into a wire-format blob.
         * @param {?jspb.BinaryDecoder=} opt_decoder
         * @param {?function(this:jspb.BinaryDecoder):(number|boolean|string)=}
         *     opt_next The decoder method to use for next().
         * @param {?Array.<number|boolean|string>=} opt_elements
         * @constructor
         * @struct
         */
        constructor(opt_decoder?: jspb.BinaryDecoder, opt_next?: { (): number|boolean|string }, opt_elements?: number|boolean|string[]);

        /**
         * Puts this instance back in the instance cache.
         */
        free(): void;

        /**
         * Clears the iterator.
         */
        clear(): void;

        /**
         * Returns the element at the iterator, or null if the iterator is invalid or
         * past the end of the decoder/array.
         * @return {number|boolean|string|null}
         */
        get(): number|boolean|string|any /*null*/;

        /**
         * Returns true if the iterator is at the end of the decoder/array.
         * @return {boolean}
         */
        atEnd(): boolean;

        /**
         * Returns the element at the iterator and steps to the next element,
         * equivalent to '*pointer++' in C.
         * @return {number|boolean|string|null}
         */
        next(): number|boolean|string|any /*null*/;
    }


    class BinaryDecoder extends BinaryDecoder__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BinaryDecoder__Class  {

        /**
         * BinaryDecoder implements the decoders for all the wire types specified in
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
         * Puts this instance back in the instance cache.
         */
        free(): void;

        /**
         * Makes a copy of this decoder.
         * @return {!jspb.BinaryDecoder}
         */
        clone(): jspb.BinaryDecoder;

        /**
         * Clears the decoder.
         */
        clear(): void;

        /**
         * Returns the raw buffer.
         * @return {?Uint8Array} The raw buffer.
         */
        getBuffer(): Uint8Array;

        /**
         * Changes the block of bytes we're decoding.
         * @param {!jspb.ByteSource} data The bytes we're reading from.
         * @param {number=} opt_start The optional offset to start reading at.
         * @param {number=} opt_length The optional length of the block to read -
         *     we'll throw an assertion if we go off the end of the block.
         */
        setBlock(data: jspb.ByteSource, opt_start?: number, opt_length?: number): void;

        /**
         * @return {number}
         */
        getEnd(): number;

        /**
         * @param {number} end
         */
        setEnd(end: number): void;

        /**
         * Moves the read cursor back to the start of the block.
         */
        reset(): void;

        /**
         * Returns the internal read cursor.
         * @return {number} The internal read cursor.
         */
        getCursor(): number;

        /**
         * Returns the internal read cursor.
         * @param {number} cursor The new cursor.
         */
        setCursor(cursor: number): void;

        /**
         * Advances the stream cursor by the given number of bytes.
         * @param {number} count The number of bytes to advance by.
         */
        advance(count: number): void;

        /**
         * Returns true if this decoder is at the end of the block.
         * @return {boolean}
         */
        atEnd(): boolean;

        /**
         * Returns true if this decoder is at the end of the block.
         * @return {boolean}
         */
        pastEnd(): boolean;

        /**
         * Returns true if this decoder encountered an error due to corrupt data.
         * @return {boolean}
         */
        getError(): boolean;

        /**
         * Skips over a varint in the block without decoding it.
         */
        skipVarint(): void;

        /**
         * Skips backwards over a varint in the block - to do this correctly, we have
         * to know the value we're skipping backwards over or things are ambiguous.
         * @param {number} value The varint value to unskip.
         */
        unskipVarint(value: number): void;

        /**
         * Reads a 32-bit varint from the binary stream. Due to a quirk of the encoding
         * format and Javascript's handling of bitwise math, this actually works
         * correctly for both signed and unsigned 32-bit varints.
         *
         * This function is called vastly more frequently than any other in
         * BinaryDecoder, so it has been unrolled and tweaked for performance.
         *
         * If there are more than 32 bits of data in the varint, it _must_ be due to
         * sign-extension. If we're in debug mode and the high 32 bits don't match the
         * expected sign extension, this method will throw an error.
         *
         * Decoding varints requires doing some funny base-128 math - for more
         * details on the format, see
         * https://developers.google.com/protocol-buffers/docs/encoding
         *
         * @return {number} The decoded unsigned 32-bit varint.
         */
        readUnsignedVarint32(): number;

        /**
         * The readUnsignedVarint32 above deals with signed 32-bit varints correctly,
         * so this is just an alias.
         *
         * @return {number} The decoded signed 32-bit varint.
         */
        readSignedVarint32(): number;

        /**
         * Reads a 32-bit unsigned variant and returns its value as a string.
         *
         * @return {string} The decoded unsigned 32-bit varint as a string.
         */
        readUnsignedVarint32String(): string;

        /**
         * Reads a 32-bit signed variant and returns its value as a string.
         *
         * @return {string} The decoded signed 32-bit varint as a string.
         */
        readSignedVarint32String(): string;

        /**
         * Reads a signed, zigzag-encoded 32-bit varint from the binary stream.
         *
         * Zigzag encoding is a modification of varint encoding that reduces the
         * storage overhead for small negative integers - for more details on the
         * format, see https://developers.google.com/protocol-buffers/docs/encoding
         *
         * @return {number} The decoded signed, zigzag-encoded 32-bit varint.
         */
        readZigzagVarint32(): number;

        /**
         * Reads an unsigned 64-bit varint from the binary stream. Note that since
         * Javascript represents all numbers as double-precision floats, there will be
         * precision lost if the absolute value of the varint is larger than 2^53.
         *
         * @return {number} The decoded unsigned varint. Precision will be lost if the
         *     integer exceeds 2^53.
         */
        readUnsignedVarint64(): number;

        /**
         * Reads an unsigned 64-bit varint from the binary stream and returns the value
         * as a decimal string.
         *
         * @return {string} The decoded unsigned varint as a decimal string.
         */
        readUnsignedVarint64String(): string;

        /**
         * Reads a signed 64-bit varint from the binary stream. Note that since
         * Javascript represents all numbers as double-precision floats, there will be
         * precision lost if the absolute value of the varint is larger than 2^53.
         *
         * @return {number} The decoded signed varint. Precision will be lost if the
         *     integer exceeds 2^53.
         */
        readSignedVarint64(): number;

        /**
         * Reads an signed 64-bit varint from the binary stream and returns the value
         * as a decimal string.
         *
         * @return {string} The decoded signed varint as a decimal string.
         */
        readSignedVarint64String(): string;

        /**
         * Reads a signed, zigzag-encoded 64-bit varint from the binary stream. Note
         * that since Javascript represents all numbers as double-precision floats,
         * there will be precision lost if the absolute value of the varint is larger
         * than 2^53.
         *
         * Zigzag encoding is a modification of varint encoding that reduces the
         * storage overhead for small negative integers - for more details on the
         * format, see https://developers.google.com/protocol-buffers/docs/encoding
         *
         * @return {number} The decoded zigzag varint. Precision will be lost if the
         *     integer exceeds 2^53.
         */
        readZigzagVarint64(): number;

        /**
         * Reads a raw unsigned 8-bit integer from the binary stream.
         *
         * @return {number} The unsigned 8-bit integer read from the binary stream.
         */
        readUint8(): number;

        /**
         * Reads a raw unsigned 16-bit integer from the binary stream.
         *
         * @return {number} The unsigned 16-bit integer read from the binary stream.
         */
        readUint16(): number;

        /**
         * Reads a raw unsigned 32-bit integer from the binary stream.
         *
         * @return {number} The unsigned 32-bit integer read from the binary stream.
         */
        readUint32(): number;

        /**
         * Reads a raw unsigned 64-bit integer from the binary stream. Note that since
         * Javascript represents all numbers as double-precision floats, there will be
         * precision lost if the absolute value of the integer is larger than 2^53.
         *
         * @return {number} The unsigned 64-bit integer read from the binary stream.
         *     Precision will be lost if the integer exceeds 2^53.
         */
        readUint64(): number;

        /**
         * Reads a raw signed 8-bit integer from the binary stream.
         *
         * @return {number} The signed 8-bit integer read from the binary stream.
         */
        readInt8(): number;

        /**
         * Reads a raw signed 16-bit integer from the binary stream.
         *
         * @return {number} The signed 16-bit integer read from the binary stream.
         */
        readInt16(): number;

        /**
         * Reads a raw signed 32-bit integer from the binary stream.
         *
         * @return {number} The signed 32-bit integer read from the binary stream.
         */
        readInt32(): number;

        /**
         * Reads a raw signed 64-bit integer from the binary stream. Note that since
         * Javascript represents all numbers as double-precision floats, there will be
         * precision lost if the absolute vlaue of the integer is larger than 2^53.
         *
         * @return {number} The signed 64-bit integer read from the binary stream.
         *     Precision will be lost if the integer exceeds 2^53.
         */
        readInt64(): number;

        /**
         * Reads a 32-bit floating-point number from the binary stream, using the
         * temporary buffer to realign the data.
         *
         * @return {number} The float read from the binary stream.
         */
        readFloat(): number;

        /**
         * Reads a 64-bit floating-point number from the binary stream, using the
         * temporary buffer to realign the data.
         *
         * @return {number} The double read from the binary stream.
         */
        readDouble(): number;

        /**
         * Reads a boolean value from the binary stream.
         * @return {boolean} The boolean read from the binary stream.
         */
        readBool(): boolean;

        /**
         * Reads an enum value from the binary stream, which are always encoded as
         * signed varints.
         * @return {number} The enum value read from the binary stream.
         */
        readEnum(): number;

        /**
         * Reads and parses a UTF-8 encoded unicode string from the stream.
         * The code is inspired by maps.vectortown.parse.StreamedDataViewReader, with
         * the exception that the implementation here does not get confused if it
         * encounters characters longer than three bytes. These characters are ignored
         * though, as they are extremely rare: three UTF-8 bytes cover virtually all
         * characters in common use (http://en.wikipedia.org/wiki/UTF-8).
         * @param {number} length The length of the string to read.
         * @return {string} The decoded string.
         */
        readString(length: number): string;

        /**
         * Reads and parses a UTF-8 encoded unicode string (with length prefix) from
         * the stream.
         * @return {string} The decoded string.
         */
        readStringWithLength(): string;

        /**
         * Reads a block of raw bytes from the binary stream.
         *
         * @param {number} length The number of bytes to read.
         * @return {!Uint8Array} The decoded block of bytes, or an empty block if the
         *     length was invalid.
         */
        readBytes(length: number): Uint8Array;

        /**
         * Reads a 64-bit varint from the stream and returns it as an 8-character
         * Unicode string for use as a hash table key.
         *
         * @return {string} The hash value.
         */
        readVarintHash64(): string;

        /**
         * Reads a 64-bit fixed-width value from the stream and returns it as an
         * 8-character Unicode string for use as a hash table key.
         *
         * @return {string} The hash value.
         */
        readFixedHash64(): string;
    }

}

declare module jspb.BinaryIterator {

    /**
     * Allocates a BinaryIterator from the cache, creating a new one if the cache
     * is empty.
     * @param {?jspb.BinaryDecoder=} opt_decoder
     * @param {?function(this:jspb.BinaryDecoder):(number|boolean|string)=}
     *     opt_next The decoder method to use for next().
     * @param {?Array.<number|boolean|string>=} opt_elements
     * @return {!jspb.BinaryIterator}
     */
    function alloc(opt_decoder?: jspb.BinaryDecoder, opt_next?: { (): number|boolean|string }, opt_elements?: number|boolean|string[]): jspb.BinaryIterator;
}

declare module jspb.BinaryDecoder {

    /**
     * Pops an instance off the instance cache, or creates one if the cache is
     * empty.
     * @param {jspb.ByteSource=} opt_bytes The bytes we're reading from.
     * @param {number=} opt_start The optional offset to start reading at.
     * @param {number=} opt_length The optional length of the block to read -
     *     we'll throw an assertion if we go off the end of the block.
     * @return {!jspb.BinaryDecoder}
     */
    function alloc(opt_bytes?: jspb.ByteSource, opt_start?: number, opt_length?: number): jspb.BinaryDecoder;
}
