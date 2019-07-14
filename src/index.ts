export class Stream<T> {
  /**
   * of
   */
  constructor(private value: Array<T>) {}

  static from<K>(value: Array<K>): Stream<K> {
    return new Stream<K>(value)
  }
  getValue(): T[] {
    return this.value
  }
  getReducedValue(): T {
    return this.value[0]
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
  filter(fn: FilterCallback<T>): Stream<T> {
    const values: T[] = []
    this.each((item, index, list) => {
      if (fn(item, index, list)) {
        values.push(item)
      }
    })
    return Stream.from(values)
  }
  /**
   * 必须提供初值
   */
  reduce<K>(fn: ReduceCallback<T, K>, initialValue: any): Stream<K> {
    let values = initialValue
    this.each((item, index, list) => {
      values = fn(values, item, index, list)
    })
    return Stream.from([values])
  }
}
type Params<T> = [T, number, T[]]
type EachCallback<T> = (...params: Params<T>) => any
type MapCallback<T, K> = (...params: Params<T>) => K
type FilterCallback<T> = (...params: Params<T>) => any
type ReduceCallback<T, K> = (previousValue: any, ...params: Params<T>) => K
