class HashMap {
  constructor(initialSize = 16) {
    this.buckets = new Array(initialSize).fill(null).map(() => []);
  }

  hash(key) {
    let hashCode = 0;
    let bucketSize = this.buckets.length;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = ((primeNumber * hashCode) + key.charCodeAt(i)) % bucketSize;
    }

    return hashCode;
  }
}