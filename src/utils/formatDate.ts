export function formatDate(inputDate: string): string {
  if (!inputDate) {
    return '';
  }

  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day.toString().padStart(2, '0');
  const formattedMonth = month.toString().padStart(2, '0');

  return `${formattedDay}.${formattedMonth}.${year}`;
}
