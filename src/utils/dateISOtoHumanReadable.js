//returns, from the ISO string, the date or the time (if the date is todays date.  Null on error)
function formatDate(isoString) {
  if (!isoString) return null;

  const date = new Date(isoString);

  if (isNaN(date.getTime())) return null;

  try {
    return date.toDateString() === new Date().toDateString()
      ? new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(date)
      : new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(date);
  } catch {
    return null;
  }
}

export default formatDate;
