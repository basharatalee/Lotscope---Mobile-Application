import React, { useMemo } from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {
  SouthportTycoonAnalysis,
  getEnrichedBroodmareCatalogue,
} from '../data/southportTycoonAnalysis';

type AppIconName =
  | 'bell'
  | 'chart-line'
  | 'chevron-right'
  | 'clipboard-list'
  | 'ellipsis'
  | 'file-csv'
  | 'gavel'
  | 'house'
  | 'magnifying-glass'
  | 'photo-film'
  | 'shield-halved'
  | 'sitemap'
  | 'star'
  | 'chart-simple'
  | 'user-group';

const logo = require('../../assets/ls-logo.jpeg') as ImageSourcePropType;
const horseHero = require('../../assets/black-horse.png') as ImageSourcePropType;

const palette = {
  black: '#020406',
  panel: '#070a0f',
  panelSoft: '#0b0e13',
  border: '#202127',
  gold: '#d6a247',
  goldBright: '#f0c66b',
  white: '#f8f2e8',
  muted: '#a9adb7',
  mutedDark: '#6f7581',
  danger: '#d67157',
  green: '#84c884',
};

type CatalogueLot = {
  lotNumber: number;
  title: string;
  subtitle: string;
  vendor: string;
  age: number;
  grade?: string;
  verdict?: string;
};

const activeOverlay = {
  id: 'imported-overlay',
  name: 'Imported Data',
  status: 'ACTIVE',
  rankedLots: 'MM Catalogue',
  insight: 'Ready to overlay mating intelligence on broodmare lots',
};

function transformCatalogueLot(
  lot: ReturnType<typeof getEnrichedBroodmareCatalogue>[number],
): CatalogueLot {
  return {
    lotNumber: lot.lotNumber,
    title: lot.mareName,
    subtitle: `${lot.sire} x ${lot.dam}`,
    vendor: lot.vendor,
    age: lot.age,
    grade: lot.analysis?.grade ?? lot.analysis?.commercialRating,
    verdict: lot.analysis?.verdict,
  };
}

function getActiveOverlayName(analysisRows?: SouthportTycoonAnalysis[]): string {
  const counts = new Map<string, number>();

  analysisRows?.forEach(row => {
    const stallionName = row.stallionName?.trim();

    if (stallionName) {
      counts.set(stallionName, (counts.get(stallionName) ?? 0) + 1);
    }
  });

  return (
    Array.from(counts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] ??
    activeOverlay.name
  );
}

function HomeScreen({
  onOpenSales,
  onOpenShortlist,
  onOpenActivity,
  onOpenMore,
  onUploadCsv,
  csvImportStatus,
  analysisRows,
}: {
  onOpenSales?: () => void;
  onOpenShortlist?: () => void;
  onOpenActivity?: () => void;
  onOpenMore?: () => void;
  onUploadCsv?: () => void;
  csvImportStatus?: {
    fileName?: string;
    rowCount: number;
    state: 'sample' | 'loaded' | 'error';
    message?: string;
  };
  analysisRows?: SouthportTycoonAnalysis[];
}) {
  const enrichedLots = useMemo(
    () => getEnrichedBroodmareCatalogue(analysisRows),
    [analysisRows],
  );
  const catalogueLots = useMemo(
    () =>
      enrichedLots
        .slice()
        .sort((a, b) => (b.analysis?.rankingScore ?? 0) - (a.analysis?.rankingScore ?? 0))
        .slice(0, 3)
        .map(transformCatalogueLot),
    [enrichedLots],
  );
  const matchedCount = useMemo(
    () => enrichedLots.filter(lot => lot.analysis).length,
    [enrichedLots],
  );
  const topPickCount = useMemo(
    () => enrichedLots.filter(lot => lot.analysis?.verdict === 'Top Pick').length,
    [enrichedLots],
  );
  const activeOverlayName = useMemo(
    () => getActiveOverlayName(analysisRows),
    [analysisRows],
  );
  const csvStatusText =
    csvImportStatus?.state === 'loaded'
      ? `${csvImportStatus.rowCount} analysis rows loaded from ${csvImportStatus.fileName ?? 'CSV'}`
      : csvImportStatus?.state === 'error'
        ? csvImportStatus.message ?? 'File import failed'
        : 'Upload CSV to load analysis';

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image source={logo} resizeMode="contain" style={styles.logo} />

          <View style={styles.notificationWrap}>
            <FontAwesome6
              name="bell"
              iconStyle="regular"
              size={17}
              color={palette.goldBright}
            />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>3</Text>
            </View>
          </View>
        </View>

        <ImageBackground
          source={horseHero}
          resizeMode="contain"
          imageStyle={styles.heroImage}
          style={styles.hero}>
          <Text style={styles.greeting}>Good morning, Mark</Text>
          <Text style={styles.subGreeting}>Here's your overview</Text>
        </ImageBackground>

        <Panel>
          <SectionHeader title="ACTIVE STALLION OVERLAY" action="Change" />

          <View style={styles.overlayRow}>
            <View style={styles.overlayIcon}>
              <FontAwesome6
                name="chart-line"
                iconStyle="solid"
                size={16}
                color={palette.black}
              />
            </View>

            <View style={styles.overlayCopy}>
              <View style={styles.overlayTitleRow}>
                <Text style={styles.overlayTitle}>
                  {activeOverlayName} Overlay
                </Text>
                <View style={styles.overlayStatusBadge}>
                  <Text style={styles.overlayStatusText}>
                    {activeOverlay.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.overlayMeta}>
                {matchedCount} lots ranked | {topPickCount} top picks
              </Text>
            </View>

            <View style={styles.overlayFutureBadge}>
              <Text style={styles.overlayFutureText}>
                {activeOverlay.rankedLots}
              </Text>
            </View>
          </View>

          <View style={styles.chipRow}>
            <FilterChip label="Stallion Match" active />
            <FilterChip label="Elite Matches" />
            <FilterChip label="90%+" />
            <FilterChip label="Value" />
            <FilterChip label="Shortlisted" />
          </View>
        </Panel>

        <Panel>
          <SectionHeader
            title="UPCOMING SALES"
            action="See all"
            onActionPress={onOpenSales}
          />

          <View style={styles.saleRow}>
            <ImageBackground
              source={horseHero}
              resizeMode="cover"
              imageStyle={styles.saleImage}
              style={styles.saleThumb}>
              <View style={styles.liveBadge}>
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            </ImageBackground>

            <View style={styles.saleCopy}>
              <Text style={styles.saleTitle}>Magic Millions Gold Coast</Text>
              <Text style={styles.saleDetail}>7 - 13 Jan 2025</Text>
              <Text style={styles.saleDetail}>Gold Coast, QLD</Text>
            </View>

            <View style={styles.saleStatus}>
              <Text style={styles.saleStatusText}>LIVE</Text>
            </View>
          </View>
        </Panel>

        <View style={styles.queueGrid}>
          <MetricCard
            title="INSPECTION QUEUE"
            value="18"
            caption="Lots to inspect"
            icon="shield-halved"
          />
          <MetricCard
            title="REVIEW QUEUE"
            value="23"
            caption="Online lots to review"
            icon="magnifying-glass"
          />
        </View>

        <Panel>
          <SectionHeader title="MM BROODMARE SALE" action="Open Sale" onActionPress={onOpenSales} />

          {catalogueLots.map(lot => (
            <LotMatchRow key={lot.lotNumber} lot={lot} />
          ))}
        </Panel>

        <Panel>
          <SectionHeader title="ALERTS" action="View all" />
          <ActivityLine icon="clipboard-list" text="2 vet reports received" />
          <ActivityLine icon="photo-film" text="3 new videos uploaded" />
          <ActivityLine icon="bell" text="1 vendor update" />
        </Panel>

        <Panel>
          <SectionHeader title="OVERLAY DATA" action="Temporary" />

          <Pressable
            style={styles.uploadButton}
            onPress={onUploadCsv}
            disabled={!onUploadCsv}>
            <View style={styles.uploadIcon}>
              <FontAwesome6
                name="file-csv"
                iconStyle="solid"
                size={18}
                color={palette.black}
              />
            </View>
            <View style={styles.uploadCopy}>
              <Text style={styles.uploadTitle}>Upload Stallion Match CSV/XLSX</Text>
              <Text style={styles.uploadMeta}>{csvStatusText}</Text>
            </View>
            <FontAwesome6
              name="chevron-right"
              iconStyle="solid"
              size={13}
              color={palette.goldBright}
            />
          </Pressable>
        </Panel>
      </ScrollView>

      <View style={styles.tabBar}>
        <TabItem icon="house" label="Home" active />
        <TabItem icon="gavel" label="Sales" onPress={onOpenSales} />
        <TabItem icon="star" label="Shortlist" onPress={onOpenShortlist} />
        <TabItem icon="user-group" label="Team" onPress={onOpenActivity} />
        <TabItem icon="ellipsis" label="More" onPress={onOpenMore} />
      </View>
    </SafeAreaView>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return <View style={styles.panel}>{children}</View>;
}

function SectionHeader({
  title,
  action,
  onActionPress,
}: {
  title: string;
  action?: string;
  onActionPress?: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Pressable
          disabled={!onActionPress}
          onPress={onActionPress}
          hitSlop={8}
          style={styles.sectionActionButton}>
          <Text style={styles.sectionAction}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function FilterChip({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <View style={[styles.filterChip, active ? styles.filterChipActive : null]}>
      <Text style={[styles.filterText, active ? styles.filterTextActive : null]}>
        {label}
      </Text>
    </View>
  );
}

function MetricCard({
  title,
  value,
  caption,
  icon,
}: {
  title: string;
  value: string;
  caption: string;
  icon: AppIconName;
}) {
  return (
    <Panel>
      <View style={styles.metricTop}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FontAwesome6
          name={icon}
          iconStyle="solid"
          size={21}
          color={palette.goldBright}
        />
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricCaption}>{caption}</Text>
      <Text style={styles.viewQueue}>View queue</Text>
    </Panel>
  );
}

function LotMatchRow({ lot }: { lot: CatalogueLot }) {
  const hasAge = lot.age > 0;

  return (
    <View style={styles.lotRow}>
      <View style={styles.lotCopy}>
        <Text style={styles.lotTitle}>Lot {lot.lotNumber} | {lot.title}</Text>
        <Text numberOfLines={1} style={styles.lotSubtitle}>{lot.subtitle}</Text>
        <View style={styles.tagRow}>
          <Text style={styles.matchTag}>Magic Millions</Text>
          <Text style={styles.workflowTag}>{lot.vendor}</Text>
        </View>
      </View>

      <View style={styles.lotMetricGroup}>
        {lot.grade ? (
          <View style={styles.matchPercentBadge}>
            <Text style={styles.matchPercent}>{lot.grade}</Text>
            <Text style={styles.matchLabel}>Grade</Text>
          </View>
        ) : null}
        {hasAge ? (
          <View style={styles.matchPercentBadge}>
            <Text style={styles.matchPercent}>{lot.age}</Text>
            <Text style={styles.matchLabel}>Age</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

function ActivityLine({ icon, text }: { icon: AppIconName; text: string }) {
  return (
    <View style={styles.activityLine}>
      <FontAwesome6
        name={icon}
        iconStyle="solid"
        size={14}
        color={palette.goldBright}
      />
      <Text style={styles.activityText}>{text}</Text>
      <FontAwesome6
        name="chevron-right"
        iconStyle="solid"
        size={12}
        color={palette.goldBright}
      />
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.black,
  },

  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 98,
  },

  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    width: 150,
    height: 58,
    marginLeft: -20,
  },

  notificationWrap: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationBadge: {
    position: 'absolute',
    top: 1,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.gold,
  },

  notificationText: {
    color: palette.black,
    fontSize: 10,
    fontWeight: '800',
  },

  hero: {
    height: 92,
    justifyContent: 'center',
    marginBottom: 10,
  },

  heroImage: {
    width: 220,
    height: 170,
    right: -6,
    top: -60,
    left: undefined,
    opacity: 0.86,
  },

  greeting: {
    color: palette.white,
    fontSize: 22,
    fontWeight: '400',
  },

  subGreeting: {
    color: palette.muted,
    fontSize: 12,
    marginTop: 8,
  },

  panel: {
    backgroundColor: palette.panel,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 8,
    marginBottom: 10,
    padding: 12,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  sectionTitle: {
    color: palette.goldBright,
    fontSize: 11,
    fontWeight: '800',
  },

  sectionAction: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '600',
  },

  sectionActionButton: {
    minHeight: 24,
    justifyContent: 'center',
    paddingLeft: 12,
  },

  overlayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  overlayIcon: {
    width: 34,
    height: 34,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.goldBright,
  },

  overlayCopy: {
    flex: 1,
  },

  overlayTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },

  overlayTitle: {
    color: palette.white,
    fontSize: 15,
    fontWeight: '800',
  },

  overlayStatusBadge: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: palette.gold,
    paddingHorizontal: 6,
    paddingVertical: 3,
    backgroundColor: '#191208',
  },

  overlayStatusText: {
    color: palette.goldBright,
    fontSize: 8,
    fontWeight: '900',
  },

  overlayMeta: {
    color: palette.muted,
    fontSize: 11,
    marginTop: 4,
  },

  overlayFutureBadge: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.gold,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  overlayFutureText: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '800',
  },

  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },

  filterChip: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: palette.panelSoft,
  },

  filterChipActive: {
    borderColor: palette.gold,
    backgroundColor: '#1a1308',
  },

  filterText: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '700',
  },

  filterTextActive: {
    color: palette.goldBright,
  },

  saleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  saleThumb: {
    width: 74,
    height: 66,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderRadius: 6,
    backgroundColor: palette.panelSoft,
  },

  saleImage: {
    borderRadius: 6,
  },

  liveBadge: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    margin: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: '#191208',
    borderWidth: 1,
    borderColor: palette.gold,
  },

  liveText: {
    color: palette.goldBright,
    fontSize: 8,
    fontWeight: '800',
  },

  saleCopy: {
    flex: 1,
    paddingHorizontal: 10,
  },

  saleTitle: {
    color: palette.white,
    fontSize: 14,
    fontWeight: '600',
  },

  saleDetail: {
    color: palette.muted,
    fontSize: 11,
    marginTop: 6,
  },

  saleStatus: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.gold,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },

  saleStatusText: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '800',
  },

  queueGrid: {
    flexDirection: 'row',
    gap: 8,
  },

  metricTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 130,
  },

  metricValue: {
    color: palette.white,
    fontSize: 24,
    marginTop: 8,
  },

  metricCaption: {
    color: palette.muted,
    fontSize: 11,
    marginTop: 4,
  },

  viewQueue: {
    color: palette.goldBright,
    fontSize: 11,
    marginTop: 16,
  },

  lotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: palette.border,
    paddingVertical: 10,
    gap: 9,
  },

  lotRowElite: {
    backgroundColor: '#100d07',
    marginHorizontal: -5,
    paddingHorizontal: 5,
    borderRadius: 7,
    borderTopColor: '#3f2c11',
  },

  lotCopy: {
    flex: 1,
  },

  lotTitle: {
    color: palette.white,
    fontSize: 13,
    fontWeight: '800',
  },

  lotSubtitle: {
    color: palette.muted,
    fontSize: 10,
    marginTop: 4,
  },

  tagRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 7,
  },

  matchTag: {
    color: palette.green,
    fontSize: 9,
    fontWeight: '800',
  },

  eliteTag: {
    color: palette.goldBright,
  },

  workflowTag: {
    color: palette.muted,
    fontSize: 9,
    fontWeight: '700',
  },

  lotMetricGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  matchPercentBadge: {
    minWidth: 48,
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: palette.gold,
    paddingVertical: 6,
    backgroundColor: '#171005',
  },

  matchPercent: {
    color: palette.goldBright,
    fontSize: 15,
    fontWeight: '900',
  },

  matchLabel: {
    color: palette.muted,
    fontSize: 8,
    marginTop: 2,
  },

  activityLine: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: palette.border,
    gap: 12,
  },

  activityText: {
    flex: 1,
    color: palette.white,
    fontSize: 12,
  },

  uploadButton: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.gold,
    padding: 10,
    backgroundColor: '#140f08',
  },

  uploadIcon: {
    width: 36,
    height: 36,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.goldBright,
  },

  uploadCopy: {
    flex: 1,
  },

  uploadTitle: {
    color: palette.white,
    fontSize: 13,
    fontWeight: '800',
  },

  uploadMeta: {
    color: palette.muted,
    fontSize: 10,
    marginTop: 4,
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

export default HomeScreen;
