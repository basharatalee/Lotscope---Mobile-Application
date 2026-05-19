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

type NavProps = {
  onOpenHome?: () => void;
  onOpenSales?: () => void;
  onOpenActivity?: () => void;
  onOpenMore?: () => void;
  onOpenCompare?: () => void;
  onOpenTeam?: () => void;
};

type IconName =
  | 'arrow-left'
  | 'chart-simple'
  | 'gavel'
  | 'comment-dots'
  | 'ellipsis'
  | 'eye'
  | 'gavel'
  | 'house'
  | 'magnifying-glass'
  | 'plus'
  | 'shield-halved'
  | 'star'
  | 'tag'
  | 'users';

type Horse = {
  id: number;
  lot: string;
  type: string;
  pedigree: string;
  tag: string;
  rating: string;
};

const horseHero = require('../../assets/black-horse.png') as ImageSourcePropType;

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

const horses: Horse[] = [
  {
    id: 1,
    lot: 'Lot 128',
    type: 'Br. Colt',
    pedigree: 'Snitzel x La Dorada',
    tag: 'Top Opportunity',
    rating: '8.6 / 10',
  },
  {
    id: 2,
    lot: 'Lot 201',
    type: 'Br. Colt',
    pedigree: 'Written Tycoon x Jolie Bay',
    tag: 'Strong Racehorse',
    rating: '8.4 / 10',
  },
  {
    id: 3,
    lot: 'Lot 152',
    type: 'B. Filly',
    pedigree: 'I Am Invincible x Villa Verde',
    tag: 'Strong Value',
    rating: '8.0 / 10',
  },
  {
    id: 4,
    lot: 'Lot 245',
    type: 'Ch. Filly',
    pedigree: 'Exceed And Excel x La Luna Rossa',
    tag: 'Value',
    rating: '7.8 / 10',
  },
  {
    id: 5,
    lot: 'Lot 178',
    type: 'Br. Colt',
    pedigree: 'Too Darn Hot x Global Choice',
    tag: 'Value',
    rating: '7.5 / 10',
  },
];

const summaryData = [
  { icon: 'star' as IconName, label: 'Shortlisted', value: '5' },
  { icon: 'eye' as IconName, label: 'Watching', value: '7' },
  { icon: 'tag' as IconName, label: 'Value', value: '8' },
  { icon: 'gavel' as IconName, label: 'Bid Plan', value: '--' },
  { icon: 'users' as IconName, label: 'Team', value: '6' },
];

// function ShortlistScreen({
//   onOpenHome,
//   onOpenSales,
//   onOpenActivity,
//   onOpenMore,
//   onOpenCompare,
//   onOpenTeam,
// }: NavProps) {
//   return (
//     <SafeAreaView style={styles.screen}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}>
//         <View style={styles.header}>
//           <Pressable hitSlop={10} style={styles.headerLeft}>
//             {/* <FontAwesome6
//               name="arrow-left"
//               iconStyle="solid"
//               size={21}
//               color={palette.goldBright}
//             /> */}


//             <FontAwesome6
//   name={icon}
//   iconStyle="solid"
//   size={18}
//   color={active ? palette.goldBright : palette.mutedDark}
// />
//           </Pressable>

//           <Text style={styles.headerTitle}>SHORTLIST / WAR ROOM</Text>

//           <View style={styles.headerRight}>
//             <Pressable hitSlop={10}>
//               <FontAwesome6
//                 name="magnifying-glass"
//                 iconStyle="solid"
//                 size={24}
//                 color={palette.goldBright}
//               />
//             </Pressable>
//             <Pressable hitSlop={10}>
//               <FontAwesome6
//                 name="plus"
//                 iconStyle="solid"
//                 size={26}
//                 color={palette.goldBright}
//               />
//             </Pressable>
//           </View>
//         </View>

//         <View style={styles.tabs}>
//           <View style={styles.activeTab}>
//             <Text style={styles.activeTabText}>Top Picks (5)</Text>
//           </View>
//           <Text style={styles.tabText}>Watch (7)</Text>
//           <Text style={styles.tabText}>Value (8)</Text>
//         </View>

//         <View style={styles.infoBar}>
//           <View style={styles.infoLeft}>
//             <FontAwesome6
//               name="shield-halved"
//               iconStyle="solid"
//               size={19}
//               color={palette.goldBright}
//             />
//             <Text style={styles.infoText}>
//               Private list. Only visible to you and your team.
//             </Text>
//           </View>
//           <Pressable style={styles.manageButton}>
//             <Text style={styles.manageText}>Manage</Text>
//           </Pressable>
//         </View>

//         <View style={styles.cardList}>
//           {horses.map(item => (
//             <HorseCard key={item.id} item={item} />
//           ))}
//         </View>

//         <Text style={styles.summaryTitle}>SUMMARY</Text>

//         <View style={styles.summaryRow}>
//           {summaryData.map(item => (
//             <SummaryBox key={item.label} item={item} />
//           ))}
//         </View>

//         <Pressable onPress={onOpenCompare} style={styles.compareButton}>
//           <View style={styles.buttonContent}>
//             <FontAwesome6
//               name="chart-simple"
//               iconStyle="solid"
//               size={17}
//               color={palette.goldBright}
//             />
//             <Text style={styles.compareText}>Compare Shortlisted Lots</Text>
//           </View>
//           <Text style={styles.compareArrow}>›</Text>
//         </Pressable>

//         <Pressable onPress={onOpenTeam} style={styles.teamButton}>
//           <View style={styles.buttonContent}>
//             <FontAwesome6
//               name="comment-dots"
//               iconStyle="regular"
//               size={17}
//               color={palette.black}
//             />
//             <Text style={styles.teamText}>Discuss with Team</Text>
//           </View>
//           <Text style={styles.teamArrow}>›</Text>
//         </Pressable>
//       </ScrollView>

  
//       <BottomTabs
//         active="Shortlist"
//         onOpenHome={onOpenHome}
//         onOpenSales={onOpenSales}
//         onOpenActivity={onOpenActivity}
//         onOpenMore={onOpenMore}
//       />
//     </SafeAreaView>
//   );
// }




function ShortlistScreen({
  onOpenHome,
  onOpenSales,
  onOpenActivity,
  onOpenMore,
  onOpenCompare,
  onOpenTeam,
}: NavProps) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Pressable hitSlop={10} style={styles.headerLeft}>
            {/* <FontAwesome6
              name="arrow-left"
              iconStyle="solid"
              size={21}
              color={palette.goldBright}
            /> */}
          </Pressable>

          <Text style={styles.headerTitle}>
            SHORTLIST / WAR ROOM
          </Text>

          <View style={styles.headerRight}>
            <Pressable hitSlop={10}>
              <FontAwesome6
                name="magnifying-glass"
                iconStyle="solid"
                size={24}
                color={palette.goldBright}
              />
            </Pressable>

            <Pressable hitSlop={10}>
              <FontAwesome6
                name="plus"
                iconStyle="solid"
                size={26}
                color={palette.goldBright}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.tabs}>
          <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>
              Top Picks (5)
            </Text>
          </View>

          <Text style={styles.tabText}>Watch (7)</Text>
          <Text style={styles.tabText}>Value (8)</Text>
        </View>

        <View style={styles.infoBar}>
          <View style={styles.infoLeft}>
            <FontAwesome6
              name="shield-halved"
              iconStyle="solid"
              size={19}
              color={palette.goldBright}
            />

            <Text style={styles.infoText}>
              Private list. Only visible to you and your team.
            </Text>
          </View>

          <Pressable style={styles.manageButton}>
            <Text style={styles.manageText}>Manage</Text>
          </Pressable>
        </View>

        <View style={styles.cardList}>
          {horses.map(item => (
            <HorseCard key={item.id} item={item} />
          ))}
        </View>

        <Text style={styles.summaryTitle}>SUMMARY</Text>

        <View style={styles.summaryRow}>
          {summaryData.map(item => (
            <SummaryBox key={item.label} item={item} />
          ))}
        </View>

        <Pressable
          onPress={onOpenCompare}
          style={styles.compareButton}>
          <View style={styles.buttonContent}>
            <FontAwesome6
              name="chart-simple"
              iconStyle="solid"
              size={17}
              color={palette.goldBright}
            />

            <Text style={styles.compareText}>
              Compare Shortlisted Lots
            </Text>
          </View>

          <Text style={styles.compareArrow}>›</Text>
        </Pressable>

        <Pressable
          onPress={onOpenTeam}
          style={styles.teamButton}>
          <View style={styles.buttonContent}>
            <FontAwesome6
              name="comment-dots"
              iconStyle="regular"
              size={17}
              color={palette.black}
            />

            <Text style={styles.teamText}>
              Discuss with Team
            </Text>
          </View>

          <Text style={styles.teamArrow}>›</Text>
        </Pressable>
      </ScrollView>

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

function HorseCard({ item }: { item: Horse }) {
  return (
    <View style={styles.card}>
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>{item.id}</Text>
      </View>

      <Image source={horseHero} resizeMode="cover" style={styles.horseImage} />

      <View style={styles.cardContent}>
        <Text style={styles.lotTitle}>{item.lot}</Text>
        <Text style={styles.typeText}>{item.type}</Text>
        <Text numberOfLines={1} style={styles.pedigree}>
          {item.pedigree}
        </Text>

        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{item.tag}</Text>
        </View>
      </View>

      <View style={styles.ratingContainer}>
        <FontAwesome6
          name="star"
          iconStyle="regular"
          size={24}
          color={palette.goldBright}
        />
        <Text style={styles.ratingLabel}>Your Rating</Text>
        <Text style={styles.ratingValue}>{item.rating}</Text>
      </View>
    </View>
  );
}

function SummaryBox({
  item,
}: {
  item: { icon: IconName; label: string; value: string };
}) {
  return (
    <View style={styles.summaryBox}>
      <FontAwesome6
        name={item.icon}
        iconStyle="solid"
        size={19}
        color={palette.goldBright}
      />
      <Text style={styles.summaryValue}>{item.value}</Text>
      <Text style={styles.summaryLabel}>{item.label}</Text>
    </View>
  );
}

// function BottomTabs({
//   active,
//   onOpenHome,
//   onOpenSales,
//   onOpenActivity,
//   onOpenMore,
// }: NavProps & { active: string }) {
//   return (
//     <View style={styles.bottomTab}>
//       <TabItem icon="house" label="Home" active={active === 'Home'} onPress={onOpenHome} />
//       <TabItem icon="gavel" label="Sales" onPress={onOpenSales} />
//       <TabItem icon="star" label="Shortlist" active={active === 'Shortlist'} />
//       <TabItem icon="chart-simple" label="Activity" onPress={onOpenActivity} hasDot />
//       <TabItem icon="ellipsis" label="More" onPress={onOpenMore} />
//       <View style={styles.homeIndicator} />
//     </View>
//   );
// }



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
        label="Dashboard"
        active={active === 'Dashboard'}
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
        icon="chart-simple"
        label="Activity"
        active={active === 'Activity'}
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
  hasDot,
}: {
  icon: IconName;
  label: string;
  active?: boolean;
  onPress?: () => void;
  hasDot?: boolean;
}) {
  return (
    <Pressable style={styles.tabItem} onPress={onPress} disabled={!onPress}>
      <View>
        <FontAwesome6
          name={icon}
          iconStyle="solid"
          size={18}
          color={active ? palette.goldBright : palette.mutedDark}
        />
        {hasDot ? <View style={styles.tabDot} /> : null}
      </View>
      <Text style={[styles.tabItemText, active ? styles.tabItemTextActive : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: palette.black,
//   },

//   scrollContent: {
//     paddingHorizontal: 23,
//     paddingBottom: 124,
//   },

//   header: {
//     height: 70,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },

//   headerLeft: {
//     width: 55,
//     zIndex: 2,
//   },

//   headerTitle: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     color: palette.white,
//     fontSize: 23,
//     fontWeight: '400',
//     letterSpacing: 0,
//     textAlign: 'center',
//   },

//   headerRight: {
//     width: 92,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     gap: 25,
//     zIndex: 2,
//   },

//   tabs: {
//     height: 43,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: palette.border,
//     borderRadius: 22,
//     padding: 4,
//     marginBottom: 15,
//   },

//   activeTab: {
//     flex: 1,
//     height: 33,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: palette.goldBright,
//     borderRadius: 17,
//   },

//   activeTabText: {
//     color: palette.black,
//     fontSize: 15,
//     fontWeight: '600',
//   },

//   tabText: {
//     flex: 1,
//     color: palette.muted,
//     fontSize: 15,
//     textAlign: 'center',
//   },

//   infoBar: {
//     minHeight: 55,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     borderWidth: 1,
//     borderColor: palette.border,
//     borderRadius: 7,
//     backgroundColor: palette.panel,
//     paddingHorizontal: 17,
//     marginBottom: 13,
//   },

//   infoLeft: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   infoText: {
//     flex: 1,
//     color: palette.muted,
//     fontSize: 14,
//     lineHeight: 18,
//     marginLeft: 13,
//   },

//   manageButton: {
//     borderWidth: 1,
//     borderColor: '#7c4617',
//     borderRadius: 5,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//   },

//   manageText: {
//     color: palette.goldBright,
//     fontSize: 14,
//     fontWeight: '500',
//   },

//   cardList: {
//     gap: 5,
//   },

//   card: {
//     minHeight: 128,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: palette.border,
//     backgroundColor: palette.panel,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     overflow: 'hidden',
//   },

//   rankBadge: {
//     position: 'absolute',
//     top: 12,
//     left: 10,
//     zIndex: 5,
//     width: 31,
//     height: 31,
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: palette.goldBright,
//   },

//   rankText: {
//     color: palette.black,
//     fontSize: 16,
//     fontWeight: '800',
//   },

//   horseImage: {
//     width: 143,
//     height: 112,
//     borderRadius: 7,
//     backgroundColor: palette.panel,
//   },

//   cardContent: {
//     flex: 1,
//     paddingLeft: 19,
//     paddingRight: 12,
//   },

//   lotTitle: {
//     color: palette.white,
//     fontSize: 20,
//     fontWeight: '500',
//   },

//   typeText: {
//     color: palette.white,
//     fontSize: 14,
//     marginTop: 7,
//   },

//   pedigree: {
//     color: palette.muted,
//     fontSize: 14,
//     marginTop: 8,
//   },

//   tagContainer: {
//     alignSelf: 'flex-start',
//     borderWidth: 1,
//     borderColor: '#246b35',
//     borderRadius: 4,
//     backgroundColor: '#07140b',
//     paddingHorizontal: 9,
//     paddingVertical: 4,
//     marginTop: 8,
//   },

//   tagText: {
//     color: palette.green,
//     fontSize: 12,
//     fontWeight: '500',
//   },

//   ratingContainer: {
//     width: 75,
//     alignItems: 'flex-end',
//     alignSelf: 'stretch',
//     paddingTop: 8,
//   },

//   ratingLabel: {
//     color: palette.muted,
//     fontSize: 11,
//     marginTop: 'auto',
//   },

//   ratingValue: {
//     color: palette.goldBright,
//     fontSize: 17,
//     marginTop: 5,
//   },

//   summaryTitle: {
//     color: palette.goldBright,
//     fontSize: 14,
//     fontWeight: '500',
//     marginTop: 15,
//     marginBottom: 8,
//   },

//   summaryRow: {
//     flexDirection: 'row',
//     gap: 7,
//     marginBottom: 11,
//   },

//   summaryBox: {
//     flex: 1,
//     minHeight: 86,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: palette.border,
//     borderRadius: 8,
//     backgroundColor: palette.panel,
//   },

//   summaryValue: {
//     color: palette.white,
//     fontSize: 19,
//     marginTop: 7,
//   },

//   summaryLabel: {
//     color: palette.muted,
//     fontSize: 11,
//     marginTop: 3,
//     textAlign: 'center',
//   },

//   compareButton: {
//     height: 43,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 1,
//     borderColor: '#7c4617',
//     borderRadius: 7,
//     marginBottom: 9,
//   },

//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },

//   compareText: {
//     color: palette.goldBright,
//     fontSize: 15,
//     fontWeight: '500',
//   },

//   compareArrow: {
//     position: 'absolute',
//     right: 17,
//     color: palette.goldBright,
//     fontSize: 24,
//   },

//   teamButton: {
//     height: 43,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 7,
//     backgroundColor: palette.goldBright,
//   },

//   teamText: {
//     color: palette.black,
//     fontSize: 15,
//     fontWeight: '700',
//   },

//   teamArrow: {
//     position: 'absolute',
//     right: 17,
//     color: palette.black,
//     fontSize: 24,
//   },

//   bottomTab: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: 0,
//     height: 96,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     borderTopWidth: 1,
//     borderTopColor: palette.borderSoft,
//     backgroundColor: '#030507',
//     paddingBottom: 20,
//   },

//   tabItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 5,
//   },

//   tabItemText: {
//     color: palette.mutedDark,
//     fontSize: 10,
//     fontWeight: '700',
//   },

//   tabItemTextActive: {
//     color: palette.goldBright,
//   },

//   tabDot: {
//     position: 'absolute',
//     top: -3,
//     right: -5,
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: palette.goldBright,
//   },

//   homeIndicator: {
//     position: 'absolute',
//     bottom: 7,
//     alignSelf: 'center',
//     width: 185,
//     height: 5,
//     borderRadius: 3,
//     backgroundColor: palette.white,
//   },
// });
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.black,
  },

  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 120,
  },

  header: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  headerLeft: {
    width: 55,
    zIndex: 2,
  },

  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    color: palette.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  headerRight: {
    width: 92,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 18,
    zIndex: 2,
  },

  tabs: {
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2b2b2b',
    borderRadius: 18,
    padding: 3,
    marginBottom: 10,
    backgroundColor: '#0a0a0a',
  },

  activeTab: {
    flex: 1,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.goldBright,
    borderRadius: 14,
  },

  activeTabText: {
    color: palette.black,
    fontSize: 11,
    fontWeight: '700',
  },

  tabText: {
    flex: 1,
    color: '#9c9c9c',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },

  infoBar: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#252525',
    borderRadius: 8,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  infoLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoText: {
    flex: 1,
    color: '#9c9c9c',
    fontSize: 11,
    lineHeight: 15,
    marginLeft: 10,
  },

  manageButton: {
    borderWidth: 1,
    borderColor: '#7c4617',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  manageText: {
    color: palette.goldBright,
    fontSize: 11,
    fontWeight: '600',
  },

  cardList: {
    gap: 6,
  },

  card: {
    height: 95,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1e1e1e',
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 8,
    overflow: 'hidden',
  },

  rankBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 5,
    width: 18,
    height: 18,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.goldBright,
  },

  rankText: {
    color: palette.black,
    fontSize: 10,
    fontWeight: '800',
  },

  horseImage: {
    width: 82,
    height: 78,
    borderRadius: 6,
    backgroundColor: palette.panel,
  },

  cardContent: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 6,
    justifyContent: 'center',
  },

  lotTitle: {
    color: palette.white,
    fontSize: 15,
    fontWeight: '600',
  },

  typeText: {
    color: '#d2d2d2',
    fontSize: 11,
    marginTop: 2,
  },

  pedigree: {
    color: '#8f8f8f',
    fontSize: 10,
    marginTop: 3,
  },

  tagContainer: {
    alignSelf: 'flex-start',
    borderRadius: 3,
    backgroundColor: '#12351c',
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 5,
  },

  tagText: {
    color: '#58d474',
    fontSize: 9,
    fontWeight: '600',
  },

  ratingContainer: {
    width: 58,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingVertical: 6,
  },

  ratingLabel: {
    color: '#8f8f8f',
    fontSize: 8,
    marginTop: 'auto',
  },

  ratingValue: {
    color: palette.goldBright,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },

  summaryTitle: {
    color: palette.goldBright,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  summaryRow: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
  },

  summaryBox: {
    flex: 1,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1e1e1e',
    borderRadius: 8,
    backgroundColor: '#0a0a0a',
  },

  summaryValue: {
    color: palette.white,
    fontSize: 14,
    marginTop: 5,
    fontWeight: '700',
  },

  summaryLabel: {
    color: '#8f8f8f',
    fontSize: 8,
    marginTop: 2,
    textAlign: 'center',
  },

  compareButton: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#7c4617',
    borderRadius: 7,
    marginBottom: 8,
    backgroundColor: '#0a0a0a',
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  compareText: {
    color: palette.goldBright,
    fontSize: 13,
    fontWeight: '600',
  },

  compareArrow: {
    position: 'absolute',
    right: 15,
    color: palette.goldBright,
    fontSize: 20,
  },

  teamButton: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: palette.goldBright,
  },

  teamText: {
    color: palette.black,
    fontSize: 13,
    fontWeight: '700',
  },

  teamArrow: {
    position: 'absolute',
    right: 15,
    color: palette.black,
    fontSize: 20,
  },

  // bottomTab: {
  //   position: 'absolute',
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   height: 76,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-around',
  //   borderTopWidth: 1,
  //   borderTopColor: palette.border,
  //   backgroundColor: '#030507',
  // },


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

export default ShortlistScreen;
