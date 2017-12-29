export default function (sec) {
  return new Promise(resolve => setTimeout(resolve, sec))
}
