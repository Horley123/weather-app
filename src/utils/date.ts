export const formatDayAbbr = (dateString: string) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("pt-BR", { weekday: "short", day: "numeric" })
    .replace(".", "");
};

export const formatDateWithTimezone = (timezone: string) => {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: timezone,
    month: "short",
    day: "numeric",
  }).format(new Date());
};
export const formatTimeWithTimezone = (timezone: string) => {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h24",
  };

  return new Intl.DateTimeFormat("pt-BR", options).format(date);
};
