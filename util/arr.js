/**
 * first of array
 * @param {Array.<T>} arr
 * @return {T}
 */
export function first(arr) {
  return arr.length ? arr[0] : null
}

/**
 * last of array
 * @param {Array.<T>} arr
 * @return {T}
 */
export function last(arr) {
  return arr[arr.length - 1]
}
