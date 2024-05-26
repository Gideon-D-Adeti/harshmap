class HashMap {
  constructor(initialSize = 16) {
    if (initialSize < 0) {
      throw new Error("Initial size cannot be negative");
    }
    this.buckets = new Array(initialSize).fill(null).map(() => []);
    this.size = 0;
    this.loadFactor = 0.75;
  }

  // Method to generate hashCodes of keys
  hash(key) {
    if (typeof key !== "string") {
      throw new Error("Key must be a string");
    }
    let hashCode = 0;
    let bucketSize = this.buckets.length;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucketSize;
    }

    return hashCode;
  }

  // Method to set key-value pairs
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [k, v] = bucket[i];
      if (k === key) {
        bucket[i] = [key, value];
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.buckets.length > this.loadFactor) {
      this._resize(this.buckets.length * 2);
    }
  }

  // Method to get the value for a given key
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const [k, v] of bucket) {
      if (k === key) {
        return v;
      }
    }

    return null;
  }

  // Method to check if a key exists
  has(key) {
    return this.get(key) !== null;
  }

  // Method to remove a key-value pair
  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [k, v] = bucket[i];
      if (k === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  // Method to return the number of elements
  length() {
    return this.size;
  }

  // Method to clear all elements
  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
    this.size = 0;
  }

  // Method to return all keys
  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      for (const [k, v] of bucket) {
        keys.push(k);
      }
    }
    return keys;
  }

  // Method to return all values
  values() {
    const values = [];
    for (const bucket of this.buckets) {
      for (const [k, v] of bucket) {
        values.push(v);
      }
    }
    return values;
  }

  // Method to return all entries
  entries() {
    const entries = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entries.push(entry);
      }
    }
    return entries;
  }

  // Private method to resize the buckets array
  _resize(newSize) {
    const oldBuckets = this.buckets;
    this.buckets = new Array(newSize).fill(null).map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [k, v] of bucket) {
        this.set(k, v);
      }
    }
  }
}

class HashSet {
  constructor(initialSize = 16) {
    if (initialSize < 0) {
      throw new Error("Initial size cannot be negative");
    }
    this.map = new HashMap(initialSize);
  }

  add(key) {
    if (typeof key !== "string") {
      throw new Error("Key must be a string");
    }
    this.map.set(key, true);
  }

  has(key) {
    return this.map.has(key);
  }

  remove(key) {
    return this.map.remove(key);
  }

  clear() {
    this.map.clear();
  }

  size() {
    return this.map.length();
  }

  keys() {
    return this.map.keys();
  }
}
