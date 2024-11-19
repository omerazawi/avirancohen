export const formatDateForDisplay = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month (January is 0)
  const day = String(date.getDate()).padStart(2, '0'); // Day

  return `${day}-${month}-${year}`;
};
export const formatDateForTitle = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month (January is 0)
  const day = String(date.getDate()).padStart(2, '0'); // Day

  return `${day}/${month}/${year}`;
};



export const getDayNameInHebrew = (date) => {
  return new Intl.DateTimeFormat('he-IL', { weekday: 'long' }).format(date);
};