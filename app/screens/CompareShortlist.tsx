// // CompareShortlist.tsx

// import React from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from 'react-native';

// const horses = [
//   {
//     lot: 'Lot 128',
//     name: 'Snitzel x\nLa Dorada',
//     badge: 'Top Opportunity',
//     badgeColor: '#1B5E20',
//     athleticism: '8/10',
//     scope: '8/10',
//     confirmation: '8/10',
//     location: 'Magic Millions\nGold Coast 2025',
//     estimate: '$120k - $150k',
//   },
//   {
//     lot: 'Lot 152',
//     name: 'I Am Invincible x\nVilla Verde',
//     badge: 'Strong Value',
//     badgeColor: '#145A32',
//     athleticism: '7/10',
//     scope: '8/10',
//     confirmation: '8/10',
//     location: 'Inglis Classic\nSydney 2025',
//     estimate: '$200k - $300k',
//   },
//   {
//     lot: 'Lot 201',
//     name: 'Written Tycoon x\nJolie Bay',
//     badge: 'Strong Racehorse',
//     badgeColor: '#1B5E20',
//     athleticism: '8/10',
//     scope: '8/10',
//     confirmation: '8/10',
//     location: 'Magic Millions\nMelbourne 2025',
//     estimate: '$350k - $450k',
//   },
// ];

// const leftLabels = [
//   'Buyer\nOpportunity',
//   'Racing\nStyle',
//   'Athleticism',
//   'Scope',
//   'Conformation',
//   'Sale\nLocation',
//   'Vendor\nEstimate',
//   'Vet Report',
//   'Scope',
//   'Video',
//   'Notes',
// ];

// export default function CompareShortlist() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.back}>{'‹'}</Text>

//         <Text style={styles.headerTitle}>COMPARE</Text>

//         <Text style={styles.edit}>Edit</Text>
//       </View>

//       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//         <View style={styles.compareWrapper}>
//           {/* Left Labels */}
//           <View style={styles.leftColumn}>
//             <View style={styles.emptyTop}>
//               <Text style={styles.leftLot}>Lot</Text>
//             </View>

//             {leftLabels.map((item, index) => (
//               <View key={index} style={styles.labelCell}>
//                 <Text style={styles.labelText}>{item}</Text>
//               </View>
//             ))}
//           </View>

//           {/* Horse Columns */}
//           {horses.map((horse, index) => (
//             <View key={index} style={styles.column}>
//               <View style={styles.topCard}>
//                 <View style={styles.lotRow}>
//                   <Text style={styles.lotText}>{horse.lot}</Text>

//                   <TouchableOpacity style={styles.closeBtn}>
//                     <Text style={styles.closeText}>×</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <Image
//                   source={{
//                     uri: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800',
//                   }}
//                   style={styles.horseImage}
//                 />

//                 <Text style={styles.horseName}>{horse.name}</Text>

//                 <View
//                   style={[
//                     styles.badge,
//                     { backgroundColor: horse.badgeColor },
//                   ]}>
//                   <Text style={styles.badgeText}>{horse.badge}</Text>
//                 </View>
//               </View>

//               <View style={styles.valueCell}>
//                 <Text style={styles.valueText}>Early Runner</Text>
//               </View>

//               <View style={styles.valueCell}>
//                 <Text style={styles.valueText}>
//                   {horse.athleticism}
//                 </Text>
//               </View>

//               <View style={styles.valueCell}>
//                 <Text style={styles.valueText}>{horse.scope}</Text>
//               </View>

//               <View style={styles.valueCell}>
//                 <Text style={styles.valueText}>
//                   {horse.confirmation}
//                 </Text>
//               </View>

//               <View style={styles.valueCell}>
//                 <Text style={styles.valueText}>{horse.location}</Text>
//               </View>

//               <View style={styles.valueCell}>
//                 <Text style={styles.priceText}>
//                   {horse.estimate}
//                 </Text>
//               </View>

//               <View style={styles.iconCell}>
//                 <FontAwesome6`r`n                  name="circle-check"`r`n                  iconStyle="solid"`r`n                  size={16}`r`n                  color="#20C05C"`r`n                />
//               </View>

//               <View style={styles.iconCell}>
//                 <FontAwesome6`r`n                  name="circle-check"`r`n                  iconStyle="solid"`r`n                  size={16}`r`n                  color="#20C05C"`r`n                />
//               </View>

//               <View style={styles.iconCell}>
//                 <View style={styles.squareIcon}>`r`n                  <FontAwesome6`r`n                    name="play"`r`n                    iconStyle="solid"`r`n                    size={11}`r`n                    color={GOLD}`r`n                  />`r`n                </View>
//               </View>

//               <View style={styles.iconCell}>
//                 <View style={styles.squareIcon}>`r`n                  <FontAwesome6`r`n                    name="pen"`r`n                    iconStyle="solid"`r`n                    size={11}`r`n                    color={GOLD}`r`n                  />`r`n                </View>
//               </View>
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//       <View style={styles.infoBox}>
//         <Text style={styles.infoIcon}>◍◍</Text>

//         <View style={{ flex: 1 }}>
//           <Text style={styles.infoTitle}>
//             Use Compare to find the best horse for the best price.
//           </Text>

//           <Text style={styles.infoSubtitle}>
//             Not the most expensive horse.
//           </Text>
//         </View>
//       </View>

//       <TouchableOpacity style={styles.bottomButton}>
//         <Text style={styles.bottomButtonText}>
//           Compare Shortlisted Lots
//         </Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const BORDER = '#1E1E1E';
// const GOLD = '#C8923B';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },

//   header: {
//     height: 60,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//   },

//   back: {
//     color: GOLD,
//     fontSize: 26,
//   },

//   headerTitle: {
//     color: '#fff',
//     fontSize: 18,
//     letterSpacing: 1,
//   },

//   edit: {
//     color: GOLD,
//     fontSize: 14,
//   },

//   compareWrapper: {
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     paddingBottom: 20,
//   },

//   leftColumn: {
//     width: 82,
//   },

//   emptyTop: {
//     height: 180,
//     borderWidth: 1,
//     borderColor: BORDER,
//     justifyContent: 'flex-start',
//     padding: 8,
//   },

//   leftLot: {
//     color: GOLD,
//     fontSize: 12,
//   },

//   labelCell: {
//     height: 52,
//     borderWidth: 1,
//     borderColor: BORDER,
//     justifyContent: 'center',
//     paddingHorizontal: 6,
//   },

//   labelText: {
//     color: GOLD,
//     fontSize: 11,
//     lineHeight: 15,
//   },

//   column: {
//     width: 130,
//   },

//   topCard: {
//     height: 180,
//     borderWidth: 1,
//     borderColor: BORDER,
//     alignItems: 'center',
//     padding: 8,
//   },

//   lotRow: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 6,
//   },

//   lotText: {
//     color: GOLD,
//     fontWeight: '700',
//     fontSize: 13,
//   },

//   closeBtn: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     borderWidth: 1,
//     borderColor: '#555',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   closeText: {
//     color: '#999',
//     fontSize: 10,
//   },

//   horseImage: {
//     width: 78,
//     height: 78,
//     borderRadius: 4,
//     marginBottom: 6,
//   },

//   horseName: {
//     color: '#fff',
//     fontSize: 11,
//     textAlign: 'center',
//     lineHeight: 15,
//   },

//   badge: {
//     marginTop: 8,
//     borderRadius: 4,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//   },

//   badgeText: {
//     color: '#fff',
//     fontSize: 10,
//   },

//   valueCell: {
//     height: 52,
//     borderWidth: 1,
//     borderColor: BORDER,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 4,
//   },

//   valueText: {
//     color: '#ddd',
//     fontSize: 11,
//     textAlign: 'center',
//     lineHeight: 15,
//   },

//   priceText: {
//     color: GOLD,
//     fontSize: 11,
//     textAlign: 'center',
//   },

//   iconCell: {
//     height: 52,
//     borderWidth: 1,
//     borderColor: BORDER,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   greenIcon: {
//     color: '#20C05C',
//     fontSize: 16,
//   },

//   videoIcon: {
//     color: GOLD,
//     fontSize: 18,
//   },

//   noteIcon: {
//     color: GOLD,
//     fontSize: 16,
//   },

//   infoBox: {
//     marginHorizontal: 10,
//     borderWidth: 1,
//     borderColor: GOLD,
//     borderRadius: 10,
//     flexDirection: 'row',
//     padding: 12,
//     alignItems: 'center',
//     marginBottom: 14,
//   },

//   infoIcon: {
//     color: GOLD,
//     marginRight: 12,
//     fontSize: 18,
//   },

//   infoTitle: {
//     color: GOLD,
//     fontSize: 12,
//     marginBottom: 4,
//   },

//   infoSubtitle: {
//     color: '#B8B8B8',
//     fontSize: 11,
//   },

//   bottomButton: {
//     marginHorizontal: 10,
//     marginBottom: 16,
//     backgroundColor: GOLD,
//     borderRadius: 6,
//     paddingVertical: 14,
//     alignItems: 'center',
//   },

//   bottomButtonText: {
//     color: '#000',
//     fontWeight: '600',
//     fontSize: 14,
//   },
// });
























// CompareShortlist.tsx

import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {
  SouthportTycoonAnalysis,
  getEnrichedBroodmareCatalogue,
} from '../data/southportTycoonAnalysis';
import { getLotNote, subscribeToLotNotes } from '../data/lotNotesStore';

type NavProps = {
  onOpenHome?: () => void;
  onOpenSales?: () => void;
  onOpenShortlist?: () => void;
  onOpenActivity?: () => void;
  onOpenMore?: () => void;
  analysisRows?: SouthportTycoonAnalysis[];
};

type IconName =
  | 'house'
  | 'gavel'
  | 'star'
  | 'chart-simple'
  | 'user-group'
  | 'ellipsis';

// const horses = [
//   {
//     lot: 'Lot 128',
//     name: 'Snitzel x\nLa Dorada',
//     badge: 'Top Opportunity',
//     badgeColor: '#1B5E20',
//     athleticism: '8/10',
//     scope: '8/10',
//     confirmation: '8/10',
//     location: 'Magic Millions\nGold Coast 2025',
//     estimate: '$120k - $150k',
//   },
//   {
//     lot: 'Lot 152',
//     name: 'I Am Invincible x\nVilla Verde',
//     badge: 'Strong Value',
//     badgeColor: '#145A32',
//     athleticism: '7/10',
//     scope: '8/10',
//     confirmation: '8/10',
//     location: 'Inglis Classic\nSydney 2025',
//     estimate: '$200k - $300k',
//   },
//   {
//     lot: 'Lot 201',
//     name: 'Written Tycoon x\nJolie Bay',
//     badge: 'Strong Racehorse',
//     badgeColor: '#1B5E20',
//     athleticism: '8/10',
//     scope: '8/10',
//     confirmation: '8/10',
//     location: 'Magic Millions\nMelbourne 2025',
//     estimate: '$350k - $450k',
//   },
// ];








































function buildCompareHorses(analysisRows?: SouthportTycoonAnalysis[]) {
  return getEnrichedBroodmareCatalogue(analysisRows)
    .filter(lot => lot.analysis)
    .sort((a, b) => (b.analysis?.rankingScore ?? 0) - (a.analysis?.rankingScore ?? 0))
    .slice(0, 3)
    .map(lot => ({
    lot: `Lot ${lot.lotNumber}`,
    name: `${lot.mareName}\n${lot.sire}`,
    badge: lot.analysis?.verdict ?? 'Watch',
    badgeColor: lot.analysis?.verdict === 'Top Pick' ? '#1B5E20' : '#145A32',
    racingStyle: lot.analysis?.grade ?? lot.analysis?.commercialRating ?? `${lot.analysis?.matchRating ?? 0}% Match`,
    athleticism: `${lot.analysis?.pedigreeStrength ?? 0}`,
    age: `${lot.age}yo`,
    vendor: lot.vendor,
    dosage: lot.analysis?.dosageProfile ?? '',
    buyerNotes: getLotNote(lot.lotNumber) || lot.analysis?.buyerNotes || '',
    commercial: lot.analysis?.commercialRating ?? '',
    location: 'Magic Millions\nBroodmare Sale',
    vetReport: true,
    scopeReport: true,
    video: true,
    notes: true,
  }));
}

















const leftLabels = [
  'Grade',
  'Pedigree\nStrength',
  'Age',
  'Vendor',
  'Dosage\nProfile',
  'Buyer\nNotes',
  'Commercial\nRating',
  'Sale\nLocation',
  'Vet Report',
  'Scope',
  'Video',
  'Notes',
];

export default function CompareShortlist({
  onOpenHome,
  onOpenSales,
  onOpenShortlist,
  onOpenActivity,
  onOpenMore,
  analysisRows,
}: NavProps) {
  const [notesVersion, setNotesVersion] = useState(0);

  useEffect(
    () => subscribeToLotNotes(() => setNotesVersion(version => version + 1)),
    [],
  );

  const horses = useMemo(
    () => buildCompareHorses(analysisRows),
    [analysisRows, notesVersion],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onOpenShortlist}>
          <FontAwesome6
            name="arrow-left"
            iconStyle="solid"
            size={22}
            color={GOLD}
          />
        </Pressable>

        <Text style={styles.headerTitle}>COMPARE</Text>

        <Text style={styles.edit}>Edit</Text>
      </View>
<ScrollView>
      <ScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.compareWrapper}>
          {/* Left Labels */}
          <View style={styles.leftColumn}>
            <View style={styles.emptyTop}>
              <Text style={styles.leftLot}>Lot</Text>
            </View>

            {leftLabels.map((item, index) => (
              <View key={index} style={styles.labelCell}>
                <Text style={styles.labelText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Horse Columns */}
          {horses.map((horse, index) => (
            <View key={index} style={styles.column}>
              <View style={styles.topCard}>
                <View style={styles.lotRow}>
                  <Text style={styles.lotText}>{horse.lot}</Text>

                  <TouchableOpacity style={styles.closeBtn}>
                    <Text style={styles.closeText}>×</Text>
                  </TouchableOpacity>
                </View>

                <Image
                  source={require('../../assets/herolot.jpg')}
                  style={styles.horseImage}
                />

                <Text style={styles.horseName}>{horse.name}</Text>

                <View
                  style={[
                    styles.badge,
                    { backgroundColor: horse.badgeColor },
                  ]}>
                  <Text style={styles.badgeText}>{horse.badge}</Text>
                </View>
              </View>

              {/* <View style={styles.valueCell}>
                <Text style={styles.valueText}>Early Runner</Text>
              </View> */}

















              <View style={styles.valueCell}>
                <Text style={styles.valueText}>{horse.racingStyle}</Text>
              </View>

              <View style={styles.valueCell}>
                <Text style={styles.valueText}>
                  {horse.athleticism}
                </Text>
              </View>

              <View style={styles.valueCell}>
                <Text style={styles.valueText}>{horse.age}</Text>
              </View>

              <View style={styles.valueCell}>
                <Text style={styles.valueText}>{horse.vendor}</Text>
              </View>

              <View style={styles.valueCell}>
                <Text style={styles.valueText}>{horse.dosage}</Text>
              </View>

              <View style={styles.valueCell}>
                <Text style={styles.valueText}>{horse.buyerNotes}</Text>
              </View>

              <View style={styles.valueCell}>
                <Text style={styles.priceText}>{horse.commercial}</Text>
              </View>

              <View style={styles.valueCell}>
                <Text style={styles.valueText}>{horse.location}</Text>
              </View>

              <View style={styles.iconCell}>
                <FontAwesome6
                  name="circle-check"
                  iconStyle="solid"
                  size={16}
                  color="#20C05C"
                />
              </View>

              <View style={styles.iconCell}>
                <FontAwesome6
                  name="circle-check"
                  iconStyle="solid"
                  size={16}
                  color="#20C05C"
                />
              </View>

              <View style={styles.iconCell}>
                <View style={styles.squareIcon}>
                  <FontAwesome6
                    name="play"
                    iconStyle="solid"
                    size={11}
                    color={GOLD}
                  />
                </View>
              </View>

              <View style={styles.iconCell}>
                <View style={styles.squareIcon}>
                  <FontAwesome6
                    name="pen"
                    iconStyle="solid"
                    size={11}
                    color={GOLD}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
        

        
      </ScrollView>
      <Pressable style={styles.bottomButton}>
        <View style={styles.bottomButtonInner}>
          <FontAwesome6
            name="chart-simple"
            iconStyle="solid"
            size={16}
            color="#000"
          />
          <Text style={styles.bottomButtonText}>
            Compare Shortlisted Lots
          </Text>
        </View>
      </Pressable>
      </ScrollView>

      {/* <View style={styles.infoBox}>
        <FontAwesome6
          name="chart-simple"
          iconStyle="solid"
          size={16}
          color={GOLD}
          style={styles.infoIcon}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>
            Use Compare to find the best horse for the best
            price.
          </Text>

          <Text style={styles.infoSubtitle}>
            Not the most expensive horse.
          </Text>
        </View>
      </View> */}

      {/* <Pressable style={styles.bottomButton}>
        <View style={styles.bottomButtonInner}>
          <FontAwesome6
            name="chart-simple"
            iconStyle="solid"
            size={16}
            color="#000"
          />
          <Text style={styles.bottomButtonText}>
            Compare Shortlisted Lots
          </Text>
        </View>
      </Pressable> */}

      <BottomTabs
        active="Shortlist"
        onOpenHome={onOpenHome}
        onOpenSales={onOpenSales}
        onOpenActivity={onOpenActivity}
        onOpenMore={onOpenMore}
      />
    </SafeAreaView>
  );
}

function BottomTabs({
  active,
  onOpenHome,
  onOpenSales,
  onOpenActivity,
  onOpenMore,
}: NavProps & { active: string }) {
  return (
    <View style={styles.bottomTab}>
      <TabItem
        icon="house"
        label="Home"
        active={active === 'Home'}
        onPress={onOpenHome}
      />

      <TabItem
        icon="gavel"
        label="Sales"
        active={active === 'Sales'}
        onPress={onOpenSales}
      />

      <TabItem
        icon="star"
        label="Shortlist"
        active={active === 'Shortlist'}
      />

      <TabItem
        icon="user-group"
        label="Team"
        active={active === 'Team'}
        onPress={onOpenActivity}
      />

      <TabItem
        icon="ellipsis"
        label="More"
        active={active === 'More'}
        onPress={onOpenMore}
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
  icon: IconName;
  label: string;
  active?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      style={styles.tabItem}
      onPress={onPress}
      disabled={!onPress}>
      <FontAwesome6
        name={icon}
        iconStyle="solid"
        size={18}
        color={active ? GOLD : '#6f7581'}
      />

      <Text
        style={[
          styles.tabItemText,
          active ? styles.tabItemTextActive : null,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const BORDER = '#1E1E1E';
const GOLD = '#C8923B';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },

//   header: {
//     height: 60,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//   },

//   backButton: {
//     width: 34,
//     alignItems: 'flex-start',
//   },

//   back: {
//     color: GOLD,
//     fontSize: 26,
//   },

//   headerTitle: {
//     color: '#fff',
//     fontSize: 18,
//     letterSpacing: 1,
//   },

//   edit: {
//     color: GOLD,
//     fontSize: 14,
//   },

//   compareWrapper: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     paddingBottom: 24,
//   },

//   leftColumn: {
//     width: 82,
//   },

//   emptyTop: {
//     height: 180,
//     borderWidth: 1,
//     borderColor: BORDER,
//     justifyContent: 'flex-start',
//     padding: 8,
//   },

//   leftLot: {
//     color: GOLD,
//     fontSize: 12,
//   },

//   labelCell: {
//     height: 52,
//     borderWidth: 1,
//     borderColor: BORDER,
//     justifyContent: 'center',
//     paddingHorizontal: 6,
//   },

//   labelText: {
//     color: GOLD,
//     fontSize: 11,
//     lineHeight: 15,
//   },

//   column: {
//     width: 130,
//   },

//   topCard: {
//     height: 180,
//     borderWidth: 1,
//     borderColor: BORDER,
//     alignItems: 'center',
//     padding: 8,
//   },

//   lotRow: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 6,
//   },

//   lotText: {
//     color: GOLD,
//     fontWeight: '700',
//     fontSize: 13,
//   },

//   closeBtn: {
//     width: 18,
//     height: 18,
//     borderRadius: 9,
//     borderWidth: 1,
//     borderColor: '#555',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   closeText: {
//     color: '#999',
//     fontSize: 10,
//   },

//   horseImage: {
//     width: 78,
//     height: 78,
//     borderRadius: 4,
//     marginBottom: 6,
//   },

//   horseName: {
//     color: '#fff',
//     fontSize: 11,
//     textAlign: 'center',
//     lineHeight: 15,
//   },

//   badge: {
//     marginTop: 8,
//     borderRadius: 4,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//   },

//   badgeText: {
//     color: '#fff',
//     fontSize: 10,
//   },

//   valueCell: {
//     height: 52,
//     borderWidth: 1,
//     borderColor: BORDER,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 4,
//   },

//   valueText: {
//     color: '#ddd',
//     fontSize: 11,
//     textAlign: 'center',
//     lineHeight: 15,
//   },

//   priceText: {
//     color: GOLD,
//     fontSize: 11,
//     textAlign: 'center',
//   },

//   iconCell: {
//     height: 52,
//     borderWidth: 1,
//     borderColor: BORDER,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   greenIcon: {
//     color: '#20C05C',
//     fontSize: 16,
//   },

//   videoIcon: {
//     color: GOLD,
//     fontSize: 18,
//   },

//   noteIcon: {
//     color: GOLD,
//     fontSize: 16,
//   },

//   infoBox: {
//     marginHorizontal: 10,
//     borderWidth: 1,
//     borderColor: GOLD,
//     borderRadius: 10,
//     flexDirection: 'row',
//     padding: 12,
//     alignItems: 'center',
//     marginBottom: 14,
//   },

//   infoIcon: {
//     color: GOLD,
//     marginRight: 12,
//     fontSize: 18,
//   },

//   infoTitle: {
//     color: GOLD,
//     fontSize: 12,
//     marginBottom: 4,
//   },

//   infoSubtitle: {
//     color: '#B8B8B8',
//     fontSize: 11,
//   },

//   bottomButton: {
//     marginHorizontal: 16,
//     marginBottom: 96,
//     backgroundColor: GOLD,
//     borderRadius: 10,
//     paddingVertical: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   bottomButtonInner: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   bottomButtonText: {
//     color: '#000',
//     fontWeight: '700',
//     fontSize: 14,
//     marginLeft: 8,
//   },

//   bottomTab: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: 80,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     borderTopWidth: 1,
//     borderTopColor: '#151820',
//     backgroundColor: '#030507',
//     paddingTop: 6,
//     paddingBottom: 12,
//   },

//   tabItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 5,
//   },

//   tabItemText: {
//     color: '#6f7581',
//     fontSize: 9,
//     fontWeight: '700',
//   },

//   tabItemTextActive: {
//     color: GOLD,
//   },
// });





























const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
  },

  backButton: {
    width: 34,
    alignItems: 'flex-start',
  },

  back: {
    color: GOLD,
    fontSize: 26,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 17,
    letterSpacing: 1.8,
    fontWeight: '500',
  },

  edit: {
    color: GOLD,
    fontSize: 15,
    fontWeight: '500',
  },

  compareWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 18,
  },

  leftColumn: {
    width: 72,
  },

  emptyTop: {
    height: 188,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: 'flex-start',
    padding: 8,
    backgroundColor: '#020202',
  },

  leftLot: {
    color: GOLD,
    fontSize: 11,
    fontWeight: '500',
  },

  labelCell: {
    height: 50,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: 'center',
    paddingHorizontal: 6,
    backgroundColor: '#020202',
  },

  labelText: {
    color: GOLD,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '500',
  },

  column: {
    width: 126,
  },

  topCard: {
    height: 188,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
    backgroundColor: '#020202',
  },

  lotRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  lotText: {
    color: GOLD,
    fontWeight: '600',
    fontSize: 12,
  },

  closeBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeText: {
    color: '#777',
    fontSize: 11,
    marginTop: -1,
  },

  horseImage: {
    width: 84,
    height: 84,
    borderRadius: 4,
    marginBottom: 7,
  },

  horseName: {
    color: '#F5F5F5',
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 15,
    fontWeight: '500',
  },

  badge: {
    marginTop: 10,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '600',
  },

  valueCell: {
    height: 50,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    backgroundColor: '#020202',
  },

  valueText: {
    color: '#D6D6D6',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 15,
    fontWeight: '400',
  },

  priceText: {
    color: GOLD,
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '600',
  },

  iconCell: {
    height: 50,
    borderWidth: 1,
    borderColor: BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#020202',
  },

  greenIcon: {
    color: '#20C05C',
    fontSize: 15,
  },

  videoIcon: {
    color: GOLD,
    fontSize: 18,
  },

  noteIcon: {
    color: GOLD,
    fontSize: 16,
  },

  infoBox: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#9A6B2A',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: '#050505',
  },

  infoIcon: {
    color: GOLD,
    marginRight: 12,
    fontSize: 18,
  },

  infoTitle: {
    color: '#D7A04A',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 4,
  },

  infoSubtitle: {
    color: '#B8B8B8',
    fontSize: 11,
  },

  bottomButton: {
    marginHorizontal: 16,
    marginBottom: 92,
    backgroundColor: GOLD,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomButtonText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 8,
  },

  bottomTab: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 82,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderTopColor: '#151820',
    backgroundColor: '#030507',
    paddingTop: 6,
    paddingBottom: 14,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },

  tabItemText: {
    color: '#6f7581',
    fontSize: 9,
    fontWeight: '600',
  },

  tabItemTextActive: {
    color: GOLD,
  },
  squareIcon: {
  width: 24,
  height: 24,
  borderWidth: 1,
  borderColor: GOLD,
  borderRadius: 6,
  alignItems: 'center',
  justifyContent: 'center',
},
});

