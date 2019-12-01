export const convertStringToDate = (date: string) => {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  return new Date(date.replace(pattern, '$3-$2-$1'));
};

export const formatDateForChart = (date: Date) => {
  debugger;
  const dayFormatter = new Intl.DateTimeFormat('en', { day: 'numeric' });
  const day = dayFormatter.format(date);

  const monthFormatter = new Intl.DateTimeFormat('en', { month: 'short' });
  const month = monthFormatter.format(date);

  return `${day}. ${month}.`;
};
