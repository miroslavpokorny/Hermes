
declare module jspb.arith {

    class UInt64 extends UInt64__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class UInt64__Class  {

        /**
         * UInt64 implements some 64-bit arithmetic routines necessary for properly
         * handling 64-bit integer fields. It implements lossless integer arithmetic on
         * top of JavaScript's number type, which has only 53 bits of precision, by
         * representing 64-bit integers as two 32-bit halves.
         *
         * @param {number} lo The low 32 bits.
         * @param {number} hi The high 32 bits.
         * @constructor
         */
        constructor(lo: number, hi: number);

        /**
         * The low 32 bits.
         * @public {number}
         */
        lo: any /*missing*/;

        /**
         * The high 32 bits.
         * @public {number}
         */
        hi: any /*missing*/;

        /**
         * Compare two 64-bit numbers. Returns -1 if the first is
         * less, +1 if the first is greater, or 0 if both are equal.
         * @param {!jspb.arith.UInt64} other
         * @return {number}
         */
        cmp(other: jspb.arith.UInt64): number;

        /**
         * Right-shift this number by one bit.
         * @return {!jspb.arith.UInt64}
         */
        rightShift(): jspb.arith.UInt64;

        /**
         * Left-shift this number by one bit.
         * @return {!jspb.arith.UInt64}
         */
        leftShift(): jspb.arith.UInt64;

        /**
         * Test the MSB.
         * @return {boolean}
         */
        msb(): boolean;

        /**
         * Test the LSB.
         * @return {boolean}
         */
        lsb(): boolean;

        /**
         * Test whether this number is zero.
         * @return {boolean}
         */
        zero(): boolean;

        /**
         * Add two 64-bit numbers to produce a 64-bit number.
         * @param {!jspb.arith.UInt64} other
         * @return {!jspb.arith.UInt64}
         */
        add(other: jspb.arith.UInt64): jspb.arith.UInt64;

        /**
         * Subtract two 64-bit numbers to produce a 64-bit number.
         * @param {!jspb.arith.UInt64} other
         * @return {!jspb.arith.UInt64}
         */
        sub(other: jspb.arith.UInt64): jspb.arith.UInt64;

        /**
         * Multiply this number by a 32-bit number, producing a 96-bit number, then
         * truncate the top 32 bits.
         * @param {number} a The multiplier.
         * @return {!jspb.arith.UInt64}
         */
        mul(a: number): jspb.arith.UInt64;

        /**
         * Divide a 64-bit number by a 32-bit number to produce a
         * 64-bit quotient and a 32-bit remainder.
         * @param {number} _divisor
         * @return {Array.<jspb.arith.UInt64>} array of [quotient, remainder],
         * unless divisor is 0, in which case an empty array is returned.
         */
        div(_divisor: number): jspb.arith.UInt64[];

        /**
         * Make a copy of the uint64.
         * @return {!jspb.arith.UInt64}
         */
        clone(): jspb.arith.UInt64;
    }


    class Int64 extends Int64__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Int64__Class  {

        /**
         * Int64 is like UInt64, but modifies string conversions to interpret the stored
         * 64-bit value as a twos-complement-signed integer. It does *not* support the
         * full range of operations that UInt64 does: only add, subtract, and string
         * conversions.
         *
         * N.B. that multiply and divide routines are *NOT* supported. They will throw
         * exceptions. (They are not necessary to implement string conversions, which
         * are the only operations we really need in jspb.)
         *
         * @param {number} lo The low 32 bits.
         * @param {number} hi The high 32 bits.
         * @constructor
         */
        constructor(lo: number, hi: number);

        /**
         * The low 32 bits.
         * @public {number}
         */
        lo: any /*missing*/;

        /**
         * The high 32 bits.
         * @public {number}
         */
        hi: any /*missing*/;

        /**
         * Add two 64-bit numbers to produce a 64-bit number.
         * @param {!jspb.arith.Int64} other
         * @return {!jspb.arith.Int64}
         */
        add(other: jspb.arith.Int64): jspb.arith.Int64;

        /**
         * Subtract two 64-bit numbers to produce a 64-bit number.
         * @param {!jspb.arith.Int64} other
         * @return {!jspb.arith.Int64}
         */
        sub(other: jspb.arith.Int64): jspb.arith.Int64;

        /**
         * Make a copy of the int64.
         * @return {!jspb.arith.Int64}
         */
        clone(): jspb.arith.Int64;
    }

}

declare module jspb.arith.UInt64 {

    /**
     * Multiply two 32-bit numbers to produce a 64-bit number.
     * @param {number} a The first integer:  must be in [0, 2^32-1).
     * @param {number} b The second integer: must be in [0, 2^32-1).
     * @return {!jspb.arith.UInt64}
     */
    function mul32x32(a: number, b: number): jspb.arith.UInt64;

    /**
     * Parse a string into a 64-bit number. Returns `null` on a parse error.
     * @param {string} s
     * @return {?jspb.arith.UInt64}
     */
    function fromString(s: string): jspb.arith.UInt64;
}

declare module jspb.arith.Int64 {

    /**
     * Parse a string into a 64-bit number. Returns `null` on a parse error.
     * @param {string} s
     * @return {?jspb.arith.Int64}
     */
    function fromString(s: string): jspb.arith.Int64;
}
