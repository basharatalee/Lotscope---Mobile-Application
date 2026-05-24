import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ImageSourcePropType,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import LotDetails from './LotDetails';
import {
  EnrichedBroodmareLot,
  SouthportTycoonAnalysis,
  getEnrichedBroodmareCatalogue,
} from '../data/southportTycoonAnalysis';

type AppIconName =
  | 'bell'
  | 'calendar-days'
  | 'chevron-right'
  | 'ellipsis'
  | 'eye'
  | 'filter'
  | 'gavel'
  | 'house'
  | 'location-dot'
  | 'magnifying-glass'
  | 'microphone'
  | 'play'
  | 'shield-halved'
  | 'sliders'
  | 'star'
  | 'plus'
  | 'gavel'
  | 'circle-info'
  | 'horse-head'
  | 'user-group';

const horseHero =
  require('../../assets/black-horse.png') as ImageSourcePropType;

const palette = {
  black: '#020406',
  panel: '#070a0f',
  panelSoft: '#0b0e13',
  border: '#202127',
  borderSoft: '#151820',
  gold: '#d6a247',
  goldBright: '#f0c66b',
  white: '#f8f2e8',
  muted: '#a9adb7',
  mutedDark: '#6f7581',
  green: '#48b85d',
  red: '#d61111',
};

type Sale = {
  title: string;
  subtitle: string;
  date: string;
  badge: string;
  time: string;
  deadline: string;
  lotCount: string;
};

type SaleTab = 'live' | 'online';
type ScreenMode = 'sales' | 'lots' | 'lotDetail';
type CatalogueFilter = 'all' | 'top' | 'value' | 'pedigree';
type CatalogueSort = 'grade' | 'age' | 'rank' | 'match' | 'pedigree' | 'vendor';
type StallionOption = {
  label: string;
  lotCount: number;
};
type FilterOption = {
  label: string;
  value: string;
};

type Lot = {
  lotNumber: number;
  mareName: string;
  type: string;
  sire: string;
  dam: string;
  age: number;
  vendor: string;
  cataloguePedigree: string;
  photos: number;
  tags: string[];
  insight: string;
  insightTone: 'green' | 'gold' | 'red';
  marker?: 'green' | 'gold' | 'red';
  shortlisted?: boolean;
  priceGuide: string;
  vendorThinks: string;
  privacy: string;
  warning: string;
} & Pick<EnrichedBroodmareLot, 'analysis'>;

const filterLabels: Record<CatalogueFilter, string> = {
  all: 'All lots',
  top: 'Top Picks',
  value: 'Value',
  pedigree: 'Pedigree 80+',
};

const sortLabels: Record<CatalogueSort, string> = {
  grade: 'Grade',
  age: 'Age',
  rank: 'Smart Rank',
  match: 'Match',
  pedigree: 'Pedigree',
  vendor: 'Vendor',
};

const allStallionsLabel = 'All stallions';
const allGradesLabel = 'All grades';
const allAgesLabel = 'All ages';

const onlineSales: Sale[] = [
  {
    title: 'Inglis Classic',
    subtitle: 'Sydney 2025',
    date: '10 - 12 Feb 2025',
    badge: 'UPCOMING',
    time: '12d 14h',
    deadline: 'Until start',
    lotCount: '286 lots',
  },
  {
    title: 'Inglis Premier',
    subtitle: 'Melbourne 2025',
    date: '4 - 6 Mar 2025',
    badge: 'UPCOMING',
    time: '32d 8h',
    deadline: 'Until start',
    lotCount: '412 lots',
  },
  {
    title: 'Inglis Digital',
    subtitle: 'January (Late)',
    date: 'Closes 15 Jan 2025',
    badge: 'ENDING SOON',
    time: '2d 14h',
    deadline: 'Until close',
    lotCount: '93 lots',
  },
  {
    title: 'Magic Millions Online',
    subtitle: 'January Sales',
    date: 'Closes 21 Jan 2025',
    badge: 'ENDING SOON',
    time: '8d 3h',
    deadline: 'Until close',
    lotCount: '157 lots',
  },
];

function buildCatalogueLots(analysisRows?: SouthportTycoonAnalysis[]): Lot[] {
  return getEnrichedBroodmareCatalogue(analysisRows)
    .map(lot => {
      const verdict = lot.analysis?.verdict ?? 'Watch';
      const insightTone: Lot['insightTone'] =
        verdict === 'Top Pick' ? 'green' : verdict === 'Value' ? 'gold' : 'red';

      return {
        ...lot,
        type: lot.age > 0 ? `${lot.age}yo Broodmare` : 'Broodmare',
        tags: lot.analysis?.suggestedTags.slice(0, 2) ?? [],
        insight: verdict,
        insightTone,
        marker: insightTone === 'gold' ? ('gold' as const) : undefined,
        shortlisted: lot.analysis ? lot.analysis.matchRating >= 90 : false,
        priceGuide: lot.analysis?.commercialRating
          ? `${lot.analysis.commercialRating} Commercial Rating`
          : '',
        vendorThinks: lot.analysis?.commercialNotes ?? lot.cataloguePedigree,
        privacy: 'Private to you and your team',
        warning:
          'CSV intelligence enriches this Magic Millions catalogue lot; it does not create a new sale horse.',
      };
    })
    .sort(
      (a, b) =>
        (b.analysis?.rankingScore ?? 0) - (a.analysis?.rankingScore ?? 0),
    );
}

function SalesScreen({
  onOpenHome,
  onOpenShortlist,
  onOpenActivity,
  onOpenMore,
  analysisRows,
}: {
  onOpenHome?: () => void;
  onOpenShortlist?: () => void;
  onOpenActivity?: () => void;
  onOpenMore?: () => void;
  analysisRows?: SouthportTycoonAnalysis[];
}) {
  const [activeTab, setActiveTab] = useState<SaleTab>('live');
  const [screenMode, setScreenMode] = useState<ScreenMode>('sales');
  const [selectedLot, setSelectedLot] = useState<Lot | null>(null);
  const [catalogueFilter, setCatalogueFilter] =
    useState<CatalogueFilter>('all');
  const [catalogueSort, setCatalogueSort] = useState<CatalogueSort>('rank');
  const [catalogueSearch, setCatalogueSearch] = useState('');
  const [selectedStallion, setSelectedStallion] = useState(allStallionsLabel);
  const [selectedGrade, setSelectedGrade] = useState(allGradesLabel);
  const [selectedAge, setSelectedAge] = useState(allAgesLabel);
  const catalogueLots = useMemo(
    () => buildCatalogueLots(analysisRows),
    [analysisRows],
  );
  const stallionOptions = useMemo(
    () => getStallionOptions(catalogueLots),
    [catalogueLots],
  );
  const gradeOptions = useMemo(
    () => getGradeOptions(catalogueLots),
    [catalogueLots],
  );
  const ageOptions = useMemo(
    () => getAgeOptions(catalogueLots),
    [catalogueLots],
  );
  const activeStallion = stallionOptions.some(
    option => option.label === selectedStallion,
  )
    ? selectedStallion
    : stallionOptions[0]?.label ?? allStallionsLabel;
  const activeGrade = gradeOptions.some(
    option => option.label === selectedGrade,
  )
    ? selectedGrade
    : gradeOptions[0]?.label ?? allGradesLabel;
  const activeAge = ageOptions.some(option => option.label === selectedAge)
    ? selectedAge
    : ageOptions[0]?.label ?? allAgesLabel;
  const visibleCatalogueLots = useMemo(
    () =>
      getVisibleCatalogueLots(
        catalogueLots,
        catalogueFilter,
        catalogueSort,
        catalogueSearch,
        activeStallion,
        activeGrade,
        activeAge,
      ),
    [
      activeAge,
      activeGrade,
      activeStallion,
      catalogueLots,
      catalogueFilter,
      catalogueSearch,
      catalogueSort,
    ],
  );
  const openLot = useCallback((lot: Lot) => {
    setSelectedLot(lot);
    setScreenMode('lotDetail');
  }, []);
  const cycleFilter = useCallback(() => {
    setCatalogueFilter(nextFilter);
  }, []);
  const cycleSort = useCallback(() => {
    setCatalogueSort(nextSort);
  }, []);
  const cycleStallion = useCallback(() => {
    setSelectedStallion(previous => nextStallion(previous, stallionOptions));
  }, [stallionOptions]);
  const cycleGrade = useCallback(() => {
    setSelectedGrade(previous => nextFilterOption(previous, gradeOptions));
  }, [gradeOptions]);
  const cycleAge = useCallback(() => {
    setSelectedAge(previous => nextFilterOption(previous, ageOptions));
  }, [ageOptions]);

  if (screenMode === 'lotDetail' && selectedLot) {
    return (
      <LotDetails
        lot={selectedLot}
        onBackToLots={() => setScreenMode('lots')}
        onOpenHome={onOpenHome}
        onOpenShortlist={onOpenShortlist}
        onOpenTeam={onOpenActivity}
        onOpenMore={onOpenMore}
      />
    );
  }

  if (screenMode === 'lots') {
    return (
      <LotsScreen
        onBackToSales={() => {
          setScreenMode('sales');
          setActiveTab('online');
        }}
        onOpenLot={openLot}
        onOpenHome={onOpenHome}
        onOpenShortlist={onOpenShortlist}
        onOpenActivity={onOpenActivity}
        onOpenMore={onOpenMore}
        catalogueLots={visibleCatalogueLots}
        totalLotCount={catalogueLots.length}
        catalogueFilter={catalogueFilter}
        catalogueSort={catalogueSort}
        catalogueSearch={catalogueSearch}
        activeStallion={activeStallion}
        activeGrade={activeGrade}
        activeAge={activeAge}
        stallionOptions={stallionOptions}
        onChangeCatalogueSearch={setCatalogueSearch}
        onCycleFilter={cycleFilter}
        onCycleSort={cycleSort}
        onCycleStallion={cycleStallion}
        onCycleGrade={cycleGrade}
        onCycleAge={cycleAge}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.headerSide} />
          <Text style={styles.title}>SALES</Text>
          <Pressable style={styles.bellButton}>
            <FontAwesome6
              name="bell"
              iconStyle="regular"
              size={17}
              color={palette.goldBright}
            />
          </Pressable>
        </View>

        <View style={styles.segmented}>
          <SegmentButton
            label="Live Sales"
            active={activeTab === 'live'}
            onPress={() => setActiveTab('live')}
          />
          <SegmentButton
            label="Online Sales"
            active={activeTab === 'online'}
            onPress={() => setActiveTab('online')}
          />
        </View>

        {activeTab === 'live' ? (
          <LiveSalesContent onOpenCatalogue={() => setScreenMode('lots')} />
        ) : (
          <OnlineSalesContent onSeeLots={() => setScreenMode('lots')} />
        )}
      </ScrollView>

      <BottomTabs
        onOpenHome={onOpenHome}
        onOpenShortlist={onOpenShortlist}
        onOpenActivity={onOpenActivity}
        onOpenMore={onOpenMore}
      />
    </SafeAreaView>
  );
}

function LiveSalesContent({
  onOpenCatalogue,
}: {
  onOpenCatalogue: () => void;
}) {
  return (
    <>
      <SectionHeader title="LIVE SALES" />
      <View style={styles.liveCard}>
        <View style={styles.liveTop}>
          <ImageBackground
            source={horseHero}
            resizeMode="cover"
            imageStyle={styles.liveImage}
            style={styles.liveThumb}
          >
            <Text style={styles.lotPill}>126</Text>
          </ImageBackground>

          <View style={styles.liveCopy}>
            <View style={styles.liveNameRow}>
              <FontAwesome6
                name="horse-head"
                iconStyle="solid"
                size={24}
                color={palette.goldBright}
              />
              <View style={styles.liveNameCopy}>
                <Text style={styles.liveTitle}>Magic Millions</Text>
                <Text style={styles.liveSubtitle}>Gold Coast 2025</Text>
              </View>
            </View>

            <InfoLine icon="calendar-days" text="7 - 13 Jan 2025" />
            <InfoLine icon="location-dot" text="Gold Coast, QLD" />
            <InfoLine icon="gavel" text="Live Now" />
          </View>

          <View style={styles.liveStatus}>
            <Text style={styles.liveStatusText}>LIVE</Text>
          </View>
        </View>

        <Pressable style={styles.viewLiveButton} onPress={onOpenCatalogue}>
          <Text style={styles.viewLiveText}>Open Catalogue</Text>
          <FontAwesome6
            name="chevron-right"
            iconStyle="solid"
            size={12}
            color={palette.goldBright}
          />
        </Pressable>
      </View>
    </>
  );
}

function OnlineSalesContent({ onSeeLots }: { onSeeLots: () => void }) {
  return (
    <>
      <SectionHeader title="ONLINE SALES" />
      <View style={styles.onlineList}>
        {onlineSales.map(sale => (
          <OnlineSaleRow
            key={`${sale.title}-${sale.subtitle}`}
            sale={sale}
            onPress={onSeeLots}
          />
        ))}
      </View>

      <Pressable onPress={onSeeLots} style={styles.seeLotsButton}>
        <Text style={styles.seeLotsText}>See Catalogue</Text>
        <FontAwesome6
          name="chevron-right"
          iconStyle="solid"
          size={12}
          color={palette.black}
        />
      </Pressable>

      <View style={styles.learnCard}>
        <View style={styles.learnIcon}>
          <FontAwesome6
            name="horse-head"
            iconStyle="solid"
            size={22}
            color={palette.goldBright}
          />
        </View>
        <View style={styles.learnCopy}>
          <Text style={styles.learnTitle}>Can't attend in person?</Text>
          <Text style={styles.learnText}>Bid online with confidence.</Text>
        </View>
        <Pressable style={styles.learnButton}>
          <Text style={styles.learnButtonText}>Learn More</Text>
        </Pressable>
      </View>
    </>
  );
}

function LotsScreen({
  onBackToSales,
  onOpenLot,
  onOpenHome,
  onOpenShortlist,
  onOpenActivity,
  onOpenMore,
  catalogueLots,
  totalLotCount,
  catalogueFilter,
  catalogueSort,
  catalogueSearch,
  activeStallion,
  activeGrade,
  activeAge,
  stallionOptions,
  onChangeCatalogueSearch,
  onCycleFilter,
  onCycleSort,
  onCycleStallion,
  onCycleGrade,
  onCycleAge,
}: {
  onBackToSales: () => void;
  onOpenLot: (lot: Lot) => void;
  onOpenHome?: () => void;
  onOpenShortlist?: () => void;
  onOpenActivity?: () => void;
  onOpenMore?: () => void;
  catalogueLots: Lot[];
  totalLotCount: number;
  catalogueFilter: CatalogueFilter;
  catalogueSort: CatalogueSort;
  catalogueSearch: string;
  activeStallion: string;
  activeGrade: string;
  activeAge: string;
  stallionOptions: StallionOption[];
  onChangeCatalogueSearch: (value: string) => void;
  onCycleFilter: () => void;
  onCycleSort: () => void;
  onCycleStallion: () => void;
  onCycleGrade: () => void;
  onCycleAge: () => void;
}) {
  const renderLot = useCallback<ListRenderItem<Lot>>(
    ({ item }) => (
      <MemoizedLotCatalogueRow lot={item} onPress={() => onOpenLot(item)} />
    ),
    [onOpenLot],
  );
  const keyExtractor = useCallback((lot: Lot) => String(lot.lotNumber), []);
  const listHeader = useMemo(
    () => (
      <>
        <Pressable onPress={onBackToSales} style={styles.catalogueBackButton}>
          <FontAwesome6
            name="chevron-right"
            iconStyle="solid"
            size={11}
            color={palette.goldBright}
            style={styles.backChevron}
          />
          <Text style={styles.catalogueBackText}>Back to Sales</Text>
        </Pressable>

        <View style={styles.searchBar}>
          <FontAwesome6
            name="magnifying-glass"
            iconStyle="solid"
            size={13}
            color={palette.goldBright}
          />
          <TextInput
            value={catalogueSearch}
            onChangeText={onChangeCatalogueSearch}
            placeholder="Ask Lotscope or search broodmares"
            placeholderTextColor={palette.mutedDark}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
            clearButtonMode="while-editing"
            style={styles.searchInput}
          />
          <FontAwesome6
            name="microphone"
            iconStyle="solid"
            size={14}
            color={palette.goldBright}
          />
          <View style={styles.searchDivider} />
          <FontAwesome6
            name="sliders"
            iconStyle="solid"
            size={14}
            color={palette.goldBright}
          />
        </View>

        <View style={styles.filterRow}>
          <Pressable style={styles.filterButton} onPress={onCycleFilter}>
            <FontAwesome6
              name="filter"
              iconStyle="solid"
              size={12}
              color={palette.goldBright}
            />
            <Text style={styles.filterButtonText}>
              {filterLabels[catalogueFilter]}
            </Text>
          </Pressable>
          <Pressable style={styles.sortButton} onPress={onCycleSort}>
            <FontAwesome6
              name="plus"
              iconStyle="solid"
              size={12}
              color={palette.goldBright}
            />
            <Text style={styles.filterButtonText}>
              Sort: {sortLabels[catalogueSort]}
            </Text>
          </Pressable>
        </View>

        <View style={styles.stallionFilterRow}>
          <Pressable
            style={styles.stallionFilterButton}
            onPress={onCycleStallion}
          >
            <FontAwesome6
              name="horse-head"
              iconStyle="solid"
              size={12}
              color={palette.black}
            />
            <Text style={styles.stallionFilterText}>
              Covering sire: {activeStallion}
            </Text>
          </Pressable>
          <Text style={styles.stallionFilterMeta}>
            {stallionOptions.length} option
            {stallionOptions.length === 1 ? '' : 's'}
          </Text>
        </View>

        <View style={styles.secondaryFilterRow}>
          <Pressable
            style={styles.secondaryFilterButton}
            onPress={onCycleGrade}
          >
            <Text style={styles.secondaryFilterText}>Grade: {activeGrade}</Text>
          </Pressable>
          <Pressable style={styles.secondaryFilterButton} onPress={onCycleAge}>
            <Text style={styles.secondaryFilterText}>Age: {activeAge}</Text>
          </Pressable>
        </View>

        <View style={styles.lotCountRow}>
          <Text style={styles.lotCountText}>
            {catalogueLots.length} of {totalLotCount} Magic Millions lots
          </Text>
          <View style={styles.overlayPill}>
            <Text style={styles.buyerInsightText}>
              {activeGrade} | {activeAge}
            </Text>
            <FontAwesome6
              name="circle-info"
              iconStyle="solid"
              size={11}
              color={palette.goldBright}
            />
          </View>
        </View>
      </>
    ),
    [
      catalogueFilter,
      catalogueLots.length,
      catalogueSearch,
      catalogueSort,
      activeStallion,
      activeAge,
      activeGrade,
      onBackToSales,
      onChangeCatalogueSearch,
      onCycleFilter,
      onCycleSort,
      onCycleStallion,
      onCycleAge,
      onCycleGrade,
      stallionOptions.length,
      totalLotCount,
    ],
  );
  const listFooter = useMemo(
    () => (
      <>
        <View style={styles.quickActionBar}>
          <QuickAction icon="shield-halved" label="Vet Report" />
          <QuickAction icon="eye" label="Scope" />
          <QuickAction icon="play" label="Vendor Video" />
          <QuickAction icon="play" label="New Media" filled />
        </View>

        <Pressable onPress={onBackToSales} style={styles.backToSalesButton}>
          <Text style={styles.backToSalesText}>Back to Online Sales</Text>
        </Pressable>
      </>
    ),
    [onBackToSales],
  );

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={catalogueLots}
        keyExtractor={keyExtractor}
        renderItem={renderLot}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        ItemSeparatorComponent={CatalogueSeparator}
        initialNumToRender={10}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={32}
        windowSize={7}
        removeClippedSubviews
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lotsScrollContent}
      />

      <BottomTabs
        onOpenHome={onOpenHome}
        onOpenShortlist={onOpenShortlist}
        onOpenActivity={onOpenActivity}
        onOpenMore={onOpenMore}
      />
    </SafeAreaView>
  );
}

function CatalogueSeparator() {
  return <View style={styles.catalogueSeparator} />;
}

function SegmentButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.segmentButton, active ? styles.segmentActive : null]}
    >
      <Text
        style={[styles.segmentText, active ? styles.segmentTextActive : null]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Pressable hitSlop={8} style={styles.seeAllButton}>
        <Text style={styles.seeAll}>View all</Text>
        <FontAwesome6
          name="chevron-right"
          iconStyle="solid"
          size={9}
          color={palette.goldBright}
        />
      </Pressable>
    </View>
  );
}

function InfoLine({ icon, text }: { icon: AppIconName; text: string }) {
  return (
    <View style={styles.infoLine}>
      <FontAwesome6
        name={icon}
        iconStyle="solid"
        size={11}
        color={palette.goldBright}
      />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
}

function OnlineSaleRow({ sale, onPress }: { sale: Sale; onPress: () => void }) {
  return (
    <Pressable style={styles.onlineRow} onPress={onPress}>
      <Image source={horseHero} resizeMode="cover" style={styles.onlineThumb} />

      <View style={styles.onlineCopy}>
        <Text style={styles.onlineTitle}>{sale.title}</Text>
        <Text style={styles.onlineSubtitle}>{sale.subtitle}</Text>
        <View style={styles.onlineDateLine}>
          <FontAwesome6
            name="calendar-days"
            iconStyle="regular"
            size={11}
            color={palette.goldBright}
          />
          <Text style={styles.onlineDate}>{sale.date}</Text>
        </View>
        <Text style={styles.onlineLots}>{sale.lotCount}</Text>
      </View>

      <View style={styles.timeBlock}>
        <View style={styles.statusPill}>
          <Text style={styles.statusPillText}>{sale.badge}</Text>
        </View>
        <Text style={styles.timeText}>{sale.time}</Text>
        <Text style={styles.deadlineText}>{sale.deadline}</Text>
      </View>

      <FontAwesome6
        name="chevron-right"
        iconStyle="solid"
        size={12}
        color={palette.goldBright}
      />
    </Pressable>
  );
}

function LotCatalogueRow({ lot, onPress }: { lot: Lot; onPress: () => void }) {
  const grade = getLotGrade(lot);
  const pedigreeText = [lot.sire, lot.dam].filter(Boolean).join(' x ');
  const vendorText = [lot.age > 0 ? `${lot.age}yo` : undefined, lot.vendor]
    .filter(Boolean)
    .join(' | ');

  return (
    <Pressable onPress={onPress} style={styles.catalogueRow}>
      <Image
        source={horseHero}
        resizeMode="cover"
        style={styles.catalogueThumb}
      />

      <View style={styles.catalogueCopy}>
        <View style={styles.catalogueTitleRow}>
          <Text style={styles.catalogueTitle}>Lot {lot.lotNumber}</Text>
          {lot.shortlisted ? (
            <FontAwesome6
              name="star"
              iconStyle="regular"
              size={17}
              color={palette.goldBright}
            />
          ) : null}
          {lot.marker ? (
            <View style={[styles.marker, markerStyleByTone[lot.marker]]}>
              {lot.marker === 'gold' ? (
                <Text style={styles.markerText}>M</Text>
              ) : null}
            </View>
          ) : null}
        </View>
        <Text style={styles.catalogueType}>{lot.mareName}</Text>
        {pedigreeText ? (
          <Text numberOfLines={1} style={styles.cataloguePedigree}>
            {pedigreeText}
          </Text>
        ) : null}
        {vendorText ? (
          <Text numberOfLines={1} style={styles.cataloguePedigree}>
            {vendorText}
          </Text>
        ) : null}

        {grade || lot.age > 0 ? (
          <View style={styles.catalogueScoreRow}>
            {grade ? (
              <View style={styles.scoreBadgeStrong}>
                <Text style={styles.scoreBadgeValue}>{grade}</Text>
                <Text style={styles.scoreBadgeLabel}>Grade</Text>
              </View>
            ) : null}
            {lot.age > 0 ? (
              <View style={styles.scoreBadgeStrong}>
                <Text style={styles.scoreBadgeValue}>{lot.age}</Text>
                <Text style={styles.scoreBadgeLabel}>Age</Text>
              </View>
            ) : null}
          </View>
        ) : null}

        {lot.tags.length > 0 || lot.insight ? (
          <View style={styles.catalogueTagRow}>
            {lot.tags.map(tag => (
              <Text key={tag} style={styles.catalogueTag}>
                {tag}
              </Text>
            ))}
            {lot.insight ? (
              <Text
                style={[styles.insightTag, insightStyleByTone[lot.insightTone]]}
              >
                {lot.insight}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const MemoizedLotCatalogueRow = React.memo(LotCatalogueRow);

function getVisibleCatalogueLots(
  lots: Lot[],
  filter: CatalogueFilter,
  sort: CatalogueSort,
  searchQuery: string,
  activeStallion: string,
  activeGrade: string,
  activeAge: string,
): Lot[] {
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const normalizedStallion = activeStallion.trim().toLowerCase();
  const normalizedGrade = activeGrade.trim().toLowerCase();
  const selectedMaxAge = getAgeFilterValue(activeAge);

  return lots
    .filter(lot => {
      const analysis = lot.analysis;

      if (
        normalizedStallion !== allStallionsLabel.toLowerCase() &&
        normalizedStallion &&
        analysis?.stallionName?.toLowerCase() !== normalizedStallion
      ) {
        return false;
      }

      if (
        normalizedGrade !== allGradesLabel.toLowerCase() &&
        normalizedGrade &&
        getLotGrade(lot).toLowerCase() !== normalizedGrade
      ) {
        return false;
      }

      if (selectedMaxAge !== null && (!lot.age || lot.age > selectedMaxAge)) {
        return false;
      }

      if (!analysis) {
        return filter === 'all';
      }

      if (filter === 'top') {
        return analysis.verdict === 'Top Pick';
      }

      if (filter === 'value') {
        return analysis.verdict === 'Value';
      }

      if (filter === 'pedigree') {
        return analysis.pedigreeStrength >= 80;
      }

      return true;
    })
    .filter(lot => {
      if (!normalizedSearch) {
        return true;
      }

      return getLotSearchText(lot).includes(normalizedSearch);
    })
    .sort((a, b) => getSortValue(b, sort) - getSortValue(a, sort));
}

function getLotSearchText(lot: Lot): string {
  return [
    lot.lotNumber,
    `lot ${lot.lotNumber}`,
    lot.mareName,
    lot.sire,
    lot.dam,
    lot.vendor,
    lot.type,
    lot.insight,
    lot.analysis?.verdict,
    lot.analysis?.stallionName,
    lot.analysis?.matchLabel,
    lot.analysis?.vendorName,
    lot.analysis?.stallionFarm,
    lot.analysis?.stallionFee,
    ...Object.values(lot.analysis?.sourceFields ?? {}),
    ...lot.tags,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function getSortValue(lot: Lot, sort: CatalogueSort): number {
  const analysis = lot.analysis;

  if (sort === 'age') {
    return lot.age ?? 0;
  }

  if (sort === 'grade') {
    return getGradeSortValue(getLotGrade(lot));
  }

  if (!analysis) {
    return 0;
  }

  if (sort === 'match') {
    return analysis.matchRating;
  }

  if (sort === 'pedigree') {
    return analysis.pedigreeStrength;
  }

  if (sort === 'vendor') {
    const offered = analysis.vendorLotsOffered5y ?? 0;
    const winners = analysis.vendorWinners5y ?? 0;
    return offered > 0 ? (winners / offered) * 100 : 0;
  }

  return analysis.rankingScore;
}

function nextFilter(previous: CatalogueFilter): CatalogueFilter {
  const order: CatalogueFilter[] = ['all', 'top', 'value', 'pedigree'];
  return order[(order.indexOf(previous) + 1) % order.length];
}

function nextSort(previous: CatalogueSort): CatalogueSort {
  const order: CatalogueSort[] = [
    'grade',
    'age',
    'rank',
    'match',
    'pedigree',
    'vendor',
  ];
  return order[(order.indexOf(previous) + 1) % order.length];
}

function getStallionOptions(lots: Lot[]): StallionOption[] {
  const counts = new Map<string, number>();

  lots.forEach(lot => {
    const stallionName = lot.analysis?.stallionName?.trim();

    if (!stallionName) {
      return;
    }

    counts.set(stallionName, (counts.get(stallionName) ?? 0) + 1);
  });

  const options = Array.from(counts.entries())
    .map(([label, lotCount]) => ({ label, lotCount }))
    .sort((a, b) => b.lotCount - a.lotCount || a.label.localeCompare(b.label));

  return [{ label: allStallionsLabel, lotCount: lots.length }, ...options];
}

function nextStallion(previous: string, options: StallionOption[]): string {
  if (options.length === 0) {
    return previous;
  }

  const currentIndex = options.findIndex(option => option.label === previous);
  return options[(currentIndex + 1) % options.length].label;
}

function getGradeOptions(lots: Lot[]): FilterOption[] {
  const grades = Array.from(
    new Set(lots.map(getLotGrade).filter(Boolean)),
  ).sort(
    (a, b) => getGradeSortValue(b) - getGradeSortValue(a) || a.localeCompare(b),
  );

  return [
    { label: allGradesLabel, value: allGradesLabel },
    ...grades.map(grade => ({ label: grade, value: grade })),
  ];
}

function getAgeOptions(lots: Lot[]): FilterOption[] {
  const ages = Array.from(
    new Set(lots.map(lot => lot.age).filter(age => age > 0)),
  ).sort((a, b) => b - a);

  return [
    { label: allAgesLabel, value: allAgesLabel },
    ...ages.map(age => {
      const label = getAgeLabel(age);

      return { label, value: String(age) };
    }),
  ];
}

function nextFilterOption(previous: string, options: FilterOption[]): string {
  if (options.length === 0) {
    return previous;
  }

  const currentIndex = options.findIndex(option => option.label === previous);
  return options[(currentIndex + 1) % options.length].label;
}

function getLotGrade(lot: Lot) {
  return (
    lot.analysis?.grade?.trim() || lot.analysis?.commercialRating?.trim() || ''
  );
}

function getAgeLabel(age?: number) {
  return age !== undefined && age > 0 ? `${age} years & younger` : '';
}

function getAgeFilterValue(ageLabel: string) {
  if (ageLabel.trim().toLowerCase() === allAgesLabel.toLowerCase()) {
    return null;
  }

  const age = parseInt(ageLabel, 10);

  return Number.isNaN(age) ? null : age;
}

function getGradeSortValue(grade: string) {
  const normalizedGrade = grade.trim().toUpperCase();
  const order = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D'];
  const index = order.indexOf(normalizedGrade);

  return index >= 0 ? order.length - index : 0;
}

function QuickAction({
  icon,
  label,
  filled,
}: {
  icon: AppIconName;
  label: string;
  filled?: boolean;
}) {
  return (
    <Pressable style={styles.quickAction}>
      <View
        style={[
          styles.quickActionIcon,
          filled ? styles.quickActionIconFilled : null,
        ]}
      >
        <FontAwesome6
          name={icon}
          iconStyle="solid"
          size={9}
          color={filled ? palette.black : palette.goldBright}
        />
      </View>
      <Text style={styles.quickActionText}>{label}</Text>
    </Pressable>
  );
}

function BottomTabs({
  onOpenHome,
  onOpenShortlist,
  onOpenActivity,
  onOpenMore,
}: {
  onOpenHome?: () => void;
  onOpenShortlist?: () => void;
  onOpenActivity?: () => void;
  onOpenMore?: () => void;
}) {
  return (
    <View style={styles.tabBar}>
      <TabItem icon="house" label="Home" onPress={onOpenHome} />
      <TabItem icon="gavel" label="Sales" active />
      <TabItem icon="star" label="Shortlist" onPress={onOpenShortlist} />
      <TabItem icon="user-group" label="Team" onPress={onOpenActivity} />
      <TabItem icon="ellipsis" label="More" onPress={onOpenMore} />
    </View>
  );
}

function TabItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: AppIconName;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.tabItem} onPress={onPress} disabled={!onPress}>
      <FontAwesome6
        name={icon}
        iconStyle="solid"
        size={18}
        color={active ? palette.goldBright : palette.mutedDark}
      />
      <Text style={[styles.tabLabel, active ? styles.tabLabelActive : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

const markerStyleByTone = {
  green: {
    backgroundColor: palette.green,
  },
  gold: {
    backgroundColor: palette.goldBright,
  },
  red: {
    backgroundColor: palette.red,
  },
};

const insightStyleByTone = {
  green: {
    color: palette.green,
    borderColor: '#246b35',
  },
  gold: {
    color: palette.goldBright,
    borderColor: '#644718',
  },
  red: {
    color: '#d67157',
    borderColor: '#743022',
  },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.black,
  },

  scrollContent: {
    paddingHorizontal: 14,
    paddingBottom: 92,
  },

  lotsScrollContent: {
    paddingHorizontal: 13,
    paddingTop: 12,
    paddingBottom: 108,
  },

  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerSide: {
    width: 34,
  },

  title: {
    color: palette.white,
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
  },

  bellButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  segmented: {
    height: 32,
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#05070a',
    overflow: 'hidden',
    marginBottom: 16,
  },

  segmentButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  segmentActive: {
    backgroundColor: palette.gold,
    borderRadius: 16,
  },

  segmentText: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '600',
  },

  segmentTextActive: {
    color: palette.black,
    fontWeight: '700',
  },

  sectionHeader: {
    minHeight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '900',
  },

  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    minHeight: 24,
    paddingLeft: 12,
  },

  seeAll: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '600',
  },

  liveCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.panel,
    overflow: 'hidden',
    marginBottom: 13,
  },

  liveTop: {
    minHeight: 116,
    flexDirection: 'row',
    padding: 9,
  },

  liveThumb: {
    width: 102,
    height: 100,
    overflow: 'hidden',
    borderRadius: 6,
    backgroundColor: palette.panelSoft,
  },

  liveImage: {
    borderRadius: 6,
  },

  lotPill: {
    alignSelf: 'flex-start',
    margin: 6,
    borderRadius: 4,
    overflow: 'hidden',
    paddingHorizontal: 6,
    paddingVertical: 2,
    color: palette.goldBright,
    backgroundColor: '#171005',
    borderWidth: 1,
    borderColor: palette.gold,
    fontSize: 8,
    fontWeight: '900',
  },

  liveCopy: {
    flex: 1,
    paddingHorizontal: 11,
  },

  liveNameRow: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  liveNameCopy: {
    flex: 1,
  },

  liveTitle: {
    color: palette.white,
    fontSize: 13,
    fontWeight: '700',
  },

  liveSubtitle: {
    color: palette.goldBright,
    fontSize: 10,
    marginTop: 3,
  },

  infoLine: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  infoText: {
    color: palette.muted,
    fontSize: 10,
    fontWeight: '500',
  },

  liveStatus: {
    height: 28,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: palette.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 6,
  },

  liveStatusText: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '900',
  },

  viewLiveButton: {
    height: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 88,
    borderTopWidth: 1,
    borderTopColor: palette.borderSoft,
    backgroundColor: '#101319',
  },

  viewLiveText: {
    color: palette.goldBright,
    fontSize: 11,
    fontWeight: '600',
  },

  onlineList: {
    gap: 4,
    marginBottom: 10,
  },

  onlineRow: {
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.panel,
    padding: 7,
    gap: 8,
  },

  onlineThumb: {
    width: 70,
    height: 61,
    borderRadius: 5,
    backgroundColor: palette.panelSoft,
  },

  onlineCopy: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },

  onlineTitle: {
    color: palette.white,
    fontSize: 12,
    fontWeight: '700',
  },

  onlineSubtitle: {
    color: palette.goldBright,
    fontSize: 10,
    marginTop: 3,
  },

  onlineDateLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 7,
  },

  onlineDate: {
    color: palette.muted,
    fontSize: 9,
    fontWeight: '500',
  },

  onlineLots: {
    color: palette.mutedDark,
    fontSize: 9,
    fontWeight: '600',
    marginTop: 4,
  },

  timeBlock: {
    width: 60,
    alignItems: 'flex-end',
  },

  statusPill: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginBottom: 8,
  },

  statusPillText: {
    color: palette.white,
    fontSize: 7,
    fontWeight: '900',
  },

  timeText: {
    color: palette.goldBright,
    fontSize: 13,
    fontWeight: '900',
  },

  deadlineText: {
    color: palette.muted,
    fontSize: 8,
    marginTop: 3,
  },

  seeLotsButton: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 6,
    backgroundColor: palette.goldBright,
    marginBottom: 10,
  },

  seeLotsText: {
    color: palette.black,
    fontSize: 12,
    fontWeight: '900',
  },

  learnCard: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.panel,
    paddingHorizontal: 11,
    gap: 10,
  },

  learnIcon: {
    width: 34,
    height: 34,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.gold,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#100d07',
  },

  learnCopy: {
    flex: 1,
  },

  learnTitle: {
    color: palette.white,
    fontSize: 12,
    fontWeight: '700',
  },

  learnText: {
    color: palette.muted,
    fontSize: 9,
    marginTop: 3,
  },

  learnButton: {
    height: 28,
    minWidth: 86,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.gold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  learnButtonText: {
    color: palette.goldBright,
    fontSize: 9,
    fontWeight: '700',
  },

  searchBar: {
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.panel,
    paddingHorizontal: 11,
    gap: 10,
    marginBottom: 8,
  },

  catalogueBackButton: {
    alignSelf: 'flex-start',
    minHeight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 7,
    paddingRight: 12,
  },

  backChevron: {
    transform: [{ rotate: '180deg' }],
  },

  catalogueBackText: {
    color: palette.goldBright,
    fontSize: 11,
    fontWeight: '800',
  },

  searchInput: {
    flex: 1,
    color: palette.muted,
    fontSize: 10,
    minHeight: 34,
    padding: 0,
  },

  searchDivider: {
    width: 1,
    height: 18,
    backgroundColor: palette.border,
  },

  filterRow: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: palette.borderSoft,
    marginBottom: 10,
  },

  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    minHeight: 30,
  },

  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    minHeight: 30,
  },

  filterButtonText: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '600',
  },

  stallionFilterRow: {
    minHeight: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 9,
  },

  stallionFilterButton: {
    flex: 1,
    minHeight: 29,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 6,
    backgroundColor: palette.goldBright,
    paddingHorizontal: 10,
  },

  stallionFilterText: {
    color: palette.black,
    fontSize: 10,
    fontWeight: '900',
  },

  stallionFilterMeta: {
    color: palette.muted,
    fontSize: 9,
    fontWeight: '700',
  },

  secondaryFilterRow: {
    minHeight: 31,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginBottom: 9,
  },

  secondaryFilterButton: {
    flex: 1,
    minHeight: 29,
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.panel,
    paddingHorizontal: 9,
  },

  secondaryFilterText: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
  },

  lotCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  lotCountText: {
    color: palette.muted,
    fontSize: 10,
    fontWeight: '500',
  },

  buyerInsightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  overlayPill: {
    minHeight: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.gold,
    backgroundColor: '#100d07',
    paddingHorizontal: 8,
  },

  buyerInsightText: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '600',
  },

  catalogueList: {
    gap: 6,
    marginBottom: 9,
  },

  catalogueSeparator: {
    height: 6,
  },

  catalogueRow: {
    minHeight: 84,
    flexDirection: 'row',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    backgroundColor: '#080b10',
    padding: 6,
    gap: 10,
  },

  catalogueThumb: {
    width: 70,
    height: 72,
    borderRadius: 5,
    backgroundColor: palette.panelSoft,
  },

  catalogueCopy: {
    flex: 1,
  },

  catalogueTitleRow: {
    minHeight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },

  catalogueTitle: {
    flex: 1,
    color: palette.white,
    fontSize: 15,
    fontWeight: '400',
  },

  catalogueType: {
    color: palette.white,
    fontSize: 10,
    marginTop: 2,
  },

  cataloguePedigree: {
    color: palette.muted,
    fontSize: 9,
    marginTop: 5,
  },

  catalogueScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 7,
  },

  scoreBadgeStrong: {
    minWidth: 52,
    height: 31,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.gold,
    backgroundColor: '#171005',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scoreBadge: {
    minWidth: 64,
    height: 31,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.panel,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scoreBadgeValue: {
    color: palette.goldBright,
    fontSize: 12,
    fontWeight: '900',
  },

  scoreBadgeLabel: {
    color: palette.muted,
    fontSize: 7,
    fontWeight: '700',
    marginTop: 2,
  },

  catalogueScoreText: {
    color: palette.goldBright,
    fontSize: 9,
    fontWeight: '800',
  },

  catalogueTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 9,
  },

  catalogueTag: {
    color: palette.muted,
    fontSize: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },

  insightTag: {
    marginLeft: 'auto',
    fontSize: 8,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },

  marker: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  markerText: {
    color: palette.black,
    fontSize: 9,
    fontWeight: '900',
  },

  quickActionBar: {
    minHeight: 35,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },

  quickAction: {
    flex: 1,
    minHeight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#080b10',
    paddingHorizontal: 4,
  },

  quickActionIcon: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },

  quickActionIconFilled: {
    backgroundColor: palette.goldBright,
  },

  quickActionText: {
    color: palette.white,
    fontSize: 7,
    fontWeight: '600',
  },

  backToSalesButton: {
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: palette.gold,
  },

  backToSalesText: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '800',
  },

  detailScrollContent: {
    paddingBottom: 100,
  },

  detailHero: {
    height: 220,
    justifyContent: 'space-between',
    backgroundColor: palette.panelSoft,
  },

  detailHeroImage: {
    opacity: 0.86,
  },

  detailHeroTop: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },

  detailHeroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },

  headerIconButton: {
    width: 18,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  photoCountBadge: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 4,
    backgroundColor: '#100d07',
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: 7,
    paddingVertical: 4,
    marginRight: 14,
    marginBottom: 12,
  },

  photoCountText: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '800',
  },

  detailIntro: {
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  detailTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  detailTitleCopy: {
    flex: 1,
    paddingRight: 12,
  },

  detailTitle: {
    color: palette.goldBright,
    fontSize: 23,
    fontWeight: '500',
  },

  detailType: {
    color: palette.white,
    fontSize: 12,
    marginTop: 4,
  },

  detailPedigree: {
    color: palette.muted,
    fontSize: 11,
    marginTop: 5,
  },

  detailChipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },

  detailChip: {
    minWidth: 64,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#205728',
    backgroundColor: '#07140b',
    paddingHorizontal: 10,
  },

  detailChipText: {
    color: palette.green,
    fontSize: 9,
    fontWeight: '600',
  },

  workflowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 12,
  },

  workflowButton: {
    flex: 1,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#664318',
    backgroundColor: '#100d07',
  },

  workflowActive: {
    borderColor: '#2b4772',
    backgroundColor: '#101827',
  },

  workflowText: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '800',
  },

  workflowTextActive: {
    color: palette.white,
  },

  privateLine: {
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  privateText: {
    color: palette.muted,
    fontSize: 9,
  },

  detailDivider: {
    height: 1,
    backgroundColor: palette.borderSoft,
    marginHorizontal: 14,
  },

  priceGuide: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },

  priceGuideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  priceGuideTitle: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '800',
  },

  privateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  privateBadgeText: {
    color: palette.muted,
    fontSize: 9,
  },

  vendorBox: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7c4617',
    backgroundColor: '#080603',
    paddingHorizontal: 11,
  },

  vendorLabel: {
    color: palette.muted,
    fontSize: 9,
  },

  vendorPrice: {
    color: palette.goldBright,
    fontSize: 11,
    fontWeight: '800',
  },

  vendorNote: {
    color: palette.muted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 8,
  },

  detailActionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    paddingHorizontal: 10,
    marginTop: 14,
  },

  detailAction: {
    width: '32.8%',
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#101318',
    paddingHorizontal: 5,
  },

  detailActionText: {
    color: palette.white,
    fontSize: 8,
    fontWeight: '600',
    textAlign: 'center',
  },

  detailWarning: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#7c4617',
    backgroundColor: '#090704',
    paddingHorizontal: 16,
    marginHorizontal: 14,
    marginTop: 14,
  },

  detailWarningText: {
    flex: 1,
    color: palette.goldBright,
    fontSize: 11,
    lineHeight: 16,
  },

  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: palette.border,
    backgroundColor: '#030507',
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  tabLabel: {
    color: palette.mutedDark,
    fontSize: 10,
    fontWeight: '700',
  },

  tabLabelActive: {
    color: palette.goldBright,
  },
});

export default SalesScreen;
