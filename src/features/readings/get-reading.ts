import { BibleReading } from "@venite/ldf"

export const getReading = async (rawCitation : string, version : string) : Promise<{
  citation: string;
  version: string;
  reading: BibleReading;
}> => {
  const citation = rawCitation.replace('psalm_', 'Psalm ');
  const resp = await fetch(`https://us-central1-venite-2.cloudfunctions.net/bible?citation=${citation}&version=${version}`),
    reading = await resp.json();
  return {
    citation: rawCitation,
    version,
    reading
  }
}