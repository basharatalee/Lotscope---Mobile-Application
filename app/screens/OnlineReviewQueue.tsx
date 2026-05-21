import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

const palette = {
  black: '#020406',
  panel: '#070a0f',
  border: '#151820',
  borderSoft: '#202127',
  goldBright: '#f0c66b',
  white: '#f8f2e8',
  muted: '#a9adb7',
  mutedDark: '#6f7581',
};

const horseImg = require('../../assets/black-horse.png');

type TabIconName = 'house' | 'gavel' | 'star' | 'chart-simple' | 'user-group' | 'ellipsis';

const items = [
  { lot: 'Lot 302', type: 'Br. Colt', pedigree: 'Snitzel x Agua De Beber', badge: 'Vendor Update', time: '2d 14h' },
  { lot: 'Lot 415', type: 'Br. Filly', pedigree: 'So You Think x Miss Interiors', badge: 'Awaiting Video', time: '1d 4h' },
  { lot: 'Lot 521', type: 'Br. Colt', pedigree: 'Wootton Bassett x Laarna', badge: 'Needs Review', time: '5d 2h' },
  { lot: 'Lot 607', type: 'Ch. Filly', pedigree: 'Zoustar x Diamond Wrist', badge: 'Awaiting Vet', time: '3d 10h' },
  { lot: 'Lot 710', type: 'Ch. Filly', pedigree: 'Capitalist x Pretty Amazing', badge: 'New Video', time: '2d 4h' },
];

export default function OnlineReviewQueue({
  onBack,
  onOpenHome,
  onOpenSales,
  onOpenShortlist,
  onOpenActivity,
  onOpenMore,
}: {
  onBack?: () => void;
  onOpenHome?: () => void;
  onOpenSales?: () => void;
  onOpenShortlist?: () => void;
  onOpenActivity?: () => void;
  onOpenMore?: () => void;
}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable style={styles.headerButton} onPress={onBack}>
          <FontAwesome6 name="arrow-left" iconStyle="solid" size={18} color={palette.white} />
        </Pressable>
        <Text style={styles.headerTitle}>ONLINE REVIEW QUEUE</Text>
        <Pressable style={styles.headerButton} onPress={onOpenMore}>
          <FontAwesome6 name="magnifying-glass" iconStyle="solid" size={18} color={palette.white} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.infoCard}>
          <View style={styles.infoTextGroup}>
            <Text style={styles.infoCardTitle}>23 lots to review online</Text>
            <Text style={styles.infoCardSub}>Add notes, watch videos and request inspections.</Text>
          </View>
          <Pressable style={styles.sortButton} onPress={onOpenMore}>
            <Text style={styles.sortButtonText}>Sort</Text>
          </Pressable>
        </View>

        <View style={styles.segmentRow}>
          <View style={styles.activeSegment}>
            <Text style={styles.activeSegmentText}>To Review (23)</Text>
          </View>
          <Pressable style={styles.segment}>
            <Text style={styles.segmentText}>Reviewed (14)</Text>
          </Pressable>
        </View>

        {items.map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={horseImg} style={styles.thumb} />
            <View style={styles.cardBody}>
              <Text style={styles.lot}>{item.lot}</Text>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.pedigree}>{item.pedigree}</Text>
              <View style={styles.cardFooter}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>
            <View style={styles.starIcon}>
              <FontAwesome6 name="star" iconStyle="solid" size={14} color={palette.goldBright} />
            </View>
          </View>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.bottomTabsWrapper}>
        <BottomTabs
          active="Team"
          onOpenHome={onOpenHome}
          onOpenSales={onOpenSales}
          onOpenShortlist={onOpenShortlist}
          onOpenActivity={onOpenActivity}
          onOpenMore={onOpenMore}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: palette.black },
  headerRow: { height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  headerButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: palette.white, fontSize: 14, letterSpacing: 1, fontWeight: '700' },
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 },
  infoCard: { backgroundColor: palette.panel, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: palette.border, marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  infoTextGroup: { flex: 1, paddingRight: 12 },
  infoCardTitle: { color: palette.white, fontSize: 16, fontWeight: '700', marginBottom: 6 },
  infoCardSub: { color: palette.muted, fontSize: 12, lineHeight: 18 },
  sortButton: { backgroundColor: '#1a1610', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: palette.borderSoft },
  sortButtonText: { color: palette.goldBright, fontWeight: '700', fontSize: 12 },
  segmentRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  segment: { flex: 1, borderWidth: 1, borderColor: palette.border, borderRadius: 18, paddingVertical: 10, alignItems: 'center' },
  activeSegment: { flex: 1, borderRadius: 18, paddingVertical: 10, alignItems: 'center', backgroundColor: palette.goldBright },
  activeSegmentText: { color: palette.black, fontWeight: '700', fontSize: 12 },
  segmentText: { color: palette.white, fontSize: 12, fontWeight: '600' },
  card: { flexDirection: 'row', backgroundColor: palette.panel, borderRadius: 16, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: palette.border, overflow: 'hidden' },
  thumb: { width: 72, height: 72, borderRadius: 14, marginRight: 12 },
  cardBody: { flex: 1, justifyContent: 'space-between' },
  lot: { color: palette.white, fontSize: 15, fontWeight: '700' },
  type: { color: palette.muted, marginTop: 4, fontSize: 12 },
  pedigree: { color: palette.muted, marginTop: 6, fontSize: 12, lineHeight: 16 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between' },
  badge: { backgroundColor: '#1f1a14', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14 },
  badgeText: { color: palette.goldBright, fontSize: 10, fontWeight: '700' },
  timeText: { color: palette.muted, fontSize: 10 },
  starIcon: { position: 'absolute', top: 12, right: 12, width: 28, height: 28, borderRadius: 14, backgroundColor: '#0b0e13', alignItems: 'center', justifyContent: 'center' },
  bottomTabsWrapper: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  bottomTab: { flexDirection: 'row', height: 76, borderTopWidth: 1, borderTopColor: palette.border, backgroundColor: '#030507', alignItems: 'center', justifyContent: 'space-around' },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 },
  tabItemText: { color: palette.mutedDark, fontSize: 10, fontWeight: '700' },
  tabItemTextActive: { color: palette.goldBright },
});

function BottomTabs({
  active,
  onOpenHome,
  onOpenSales,
  onOpenShortlist,
  onOpenActivity,
  onOpenMore,
}: {
  active?: string;
  onOpenHome?: () => void;
  onOpenSales?: () => void;
  onOpenShortlist?: () => void;
  onOpenActivity?: () => void;
  onOpenMore?: () => void;
}) {
  return (
    <View style={styles.bottomTab}>
      <TabItem icon="house" label="Home" active={active === 'Home'} onPress={onOpenHome} />
      <TabItem icon="gavel" label="Catalogue" active={active === 'Sales'} onPress={onOpenSales} />
      <TabItem icon="star" label="Shortlist" active={active === 'Shortlist'} onPress={onOpenShortlist} />
      <TabItem icon="user-group" label="Team" active={active === 'Team'} onPress={onOpenActivity} />
      <TabItem icon="ellipsis" label="More" active={active === 'More'} onPress={onOpenMore} />
    </View>
  );
}

function TabItem({ icon, label, active, onPress }: { icon: TabIconName; label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable style={styles.tabItem} onPress={onPress} disabled={!onPress}>
      <FontAwesome6 name={icon} iconStyle="solid" size={18} color={active ? palette.goldBright : palette.mutedDark} />
      <Text style={[styles.tabItemText, active ? styles.tabItemTextActive : null]}>{label}</Text>
    </Pressable>
  );
}
