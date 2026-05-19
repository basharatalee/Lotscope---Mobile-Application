import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';


const palette = {
  black: '#020406',
  panel: '#070a0f',
  border: '#202127',
  borderSoft: '#151820',
  goldBright: '#f0c66b',
  white: '#f8f2e8',
  muted: '#a9adb7',
  mutedDark: '#6f7581',
  green: '#48b85d',
};

const horseImg = require('../../assets/black-horse.png');

type TabIconName = 'house' | 'gavel' | 'star' | 'chart-simple' | 'ellipsis';

export default function ActivityScreen({
  onOpenLiveInspection,
  onOpenHome,
  onOpenSales,
  onOpenShortlist,
  onOpenMore,
}: {
  onOpenLiveInspection?: () => void;
  onOpenHome?: () => void;
  onOpenSales?: () => void;
  onOpenShortlist?: () => void;
  onOpenMore?: () => void;
}) {
  const items = [
    { lot: 'Lot 128', pedigree: 'Snitzel x La Dorada', tag: 'Top Opportunity' },
    { lot: 'Lot 152', pedigree: 'I Am Invincible x Villa Verde', tag: 'Strong Value' },
    { lot: 'Lot 178', pedigree: 'Too Darn Hot x Global Choice', tag: 'Value' },
    { lot: 'Lot 201', pedigree: 'Written Tycoon x Jolie Bay', tag: 'Value' },
    { lot: 'Lot 245', pedigree: 'Exceed And Excel x La Luna Rossa', tag: 'Consider' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>LIVE INSPECTION QUEUE</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.segmentRow}>
          <View style={styles.activeSeg}>
            <Text style={styles.activeSegText}>To Inspect (16)</Text>
          </View>
          <Text style={styles.segText}>Inspected (12)</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>You have 16 lots to inspect</Text>
          <Text style={styles.infoSub}>Drag to reorder your inspection priority</Text>
        </View>

        {items.map((it, idx) => (
          <View key={idx} style={styles.card}>
            <Image source={horseImg} style={styles.thumb} />
            <View style={styles.cardBody}>
              <Text style={styles.lot}>{it.lot}</Text>
              <Text style={styles.type}>Br. Colt</Text>
              <Text style={styles.pedigree}>{it.pedigree}</Text>
              <View style={styles.tagBox}>
                <Text style={styles.tagText}>{it.tag}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      

      <View style={styles.bottomTabsWrapper}>
        <BottomTabs
          active="Activity"
          onOpenHome={onOpenHome}
          onOpenSales={onOpenSales}
          onOpenShortlist={onOpenShortlist}
          onOpenActivity={onOpenLiveInspection}
          onOpenMore={onOpenMore}
        />
      </View>

      <View style={styles.bottomBar}>
        <Pressable style={styles.queueButton} onPress={onOpenLiveInspection}>
          <Text style={styles.queueText}>Online Review Queue</Text>
        </Pressable>
      </View>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020406' },
  header: { height: 64, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { color: '#f8f2e8', fontSize: 16, letterSpacing: 1 },
  content: { paddingHorizontal: 14, paddingTop: 8, paddingBottom: 16 },
  segmentRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  activeSeg: { backgroundColor: '#d6a247', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 18 },
  activeSegText: { color: '#020406', fontWeight: '600' },
  segText: { color: '#f8f2e8', paddingVertical: 8, paddingHorizontal: 8 },
  infoBox: { borderWidth: 1, borderColor: '#202127', padding: 12, borderRadius: 8, marginBottom: 12 },
  infoText: { color: '#f8f2e8', fontWeight: '600' },
  infoSub: { color: '#a9adb7', marginTop: 4 },
  card: { flexDirection: 'row', backgroundColor: '#0b0e13', borderRadius: 8, padding: 8, marginBottom: 12, alignItems: 'center' },
  thumb: { width: 64, height: 64, borderRadius: 6, marginRight: 12 },
  cardBody: { flex: 1 },
  lot: { color: '#f8f2e8', fontSize: 16, fontWeight: '600' },
  type: { color: '#a9adb7', marginTop: 2 },
  pedigree: { color: '#a9adb7', marginTop: 2 },
  tagBox: { marginTop: 6, alignSelf: 'flex-start', backgroundColor: '#10321a', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tagText: { color: '#84c884', fontSize: 12 },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 100, alignItems: 'center' },
  queueButton: { backgroundColor: '#1f1a14', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, borderWidth: 1, borderColor: '#3b2b18' },
  queueText: { color: '#f0c66b', fontWeight: '700' },





bottomTabsWrapper: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: -10,
},

  bottomTab: {
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

  tabItemText: {
    color: palette.mutedDark,
    fontSize: 9,
    fontWeight: '700',
  },

  tabItemTextActive: {
    color: palette.goldBright,
  },

  tabDot: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: palette.goldBright,
  },

  homeIndicator: {
    display: 'none',
  },
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
      <TabItem icon="gavel" label="Sales" active={active === 'Sales'} onPress={onOpenSales} />
      <TabItem icon="star" label="Shortlist" active={active === 'Shortlist'} onPress={onOpenShortlist} />
      <TabItem icon="chart-simple" label="Activity" active={active === 'Activity'} onPress={onOpenActivity} />
      <TabItem icon="ellipsis" label="More" active={active === 'More'} onPress={onOpenMore} />
    </View>
  );
}

function TabItem({ icon, label, active, onPress }: { icon: TabIconName; label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable style={styles.tabItem} onPress={onPress} disabled={!onPress}>
      <FontAwesome6
        name={icon}
        iconStyle="solid"
        size={18}
        color={active ? palette.goldBright : palette.mutedDark}
      />
      <Text style={[styles.tabItemText, active ? styles.tabItemTextActive : null]}>{label}</Text>
    </Pressable>
  );
}
