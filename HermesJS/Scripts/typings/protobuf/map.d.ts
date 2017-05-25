
declare module jspb {
    type Iterator<T> = any;

    class Map<K, V> extends Map__Class<K, V> { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Map__Class<K, V>  {

        /**
         * Constructs a new Map. A Map is a container that is used to implement map
         * fields on message objects. It closely follows the ES6 Map API; however,
         * it is distinct because we do not want to depend on external polyfills or
         * on ES6 itself.
         *
         * This constructor should only be called from generated message code. It is not
         * intended for general use by library consumers.
         *
         * @template K, V
         *
         * @param {!Array<!Array<!Object>>} arr
         *
         * @param {?function(new:V)|function(new:V,?)=} opt_valueCtor
         *    The constructor for type V, if type V is a message type.
         *
         * @constructor
         * @struct
         */
        constructor(arr: Object[][], opt_valueCtor?: { (): any /*missing*/ }|{ (_0: any): any /*missing*/ });

        /**
         * Is `this.arr_ updated with respect to `this.map_`?
         * @type {boolean}
         */
        arrClean: boolean;

        /**
         * Synchronize content to underlying array, if needed, and return it.
         * @return {!Array<!Array<!Object>>}
         */
        toArray(): Object[][];

        /**
         * Returns the map's length (number of key/value pairs).
         * @return {number}
         */
        getLength(): number;

        /**
         * Clears the map.
         */
        clear(): void;

        /**
         * Deletes a particular key from the map.
         * N.B.: differs in name from ES6 Map's `delete` because IE8 does not support
         * reserved words as property names.
         * @this {jspb.Map}
         * @param {K} key
         * @return {boolean} Whether any entry with this key was deleted.
         */
        del(key: any /* jsdoc error */): void;

        /**
         * Returns an array of [key, value] pairs in the map.
         *
         * This is redundant compared to the plain entries() method, but we provide this
         * to help out Angular 1.x users.  Still evaluating whether this is the best
         * option.
         *
         * @return {!Array<K|V>}
         */
        getEntryList(): K|V[];

        /**
         * Returns an iterator over [key, value] pairs in the map.
         * Closure compiler sadly doesn't support tuples, ie. Iterator<[K,V]>.
         * @return {!Iterator<!Array<K|V>>}
         *     The iterator
         */
        entries(): Iterator<K|V[]>;

        /**
         * Returns an iterator over keys in the map.
         * @return {!Iterator<K>} The iterator
         */
        keys(): Iterator<K>;

        /**
         * Returns an iterator over values in the map.
         * @return {!Iterator<V>} The iterator
         */
        values(): Iterator<V>;

        /**
         * Iterates over entries in the map, calling a function on each.
         * @template T
         * @param {function(this:T, V, K, ?jspb.Map<K, V>)} cb
         * @param {T=} opt_thisArg
         */
        forEach<T>(cb: { (_0: V, _1: K, _2: jspb.Map<K,V>): any /*missing*/ }, opt_thisArg?: T): void;

        /**
         * Sets a key in the map to the given value.
         * @param {K} key The key
         * @param {V} value The value
         * @return {!jspb.Map<K,V>}
         */
        set(key: K, value: V): jspb.Map<K,V>;

        /**
         * Gets the value corresponding to a key in the map.
         * @param {K} key
         * @return {V|undefined} The value, or `undefined` if key not present
         */
        get(key: K): V|any /*undefined*/;

        /**
         * Determines whether the given key is present in the map.
         * @param {K} key
         * @return {boolean} `true` if the key is present
         */
        has(key: K): boolean;

        /**
         * Write this Map field in wire format to a BinaryWriter, using the given field
         * number.
         * @param {number} fieldNumber
         * @param {!jspb.BinaryWriter} writer
         * @param {!function(this:jspb.BinaryWriter,number,K)} keyWriterFn
         *     The method on BinaryWriter that writes type K to the stream.
         * @param {!function(this:jspb.BinaryWriter,number,V)|
             *          function(this:jspb.BinaryReader,V,?)} valueWriterFn
         *     The method on BinaryWriter that writes type V to the stream.  May be
         *     writeMessage, in which case the second callback arg form is used.
         * @param {function(V,!jspb.BinaryWriter)=} opt_valueWriterCallback
         *    The BinaryWriter serialization callback for type V, if V is a message
         *    type.
         */
        serializeBinary(fieldNumber: number, writer: jspb.BinaryWriter, keyWriterFn: { (_0: number, _1: K): any /*missing*/ }, valueWriterFn: { (_0: number, _1: V): any /*missing*/ }|{ (_0: V, _1: any): any /*missing*/ }, opt_valueWriterCallback?: { (_0: V, _1: jspb.BinaryWriter): any /*missing*/ }): void;
    }

}

declare module jspb.Map {

    class Entry_<K, V> extends Entry___Class<K, V> { }
    /** Fake class which should be extended to avoid inheriting static properties */
    class Entry___Class<K, V>  {

        /**
         * @param {!K} key The entry's key.
         * @param {V=} opt_value The entry's value wrapper.
         * @constructor
         * @struct
         * @template K, V
         * @private
         */
        constructor(key: K, opt_value?: V);

        /** @const {K} */
        key: any /*missing*/;

        /** @type {V} */
        value: V;

        /** @type {V} */
        valueWrapper: V;
    }


    /**
     * Read one key/value message from the given BinaryReader. Compatible as the
     * `reader` callback parameter to jspb.BinaryReader.readMessage, to be called
     * when a key/value pair submessage is encountered.
     * @template K, V
     * @param {!jspb.Map} map
     * @param {!jspb.BinaryReader} reader
     * @param {!function(this:jspb.BinaryReader):K} keyReaderFn
     *     The method on BinaryReader that reads type K from the stream.
     *
     * @param {!function(this:jspb.BinaryReader):V|
     *          function(this:jspb.BinaryReader,V,
     *                  function(V,!jspb.BinaryReader))} valueReaderFn
     *    The method on BinaryReader that reads type V from the stream. May be
     *    readMessage, in which case the second callback arg form is used.
     *
     * @param {?function(V,!jspb.BinaryReader)=} opt_valueReaderCallback
     *    The BinaryReader parsing callback for type V, if V is a message type.
     *
     */
    function deserializeBinary<K, V>(map: jspb.Map<K,V>, reader: jspb.BinaryReader, keyReaderFn: { (): K }, valueReaderFn: { (): V }|{ (_0: V, _1: { (_0: V, _1: jspb.BinaryReader): any /*missing*/ }): any /*missing*/ }, opt_valueReaderCallback?: { (_0: V, _1: jspb.BinaryReader): any /*missing*/ }): void;
}
