
declare module jspb.utils {

    /**
     * Javascript can't natively handle 64-bit data types, so to manipulate them we
     * have to split them into two 32-bit halves and do the math manually.
     *
     * Instead of instantiating and passing small structures around to do this, we
     * instead just use two global temporary values. This one stores the low 32
     * bits of a split value - for example, if the original value was a 64-bit
     * integer, this temporary value will contain the low 32 bits of that integer.
     * If the original value was a double, this temporary value will contain the
     * low 32 bits of the binary representation of that double, etcetera.
     * @type {number}
     */
    var split64Low: number;

    /**
     * And correspondingly, this temporary variable will contain the high 32 bits
     * of whatever value was split.
     * @type {number}
     */
    var split64High: number;

    /**
     * Splits an unsigned Javascript integer into two 32-bit halves and stores it
     * in the temp values above.
     * @param {number} value The number to split.
     */
    function splitUint64(value: number): void;

    /**
     * Splits a signed Javascript integer into two 32-bit halves and stores it in
     * the temp values above.
     * @param {number} value The number to split.
     */
    function splitInt64(value: number): void;

    /**
     * Convers a signed Javascript integer into zigzag format, splits it into two
     * 32-bit halves, and stores it in the temp values above.
     * @param {number} value The number to split.
     */
    function splitZigzag64(value: number): void;

    /**
     * Converts a floating-point number into 32-bit IEEE representation and stores
     * it in the temp values above.
     * @param {number} value
     */
    function splitFloat32(value: number): void;

    /**
     * Converts a floating-point number into 64-bit IEEE representation and stores
     * it in the temp values above.
     * @param {number} value
     */
    function splitFloat64(value: number): void;

    /**
     * Converts an 8-character hash string into two 32-bit numbers and stores them
     * in the temp values above.
     * @param {string} hash
     */
    function splitHash64(hash: string): void;

    /**
     * Joins two 32-bit values into a 64-bit unsigned integer. Precision will be
     * lost if the result is greater than 2^52.
     * @param {number} bitsLow
     * @param {number} bitsHigh
     * @return {number}
     */
    function joinUint64(bitsLow: number, bitsHigh: number): number;

    /**
     * Joins two 32-bit values into a 64-bit signed integer. Precision will be lost
     * if the result is greater than 2^52.
     * @param {number} bitsLow
     * @param {number} bitsHigh
     * @return {number}
     */
    function joinInt64(bitsLow: number, bitsHigh: number): number;

    /**
     * Joins two 32-bit values into a 64-bit unsigned integer and applies zigzag
     * decoding. Precision will be lost if the result is greater than 2^52.
     * @param {number} bitsLow
     * @param {number} bitsHigh
     * @return {number}
     */
    function joinZigzag64(bitsLow: number, bitsHigh: number): number;

    /**
     * Joins two 32-bit values into a 32-bit IEEE floating point number and
     * converts it back into a Javascript number.
     * @param {number} bitsLow The low 32 bits of the binary number;
     * @param {number} bitsHigh The high 32 bits of the binary number.
     * @return {number}
     */
    function joinFloat32(bitsLow: number, bitsHigh: number): number;

    /**
     * Joins two 32-bit values into a 64-bit IEEE floating point number and
     * converts it back into a Javascript number.
     * @param {number} bitsLow The low 32 bits of the binary number;
     * @param {number} bitsHigh The high 32 bits of the binary number.
     * @return {number}
     */
    function joinFloat64(bitsLow: number, bitsHigh: number): number;

    /**
     * Joins two 32-bit values into an 8-character hash string.
     * @param {number} bitsLow
     * @param {number} bitsHigh
     * @return {string}
     */
    function joinHash64(bitsLow: number, bitsHigh: number): string;

    /**
     * Individual digits for number->string conversion.
     * @const {!Array.<number>}
     */
    var DIGITS: any /*missing*/;

    /**
     * Losslessly converts a 64-bit unsigned integer in 32:32 split representation
     * into a decimal string.
     * @param {number} bitsLow The low 32 bits of the binary number;
     * @param {number} bitsHigh The high 32 bits of the binary number.
     * @return {string} The binary number represented as a string.
     */
    function joinUnsignedDecimalString(bitsLow: number, bitsHigh: number): string;

    /**
     * Losslessly converts a 64-bit signed integer in 32:32 split representation
     * into a decimal string.
     * @param {number} bitsLow The low 32 bits of the binary number;
     * @param {number} bitsHigh The high 32 bits of the binary number.
     * @return {string} The binary number represented as a string.
     */
    function joinSignedDecimalString(bitsLow: number, bitsHigh: number): string;

    /**
     * Convert an 8-character hash string representing either a signed or unsigned
     * 64-bit integer into its decimal representation without losing accuracy.
     * @param {string} hash The hash string to convert.
     * @param {boolean} signed True if we should treat the hash string as encoding
     *     a signed integer.
     * @return {string}
     */
    function hash64ToDecimalString(hash: string, signed: boolean): string;

    /**
     * Converts an array of 8-character hash strings into their decimal
     * representations.
     * @param {!Array.<string>} hashes The array of hash strings to convert.
     * @param {boolean} signed True if we should treat the hash string as encoding
     *     a signed integer.
     * @return {!Array.<string>}
     */
    function hash64ArrayToDecimalStrings(hashes: string[], signed: boolean): string[];

    /**
     * Converts a signed or unsigned decimal string into its hash string
     * representation.
     * @param {string} dec
     * @return {string}
     */
    function decimalStringToHash64(dec: string): string;

    /**
     * Converts an 8-character hash string into its hexadecimal representation.
     * @param {string} hash
     * @return {string}
     */
    function hash64ToHexString(hash: string): string;

    /**
     * Converts a '0x<16 digits>' hex string into its hash string representation.
     * @param {string} hex
     * @return {string}
     */
    function hexStringToHash64(hex: string): string;

    /**
     * Convert an 8-character hash string representing either a signed or unsigned
     * 64-bit integer into a Javascript number. Will lose accuracy if the result is
     * larger than 2^52.
     * @param {string} hash The hash string to convert.
     * @param {boolean} signed True if the has should be interpreted as a signed
     *     number.
     * @return {number}
     */
    function hash64ToNumber(hash: string, signed: boolean): number;

    /**
     * Convert a Javascript number into an 8-character hash string. Will lose
     * precision if the value is non-integral or greater than 2^64.
     * @param {number} value The integer to convert.
     * @return {string}
     */
    function numberToHash64(value: number): string;

    /**
     * Counts the number of contiguous varints in a buffer.
     * @param {!Uint8Array} buffer The buffer to scan.
     * @param {number} start The starting point in the buffer to scan.
     * @param {number} end The end point in the buffer to scan.
     * @return {number} The number of varints in the buffer.
     */
    function countVarints(buffer: Uint8Array, start: number, end: number): number;

    /**
     * Counts the number of contiguous varint fields with the given field number in
     * the buffer.
     * @param {!Uint8Array} buffer The buffer to scan.
     * @param {number} start The starting point in the buffer to scan.
     * @param {number} end The end point in the buffer to scan.
     * @param {number} field The field number to count.
     * @return {number} The number of matching fields in the buffer.
     */
    function countVarintFields(buffer: Uint8Array, start: number, end: number, field: number): number;

    /**
     * Counts the number of contiguous fixed32 fields with the given field number
     * in the buffer.
     * @param {!Uint8Array} buffer The buffer to scan.
     * @param {number} start The starting point in the buffer to scan.
     * @param {number} end The end point in the buffer to scan.
     * @param {number} field The field number to count.
     * @return {number} The number of matching fields in the buffer.
     */
    function countFixed32Fields(buffer: Uint8Array, start: number, end: number, field: number): number;

    /**
     * Counts the number of contiguous fixed64 fields with the given field number
     * in the buffer.
     * @param {!Uint8Array} buffer The buffer to scan.
     * @param {number} start The starting point in the buffer to scan.
     * @param {number} end The end point in the buffer to scan.
     * @param {number} field The field number to count
     * @return {number} The number of matching fields in the buffer.
     */
    function countFixed64Fields(buffer: Uint8Array, start: number, end: number, field: number): number;

    /**
     * Counts the number of contiguous delimited fields with the given field number
     * in the buffer.
     * @param {!Uint8Array} buffer The buffer to scan.
     * @param {number} start The starting point in the buffer to scan.
     * @param {number} end The end point in the buffer to scan.
     * @param {number} field The field number to count.
     * @return {number} The number of matching fields in the buffer.
     */
    function countDelimitedFields(buffer: Uint8Array, start: number, end: number, field: number): number;

    /**
     * String-ify bytes for text format. Should be optimized away in non-debug.
     * The returned string uses \xXX escapes for all values and is itself quoted.
     * [1, 31] serializes to '"\x01\x1f"'.
     * @param {jspb.ByteSource} byteSource The bytes to serialize.
     * @return {string} Stringified bytes for text format.
     */
    function debugBytesToTextFormat(byteSource: jspb.ByteSource): string;

    /**
     * String-ify a scalar for text format. Should be optimized away in non-debug.
     * @param {string|number|boolean} scalar The scalar to stringify.
     * @return {string} Stringified scalar for text format.
     */
    function debugScalarToTextFormat(scalar: string|number|boolean): string;

    /**
     * Utility function: convert a string with codepoints 0--255 inclusive to a
     * Uint8Array. If any codepoints greater than 255 exist in the string, throws an
     * exception.
     * @param {string} str
     * @return {!Uint8Array}
     */
    function stringToByteArray(str: string): Uint8Array;

    /**
     * Converts any type defined in jspb.ByteSource into a Uint8Array.
     * @param {!jspb.ByteSource} data
     * @return {!Uint8Array}
     * @suppress {invalidCasts}
     */
    function byteSourceToUint8Array(data: jspb.ByteSource): Uint8Array;
}
