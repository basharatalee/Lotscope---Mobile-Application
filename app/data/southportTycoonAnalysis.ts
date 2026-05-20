export type Verdict = 'Top Pick' | 'Value' | 'Watch';

export type BroodmareLot = {
  lotNumber: number;
  mareName: string;
  sire: string;
  dam: string;
  age: number;
  vendor: string;
  cataloguePedigree: string;
  photos: number;
};

export type SouthportTycoonAnalysis = {
  lotNumber: number;
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

const southportTycoonCsv = `Lot Number,Southport Tycoon Match Rating,Pedigree Strength Score,Dosage/Profile,Speed Score,Classic Score,Stamina Score,Commercial Rating,Suggested Tags,Ranking Score,Verdict,Commercial Notes,AI Insights,Stallion Match URL,Buyer Notes
214,92,88,Speed x Classic,91,86,78,A+,"ST Compatible; Top Pick; Commercial",94,Top Pick,"High commercial mating appeal with strong yearling-market profile.","Best blend of speed, residual pedigree and sale-ring upside.","https://www.stallionmatch.com","Inspect physical, likely shortlist."
228,86,84,Speed Reinforcement,88,80,72,A,"ST Compatible; Value",87,Value,"Good nick profile and strong physical compatibility markers.","Value mare with enough commercial strength for shortlist review.","https://www.stallionmatch.com","Value if bought at the right level."
245,79,74,Sprint Balance,82,73,70,B,"Watch; Physical Review",76,Watch,"Commercial enough if bought at the right level.","Useful family, but mating score trails the leading mares.","https://www.stallionmatch.com","Watch pending physical notes."
302,91,90,Classic Upgrade,84,92,86,A+,"ST Compatible; Pedigree Strength",92,Top Pick,"Pedigree depth gives the mating a high-quality residual angle.","Strong broodmare profile for Southport Tycoon with ranking upside.","https://www.stallionmatch.com","High-priority pedigree review."`;

const headerMap: Record<string, keyof SouthportTycoonAnalysis | 'tags'> = {
  lotnumber: 'lotNumber',
  lot: 'lotNumber',
  southporttycoonmatchrating: 'matchRating',
  matchrating: 'matchRating',
  match: 'matchRating',
  pedigreestrengthscore: 'pedigreeStrength',
  pedigreestrength: 'pedigreeStrength',
  dosageprofile: 'dosageProfile',
  dosage: 'dosageProfile',
  speedscore: 'speedScore',
  speed: 'speedScore',
  classicscore: 'classicScore',
  classic: 'classicScore',
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
  matchurl: 'stallionMatchUrl',
  url: 'stallionMatchUrl',
  buyernotes: 'buyerNotes',
  buyernote: 'buyerNotes',
};

export function getDefaultSouthportTycoonAnalysis(): SouthportTycoonAnalysis[] {
  return parseSouthportTycoonCsv(southportTycoonCsv);
}

export function enrichBroodmareCatalogue(
  catalogue: BroodmareLot[],
  analysisRows: SouthportTycoonAnalysis[],
): EnrichedBroodmareLot[] {
  const analysisByLot = new Map(
    analysisRows.map(row => [row.lotNumber, row]),
  );

  return catalogue.map(lot => ({
    ...lot,
    analysis: analysisByLot.get(lot.lotNumber),
  }));
}

export function getEnrichedBroodmareCatalogue(
  analysisRows = getDefaultSouthportTycoonAnalysis(),
): EnrichedBroodmareLot[] {
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

    if (
      field === 'lotNumber' ||
      field === 'matchRating' ||
      field === 'pedigreeStrength' ||
      field === 'rankingScore' ||
      field === 'speedScore' ||
      field === 'classicScore' ||
      field === 'staminaScore'
    ) {
      draft[field] = Number(value.replace('%', ''));
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
    }
  });

  if (!draft.lotNumber || !draft.matchRating || !draft.verdict) {
    return null;
  }

  return {
    lotNumber: draft.lotNumber,
    matchRating: draft.matchRating,
    pedigreeStrength: draft.pedigreeStrength ?? 0,
    dosageProfile: draft.dosageProfile ?? 'Not supplied',
    speedScore: draft.speedScore,
    classicScore: draft.classicScore,
    staminaScore: draft.staminaScore,
    commercialRating: draft.commercialRating ?? 'N/A',
    suggestedTags: draft.suggestedTags ?? [],
    rankingScore: draft.rankingScore ?? draft.matchRating,
    verdict: draft.verdict,
    commercialNotes: draft.commercialNotes ?? 'No commercial notes supplied.',
    aiInsights: draft.aiInsights ?? 'No AI insight supplied.',
    stallionMatchUrl: draft.stallionMatchUrl,
    buyerNotes: draft.buyerNotes,
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
