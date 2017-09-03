export class HashSet<T> {
  /**
   * The data storage for the set. Note all the keys in the set are numbers for
   * faster lookup.
   */
  private data: {[key: number]: T};

  /**
   * The number of elements in the set.
   */
  public size: number;

  /**
   * Constructs a new HashSet of type T.
   */
  public constructor(values: T[] = []) {
    this.data = {};
    this.size = 0;
    values.forEach(value => this.add(value));
  }

  /**
   * Adds an element to the set. Returns true if the element was added. Returns
   * false if the element had already been added.
   */
  public add(value: T): boolean {
    let hash = this.hash(value);

    if (!this.hasHash(hash)) {
      this.data[hash] = value;
      this.size++;
      return true;
    }

    return false;
  }

  /**
   * Removes an element from the set. Returns true if the element was removed.
   * Returns false if the element did not exist.
   */
  public remove(value: T): boolean {
    let hash = this.hash(value);

    if (this.hasHash(hash)) {
      delete this.data[hash];
      this.size--;
      return true;
    }

    return false;
  }

  /**
   * Returns true if this set contains the value.
   *
   * T(n) = O(1). Note: We still hash the value which can be O(1) or O(w) where
   * w is the width of a string that needs to be hashed to an integer.
   */
  public has(value: T): boolean {
    return this.hasHash(this.hash(value));
  }

  /**
   * Iterate over the values in the set. The values are sorted by key sort
   * order.
   */
  public forEach(callback: any): HashSet<T> {
    this.values().forEach(callback);
    return this;
  }

  /**
   * Returns all the elements in this set that are not in the other set.
   *
   * T(n) = O(n) where n is the number of elements in this set.
   */
  public difference(other: HashSet<T>): HashSet<T> {
    let result = new HashSet<T>();

    this.values().forEach(value => {
      if (!other.has(value)) {
        result.add(value);
      }
    });

    return result;
  }

  /**
   * Return the union of two sets.
   *
   * T(n, m) = O(m + n) where m is the number of elements in this set and n is the
   * number of elements in the other set.
   */
  public union(other: HashSet<T>): HashSet<T> {
    let result = new HashSet<T>();

    this.values().forEach(value => {
      result.add(value);
    });

    other.values().forEach(value => {
      result.add(value);
    });

    return result;
  }

  /**
   * Return the intersection of two sets.
   *
   * T(n) = O(n) where n is the number of values in this set.
   */
  public intersection(other: HashSet<T>): HashSet<T> {
    let result = new HashSet<T>();

    this.values().forEach(value => {
      if (other.has(value)) {
        result.add(value);
      }
    });

    return result;
  }

  /**
   * Pretty prints the set object in the console. This method is called by
   * util.inspect.
   */
  public inspect(): string {
    return this.toString();
  }

  /**
   * Returns a string representation of the set.
   *
   * T(n) = theta(this.size)
   */
  public toString(): string {
    return `{${this.values().join(', ')}}`
  }

  public keys(): number[] {
    return Object.keys(this.data).sort().map(Number);
  }

  /**
   * Returns an array of values contained in the set.
   *
   * T(n) = theta(this.size)
   */
  public values() {
    let result: T[] = [];

    this.keys().forEach(key => {
      result.push(this.data[key]);
    });

    return result;
  }

  /**
   * Returns a hash key for this entire set. This is useful if this set will
   * itself be a value for a superset.
   *
   * T(n) = theta(this.size * h) where h is the cost of the hash function
   * defined for the values.
   */
  public toHashKey(): number {
    let combinedStringKey = this.keys().join('');
    return this.hashString(combinedStringKey);
  }

  /**
   * Returns true if the hash key is present in this set.
   */
  private hasHash(hash: number): boolean {
    return typeof this.data[hash] !== 'undefined';
  }

  /**
   * Returns a hash for a value. If the value has a toHashKey() method defined
   * that method will be called to get the key. In that case the performance of
   * this function is dependent on the performance of the value's toHashKey()
   * function. If the value is a number then the number will be returned
   * directly. Otherwise, the value will be converted to a string, and a hash
   * value for that string will be returned.
   */
  public hash(value: T): number {
    if (typeof value['toHashKey'] === 'function') {
      return value['toHashKey']();
    }

    else if (typeof value === 'number') {
      return value;
    }

    else {
      return this.hashString(String(value));
    }
  }

  /**
   * Hash a string usuing the djb2 method.
   *
   * T(n) = theta(value.length)
   */
  public hashString(value: string): number {
    let hash = 5381;

    for (let i = 0; i < value.length; i++) {
      let c = value.charCodeAt(i);
      hash = ((hash << 5) + hash) + c;
    }

    return hash;
  }
}
