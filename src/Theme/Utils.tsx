import dayjs from 'dayjs';

export const formattedDate = (date: any) => {
  return dayjs(date).format('D MMMM');
};

export const getNewsKeywords = (temp: any) => {
  if (temp < 10) return 'depressing';
  if (temp > 25) return 'fear';
  return 'happy';
};
