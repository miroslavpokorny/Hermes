
declare module jspb {

    class ExtensionFieldInfo<T> extends ExtensionFieldInfo__Class<T> { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ExtensionFieldInfo__Class<T>  {

        /**
         * Stores information for a single extension field.
         *
         * For example, an extension field defined like so:
         *
         *     extend BaseMessage {
             *       optional MyMessage my_field = 123;
             *     }
         *
         * will result in an ExtensionFieldInfo object with these properties:
         *
         *     {
             *       fieldIndex: 123,
             *       fieldName: {my_field_renamed: 0},
             *       ctor: proto.example.MyMessage,
             *       toObjectFn: proto.example.MyMessage.toObject,
             *       isRepeated: 0
             *     }
         *
         * We include `toObjectFn` to allow the JSCompiler to perform dead-code removal
         * on unused toObject() methods.
         *
         * If an extension field is primitive, ctor and toObjectFn will be null.
         * isRepeated should be 0 or 1.
         *
         * binary{Reader,Writer}Fn and (if message type) binaryMessageSerializeFn are
         * always provided. binaryReaderFn and binaryWriterFn are references to the
         * appropriate methods on BinaryReader/BinaryWriter to read/write the value of
         * this extension, and binaryMessageSerializeFn is a reference to the message
         * class's .serializeBinary method, if available.
         *
         * @param {number} fieldNumber
         * @param {Object} fieldName This has the extension field name as a property.
         * @param {?function(new: jspb.Message, Array=)} ctor
         * @param {?function((boolean|undefined),!jspb.Message):!Object} toObjectFn
         * @param {number} isRepeated
         * @constructor
         * @struct
         * @template T
         */
        constructor(fieldNumber: number, fieldName: Object, ctor: { (_0: any[]): any /*missing*/ }, toObjectFn: { (_0: boolean|any /*undefined*/, _1: jspb.Message): Object }, isRepeated: number);

        /** @const */
        fieldIndex: any /*missing*/;

        /** @const */
        fieldName: any /*missing*/;

        /** @const */
        ctor: any /*missing*/;

        /** @const */
        toObjectFn: any /*missing*/;

        /** @const */
        isRepeated: any /*missing*/;

        /**
         * @return {boolean} Does this field represent a sub Message?
         */
        isMessageType(): boolean;
    }


    class ExtensionFieldBinaryInfo<T> extends ExtensionFieldBinaryInfo__Class<T> { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class ExtensionFieldBinaryInfo__Class<T>  {

        /**
         * Stores binary-related information for a single extension field.
         * @param {!jspb.ExtensionFieldInfo<T>} fieldInfo
         * @param {!function(number,?)} binaryReaderFn
         * @param {!function(number,?)|function(number,?,?,?,?,?)} binaryWriterFn
         * @param {function(?,?)=} opt_binaryMessageSerializeFn
         * @param {function(?,?)=} opt_binaryMessageDeserializeFn
         * @param {boolean=} opt_isPacked
         * @constructor
         * @struct
         * @template T
         */
        constructor(fieldInfo: jspb.ExtensionFieldInfo<T>, binaryReaderFn: { (_0: number, _1: any): any /*missing*/ }, binaryWriterFn: { (_0: number, _1: any): any /*missing*/ }|{ (_0: number, _1: any, _2: any, _3: any, _4: any, _5: any): any /*missing*/ }, opt_binaryMessageSerializeFn?: { (_0: any, _1: any): any /*missing*/ }, opt_binaryMessageDeserializeFn?: { (_0: any, _1: any): any /*missing*/ }, opt_isPacked?: boolean);

        /** @const */
        fieldInfo: any /*missing*/;

        /** @const */
        binaryReaderFn: any /*missing*/;

        /** @const */
        binaryWriterFn: any /*missing*/;

        /** @const */
        binaryMessageSerializeFn: any /*missing*/;

        /** @const */
        binaryMessageDeserializeFn: any /*missing*/;

        /** @const */
        isPacked: any /*missing*/;
    }


    class Message extends Message__Class { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Message__Class  {

        /**
         * Base class for all JsPb messages.
         * @constructor
         * @struct
         */
        constructor();

        /**
         * The internal data array.
         * @type {!Array}
         * @protected
         */
        array: any[];

        /**
         * The xid of this proto type (The same for all instances of a proto). Provides
         * a way to identify a proto by stable obfuscated name.
         * @see {xid}.
         * Available if {@link jspb.generate_xid} is added as a Message option to
         * a protocol buffer.
         * @const {!xid.String|undefined} The xid or undefined if message is
         *     annotated to generate the xid.
         */
        messageXid: any /*missing*/;

        /**
         * Returns the JsPb message_id of this proto.
         * @return {string|undefined} the message id or undefined if this message
         *     has no id.
         */
        getJsPbMessageId(): string|any /*undefined*/;

        /**
         * Returns the internal array of this proto.
         * <p>Note: If you use this array to construct a second proto, the content
         * would then be partially shared between the two protos.
         * @return {!Array} The proto represented as an array.
         */
        toArray(): any[];

        /**
         * Gets the value of the extension field from the extended object.
         * @param {jspb.ExtensionFieldInfo.<T>} fieldInfo Specifies the field to get.
         * @return {T} The value of the field.
         * @template T
         */
        getExtension<T>(fieldInfo: jspb.ExtensionFieldInfo<T>): T;

        /**
         * Sets the value of the extension field in the extended object.
         * @param {jspb.ExtensionFieldInfo} fieldInfo Specifies the field to set.
         * @param {jspb.Message|string|Uint8Array|number|boolean|Array?} value The value
         *     to set.
         * @return {THIS} For chaining
         * @this {THIS}
         * @template THIS
         */
        setExtension(fieldInfo: jspb.ExtensionFieldInfo<any>, value: jspb.Message|string|Uint8Array|number|boolean|any[]): any;

        /**
         * Templated, type-safe cloneMessage definition.
         * @return {THIS}
         * @this {THIS}
         * @template THIS
         */
        cloneMessage(): any;

        /**
         * Alias clone to cloneMessage. goog.object.unsafeClone uses clone to
         * efficiently copy objects. Without this alias, copying jspb messages comes
         * with a large performance penalty.
         * @return {THIS}
         * @this {THIS}
         * @template THIS
         */
        clone(): any;
    }

}

declare module jspb.Message {

    /**
     * Initializes a JsPb Message.
     * @param {!jspb.Message} msg The JsPb proto to modify.
     * @param {Array|undefined} data An initial data array.
     * @param {string|number} messageId For response messages, the message id or ''
     *     if no message id is specified. For non-response messages, 0.
     * @param {number} suggestedPivot The field number at which to start putting
     *     fields into the extension object. This is only used if data does not
     *     contain an extension object already. -1 if no extension object is
     *     required for this message type.
     * @param {Array<number>} repeatedFields The message's repeated fields.
     * @param {Array<!Array<number>>=} opt_oneofFields The fields belonging to
     *     each of the message's oneof unions.
     * @protected
     */
    function initialize(msg: jspb.Message, data: any[]|any /*undefined*/, messageId: string|number, suggestedPivot: number, repeatedFields: number[], opt_oneofFields?: number[][]): void;

    /**
     * Converts a JsPb repeated message field into an object list.
     * @param {!Array<T>} field The repeated message field to be
     *     converted.
     * @param {?function(boolean=): Object|
     *     function((boolean|undefined),T): Object} toObjectFn The toObject
     *     function for this field.  We need to pass this for effective dead code
     *     removal.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Array<Object>} An array of converted message objects.
     * @template T
     */
    function toObjectList<T>(field: T[], toObjectFn: { (_0: boolean): Object }|{ (_0: boolean|any /*undefined*/, _1: T): Object }, opt_includeInstance?: boolean): Object[];

    /**
     * Adds a proto's extension data to a Soy rendering object.
     * @param {!jspb.Message} proto The proto whose extensions to convert.
     * @param {!Object} obj The Soy object to add converted extension data to.
     * @param {!Object} extensions The proto class' registered extensions.
     * @param {function(this:?, jspb.ExtensionFieldInfo) : *} getExtensionFn
     *     The proto class' getExtension function. Passed for effective dead code
     *     removal.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     */
    function toObjectExtension(proto: jspb.Message, obj: Object, extensions: Object, getExtensionFn: any /*missing*/, opt_includeInstance?: boolean): void;

    /**
     * Writes a proto's extension data to a binary-format output stream.
     * @param {!jspb.Message} proto The proto whose extensions to convert.
     * @param {*} writer The binary-format writer to write to.
     * @param {!Object} extensions The proto class' registered extensions.
     * @param {function(jspb.ExtensionFieldInfo) : *} getExtensionFn The proto
     *     class' getExtension function. Passed for effective dead code removal.
     */
    function serializeBinaryExtensions(proto: jspb.Message, writer: any, extensions: Object, getExtensionFn: { (_0: jspb.ExtensionFieldInfo<any>): any }): void;

    /**
     * Reads an extension field from the given reader and, if a valid extension,
     * sets the extension value.
     * @param {!jspb.Message} msg A jspb proto.
     * @param {{skipField:function(),getFieldNumber:function():number}} reader
     * @param {!Object} extensions The extensions object.
     * @param {function(jspb.ExtensionFieldInfo)} getExtensionFn
     * @param {function(jspb.ExtensionFieldInfo, ?)} setExtensionFn
     */
    function readBinaryExtension(msg: jspb.Message, reader: { skipField: { (): any /*missing*/ }; getFieldNumber: { (): number } }, extensions: Object, getExtensionFn: { (_0: jspb.ExtensionFieldInfo<any>): any /*missing*/ }, setExtensionFn: { (_0: jspb.ExtensionFieldInfo<any>, _1: any): any /*missing*/ }): void;

    /**
     * Gets the value of a non-extension field.
     * @param {!jspb.Message} msg A jspb proto.
     * @param {number} fieldNumber The field number.
     * @return {string|number|boolean|Uint8Array|Array|null|undefined}
     * The field's value.
     * @protected
     */
    function getField(msg: jspb.Message, fieldNumber: number): string|number|boolean|Uint8Array|any[]|any /*null*/|any /*undefined*/;

    /**
     * Gets the value of an optional float or double field.
     * @param {!jspb.Message} msg A jspb proto.
     * @param {number} fieldNumber The field number.
     * @return {?number|undefined} The field's value.
     * @protected
     */
    function getOptionalFloatingPointField(msg: jspb.Message, fieldNumber: number): number|any /*undefined*/;

    /**
     * Gets the value of a repeated float or double field.
     * @param {!jspb.Message} msg A jspb proto.
     * @param {number} fieldNumber The field number.
     * @return {!Array<number>} The field's value.
     * @protected
     */
    function getRepeatedFloatingPointField(msg: jspb.Message, fieldNumber: number): number[];

    /**
     * Coerce a 'bytes' field to a base 64 string.
     * @param {string|Uint8Array|null} value
     * @return {?string} The field's coerced value.
     */
    function bytesAsB64(value: string|Uint8Array|any /*null*/): string;

    /**
     * Coerce a 'bytes' field to a Uint8Array byte buffer.
     * Note that Uint8Array is not supported on IE versions before 10 nor on Opera
     * Mini. @see http://caniuse.com/Uint8Array
     * @param {string|Uint8Array|null} value
     * @return {?Uint8Array} The field's coerced value.
     */
    function bytesAsU8(value: string|Uint8Array|any /*null*/): Uint8Array;

    /**
     * Coerce a repeated 'bytes' field to an array of base 64 strings.
     * Note: the returned array should be treated as immutable.
     * @param {!Array<string>|!Array<!Uint8Array>} value
     * @return {!Array<string?>} The field's coerced value.
     */
    function bytesListAsB64(value: string[]|Uint8Array[]): string[];

    /**
     * Coerce a repeated 'bytes' field to an array of Uint8Array byte buffers.
     * Note: the returned array should be treated as immutable.
     * Note that Uint8Array is not supported on IE versions before 10 nor on Opera
     * Mini. @see http://caniuse.com/Uint8Array
     * @param {!Array<string>|!Array<!Uint8Array>} value
     * @return {!Array<Uint8Array?>} The field's coerced value.
     */
    function bytesListAsU8(value: string[]|Uint8Array[]): Uint8Array[];

    /**
     * Gets the value of a non-extension primitive field, with proto3 (non-nullable
     * primitives) semantics. Returns `defaultValue` if the field is not otherwise
     * set.
     * @template T
     * @param {!jspb.Message} msg A jspb proto.
     * @param {number} fieldNumber The field number.
     * @param {T} defaultValue The default value.
     * @return {T} The field's value.
     * @protected
     */
    function getFieldWithDefault<T>(msg: jspb.Message, fieldNumber: number, defaultValue: T): T;

    /**
     * Gets the value of a map field, lazily creating the map container if
     * necessary.
     *
     * This should only be called from generated code, because it requires knowledge
     * of serialization/parsing callbacks (which are required by the map at
     * construction time, and the map may be constructed here).
     *
     * @template K, V
     * @param {!jspb.Message} msg
     * @param {number} fieldNumber
     * @param {boolean|undefined} noLazyCreate
     * @param {?=} opt_valueCtor
     * @return {!jspb.Map<K, V>|undefined}
     * @protected
     */
    function getMapField<K, V>(msg: jspb.Message, fieldNumber: number, noLazyCreate: boolean|any /*undefined*/, opt_valueCtor?: any): jspb.Map<K,V>|any /*undefined*/;

    /**
     * Sets the value of a non-extension field.
     * @param {!jspb.Message} msg A jspb proto.
     * @param {number} fieldNumber The field number.
     * @param {string|number|boolean|Uint8Array|Array|undefined} value New value
     * @protected
     */
    function setField(msg: jspb.Message, fieldNumber: number, value: string|number|boolean|Uint8Array|any[]|any /*undefined*/): void;

    /**
     * Adds a value to a repeated, primitive field.
     * @param {!jspb.Message} msg A jspb proto.
     * @param {number} fieldNumber The field number.
     * @param {string|number|boolean|!Uint8Array} value New value
     * @param {number=} opt_index Index where to put new value.
     * @protected
     */
    function addToRepeatedField(msg: jspb.Message, fieldNumber: number, value: string|number|boolean|Uint8Array, opt_index?: number): void;

    /**
     * Sets the value of a field in a oneof union and clears all other fields in
     * the union.
     * @param {!jspb.Message} msg A jspb proto.
     * @param {number} fieldNumber The field number.
     * @param {!Array<number>} oneof The fields belonging to the union.
     * @param {string|number|boolean|Uint8Array|Array|undefined} value New value
     * @protected
     */
    function setOneofField(msg: jspb.Message, fieldNumber: number, oneof: number[], value: string|number|boolean|Uint8Array|any[]|any /*undefined*/): void;

    /**
     * Computes the selection in a oneof group for the given message, ensuring
     * only one field is set in the process.
     *
     * According to the protobuf language guide (
     * https://developers.google.com/protocol-buffers/docs/proto#oneof), "if the
     * parser encounters multiple members of the same oneof on the wire, only the
     * last member seen is used in the parsed message." Since JSPB serializes
     * messages to a JSON array, the "last member seen" will always be the field
     * with the greatest field number (directly corresponding to the greatest
     * array index).
     *
     * @param {!jspb.Message} msg A jspb proto.
     * @param {!Array<number>} oneof The field numbers belonging to the union.
     * @return {number} The field number currently set in the union, or 0 if none.
     * @protected
     */
    function computeOneofCase(msg: jspb.Message, oneof: number[]): number;

    /**
     * Gets and wraps a proto field on access.
     * @param {!jspb.Message} msg A jspb proto.
     * @param {function(new:jspb.Message, Array)} ctor Constructor for the field.
     * @param {number} fieldNumber The field number.
     * @param {number=} opt_required True (1) if this is a required field.
     * @return {jspb.Message} The field as a jspb proto.
     * @protected
     */
    function getWrapperField(msg: jspb.Message, ctor: { (_0: any[]): any /*missing*/ }, fieldNumber: number, opt_required?: number): jspb.Message;

    /**
     * Gets and wraps a repeated proto field on access.
     * @param {!jspb.Message} msg A jspb proto.
     * @param {function(new:jspb.Message, Array)} ctor Constructor for the field.
     * @param {number} fieldNumber The field number.
     * @return {Array<!jspb.Message>} The repeated field as an array of protos.
     * @protected
     */
    function getRepeatedWrapperField(msg: jspb.Message, ctor: { (_0: any[]): any /*missing*/ }, fieldNumber: number): jspb.Message[];

    /**
     * Sets a proto field and syncs it to the backing array.
     * @param {!jspb.Message} msg A jspb proto.
     * @param {number} fieldNumber The field number.
     * @param {jspb.Message|undefined} value A new value for this proto field.
     * @protected
     */
    function setWrapperField(msg: jspb.Message, fieldNumber: number, value: jspb.Message|any /*undefined*/): void;

    /**
     * Sets a proto field in a oneof union and syncs it to the backing array.
     * @param {!jspb.Message} msg A jspb proto.
     * @param {number} fieldNumber The field number.
     * @param {!Array<number>} oneof The fields belonging to the union.
     * @param {jspb.Message|undefined} value A new value for this proto field.
     * @protected
     */
    function setOneofWrapperField(msg: jspb.Message, fieldNumber: number, oneof: number[], value: jspb.Message|any /*undefined*/): void;

    /**
     * Sets a repeated proto field and syncs it to the backing array.
     * @param {!jspb.Message} msg A jspb proto.
     * @param {number} fieldNumber The field number.
     * @param {Array<!jspb.Message>|undefined} value An array of protos.
     * @protected
     */
    function setRepeatedWrapperField(msg: jspb.Message, fieldNumber: number, value: jspb.Message[]|any /*undefined*/): void;

    /**
     * Add a message to a repeated proto field.
     * @param {!jspb.Message} msg A jspb proto.
     * @param {number} fieldNumber The field number.
     * @param {T_CHILD|undefined} value Proto that will be added to the
     *     repeated field.
     * @param {function(new:T_CHILD, ?Array=)} ctor The constructor of the
     *     message type.
     * @param {number|undefined} index Index at which to insert the value.
     * @return {T_CHILD_NOT_UNDEFINED} proto that was inserted to the repeated field
     * @template MessageType
     * Use go/closure-ttl to declare a non-undefined version of T_CHILD. Replace the
     * undefined in blah|undefined with none. This is necessary because the compiler
     * will infer T_CHILD to be |undefined.
     * @template T_CHILD
     * @template T_CHILD_NOT_UNDEFINED :=
     *     cond(isUnknown(T_CHILD), unknown(),
     *       mapunion(T_CHILD, (X) =>
     *         cond(eq(X, 'undefined'), none(), X)))
     * =:
     * @protected
     */
    function addToRepeatedWrapperField<MessageType>(msg: jspb.Message, fieldNumber: number, value: any /*undefined*/, ctor: { (_0: any[]): any /*missing*/ }, index: number|any /*undefined*/): any;

    /**
     * Converts a JsPb repeated message field into a map. The map will contain
     * protos unless an optional toObject function is given, in which case it will
     * contain objects suitable for Soy rendering.
     * @param {!Array<T>} field The repeated message field to be
     *     converted.
     * @param {function() : string?} mapKeyGetterFn The function to get the key of
     *     the map.
     * @param {?function(boolean=): Object|
     *     function((boolean|undefined),T): Object} opt_toObjectFn The
     *     toObject function for this field. We need to pass this for effective
     *     dead code removal.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object.<string, Object>} A map of proto or Soy objects.
     * @template T
     */
    function toMap<T>(field: T[], mapKeyGetterFn: { (): string }, opt_toObjectFn: { (_0: boolean): Object }|{ (_0: boolean|any /*undefined*/, _1: T): Object }, opt_includeInstance?: boolean): { [key: string]: Object };

    /**
     * Creates a difference object between two messages.
     *
     * The result will contain the top-level fields of m2 that differ from those of
     * m1 at any level of nesting. No data is cloned, the result object will
     * share its top-level elements with m2 (but not with m1).
     *
     * Note that repeated fields should not have null/undefined elements, but if
     * they do, this operation will treat repeated fields of different length as
     * the same if the only difference between them is due to trailing
     * null/undefined values.
     *
     * @param {!jspb.Message} m1 The first message object.
     * @param {!jspb.Message} m2 The second message object.
     * @return {!jspb.Message} The difference returned as a proto message.
     *     Note that the returned message may be missing required fields. This is
     *     currently tolerated in Js, but would cause an error if you tried to
     *     send such a proto to the server. You can access the raw difference
     *     array with result.toArray().
     * @throws {Error} If the messages are responses with different types.
     */
    function difference(m1: jspb.Message, m2: jspb.Message): jspb.Message;

    /**
     * Tests whether two messages are equal.
     * @param {jspb.Message|undefined} m1 The first message object.
     * @param {jspb.Message|undefined} m2 The second message object.
     * @return {boolean} true if both messages are null/undefined, or if both are
     *     of the same type and have the same field values.
     */
    function equals(m1: jspb.Message|any /*undefined*/, m2: jspb.Message|any /*undefined*/): boolean;

    /**
     * Compares two message extension fields recursively.
     * @param {!Object} extension1 The first field.
     * @param {!Object} extension2 The second field.
     * @return {boolean} true if the extensions are null/undefined, or otherwise
     *     equal.
     */
    function compareExtensions(extension1: Object, extension2: Object): boolean;

    /**
     * Compares two message fields recursively.
     * @param {*} field1 The first field.
     * @param {*} field2 The second field.
     * @return {boolean} true if the fields are null/undefined, or otherwise equal.
     */
    function compareFields(field1: any, field2: any): boolean;

    /**
     * Static clone function. NOTE: A type-safe method called "cloneMessage"
     * exists
     * on each generated JsPb class. Do not call this function directly.
     * @param {!jspb.Message} msg A message to clone.
     * @return {!jspb.Message} A deep clone of the given message.
     */
    function clone(msg: jspb.Message): jspb.Message;

    /**
     * @param {!jspb.Message} msg A message to clone.
     * @return {!jspb.Message} A deep clone of the given message.
     * @protected
     */
    function cloneMessage(msg: jspb.Message): jspb.Message;

    /**
     * Takes 2 messages of the same type and copies the contents of the first
     * message into the second. After this the 2 messages will equals in terms of
     * value semantics but share no state. All data in the destination message will
     * be overridden.
     *
     * @param {MESSAGE} fromMessage Message that will be copied into toMessage.
     * @param {MESSAGE} toMessage Message which will receive a copy of fromMessage
     *     as its contents.
     * @template MESSAGE
     */
    function copyInto<MESSAGE>(fromMessage: MESSAGE, toMessage: MESSAGE): void;

    /**
     * Registers a JsPb message type id with its constructor.
     * @param {string} id The id for this type of message.
     * @param {Function} constructor The message constructor.
     */
    function registerMessageType(id: string, constructor: Function): void;

    /**
     * The extensions registered on MessageSet. This is a map of extension
     * field number to field info object. This should be considered as a
     * private API.
     *
     * This is similar to [jspb class name].extensions object for
     * non-MessageSet. We special case MessageSet so that we do not need
     * to goog.require MessageSet from classes that extends MessageSet.
     *
     * @type {!Object.<number, jspb.ExtensionFieldInfo>}
     */
    var messageSetExtensions: { [key: number]: jspb.ExtensionFieldInfo<any> };
}
