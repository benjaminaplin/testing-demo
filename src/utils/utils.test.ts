import { isEmpty } from './utils'

test('returns true if object is empty', () => {
  expect(isEmpty({})).toEqual(true)
})
test('returns false if object is not empty', () => {
  expect(isEmpty({foo: 'bar'})).toEqual(false)
})