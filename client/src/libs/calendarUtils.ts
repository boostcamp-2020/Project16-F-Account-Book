import dayjs from 'dayjs';

const getDayMatrix = (year: number, month: number): string[][] => {
  let setMonth: number = month - 1;
  let setYear: number = year;
  if (setMonth < 0) {
    setMonth = 12;
    setYear -= 1;
  }
  const date = dayjs().year(setYear).month(setMonth);
  const weekSlice = 7;
  const startOfMonth = date.startOf('month').date();
  const endOfMonth = date.endOf('month').date();

  const startDay = date.startOf('month').day();
  const remain = (startDay + endOfMonth) % 7;
  const dataArr = [
    ...' '.repeat(startDay).split(''),
    ...Array.from({ length: endOfMonth - startOfMonth + 1 }, (v, i) => String(i + 1)),
    ...(7 - remain === 7 ? [] : ' '.repeat(7 - remain).split('')),
  ];
  const resultMatrix = (): string[][] => {
    const result = [];
    let i = 0;
    while (i < dataArr.length / weekSlice) {
      result.push(dataArr.slice(i * weekSlice, i * weekSlice + weekSlice));
      i += 1;
    }
    if (result.length > 5) result.pop();
    return result;
  };
  return resultMatrix();
};

export default getDayMatrix;
