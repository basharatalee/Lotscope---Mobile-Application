import southportTycoonMmRows from './southportTycoonMmRows.json';

export type Verdict = 'Top Pick' | 'Value' | 'Watch';

export type BroodmareLot = {
  lotNumber: number;
  mareName: string;
  gender?: string;
  yearOfBirth?: number;
  countryOfBirth?: string;
  colour?: string;
  sire: string;
  dam: string;
  age: number;
  vendor: string;
  cataloguePedigree: string;
  photos: number;
  damUrl?: string;
};

export type SouthportTycoonAnalysis = {
  lotNumber: number;
  lotId?: string;
  horseId?: string;
  horseUuid?: string;
  mareName?: string;
  gender?: string;
  yearOfBirth?: number;
  countryOfBirth?: string;
  colour?: string;
  sireName?: string;
  vendorName?: string;
  vendorLotsOffered5y?: number;
  vendorLotsSold5y?: number;
  vendorStakesWinners5y?: number;
  vendorWinners5y?: number;
  damUrl?: string;
  stallionName?: string;
  stallionFarm?: string;
  stallionFee?: string;
  matchLabel?: string;
  matchRating: number;
  pedigreeStrength: number;
  dosageProfile: string;
  speedScore?: number;
  classicScore?: number;
  staminaScore?: number;
  commercialRating: string;
  suggestedTags: string[];
  rankingScore: number;
  verdict: Verdict;
  commercialNotes: string;
  aiInsights: string;
  stallionMatchUrl?: string;
  buyerNotes?: string;
};

export type EnrichedBroodmareLot = BroodmareLot & {
  analysis?: SouthportTycoonAnalysis;
};

export const magicMillionsBroodmareCatalogue: BroodmareLot[] = [
  {
    lotNumber: 214,
    mareName: 'Golden Slipper',
    sire: 'I Am Invincible',
    dam: 'Belle Couture',
    age: 6,
    vendor: 'Coolmore Stud',
    cataloguePedigree: 'Speed family with Group-winning production depth.',
    photos: 12,
  },
  {
    lotNumber: 228,
    mareName: 'Harbour Lights',
    sire: 'Snitzel',
    dam: 'Ocean Jewel',
    age: 5,
    vendor: 'Newgate Farm',
    cataloguePedigree: 'Fast Danehill-line mare from a commercial family.',
    photos: 10,
  },
  {
    lotNumber: 245,
    mareName: 'La Luna Rossa',
    sire: 'Exceed And Excel',
    dam: 'La Dorada',
    age: 7,
    vendor: 'Yarraman Park',
    cataloguePedigree: 'Proven sprinting family with strong sales appeal.',
    photos: 9,
  },
  {
    lotNumber: 302,
    mareName: 'Agua De Beber',
    sire: 'Fastnet Rock',
    dam: 'River Mist',
    age: 8,
    vendor: 'Widden Stud',
    cataloguePedigree: 'Classic-strength pedigree with residual value.',
    photos: 8,
  },
];

type RawCsvRow = Record<string, string>;

const fallbackSouthportTycoonCsv = `Lot Number,Southport Tycoon Match Rating,Pedigree Strength Score,Dosage/Profile,Speed Score,Classic Score,Stamina Score,Commercial Rating,Suggested Tags,Ranking Score,Verdict,Commercial Notes,AI Insights,Stallion Match URL,Buyer Notes
214,92,88,Speed x Classic,91,86,78,A+,"ST Compatible; Top Pick; Commercial",94,Top Pick,"High commercial mating appeal with strong yearling-market profile.","Best blend of speed, residual pedigree and sale-ring upside.","https://www.stallionmatch.com","Inspect physical, likely shortlist."
228,86,84,Speed Reinforcement,88,80,72,A,"ST Compatible; Value",87,Value,"Good nick profile and strong physical compatibility markers.","Value mare with enough commercial strength for shortlist review.","https://www.stallionmatch.com","Value if bought at the right level."
245,79,74,Sprint Balance,82,73,70,B,"Watch; Physical Review",76,Watch,"Commercial enough if bought at the right level.","Useful family, but mating score trails the leading mares.","https://www.stallionmatch.com","Watch pending physical notes."
302,91,90,Classic Upgrade,84,92,86,A+,"ST Compatible; Pedigree Strength",92,Top Pick,"Pedigree depth gives the mating a high-quality residual angle.","Strong broodmare profile for Southport Tycoon with ranking upside.","https://www.stallionmatch.com","High-priority pedigree review."`;

const headerMap: Record<string, keyof SouthportTycoonAnalysis | 'tags'> = {
  lotnumber: 'lotNumber',
  lotid: 'lotId',
  horseid: 'horseId',
  horseuuid: 'horseUuid',
  lot: 'lotNumber',
  name: 'mareName',
  horsename: 'mareName',
  horsegender: 'gender',
  gender: 'gender',
  yob: 'yearOfBirth',
  yearofbirth: 'yearOfBirth',
  cob: 'countryOfBirth',
  countryofbirth: 'countryOfBirth',
  colour: 'colour',
  color: 'colour',
  sirename: 'sireName',
  vendorname: 'vendorName',
  vendorlotsoffered5y: 'vendorLotsOffered5y',
  vendorlotssold5y: 'vendorLotsSold5y',
  vendorstakeswinners5y: 'vendorStakesWinners5y',
  vendorwinners5y: 'vendorWinners5y',
  damurl: 'damUrl',
  stallionname: 'stallionName',
  stallionfarm: 'stallionFarm',
  stallionfee: 'stallionFee',
  southporttycoonmatchrating: 'matchRating',
  stallionmatchrating: 'matchRating',
  matingmatchrating: 'matchRating',
  matchrating: 'matchRating',
  match: 'matchRating',
  lotpedigreestrength: 'pedigreeStrength',
  matingpedigreestrength: 'pedigreeStrength',
  pedigreestrengthscore: 'pedigreeStrength',
  pedigreestrength: 'pedigreeStrength',
  dosageprofile: 'dosageProfile',
  dosage: 'dosageProfile',
  lotdi: 'dosageProfile',
  matingdi: 'dosageProfile',
  lotspeedpct: 'speedScore',
  matingspeedpct: 'speedScore',
  speedscore: 'speedScore',
  speed: 'speedScore',
  lotclassicpct: 'classicScore',
  matingclassicpct: 'classicScore',
  classicscore: 'classicScore',
  classic: 'classicScore',
  lotstaminapct: 'staminaScore',
  matingstaminapct: 'staminaScore',
  staminascore: 'staminaScore',
  stamina: 'staminaScore',
  commercialrating: 'commercialRating',
  suggestedtags: 'tags',
  tags: 'tags',
  rankingscore: 'rankingScore',
  rankscore: 'rankingScore',
  verdict: 'verdict',
  commercialnotes: 'commercialNotes',
  notes: 'commercialNotes',
  aiinsights: 'aiInsights',
  insights: 'aiInsights',
  stallionmatchurl: 'stallionMatchUrl',
  stallionsearchurl: 'stallionMatchUrl',
  matchurl: 'stallionMatchUrl',
  url: 'stallionMatchUrl',
  buyernotes: 'buyerNotes',
  buyernote: 'buyerNotes',
};

export function getDefaultSouthportTycoonAnalysis(): SouthportTycoonAnalysis[] {
  const bundledRows = (southportTycoonMmRows as RawCsvRow[])
    .map(rawRowToAnalysis)
    .filter((row): row is SouthportTycoonAnalysis => row !== null)
    .sort((a, b) => b.rankingScore - a.rankingScore);

  return bundledRows.length > 0
    ? bundledRows
    : parseSouthportTycoonCsv(fallbackSouthportTycoonCsv);
}

export function enrichBroodmareCatalogue(
  catalogue: BroodmareLot[],
  analysisRows: SouthportTycoonAnalysis[],
): EnrichedBroodmareLot[] {
  const analysisByLot = new Map(
    analysisRows.map(row => [row.lotNumber, row]),
  );

  const catalogueLots = catalogue.map(lot => ({
    ...lot,
    analysis: analysisByLot.get(lot.lotNumber),
  }));

  const catalogueLotNumbers = new Set(catalogue.map(lot => lot.lotNumber));
  const analysisOnlyLots = analysisRows
    .filter(row => !catalogueLotNumbers.has(row.lotNumber))
    .map(analysisToBroodmareLot);

  return [...catalogueLots, ...analysisOnlyLots];
}

export function getEnrichedBroodmareCatalogue(
  analysisRows = getDefaultSouthportTycoonAnalysis(),
): EnrichedBroodmareLot[] {
  if (analysisRowsHaveCatalogueIdentity(analysisRows)) {
    return enrichBroodmareCatalogue([], analysisRows);
  }

  return enrichBroodmareCatalogue(
    magicMillionsBroodmareCatalogue,
    analysisRows,
  );
}

export function parseSouthportTycoonCsv(csv: string): SouthportTycoonAnalysis[] {
  const rows = parseCsvRows(csv.trim());
  const [headerRow, ...dataRows] = rows;

  if (!headerRow || dataRows.length === 0) {
    return [];
  }

  const headers = headerRow.map(normalizeHeader);

  return dataRows
    .map(row => rowToAnalysis(headers, row))
    .filter((row): row is SouthportTycoonAnalysis => row !== null)
    .sort((a, b) => b.rankingScore - a.rankingScore);
}

function rowToAnalysis(
  headers: string[],
  row: string[],
): SouthportTycoonAnalysis | null {
  const draft: Partial<SouthportTycoonAnalysis> = {};

  headers.forEach((header, index) => {
    const field = headerMap[header];
    const value = row[index]?.trim() ?? '';

    if (!field || value.length === 0) {
      return;
    }

    if (field === 'tags') {
      draft.suggestedTags = value
        .split(/[;|]/)
        .map(tag => tag.trim())
        .filter(Boolean);
      return;
    }

    if (field === 'matchRating') {
      draft.matchLabel = value;
      draft.matchRating = parseMatchRating(value);
      return;
    }

    if (
      field === 'lotNumber' ||
      field === 'pedigreeStrength' ||
      field === 'rankingScore' ||
      field === 'speedScore' ||
      field === 'classicScore' ||
      field === 'staminaScore' ||
      field === 'yearOfBirth' ||
      field === 'vendorLotsOffered5y' ||
      field === 'vendorLotsSold5y' ||
      field === 'vendorStakesWinners5y' ||
      field === 'vendorWinners5y'
    ) {
      draft[field] = parseNumeric(value);
      return;
    }

    if (field === 'verdict') {
      draft.verdict = normalizeVerdict(value);
      return;
    }

    if (field === 'dosageProfile') {
      draft.dosageProfile = value;
      return;
    }

    if (field === 'commercialRating') {
      draft.commercialRating = value;
      return;
    }

    if (field === 'commercialNotes') {
      draft.commercialNotes = value;
      return;
    }

    if (field === 'aiInsights') {
      draft.aiInsights = value;
      return;
    }

    if (field === 'stallionMatchUrl') {
      draft.stallionMatchUrl = value;
      return;
    }

    if (field === 'buyerNotes') {
      draft.buyerNotes = value;
      return;
    }

    draft[field] = value as never;
  });

  return normalizeAnalysisDraft(draft);
}

function rawRowToAnalysis(row: RawCsvRow): SouthportTycoonAnalysis | null {
  const headers = Object.keys(row).map(normalizeHeader);
  const values = Object.values(row);

  return rowToAnalysis(headers, values);
}

function normalizeAnalysisDraft(
  draft: Partial<SouthportTycoonAnalysis>,
): SouthportTycoonAnalysis | null {
  if (!draft.lotNumber || draft.matchRating === undefined) {
    return null;
  }

  const currentYear = new Date().getFullYear();
  const vendorWinRate = getVendorWinRate(draft);
  const pedigreeStrength = draft.pedigreeStrength ?? 0;
  const rankingScore =
    draft.rankingScore ??
    Math.round(
      draft.matchRating * 0.48 +
        pedigreeStrength * 0.34 +
        vendorWinRate * 0.18,
    );
  const verdict = draft.verdict ?? verdictFromScores(draft.matchRating, pedigreeStrength);
  const stallionName = draft.stallionName ?? 'Southport Tycoon';
  const vendorName = draft.vendorName ?? 'Vendor not supplied';
  const mareName = draft.mareName ?? `Lot ${draft.lotNumber}`;
  const matchLabel = draft.matchLabel ?? `${draft.matchRating}% Match`;
  const suggestedTags =
    draft.suggestedTags && draft.suggestedTags.length > 0
      ? draft.suggestedTags
      : [
          stallionName,
          verdict,
          pedigreeStrength >= 80 ? 'Pedigree Strength' : 'Review',
        ];

  return {
    lotNumber: draft.lotNumber,
    lotId: draft.lotId,
    horseId: draft.horseId,
    horseUuid: draft.horseUuid,
    mareName,
    gender: draft.gender,
    yearOfBirth: draft.yearOfBirth,
    countryOfBirth: draft.countryOfBirth,
    colour: draft.colour,
    sireName: draft.sireName ?? stallionName,
    vendorName,
    vendorLotsOffered5y: draft.vendorLotsOffered5y,
    vendorLotsSold5y: draft.vendorLotsSold5y,
    vendorStakesWinners5y: draft.vendorStakesWinners5y,
    vendorWinners5y: draft.vendorWinners5y,
    damUrl: draft.damUrl,
    stallionName,
    stallionFarm: draft.stallionFarm,
    stallionFee: draft.stallionFee,
    matchLabel,
    matchRating: draft.matchRating,
    pedigreeStrength,
    dosageProfile: draft.dosageProfile ?? 'Not supplied',
    speedScore: draft.speedScore,
    classicScore: draft.classicScore,
    staminaScore: draft.staminaScore,
    commercialRating: draft.commercialRating ?? `${vendorWinRate}% vendor winners`,
    suggestedTags,
    rankingScore,
    verdict,
    commercialNotes:
      draft.commercialNotes ??
      `${vendorName} has sold ${draft.vendorLotsSold5y ?? 0} of ${draft.vendorLotsOffered5y ?? 0} lots offered across the last five years.`,
    aiInsights:
      draft.aiInsights ??
      `${mareName} profiles as a ${verdict.toLowerCase()} for the active ${stallionName} overlay, led by ${Math.round(draft.matchRating)}% match and ${Math.round(pedigreeStrength)} pedigree strength.`,
    stallionMatchUrl: draft.stallionMatchUrl,
    buyerNotes:
      draft.buyerNotes ??
      `Review physical, vendor context and ${stallionName} fit before final shortlist.`,
  };
}

function analysisToBroodmareLot(analysis: SouthportTycoonAnalysis): EnrichedBroodmareLot {
  const currentYear = new Date().getFullYear();
  const yearOfBirth = analysis.yearOfBirth ?? currentYear;
  const age = Math.max(0, currentYear - yearOfBirth);

  return {
    lotNumber: analysis.lotNumber,
    mareName: analysis.mareName ?? `Lot ${analysis.lotNumber}`,
    gender: analysis.gender,
    yearOfBirth: analysis.yearOfBirth,
    countryOfBirth: analysis.countryOfBirth,
    colour: analysis.colour,
    sire: analysis.sireName ?? analysis.stallionName ?? 'Southport Tycoon',
    dam: analysis.countryOfBirth ?? 'AUS',
    age,
    vendor: analysis.vendorName ?? 'Vendor not supplied',
    cataloguePedigree: `${analysis.matchLabel ?? `${analysis.matchRating}% Match`} | ${analysis.stallionName ?? 'Southport Tycoon'} overlay | ${Math.round(analysis.pedigreeStrength)} pedigree strength`,
    photos: 8,
    damUrl: analysis.damUrl,
    analysis,
  };
}

function parseCsvRows(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const next = csv[index + 1];

    if (char === '"' && next === '"') {
      cell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') {
        index += 1;
      }

      row.push(cell);
      if (row.some(value => value.trim().length > 0)) {
        rows.push(row);
      }
      row = [];
      cell = '';
      continue;
    }

    cell += char;
  }

  row.push(cell);
  if (row.some(value => value.trim().length > 0)) {
    rows.push(row);
  }

  return rows;
}

function normalizeHeader(header: string): string {
  return header.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function parseNumeric(value: string): number {
  const normalized = value.replace(/,/g, '').replace('%', '').trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseMatchRating(value: string): number {
  const normalized = value.trim().toLowerCase();
  const fraction = normalized.match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);

  if (fraction) {
    const score = Number(fraction[1]);
    const outOf = Number(fraction[2]);
    return outOf > 0 ? Math.round((score / outOf) * 100) : 0;
  }

  if (normalized.includes('perfect')) {
    return 100;
  }

  if (normalized.includes('normal')) {
    return 65;
  }

  const numeric = parseNumeric(value);
  return numeric > 0 ? numeric : 0;
}

function normalizeVerdict(value: string): Verdict {
  const normalized = value.trim().toLowerCase();

  if (normalized.includes('top')) {
    return 'Top Pick';
  }

  if (normalized.includes('value')) {
    return 'Value';
  }

  return 'Watch';
}

function verdictFromScores(matchRating: number, pedigreeStrength: number): Verdict {
  if (matchRating >= 92 || pedigreeStrength >= 85) {
    return 'Top Pick';
  }

  if (matchRating >= 80 || pedigreeStrength >= 70) {
    return 'Value';
  }

  return 'Watch';
}

function getVendorWinRate(draft: Partial<SouthportTycoonAnalysis>): number {
  const winners = draft.vendorWinners5y ?? 0;
  const offered = draft.vendorLotsOffered5y ?? 0;

  if (offered <= 0) {
    return 0;
  }

  return Math.round((winners / offered) * 100);
}

function analysisRowsHaveCatalogueIdentity(
  analysisRows: SouthportTycoonAnalysis[],
): boolean {
  return analysisRows.some(row => Boolean(row.mareName || row.vendorName));
}
