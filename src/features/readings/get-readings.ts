export const getReadings = async (
  ymd : string,
  lectionary : string = 'rclsunday',
  day : string | undefined,
  year : string | undefined,
  propers : string | undefined
) : Promise<{
  readings: Entry[];
  date: string;
  lectionary: string;
}> => {
  const [y, m, d] = ymd.split('-'),
  url = urlFromLectionary(lectionary, y, m, d, day, year, propers),
  resp = await fetch(url),
  json = await resp.json() as VeniteAPIJSON,
  uniques : { [x: string]: string; }= {},
  data : Entry[] = [];
  json.forEach((entry, index) => {
  if(!uniques[entry.type]) {
    uniques[entry.type] = entry.citation;
    data.push(entry);
  } else if(uniques[entry.type] && uniques[entry.type] !== entry.citation) {
    uniques[entry.type + index.toString()] = entry.citation;
    data.push(entry);
  }
  });
  const readings = data.sort((a, b) => SORT_ORDER.indexOf(a.type) - SORT_ORDER.indexOf(b.type));
  return { readings, date: ymd, lectionary };
}

function urlFromLectionary(lectionary : string, y : string, m : string, d : string, day? : string | undefined, year? : string | undefined, propers? : string | undefined) : string {
  if(lectionary === 'morning_prayer') {
    return `https://www.venite.app/api/pray/readings?y=${y}&m=${m}&d=${d}&liturgy=morning_prayer&language=en&version=Rite-II`;
  } else if(lectionary === 'evening_prayer') {
    return `https://www.venite.app/api/pray/readings?y=${y}&m=${m}&d=${d}&liturgy=evening_prayer&language=en&version=Rite-II`;
  } else if(lectionary === 'rclsundayTrack1') {
    return `https://www.venite.app/api/lectionary/reading/?y=${y}&m=${m}&d=${d}&lectionary=${lectionary}&propers=${propers}&year=${year}&day=${day}`;
  } else {
    return `https://www.venite.app/api/lectionary/reading/?y=${y}&m=${m}&d=${d}&lectionary=${lectionary}`;
  }
}

type VeniteAPIJSON = Entry[];

export type Entry = {
  citation: string;
  type: string;
}

const SORT_ORDER = ['morning_psalms', 'evening_psalms', 'first_reading', 'holy_day_morning_1', 'holy_day_evening_1', 'second_reading', 'holy_day_morning_2', 'holy_day_evening_2', 'gospel']