export enum Iso3166CountryCode {
  US = '미국',
  KR = '대한민국',
  FR = '프랑스',
  GB = '영국',
  JP = '일본',
  CN = '중국',
  // 필요한 다른 국가 코드도 계속 추가하세요.
}
export const getCountryNameByIso = (code: string | undefined): string => {
  if (code === undefined) return '';
  return Iso3166CountryCode[code.toUpperCase() as keyof typeof Iso3166CountryCode] || code;
};
