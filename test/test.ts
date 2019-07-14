import { Stream } from '../src'

const numbers = [1, 2, 3]
const stream = Stream.from(numbers)
describe('Stream', () => {
  test('from method should return a Stream instance', () => {
    expect(stream).toBeInstanceOf(Stream)
  })
  test('getValue method should return array', () => {
    expect(stream.getValue()).toBe(numbers)
  })

  test('each method should call 3 times', () => {
    const mockCallback = jest.fn()
    stream.each(mockCallback)
    // 判断是否被执行两次
    expect(mockCallback.mock.calls.length).toBe(3)

    // 判断函数被首次执行的第一个形参为0
    expect(mockCallback.mock.calls[0][0]).toBe(1)
  })

  test('each method should call twice', () => {
    let num = -1
    stream.each((item, index, list) => {
      if (item > 2) {
        return false
      } else {
        num = item
      }
    })
    expect(num).toBe(2)
  })
  test('map method ', () => {
    const result = stream.map(v => v * 2).getValue()
    expect(result).toStrictEqual([2, 4, 6])
  })
  test('filter method ', () => {
    const result = stream.filter(v => v > 2).getValue()
    expect(result).toStrictEqual([3])
  })

  test('reduce method ', () => {
    const result = stream
      .reduce((prev, cur) => {
        return prev + cur
      }, 0)
      .getReducedValue()
    expect(result).toStrictEqual(6)
  })
})
