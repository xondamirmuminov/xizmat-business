import dayjs, { Dayjs } from "dayjs";

export const getRemainingDatesInMonth = (): Dayjs[] => {
  const today = dayjs();
  const currentDate = today.date();
  const daysInMonth = today.daysInMonth();
  const result = [];

  for (let index = currentDate; index < daysInMonth; index++) {
    const date = dayjs().date(index);
    result.push(date);
  }

  return result;
};

export const getRemainingHoursInDay = (
  worksUntil: Dayjs,
  serviceDurationMin: number,
): Dayjs[] => {
  const now = dayjs();
  const result = [];

  for (let index = now?.hour(); index < worksUntil.hour(); index++) {
    const time = dayjs().hour(index).minute(0);
    result.push(time, time.add(serviceDurationMin, "minutes"));
  }

  return result;
};
