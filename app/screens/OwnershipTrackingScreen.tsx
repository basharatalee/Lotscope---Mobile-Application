import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

type IconName =
  | 'arrow-left'
  | 'chart-line'
  | 'chart-simple'
  | 'chevron-right'
  | 'gavel'
  | 'ellipsis'
  | 'gavel'
  | 'house'
  | 'horse-head'
  | 'plus'
  | 'user-group'
  | 'stethoscope'
  | 'star'
  | 'trophy';

type OwnershipTrackingProps = {
  onOpenHome?: () => void;
  onOpenSales?: () => void;
  onOpenShortlist?: () => void;
  onOpenActivity?: () => void;
  onOpenServicesHub?: () => void;
};

type HorseStatus = 'In Training' | 'Spelling' | 'Pre-Training';

type OwnedHorse = {
  lot: string;
  name: string;
  status: HorseStatus;
  statusTone: 'green' | 'blue' | 'gold';
  dotTone: 'green' | 'blue' | 'gold';
  trainer: string;
  location: string;
};

type Activity = {
  icon: IconName;
  tone: 'green' | 'gold' | 'blue';
  title: string;
  subtitle: string;
  time: string;
};

const horseHero = require('../../assets/black-horse.png') as ImageSourcePropType;

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
  blue: '#2f85d8',
};

const horses: OwnedHorse[] = [
  {
    lot: 'Lot 128',
    name: 'Snitzel x La Dorada',
    status: 'In Training',
    statusTone: 'green',
    dotTone: 'green',
    trainer: 'James Cummings',
    location: 'Randwick, NSW',
  },
  {
    lot: 'Lot 201',
    name: 'Written Tycoon x Jolie Bay',
    status: 'In Training',
    statusTone: 'green',
    dotTone: 'green',
    trainer: 'Ciaron Maher',
    location: 'Cranbourne, VIC',
  },
  {
    lot: 'Lot 152',
    name: 'I Am Invincible x Villa Verde',
    status: 'Pre-Training',
    statusTone: 'gold',
    dotTone: 'gold',
    trainer: 'Michael Freedman',
    location: 'Warwick Farm, NSW',
  },
  {
    lot: 'Lot 245',
    name: 'Exceed And Excel x La Luna Rossa',
    status: 'In Training',
    statusTone: 'green',
    dotTone: 'green',
    trainer: 'Tony Gollan',
    location: 'Eagle Farm, QLD',
  },
  {
    lot: 'Lot 302',
    name: 'Snitzel x Agua De Beber',
    status: 'Spelling',
    statusTone: 'blue',
    dotTone: 'blue',
    trainer: 'Chris Waller',
    location: 'Widden Valley, NSW',
  },
];

const activities: Activity[] = [
  {
    icon: 'stethoscope',
    tone: 'green',
    title: 'Vet report uploaded for Lot 128',
    subtitle: '12 May 2025 - Dr. Chris Bell',
    time: '2h ago',
  },
  {
    icon: 'chart-line',
    tone: 'gold',
    title: 'Trackwork logged for Lot 201',
    subtitle: '11 May 2025 - Cranbourne',
    time: '1d ago',
  },
  {
    icon: 'gavel',
    tone: 'blue',
    title: 'Weight entry for Lot 152',
    subtitle: '11 May 2025 - 482kg',
    time: '2d ago',
  },
];

export default function OwnershipTrackingScreen({
  onOpenHome,
  onOpenSales,
  onOpenShortlist,
  onOpenActivity,
  onOpenServicesHub,
}: OwnershipTrackingProps) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.header}>
          {/* <Pressable hitSlop={10} style={styles.headerButton}>
            <FontAwesome6
              name="arrow-left"
              iconStyle="solid"
              size={18}
              color={palette.goldBright}
            />
          </Pressable> */}
          <Text style={styles.headerTitle}>OWNERSHIP & TRACKING</Text>
          {/* <Pressable hitSlop={10} style={styles.headerButton}>
            <FontAwesome6
              name="plus"
              iconStyle="solid"
              size={18}
              color={palette.goldBright}
            />
          </Pressable> */}
        </View>

        <View style={styles.segmented}>
          <Pressable style={styles.segmentActive}>
            <Text style={styles.segmentTextActive}>My Horses (7)</Text>
          </Pressable>
          <Pressable style={styles.segment}>
            <Text style={styles.segmentText}>Ownerships (3)</Text>
          </Pressable>
          <Pressable style={styles.segment}>
            <Text style={styles.segmentText}>Sold (4)</Text>
          </Pressable>
        </View>

        <View style={styles.statsGrid}>
          <StatItem icon="horse-head" value="7" label="Total Horses" sublabel="In Your Care" />
          <StatItem icon="trophy" value="3" label="Active" sublabel="Ownerships" />
          <StatItem icon="chart-line" value="2" label="In Training" />
          <StatItem icon="gavel" value="4" label="Sold" sublabel="(Last 12m)" />
        </View>

        <SectionHeader title="MY HORSES" action="View All" />

        <View style={styles.horseList}>
          {horses.map(horse => (
            <HorseRow key={horse.lot} horse={horse} />
          ))}
        </View>

        <View style={styles.reportCard}>
          <View style={styles.reportIcon}>
            <FontAwesome6
              name="chart-simple"
              iconStyle="solid"
              size={18}
              color={palette.goldBright}
            />
          </View>
          <View style={styles.reportCopy}>
            <Text style={styles.reportTitle}>Track performance, health and value</Text>
            <Text style={styles.reportText}>All your horses, all in one place.</Text>
          </View>
          <Pressable style={styles.reportButton}>
            <FontAwesome6
              name="chart-line"
              iconStyle="solid"
              size={10}
              color={palette.goldBright}
            />
            <Text style={styles.reportButtonText}>View Reports</Text>
          </Pressable>
        </View>

        <SectionHeader title="RECENT ACTIVITY" action="View All" />

        <View style={styles.activityList}>
          {activities.map(activity => (
            <ActivityRow key={activity.title} activity={activity} />
          ))}
        </View>

        <Pressable
          onPress={onOpenServicesHub}
          style={styles.servicesHubButton}
          disabled={!onOpenServicesHub}>
          <View style={styles.servicesHubIcon}>
            <FontAwesome6
              name="user-group"
              iconStyle="solid"
              size={16}
              color={palette.goldBright}
            />
          </View>
          <View style={styles.servicesHubCopy}>
            <Text style={styles.servicesHubTitle}>Sale Team & Services Hub</Text>
            <Text style={styles.servicesHubText}>Manage your team and sale services.</Text>
          </View>
          <FontAwesome6
            name="chevron-right"
            iconStyle="solid"
            size={12}
            color={palette.goldBright}
          />
        </Pressable>
      </ScrollView>

      <BottomTabs
        onOpenHome={onOpenHome}
        onOpenSales={onOpenSales}
        onOpenShortlist={onOpenShortlist}
        onOpenActivity={onOpenActivity}
      />
    </SafeAreaView>
  );
}

function StatItem({
  icon,
  value,
  label,
  sublabel,
}: {
  icon: IconName;
  value: string;
  label: string;
  sublabel?: string;
}) {
  return (
    <View style={styles.statItem}>
      <FontAwesome6
        name={icon}
        iconStyle="solid"
        size={18}
        color={palette.goldBright}
      />
      <View style={styles.statCopy}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
        {sublabel ? <Text style={styles.statSublabel}>{sublabel}</Text> : null}
      </View>
    </View>
  );
}

function SectionHeader({ title, action }: { title: string; action: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Pressable hitSlop={8} style={styles.sectionAction}>
        <Text style={styles.sectionActionText}>{action}</Text>
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

function HorseRow({ horse }: { horse: OwnedHorse }) {
  return (
    <Pressable style={styles.horseRow}>
      <View style={[styles.statusDot, dotStyleByTone[horse.dotTone]]} />
      <Image source={horseHero} resizeMode="cover" style={styles.horseImage} />

      <View style={styles.horseMain}>
        <Text style={styles.horseLot}>{horse.lot}</Text>
        <Text numberOfLines={1} style={styles.horseName}>{horse.name}</Text>
        <View style={[styles.statusBadge, badgeStyleByTone[horse.statusTone]]}>
          <Text style={[styles.statusText, statusTextStyleByTone[horse.statusTone]]}>
            {horse.status}
          </Text>
        </View>
      </View>

      <View style={styles.horseMeta}>
        <Text style={styles.metaLabel}>Trainer</Text>
        <Text numberOfLines={1} style={styles.metaValue}>{horse.trainer}</Text>
        <Text style={styles.metaLabel}>Location</Text>
        <Text numberOfLines={1} style={styles.metaValue}>{horse.location}</Text>
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

function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <Pressable style={styles.activityRow}>
      <View style={[styles.activityIcon, activityIconStyleByTone[activity.tone]]}>
        <FontAwesome6
          name={activity.icon}
          iconStyle="solid"
          size={13}
          color={activityIconColorByTone[activity.tone]}
        />
      </View>
      <View style={styles.activityCopy}>
        <Text style={styles.activityTitle}>{activity.title}</Text>
        <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
      </View>
      <Text style={styles.activityTime}>{activity.time}</Text>
      <FontAwesome6
        name="chevron-right"
        iconStyle="solid"
        size={10}
        color={palette.goldBright}
      />
    </Pressable>
  );
}

function BottomTabs({
  onOpenHome,
  onOpenSales,
  onOpenShortlist,
  onOpenActivity,
}: OwnershipTrackingProps) {
  return (
    <View style={styles.tabBar}>
      <TabItem icon="house" label="Home" onPress={onOpenHome} />
      <TabItem icon="gavel" label="Sales" onPress={onOpenSales} />
      <TabItem icon="star" label="Shortlist" onPress={onOpenShortlist} />
      <TabItem icon="user-group" label="Team" onPress={onOpenActivity} />
      <TabItem icon="ellipsis" label="More" active />
    </View>
  );
}

function TabItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: IconName;
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

const dotStyleByTone = {
  green: { backgroundColor: palette.green },
  blue: { backgroundColor: palette.blue },
  gold: { backgroundColor: palette.goldBright },
};

const badgeStyleByTone = {
  green: {
    backgroundColor: '#07140b',
    borderColor: '#205728',
  },
  blue: {
    backgroundColor: '#07101d',
    borderColor: '#1f4772',
  },
  gold: {
    backgroundColor: '#100d07',
    borderColor: '#664318',
  },
};

const statusTextStyleByTone = {
  green: { color: palette.green },
  blue: { color: '#66a8ee' },
  gold: { color: palette.goldBright },
};

const activityIconStyleByTone = {
  green: {
    borderColor: '#205728',
    backgroundColor: '#07140b',
  },
  gold: {
    borderColor: '#664318',
    backgroundColor: '#100d07',
  },
  blue: {
    borderColor: '#1f4772',
    backgroundColor: '#07101d',
  },
};

const activityIconColorByTone = {
  green: palette.green,
  gold: palette.goldBright,
  blue: palette.blue,
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.black,
  },

  content: {
    paddingHorizontal: 13,
    paddingBottom: 96,
  },

  header: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerButton: {
    width: 31,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
  color: palette.white,
  fontSize: 16,
  fontWeight: '500',
  letterSpacing: 0,
  textAlign: 'center',
  flex: 1,
},

  segmented: {
    height: 30,
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#05070a',
    overflow: 'hidden',
    marginBottom: 9,
  },

  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  segmentActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: palette.gold,
  },

  segmentText: {
    color: palette.muted,
    fontSize: 10,
    fontWeight: '600',
  },

  segmentTextActive: {
    color: palette.black,
    fontSize: 10,
    fontWeight: '800',
  },

  statsGrid: {
    minHeight: 78,
    flexDirection: 'row',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.panel,
    marginBottom: 10,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: palette.borderSoft,
    gap: 4,
  },

  statCopy: {
    alignItems: 'center',
  },

  statValue: {
    color: palette.white,
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '500',
  },

  statLabel: {
    color: palette.white,
    fontSize: 9,
    marginTop: 4,
  },

  statSublabel: {
    color: palette.muted,
    fontSize: 8,
    marginTop: 2,
  },

  sectionHeader: {
    minHeight: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '900',
  },

  sectionAction: {
    minHeight: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  sectionActionText: {
    color: palette.goldBright,
    fontSize: 9,
    fontWeight: '600',
  },

  horseList: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    backgroundColor: palette.panel,
    overflow: 'hidden',
    marginBottom: 9,
  },

  horseRow: {
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: palette.borderSoft,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 8,
  },

  statusDot: {
    position: 'absolute',
    left: 8,
    top: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    zIndex: 2,
  },

  horseImage: {
    width: 58,
    height: 61,
    borderRadius: 5,
    backgroundColor: palette.panelSoft,
  },

  horseMain: {
    flex: 1,
    justifyContent: 'center',
  },

  horseLot: {
    color: palette.white,
    fontSize: 15,
    fontWeight: '500',
  },

  horseName: {
    color: palette.white,
    fontSize: 9,
    marginTop: 4,
  },

  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginTop: 7,
  },

  statusText: {
    fontSize: 8,
    fontWeight: '800',
  },

  horseMeta: {
    width: 95,
    justifyContent: 'center',
  },

  metaLabel: {
    color: palette.muted,
    fontSize: 8,
    marginTop: 3,
  },

  metaValue: {
    color: palette.white,
    fontSize: 8,
    fontWeight: '600',
    marginTop: 2,
  },

  reportCard: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.gold,
    backgroundColor: '#070604',
    paddingHorizontal: 11,
    gap: 9,
    marginBottom: 10,
  },

  reportIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },

  reportCopy: {
    flex: 1,
  },

  reportTitle: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '800',
  },

  reportText: {
    color: palette.white,
    fontSize: 8,
    marginTop: 4,
  },

  reportButton: {
    height: 26,
    minWidth: 91,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.gold,
    paddingHorizontal: 8,
  },

  reportButtonText: {
    color: palette.goldBright,
    fontSize: 8,
    fontWeight: '800',
  },

  activityList: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    backgroundColor: palette.panel,
    overflow: 'hidden',
    marginBottom: 11,
  },

  activityRow: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: palette.borderSoft,
    paddingHorizontal: 11,
    gap: 8,
  },

  activityIcon: {
    width: 27,
    height: 27,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activityCopy: {
    flex: 1,
  },

  activityTitle: {
    color: palette.white,
    fontSize: 10,
    fontWeight: '600',
  },

  activitySubtitle: {
    color: palette.muted,
    fontSize: 8,
    marginTop: 3,
  },

  activityTime: {
    color: palette.muted,
    fontSize: 8,
    width: 37,
    textAlign: 'right',
  },

  servicesHubButton: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.gold,
    backgroundColor: '#070604',
    paddingHorizontal: 11,
    gap: 10,
  },

  servicesHubIcon: {
    width: 33,
    height: 33,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: palette.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },

  servicesHubCopy: {
    flex: 1,
  },

  servicesHubTitle: {
    color: palette.goldBright,
    fontSize: 11,
    fontWeight: '800',
  },

  servicesHubText: {
    color: palette.white,
    fontSize: 8,
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
