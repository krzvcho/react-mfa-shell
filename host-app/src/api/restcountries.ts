export interface CountryName {
  common: string;
  official: string;
  nativeName?: {
    [lang: string]: {
      official: string;
      common: string;
    };
  };
}

export interface Country {
  name: CountryName;
  tld?: string[];
  cca2?: string;
  ccn3?: string;
  cioc?: string;
  independent?: boolean;
  status?: string;
  unMember?: boolean;
  currencies?: Record<string, { symbol: string; name: string }>;
  idd?: { root: string; suffixes: string[] };
  capital?: string[];
  altSpellings?: string[];
  region?: string;
  subregion?: string;
  languages?: Record<string, string>;
  latlng?: number[];
  landlocked?: boolean;
  area?: number;
  demonyms?: Record<string, { f: string; m: string }>;
  cca3?: string;
  translations?: Record<string, { official: string; common: string }>;
  flag?: string;
  maps?: { googleMaps: string; openStreetMaps: string };
  population?: number;
  gini?: Record<string, number>;
  fifa?: string;
  car?: { signs: string[]; side: string };
  timezones?: string[];
  continents?: string[];
  flags?: { png: string; svg: string; alt?: string };
  coatOfArms?: { png: string; svg: string };
  startOfWeek?: string;
  capitalInfo?: { latlng: number[] };
  postalCode?: { format: string | null; regex: string | null };
  [key: string]: any;
}

export async function fetchIndependentCountries(): Promise<Country[]> {
  const url = 'https://restcountries.com/v3.1/independent?status=true';
  const response = await fetch(url);
  if (!response.ok) {
    throw new Response("Failed to load countries", {
      status: response.status,
      statusText: 'Failed to fetch countries',
    });

    //throw new Error('Failed to fetch countries');
  }
  const data = await response.json();
  return data;
}
