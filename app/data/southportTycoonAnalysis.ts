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
  sourceFields: Record<string, string>;
  sourceFieldOrder: string[];
};

export type EnrichedBroodmareLot = BroodmareLot & {
  analysis?: SouthportTycoonAnalysis;
};

type RawCsvRow = {
  headers: string[];
  values: string[];
  rowIndex: number;
};

type HeaderValue = {
  header: string;
  normalizedHeader: string;
  value: string;
};

export function getDefaultSouthportTycoonAnalysis(): SouthportTycoonAnalysis[] {
  return [];
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
  analysisRows: SouthportTycoonAnalysis[] = [],
): EnrichedBroodmareLot[] {
  return enrichBroodmareCatalogue([], analysisRows);
}

export function parseSouthportTycoonCsv(csv: string): SouthportTycoonAnalysis[] {
  const rows = parseCsvRows(csv.trim());

  if (rows.length === 0) {
    return [];
  }

  const [headerRow, ...dataRows] = rows;

  if (!headerRow || dataRows.length === 0) {
    return [];
  }

  return dataRows
    .map((row, index) =>
      rawRowToAnalysis({
        headers: headerRow,
        values: row,
        rowIndex: index,
      }),
    )
    .filter((row): row is SouthportTycoonAnalysis => row !== null)
    .sort((a, b) => b.rankingScore - a.rankingScore);
}

function rawRowToAnalysis(row: RawCsvRow): SouthportTycoonAnalysis | null {
  const fields = row.headers.map((header, index) => ({
    header: header.trim() || `Column ${index + 1}`,
    normalizedHeader: normalizeHeader(header),
    value: row.values[index]?.trim() ?? '',
  }));
  const sourceFields = fields.reduce<Record<string, string>>((source, field) => {
    if (field.header.length > 0) {
      source[field.header] = field.value;
    }

    return source;
  }, {});
  const sourceFieldOrder = fields
    .map(field => field.header)
    .filter(header => header.length > 0);

  if (sourceFieldOrder.length === 0) {
    return null;
  }

  const lotNumber =
    parseIntegerField(fields, [
      'lotnumber',
      'lotno',
      'lot',
      'cataloguenumber',
      'catalogueno',
      'hipnumber',
      'hip',
      'number',
    ]) ?? row.rowIndex + 1;
  const matchValue =
    findValue(fields, [
      'matingmatchrating',
      'stallionmatchrating',
      'matchrating',
      'rating',
      'match',
      'score',
    ]) ?? '';
  const matchRating = parseMatchRating(matchValue);
  const pedigreeStrength =
    parseNumberField(fields, [
      'matingpedigreestrength',
      'lotpedigreestrength',
      'pedigreestrengthscore',
      'pedigreestrength',
      'pedigree',
    ]) ?? 0;
  const stallionName =
    findValue(fields, [
      'stallionname',
      'stallion',
      'sirestallion',
      'coveringstallion',
    ]) || undefined;
  const mareName =
    findValue(fields, [
      'marename',
      'broodmarename',
      'horsename',
      'horse',
      'name',
    ]) || `Lot ${lotNumber}`;
  const vendorName =
    findValue(fields, [
      'vendorname',
      'vendor',
      'consignor',
      'seller',
    ]) || undefined;
  const sireName =
    findValue(fields, [
      'sirename',
      'sire',
      'father',
    ]) || undefined;
  const damName =
    findValue(fields, [
      'damname',
      'dam',
      'mother',
    ]) || undefined;
  const commercialRating =
    findValue(fields, [
      'commercialrating',
      'commercial',
      'marketrating',
      'ratingcommercial',
    ]) || '';
  const rankingScore =
    parseNumberField(fields, [
      'rankingscore',
      'rankscore',
      'rank',
      'score',
    ]) ?? Math.round(matchRating * 0.7 + pedigreeStrength * 0.3);
  const verdict =
    normalizeVerdict(
      findValue(fields, [
        'verdict',
        'result',
        'recommendation',
        'status',
      ]),
      matchRating,
      pedigreeStrength,
    );
  const dosageProfile =
    findValue(fields, [
      'dosageprofile',
      'dosage',
      'matingdi',
      'lotdi',
      'di',
      'profile',
    ]) || '';

  return {
    lotNumber,
    lotId: findValue(fields, ['lotid']) || undefined,
    horseId:
      findValue(fields, [
        'horseid',
        'sireid',
      ]) || undefined,
    horseUuid:
      findValue(fields, [
        'horseuuid',
        'sireuuid',
        'uuid',
      ]) || undefined,
    mareName,
    gender:
      findValue(fields, [
        'gender',
        'sex',
        'horsegender',
      ]) || undefined,
    yearOfBirth:
      parseIntegerField(fields, [
        'yearofbirth',
        'yob',
        'foaled',
        'birthyear',
      ]) ?? undefined,
    countryOfBirth:
      findValue(fields, [
        'countryofbirth',
        'cob',
        'country',
      ]) || undefined,
    colour:
      findValue(fields, [
        'colour',
        'color',
      ]) || undefined,
    sireName,
    vendorName,
    vendorLotsOffered5y: parseNumberField(fields, ['vendorlotsoffered5y']),
    vendorLotsSold5y: parseNumberField(fields, ['vendorlotssold5y']),
    vendorStakesWinners5y: parseNumberField(fields, ['vendorstakeswinners5y']),
    vendorWinners5y: parseNumberField(fields, ['vendorwinners5y']),
    damUrl:
      findValue(fields, [
        'damurl',
        'catalogueurl',
        'horseurl',
      ]) || undefined,
    stallionName,
    stallionFarm:
      findValue(fields, [
        'stallionfarm',
        'farm',
        'stud',
      ]) || undefined,
    stallionFee:
      findValue(fields, [
        'stallionfee',
        'fee',
        'servicefee',
      ]) || undefined,
    matchLabel: matchValue || undefined,
    matchRating,
    pedigreeStrength,
    dosageProfile,
    speedScore:
      parseNumberField(fields, [
        'speedscore',
        'speed',
        'lotspeedpct',
        'matingspeedpct',
      ]) ?? undefined,
    classicScore:
      parseNumberField(fields, [
        'classicscore',
        'classic',
        'lotclassicpct',
        'matingclassicpct',
      ]) ?? undefined,
    staminaScore:
      parseNumberField(fields, [
        'staminascore',
        'stamina',
        'lotstaminapct',
        'matingstaminapct',
      ]) ?? undefined,
    commercialRating,
    suggestedTags: buildSuggestedTags(fields, stallionName, verdict),
    rankingScore,
    verdict,
    commercialNotes:
      findValue(fields, [
        'commercialnotes',
        'notes',
        'comment',
        'comments',
      ]) || '',
    aiInsights:
      findValue(fields, [
        'aiinsights',
        'insights',
        'insight',
        'summary',
      ]) || '',
    stallionMatchUrl:
      findValue(fields, [
        'stallionmatchurl',
        'stallionsearchurl',
        'matchurl',
        'url',
      ]) || undefined,
    buyerNotes:
      findValue(fields, [
        'buyernotes',
        'buyernote',
        'buyer',
      ]) || undefined,
    sourceFields,
    sourceFieldOrder,
  };
}

function analysisToBroodmareLot(analysis: SouthportTycoonAnalysis): EnrichedBroodmareLot {
  const currentYear = new Date().getFullYear();
  const yearOfBirth = analysis.yearOfBirth ?? currentYear;
  const age = Math.max(0, currentYear - yearOfBirth);
  const dam = findSourceValue(analysis, [
    'damname',
    'dam',
    'mother',
  ]) ?? analysis.countryOfBirth ?? '';

  return {
    lotNumber: analysis.lotNumber,
    mareName: analysis.mareName ?? `Lot ${analysis.lotNumber}`,
    gender: analysis.gender,
    yearOfBirth: analysis.yearOfBirth,
    countryOfBirth: analysis.countryOfBirth,
    colour: analysis.colour,
    sire: analysis.sireName ?? analysis.stallionName ?? '',
    dam,
    age,
    vendor: analysis.vendorName ?? '',
    cataloguePedigree: buildCataloguePedigree(analysis),
    photos: 0,
    damUrl: analysis.damUrl,
    analysis,
  };
}

function parseCsvRows(csv: string): string[][] {
  const delimiter = detectDelimiter(csv);
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

    if (char === delimiter && !inQuotes) {
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

function detectDelimiter(csv: string): string {
  const firstLine = csv.split(/\r?\n/, 1)[0] ?? '';
  const options = [',', ';', '\t', '|'];
  const counts = options.map(delimiter => ({
    delimiter,
    count: countDelimiter(firstLine, delimiter),
  }));

  return counts.sort((a, b) => b.count - a.count)[0]?.delimiter ?? ',';
}

function countDelimiter(line: string, delimiter: string): number {
  let count = 0;
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      count += 1;
    }
  }

  return count;
}

function normalizeHeader(header: string): string {
  return header.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function findValue(fields: HeaderValue[], candidates: string[]): string {
  const exact = fields.find(
    field =>
      field.value.length > 0 &&
      candidates.some(candidate => field.normalizedHeader === candidate),
  );

  if (exact) {
    return exact.value;
  }

  return (
    fields.find(
      field =>
        field.value.length > 0 &&
        candidates.some(candidate => field.normalizedHeader.includes(candidate)),
    )?.value ?? ''
  );
}

function parseNumberField(
  fields: HeaderValue[],
  candidates: string[],
): number | undefined {
  const value = findValue(fields, candidates);

  if (!value) {
    return undefined;
  }

  const parsed = parseNumeric(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseIntegerField(
  fields: HeaderValue[],
  candidates: string[],
): number | undefined {
  const parsed = parseNumberField(fields, candidates);
  return parsed === undefined ? undefined : Math.round(parsed);
}

function parseNumeric(value: string): number {
  const normalized = value
    .replace(/,/g, '')
    .replace(/%/g, '')
    .replace(/[^\d.-]/g, '')
    .trim();
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

  if (normalized.includes('perfect') || normalized.includes('excellent')) {
    return 100;
  }

  if (normalized.includes('good')) {
    return 75;
  }

  if (normalized.includes('normal') || normalized.includes('average')) {
    return 65;
  }

  return parseNumeric(value);
}

function normalizeVerdict(
  value: string,
  matchRating: number,
  pedigreeStrength: number,
): Verdict {
  const normalized = value.trim().toLowerCase();

  if (normalized.includes('top') || normalized.includes('elite')) {
    return 'Top Pick';
  }

  if (normalized.includes('value') || normalized.includes('good')) {
    return 'Value';
  }

  return verdictFromScores(matchRating, pedigreeStrength);
}

function verdictFromScores(matchRating: number, pedigreeStrength: number): Verdict {
  if (matchRating >= 90 || pedigreeStrength >= 85) {
    return 'Top Pick';
  }

  if (matchRating >= 70 || pedigreeStrength >= 70) {
    return 'Value';
  }

  return 'Watch';
}

function buildSuggestedTags(
  fields: HeaderValue[],
  stallionName: string | undefined,
  verdict: Verdict,
): string[] {
  const explicitTags = findValue(fields, [
    'suggestedtags',
    'tags',
    'tag',
  ])
    .split(/[;|,]/)
    .map(tag => tag.trim())
    .filter(Boolean);

  if (explicitTags.length > 0) {
    return explicitTags;
  }

  return [];
}

function findSourceValue(
  analysis: SouthportTycoonAnalysis,
  candidates: string[],
): string | undefined {
  const entry = Object.entries(analysis.sourceFields).find(([header, value]) => {
    const normalizedHeader = normalizeHeader(header);
    return (
      value.length > 0 &&
      candidates.some(candidate => normalizedHeader === candidate)
    );
  });

  return entry?.[1];
}

function buildCataloguePedigree(analysis: SouthportTycoonAnalysis): string {
  return [
    analysis.matchLabel,
    analysis.pedigreeStrength > 0
      ? `${Math.round(analysis.pedigreeStrength)} pedigree strength`
      : undefined,
  ]
    .filter(Boolean)
    .join(' | ');
}
