import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // For ordinal formatting

dayjs.extend(advancedFormat);

export const formatDate = (dateString: string) => {
  return dayjs(dateString).format("dddd, MMMM Do, YYYY"); // dddd = weekday, MMMM = month, Do = day with ordinal suffix
};

export const formatTime = (timeString: string | null) => {
  if (!timeString) return "TBD";
  const placeholderDate = `1970-01-01T${timeString}`;
  return dayjs(placeholderDate).format("h:mm A");
};
