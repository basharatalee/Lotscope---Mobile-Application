import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable } from 'react-native';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';





export default function LiveInspectionQueue({ onBack, onOpenHome, onOpenSales, onOpenShortlist, onOpenActivity, onOpenMore }: { onBack?: () => void; onOpenHome?: () => void; onOpenSales?: () => void; onOpenShortlist?: () => void; onOpenActivity?: () => void; onOpenMore?: () => void; }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>LIVE INSPECTION QUEUE</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.hello}>Hello World</Text>
      </View>

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

      <View style={styles.footer}>
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020406' },
  header: { height: 64, alignItems: 'center', justifyContent: 'center' },
  title: { color: '#f8f2e8', fontSize: 16, letterSpacing: 1 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hello: { color: '#f8f2e8', fontSize: 20 },
  footer: { padding: 16, alignItems: 'center' },
  backBtn: { backgroundColor: '#1f1a14', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 },
  backText: { color: '#f0c66b', fontWeight: '700' },
  bottomTabsWrapper: { position: 'absolute', left: 0, right: 0, bottom: 72 },
  bottomTab: { flexDirection: 'row', height: 64, borderTopWidth: 1, borderTopColor: '#151820', backgroundColor: '#070a0f', alignItems: 'center', justifyContent: 'space-around' },
  tabItem: { alignItems: 'center' },
  tabItemText: { color: '#6f7581', fontSize: 11, marginTop: 4 },
  tabItemTextActive: { color: '#f0c66b' },
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
      <TabItem icon="user-group" label="Team" active={active === 'Team'} onPress={onOpenActivity} />
      <TabItem icon="ellipsis" label="More" active={active === 'More'} onPress={onOpenMore} />
    </View>
  );
}

function TabItem({ icon, label, active, onPress }: { icon: string; label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable style={styles.tabItem} onPress={onPress} disabled={!onPress}>
      <Text style={[styles.tabItemText, active ? styles.tabItemTextActive : null]}>{label}</Text>
    </Pressable>
  );
}
