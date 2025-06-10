export const dateFormat = "DD/MM/YYYY";
export const countryFlag = (countryCode: string) => {
  if (!countryCode) {
    return '/images/global-icon.png';
  }
  if (countryCode === 'UK') {
    countryCode = 'GB';
  }
  return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.webp`;
};

export const LimitPerPage = 20;
