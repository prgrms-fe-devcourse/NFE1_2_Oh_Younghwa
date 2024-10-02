//문자열들로 이루어진 배열에 특정 문자열이 있는지 확인하는 함수입니다.
export function findString<T>(array: T[] = [], target: T) {
  const found = array.find((item) => item === target);
  return found ? found : null;
}
