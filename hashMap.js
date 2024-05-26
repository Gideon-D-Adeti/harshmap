class HashMap {
  constructor(initialSize = 16) {
    this.buckets = new Array(initialSize).fill(null).map(() => []);
  }
}
