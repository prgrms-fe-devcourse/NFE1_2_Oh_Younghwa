import { Iso3166CountryCode } from './Iso3166CountryCode';

export const getCountryNameByIso = (code: string | undefined): string => {
  if (code === undefined) return '';
  return Iso3166CountryCode[code.toUpperCase() as keyof typeof Iso3166CountryCode] || code;
};

export const calculateRuntime = (runtime: number | undefined) => {
  if (runtime === undefined) return '';
  const hour = Math.floor(runtime / 60);
  const minute = runtime % 60;
  return `${hour}시간 ${minute}분`;
};

export const returnYearByReleaseDate = (releaseDate: string | undefined) => {
  if (releaseDate === undefined) return '';
  return releaseDate.split('-')[0];
};
