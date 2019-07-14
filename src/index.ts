export class Stream<T> {
  /**
   * of
   */
  constructor(private value: Array<T>) {}

  static from<K>(value: Array<K>): Stream<K> {
    return new Stream<K>(value)
  }
  getValue() {
    return this.value
  }
  each(fn: EachCallback<T>): void {
    for (let i = 0; i < this.value.length; i++) {
      if (fn(this.value[i], i, this.value) === false) {
        break
      }
    }
  }
  map<K>(fn: MapCallback<T, K>): Stream<K> {
    const values: K[] = []
    this.each((item, index, list) => {
      values.push(fn(item, index, list))
    })
    return Stream.from(values)
  }
}
type Params<T> = [T, number, T[]]
type EachCallback<T> = (...params: Params<T>) => any
type MapCallback<T, K> = (...params: Params<T>) => K
