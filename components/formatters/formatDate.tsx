export const formatDate = (date: string | Date): string => {
  if (typeof date === "string") {
    date = new Date(Date.parse(date));
  }

  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};
