export const getDay = async (date : string) : Promise<{
  day: Day;
  date: string;
}> => {
  const [y, m, d] = date.split('-'),
        resp = await fetch(`https://www.venite.app/api/calendar/day?y=${y}&m=${m}&d=${d}`),
        day = await resp.json() as Day;
  return {
    day,
    date
  }
}

export interface Color {
    name: string;
    hex: string;
}

export interface Proper {
    proper: number;
    slug: string;
    label: string;
}

export interface Type {
    name: string;
    rank: number;
}

export interface Week {
    week: number;
    id: string;
    season: string;
    name: string;
    color: Color;
    proper: Proper;
    propers: string;
    type: Type;
}

export interface Years {
    bcp1979_daily_office: number;
    bcp1979_daily_psalms: number;
    rclsunday: string;
}

export interface Day {
    date: string;
    evening: boolean;
    slug: string;
    propers: string;
    week: Week;
    years: Years;
    holy_days: any[];
    season: string;
    color: Color;
    omit_the?: boolean;
}