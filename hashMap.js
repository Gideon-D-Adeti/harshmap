class HashMap {
  constructor(initialSize = 16) {
    this.buckets = new Array(initialSize).fill(null).map(() => []);
    this.size = 0;
    this.loadFactor = 0.75;
  }

  //   Method to generate hashCodes of keys
  hash(key) {
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
      // TODO: write resize method
      return;
    }
  }

  //   Method to get the value for a given key
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

  //   Method to check if a key exists
  has(key) {
    return this.get(key) !== null;
  }
}
