export const formatEntryDate = (data: string) => {
  let d = new Date(data);
  let currDate = d.getDate() + 1;
  let currMonth = d.getMonth() + 1;
  let currYear = d.getFullYear();
  return (
    currYear + '-' + (currMonth < 10 ? '0' + currMonth : currMonth) + '-' + (currDate < 10 ? '0' + currDate : currDate)
  );
};
