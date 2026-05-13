import React from 'react';
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

type AppIconName =
  | 'bell'
  | 'chart-line'
  | 'chevron-right'
  | 'clipboard-list'
  | 'ellipsis'
  | 'file-csv'
  | 'house'
  | 'magnifying-glass'
  | 'photo-film'
  | 'shield-halved'
  | 'sitemap'
  | 'star'
  | 'chart-simple';

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

type RawStallionMatchRow = {
  lotNumber: number;
  horseName: string;
  sex: 'Colt' | 'Filly';
  sire: string;
  dam: string;
  matchPercent: number;
  pedigreeScore?: number;
  matingPedigreeStrength?: number;
};

type CatalogueLot = {
  lotNumber: number;
  title: string;
  subtitle: string;
  matchPercent: number;
  matchLabel: 'Elite Match' | 'Strong Match' | 'Watch';
  workflowTag: 'Top Pick' | 'Value' | 'Watch';
  rank: number;
};

const activeOverlay = {
  id: 'southport-tycoon',
  name: 'Southport Tycoon',
  totalOverlayOptions: '100+',
};

const rawImportPreview: RawStallionMatchRow[] = [
  {
    lotNumber: 21,
    horseName: 'Unnamed Filly',
    sex: 'Filly',
    sire: 'Written Tycoon',
    dam: 'Gold Coast Dream',
    matchPercent: 96,
    pedigreeScore: 91,
    matingPedigreeStrength: 89,
  },
  {
    lotNumber: 47,
    horseName: 'Bay Colt',
    sex: 'Colt',
    sire: 'I Am Invincible',
    dam: 'Harbour Lights',
    matchPercent: 92,
    pedigreeScore: 88,
    matingPedigreeStrength: 85,
  },
  {
    lotNumber: 128,
    horseName: 'Chestnut Filly',
    sex: 'Filly',
    sire: 'Snitzel',
    dam: 'Northern Star',
    matchPercent: 87,
    pedigreeScore: 82,
  },
];

function transformRawHorse(row: RawStallionMatchRow): CatalogueLot {
  const matchLabel =
    row.matchPercent >= 94
      ? 'Elite Match'
      : row.matchPercent >= 88
        ? 'Strong Match'
        : 'Watch';

  const workflowTag =
    row.matchPercent >= 94
      ? 'Top Pick'
      : row.pedigreeScore && row.pedigreeScore >= 86
        ? 'Value'
        : 'Watch';

  return {
    lotNumber: row.lotNumber,
    title: row.horseName,
    subtitle: `${row.sex} | ${row.sire} x ${row.dam}`,
    matchPercent: row.matchPercent,
    matchLabel,
    workflowTag,
    rank: 0,
  };
}

const catalogueLots = rawImportPreview
  .map(transformRawHorse)
  .sort((a, b) => b.matchPercent - a.matchPercent)
  .map((lot, index) => ({ ...lot, rank: index + 1 }));

function HomeScreen() {
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
              <Text style={styles.overlayTitle}>
                {activeOverlay.name} Overlay Active
              </Text>
              <Text style={styles.overlayMeta}>
                Ranking catalogue by Stallion Match %
              </Text>
            </View>

            <View style={styles.overlayFutureBadge}>
              <Text style={styles.overlayFutureText}>
                {activeOverlay.totalOverlayOptions}
              </Text>
            </View>
          </View>

          <View style={styles.chipRow}>
            <FilterChip label="Stallion Match" active />
            <FilterChip label="Elite" />
            <FilterChip label="90%+" />
          </View>
        </Panel>

        <Panel>
          <SectionHeader title="UPCOMING SALES" action="See all" />

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
          <SectionHeader title="TOP MATCH HORSES" action="Sort: Match %" />

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
          <SectionHeader title="CSV IMPORT" action="Temporary" />

          <Pressable style={styles.uploadButton}>
            <View style={styles.uploadIcon}>
              <FontAwesome6
                name="file-csv"
                iconStyle="solid"
                size={18}
                color={palette.black}
              />
            </View>
            <View style={styles.uploadCopy}>
              <Text style={styles.uploadTitle}>Upload Stallion Match CSV</Text>
              <Text style={styles.uploadMeta}>
                Raw import {'->'} workflow scoring {'->'} UI mapping
              </Text>
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
        <TabItem icon="house" label="Dashboard" active />
        <TabItem icon="sitemap" label="Sales" />
        <TabItem icon="star" label="Shortlist" />
        <TabItem icon="chart-simple" label="Activity" />
        <TabItem icon="ellipsis" label="More" />
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
}: {
  title: string;
  action?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <Text style={styles.sectionAction}>{action}</Text>
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
  const isElite = lot.matchLabel === 'Elite Match';

  return (
    <View style={[styles.lotRow, isElite ? styles.lotRowElite : null]}>
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>#{lot.rank}</Text>
      </View>

      <View style={styles.lotCopy}>
        <Text style={styles.lotTitle}>Lot {lot.lotNumber} | {lot.title}</Text>
        <Text numberOfLines={1} style={styles.lotSubtitle}>{lot.subtitle}</Text>
        <View style={styles.tagRow}>
          <Text style={[styles.matchTag, isElite ? styles.eliteTag : null]}>
            {lot.matchLabel}
          </Text>
          <Text style={styles.workflowTag}>{lot.workflowTag}</Text>
        </View>
      </View>

      <View style={styles.matchPercentBadge}>
        <Text style={styles.matchPercent}>{lot.matchPercent}%</Text>
        <Text style={styles.matchLabel}>Match</Text>
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
}: {
  icon: AppIconName;
  label: string;
  active?: boolean;
}) {
  return (
    <Pressable style={styles.tabItem}>
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

  overlayTitle: {
    color: palette.white,
    fontSize: 15,
    fontWeight: '800',
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
    fontSize: 11,
    fontWeight: '800',
  },

  chipRow: {
    flexDirection: 'row',
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

  rankBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.panelSoft,
    borderWidth: 1,
    borderColor: palette.border,
  },

  rankText: {
    color: palette.goldBright,
    fontSize: 11,
    fontWeight: '800',
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

  matchPercentBadge: {
    minWidth: 54,
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
