export const formatEntryDate = (data?: string) => {
  if (!data) {
    return "";
  }
  let d = new Date(data);
  let currDate = d.getDate() + 1;
  let currMonth = d.getMonth() + 1;
  let currYear = d.getFullYear();
  return (
    currYear +
    "-" +
    (currMonth < 10 ? "0" + currMonth : currMonth) +
    "-" +
    (currDate < 10 ? "0" + currDate : currDate)
  );
};

export const isValidUrl = (string: string) => {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
};

export const headerMenuCustomProps = (path: string) => {
  const color = path === "/" ? "#fff" : "#2C3235";
  return { textDecoration: "none", color };
};

export const footerMenuCustomProps = () => {
  return { textDecoration: "none", color: "rgba(0, 0, 0, 0.8)" };
};