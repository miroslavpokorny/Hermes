
declare module jspb {

    class BinaryWriter extends BinaryWriter__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class BinaryWriter__Class  {

        /**
         * BinaryWriter implements encoders for all the wire types specified in
         * https://developers.google.com/protocol-buffers/docs/encoding.
         *
         * @constructor
         * @struct
         */
        constructor();

        /**
         * Writes a pre-serialized message to the buffer.
         * @param {!Uint8Array} bytes The array of bytes to write.
         * @param {number} start The start of the range to write.
         * @param {number} end The end of the range to write.
         */
        writeSerializedMessage(bytes: Uint8Array, start: number, end: number): void;

        /**
         * Writes a pre-serialized message to the buffer if the message and endpoints
         * are non-null.
         * @param {?Uint8Array} bytes The array of bytes to write.
         * @param {?number} start The start of the range to write.
         * @param {?number} end The end of the range to write.
         */
        maybeWriteSerializedMessage(bytes: Uint8Array, start: number, end: number): void;

        /**
         * Resets the writer, throwing away any accumulated buffers.
         */
        reset(): void;

        /**
         * Converts the encoded data into a Uint8Array.
         * @return {!Uint8Array}
         */
        getResultBuffer(): Uint8Array;

        /**
         * Converts the encoded data into a bas64-encoded string.
         * @return {string}
         */
        getResultBase64String(): string;

        /**
         * Begins a new sub-message. The client must call endSubMessage() when they're
         * done.
         * TODO(aappleby): Deprecated. Move callers to writeMessage().
         * @param {number} field The field number of the sub-message.
         */
        beginSubMessage(field: number): void;

        /**
         * Finishes a sub-message and packs it into the parent messages' buffer.
         * TODO(aappleby): Deprecated. Move callers to writeMessage().
         */
        endSubMessage(): void;

        /**
         * Writes a field of any valid scalar type to the binary stream.
         * @param {jspb.BinaryConstants.FieldType} fieldType
         * @param {number} field
         * @param {jspb.AnyFieldType} value
         */
        writeAny(fieldType: jspb.BinaryConstants.FieldType, field: number, value: jspb.AnyFieldType): void;

        /**
         * Writes an int32 field to the buffer. Numbers outside the range [-2^31,2^31)
         * will be truncated.
         * @param {number} field The field number.
         * @param {number?} value The value to write.
         */
        writeInt32(field: number, value: number): void;

        /**
         * Writes an int32 field represented as a string to the buffer. Numbers outside
         * the range [-2^31,2^31) will be truncated.
         * @param {number} field The field number.
         * @param {string?} value The value to write.
         */
        writeInt32String(field: number, value: string): void;

        /**
         * Writes an int64 field to the buffer. Numbers outside the range [-2^63,2^63)
         * will be truncated.
         * @param {number} field The field number.
         * @param {number?} value The value to write.
         */
        writeInt64(field: number, value: number): void;

        /**
         * Writes a int64 field (with value as a string) to the buffer.
         * @param {number} field The field number.
         * @param {string?} value The value to write.
         */
        writeInt64String(field: number, value: string): void;

        /**
         * Writes a uint32 field to the buffer. Numbers outside the range [0,2^32)
         * will be truncated.
         * @param {number} field The field number.
         * @param {number?} value The value to write.
         */
        writeUint32(field: number, value: number): void;

        /**
         * Writes a uint32 field represented as a string to the buffer. Numbers outside
         * the range [0,2^32) will be truncated.
         * @param {number} field The field number.
         * @param {string?} value The value to write.
         */
        writeUint32String(field: number, value: string): void;

        /**
         * Writes a uint64 field to the buffer. Numbers outside the range [0,2^64)
         * will be truncated.
         * @param {number} field The field number.
         * @param {number?} value The value to write.
         */
        writeUint64(field: number, value: number): void;

        /**
         * Writes a uint64 field (with value as a string) to the buffer.
         * @param {number} field The field number.
         * @param {string?} value The value to write.
         */
        writeUint64String(field: number, value: string): void;

        /**
         * Writes a sint32 field to the buffer. Numbers outside the range [-2^31,2^31)
         * will be truncated.
         * @param {number} field The field number.
         * @param {number?} value The value to write.
         */
        writeSint32(field: number, value: number): void;

        /**
         * Writes a sint64 field to the buffer. Numbers outside the range [-2^63,2^63)
         * will be truncated.
         * @param {number} field The field number.
         * @param {number?} value The value to write.
         */
        writeSint64(field: number, value: number): void;

        /**
         * Writes a fixed32 field to the buffer. Numbers outside the range [0,2^32)
         * will be truncated.
         * @param {number} field The field number.
         * @param {number?} value The value to write.
         */
        writeFixed32(field: number, value: number): void;

        /**
         * Writes a fixed64 field to the buffer. Numbers outside the range [0,2^64)
         * will be truncated.
         * @param {number} field The field number.
         * @param {number?} value The value to write.
         */
        writeFixed64(field: number, value: number): void;

        /**
         * Writes a sfixed32 field to the buffer. Numbers outside the range
         * [-2^31,2^31) will be truncated.
         * @param {number} field The field number.
         * @param {number?} value The value to write.
         */
        writeSfixed32(field: number, value: number): void;

        /**
         * Writes a sfixed64 field to the buffer. Numbers outside the range
         * [-2^63,2^63) will be truncated.
         * @param {number} field The field number.
         * @param {number?} value The value to write.
         */
        writeSfixed64(field: number, value: number): void;

        /**
         * Writes a single-precision floating point field to the buffer. Numbers
         * requiring more than 32 bits of precision will be truncated.
         * @param {number} field The field number.
         * @param {number?} value The value to write.
         */
        writeFloat(field: number, value: number): void;

        /**
         * Writes a double-precision floating point field to the buffer. As this is the
         * native format used by JavaScript, no precision will be lost.
         * @param {number} field The field number.
         * @param {number?} value The value to write.
         */
        writeDouble(field: number, value: number): void;

        /**
         * Writes a boolean field to the buffer.
         * @param {number} field The field number.
         * @param {boolean?} value The value to write.
         */
        writeBool(field: number, value: boolean): void;

        /**
         * Writes an enum field to the buffer.
         * @param {number} field The field number.
         * @param {number?} value The value to write.
         */
        writeEnum(field: number, value: number): void;

        /**
         * Writes a string field to the buffer.
         * @param {number} field The field number.
         * @param {string?} value The string to write.
         */
        writeString(field: number, value: string): void;

        /**
         * Writes an arbitrary byte field to the buffer. Note - to match the behavior
         * of the C++ implementation, empty byte arrays _are_ serialized.
         * @param {number} field The field number.
         * @param {?jspb.ByteSource} value The array of bytes to write.
         */
        writeBytes(field: number, value: jspb.ByteSource): void;

        /**
         * Writes a message to the buffer.
         * @param {number} field The field number.
         * @param {?MessageType} value The message to write.
         * @param {function(MessageTypeNonNull, !jspb.BinaryWriter)} writerCallback
         *     Will be invoked with the value to write and the writer to write it with.
         * @template MessageType
         * Use go/closure-ttl to declare a non-nullable version of MessageType.  Replace
         * the null in blah|null with none.  This is necessary because the compiler will
         * infer MessageType to be nullable if the value parameter is nullable.
         * @template MessageTypeNonNull :=
         *     cond(isUnknown(MessageType), unknown(),
         *       mapunion(MessageType, (X) =>
         *         cond(eq(X, 'null'), none(), X)))
         * =:
         */
        writeMessage<MessageType>(field: number, value: MessageType, writerCallback: { (_0: MessageType, _1: jspb.BinaryWriter): any /*missing*/ }): void;

        /**
         * Writes a group message to the buffer.
         *
         * @param {number} field The field number.
         * @param {?MessageType} value The message to write, wrapped with START_GROUP /
         *     END_GROUP tags. Will be a no-op if 'value' is null.
         * @param {function(MessageTypeNonNull, !jspb.BinaryWriter)} writerCallback
         *     Will be invoked with the value to write and the writer to write it with.
         * @template MessageType
         * Use go/closure-ttl to declare a non-nullable version of MessageType.  Replace
         * the null in blah|null with none.  This is necessary because the compiler will
         * infer MessageType to be nullable if the value parameter is nullable.
         * @template MessageTypeNonNull :=
         *     cond(isUnknown(MessageType), unknown(),
         *       mapunion(MessageType, (X) =>
         *         cond(eq(X, 'null'), none(), X)))
         * =:
         */
        writeGroup<MessageType>(field: number, value: MessageType, writerCallback: { (_0: MessageType, _1: jspb.BinaryWriter): any /*missing*/ }): void;

        /**
         * Writes a 64-bit hash string field (8 characters @ 8 bits of data each) to
         * the buffer.
         * @param {number} field The field number.
         * @param {string?} value The hash string.
         */
        writeFixedHash64(field: number, value: string): void;

        /**
         * Writes a 64-bit hash string field (8 characters @ 8 bits of data each) to
         * the buffer.
         * @param {number} field The field number.
         * @param {string?} value The hash string.
         */
        writeVarintHash64(field: number, value: string): void;

        /**
         * Writes an array of numbers to the buffer as a repeated 32-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writeRepeatedInt32(field: number, value: number[]): void;

        /**
         * Writes an array of numbers formatted as strings to the buffer as a repeated
         * 32-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<string>} value The array of ints to write.
         */
        writeRepeatedInt32String(field: number, value: string[]): void;

        /**
         * Writes an array of numbers to the buffer as a repeated 64-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writeRepeatedInt64(field: number, value: number[]): void;

        /**
         * Writes an array of numbers formatted as strings to the buffer as a repeated
         * 64-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<string>} value The array of ints to write.
         */
        writeRepeatedInt64String(field: number, value: string[]): void;

        /**
         * Writes an array numbers to the buffer as a repeated unsigned 32-bit int
         *     field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writeRepeatedUint32(field: number, value: number[]): void;

        /**
         * Writes an array of numbers formatted as strings to the buffer as a repeated
         * unsigned 32-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<string>} value The array of ints to write.
         */
        writeRepeatedUint32String(field: number, value: string[]): void;

        /**
         * Writes an array numbers to the buffer as a repeated unsigned 64-bit int
         *     field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writeRepeatedUint64(field: number, value: number[]): void;

        /**
         * Writes an array of numbers formatted as strings to the buffer as a repeated
         * unsigned 64-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<string>} value The array of ints to write.
         */
        writeRepeatedUint64String(field: number, value: string[]): void;

        /**
         * Writes an array numbers to the buffer as a repeated signed 32-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writeRepeatedSint32(field: number, value: number[]): void;

        /**
         * Writes an array numbers to the buffer as a repeated signed 64-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writeRepeatedSint64(field: number, value: number[]): void;

        /**
         * Writes an array of numbers to the buffer as a repeated fixed32 field. This
         * works for both signed and unsigned fixed32s.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writeRepeatedFixed32(field: number, value: number[]): void;

        /**
         * Writes an array of numbers to the buffer as a repeated fixed64 field. This
         * works for both signed and unsigned fixed64s.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writeRepeatedFixed64(field: number, value: number[]): void;

        /**
         * Writes an array of numbers to the buffer as a repeated sfixed32 field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writeRepeatedSfixed32(field: number, value: number[]): void;

        /**
         * Writes an array of numbers to the buffer as a repeated sfixed64 field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writeRepeatedSfixed64(field: number, value: number[]): void;

        /**
         * Writes an array of numbers to the buffer as a repeated float field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writeRepeatedFloat(field: number, value: number[]): void;

        /**
         * Writes an array of numbers to the buffer as a repeated double field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writeRepeatedDouble(field: number, value: number[]): void;

        /**
         * Writes an array of booleans to the buffer as a repeated bool field.
         * @param {number} field The field number.
         * @param {?Array.<boolean>} value The array of ints to write.
         */
        writeRepeatedBool(field: number, value: boolean[]): void;

        /**
         * Writes an array of enums to the buffer as a repeated enum field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writeRepeatedEnum(field: number, value: number[]): void;

        /**
         * Writes an array of strings to the buffer as a repeated string field.
         * @param {number} field The field number.
         * @param {?Array.<string>} value The array of strings to write.
         */
        writeRepeatedString(field: number, value: string[]): void;

        /**
         * Writes an array of arbitrary byte fields to the buffer.
         * @param {number} field The field number.
         * @param {?Array.<!jspb.ByteSource>} value The arrays of arrays of bytes to
         *     write.
         */
        writeRepeatedBytes(field: number, value: jspb.ByteSource[]): void;

        /**
         * Writes an array of messages to the buffer.
         * @template MessageType
         * @param {number} field The field number.
         * @param {?Array.<MessageType>} value The array of messages to
         *    write.
         * @param {function(MessageType, !jspb.BinaryWriter)} writerCallback
         *     Will be invoked with the value to write and the writer to write it with.
         */
        writeRepeatedMessage<MessageType>(field: number, value: MessageType[], writerCallback: { (_0: MessageType, _1: jspb.BinaryWriter): any /*missing*/ }): void;

        /**
         * Writes an array of group messages to the buffer.
         * @template MessageType
         * @param {number} field The field number.
         * @param {?Array.<MessageType>} value The array of messages to
         *    write.
         * @param {function(MessageType, !jspb.BinaryWriter)} writerCallback
         *     Will be invoked with the value to write and the writer to write it with.
         */
        writeRepeatedGroup<MessageType>(field: number, value: MessageType[], writerCallback: { (_0: MessageType, _1: jspb.BinaryWriter): any /*missing*/ }): void;

        /**
         * Writes a 64-bit hash string field (8 characters @ 8 bits of data each) to
         * the buffer.
         * @param {number} field The field number.
         * @param {?Array.<string>} value The array of hashes to write.
         */
        writeRepeatedFixedHash64(field: number, value: string[]): void;

        /**
         * Writes a repeated 64-bit hash string field (8 characters @ 8 bits of data
         * each) to the buffer.
         * @param {number} field The field number.
         * @param {?Array.<string>} value The array of hashes to write.
         */
        writeRepeatedVarintHash64(field: number, value: string[]): void;

        /**
         * Writes an array of numbers to the buffer as a packed 32-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writePackedInt32(field: number, value: number[]): void;

        /**
         * Writes an array of numbers represented as strings to the buffer as a packed
         * 32-bit int field.
         * @param {number} field
         * @param {?Array.<string>} value
         */
        writePackedInt32String(field: number, value: string[]): void;

        /**
         * Writes an array of numbers to the buffer as a packed 64-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writePackedInt64(field: number, value: number[]): void;

        /**
         * Writes an array of numbers represented as strings to the buffer as a packed
         * 64-bit int field.
         * @param {number} field
         * @param {?Array.<string>} value
         */
        writePackedInt64String(field: number, value: string[]): void;

        /**
         * Writes an array numbers to the buffer as a packed unsigned 32-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writePackedUint32(field: number, value: number[]): void;

        /**
         * Writes an array of numbers represented as strings to the buffer as a packed
         * unsigned 32-bit int field.
         * @param {number} field
         * @param {?Array.<string>} value
         */
        writePackedUint32String(field: number, value: string[]): void;

        /**
         * Writes an array numbers to the buffer as a packed unsigned 64-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writePackedUint64(field: number, value: number[]): void;

        /**
         * Writes an array of numbers represented as strings to the buffer as a packed
         * unsigned 64-bit int field.
         * @param {number} field
         * @param {?Array.<string>} value
         */
        writePackedUint64String(field: number, value: string[]): void;

        /**
         * Writes an array numbers to the buffer as a packed signed 32-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writePackedSint32(field: number, value: number[]): void;

        /**
         * Writes an array numbers to the buffer as a packed signed 64-bit int field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writePackedSint64(field: number, value: number[]): void;

        /**
         * Writes an array of numbers to the buffer as a packed fixed32 field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writePackedFixed32(field: number, value: number[]): void;

        /**
         * Writes an array of numbers to the buffer as a packed fixed64 field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writePackedFixed64(field: number, value: number[]): void;

        /**
         * Writes an array of numbers to the buffer as a packed sfixed32 field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writePackedSfixed32(field: number, value: number[]): void;

        /**
         * Writes an array of numbers to the buffer as a packed sfixed64 field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writePackedSfixed64(field: number, value: number[]): void;

        /**
         * Writes an array of numbers to the buffer as a packed float field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writePackedFloat(field: number, value: number[]): void;

        /**
         * Writes an array of numbers to the buffer as a packed double field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writePackedDouble(field: number, value: number[]): void;

        /**
         * Writes an array of booleans to the buffer as a packed bool field.
         * @param {number} field The field number.
         * @param {?Array.<boolean>} value The array of ints to write.
         */
        writePackedBool(field: number, value: boolean[]): void;

        /**
         * Writes an array of enums to the buffer as a packed enum field.
         * @param {number} field The field number.
         * @param {?Array.<number>} value The array of ints to write.
         */
        writePackedEnum(field: number, value: number[]): void;

        /**
         * Writes a 64-bit hash string field (8 characters @ 8 bits of data each) to
         * the buffer.
         * @param {number} field The field number.
         * @param {?Array.<string>} value The array of hashes to write.
         */
        writePackedFixedHash64(field: number, value: string[]): void;

        /**
         * Writes a 64-bit hash string field (8 characters @ 8 bits of data each) to
         * the buffer.
         * @param {number} field The field number.
         * @param {?Array.<string>} value The array of hashes to write.
         */
        writePackedVarintHash64(field: number, value: string[]): void;
    }

}
