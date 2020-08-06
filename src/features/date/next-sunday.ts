export const nextSunday = (d : Date) => {
  d.setDate(d.getDate() + (7 - d.getDay()) % 7);
  return d;
}