
declare module jspb.debug {

    /**
     * Turns a proto into a human readable object that can i.e. be written to the
     * console: {@code console.log(jspb.debug.dump(myProto))}.
     * This function makes a best effort and may not work in all cases. It will not
     * work in obfuscated and or optimized code.
     * Use this in environments where {@see jspb.Message.prototype.toObject} is
     * not available for code size reasons.
     * @param {jspb.Message} message A jspb.Message.
     * @return {Object}
     */
    function dump(message: jspb.Message): Object;
}
