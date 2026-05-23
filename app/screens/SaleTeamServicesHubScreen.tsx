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
  | 'briefcase'
  | 'chart-simple'
  | 'chevron-down'
  | 'chevron-right'
  | 'gavel'
  | 'clipboard-list'
  | 'comment'
  | 'ellipsis'
  | 'file-lines'
  | 'gavel'
  | 'headset'
  | 'house'
  | 'paper-plane'
  | 'plus'
  | 'shield-halved'
  | 'stethoscope'
  | 'star'
  | 'truck'
  | 'user-group'
  | 'user-plus'
  | 'video';

type SaleTeamServicesHubProps = {
  onBack?: () => void;
  onOpenHome?: () => void;
  onOpenSales?: () => void;
  onOpenShortlist?: () => void;
  onOpenActivity?: () => void;
};

type TeamMember = {
  name: string;
  role: string;
  you?: boolean;
};

type Service = {
  icon: IconName;
  title: string;
  action: string;
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
};

const teamMembers: TeamMember[] = [
  { name: 'James Harrington', role: 'Buyer / Team Lead', you: true },
  { name: 'Sophie Mitchell', role: 'Buyer' },
  { name: 'Dr. Chris Bell', role: 'Veterinarian' },
  { name: 'Michael Stewart', role: 'Bloodstock Agent' },
  { name: 'Lucy Watkins', role: 'Bloodstock Assistant' },
];

const services: Service[] = [
  { icon: 'stethoscope', title: 'Veterinary\nExams & Reports', action: 'Available' },
  { icon: 'gavel', title: 'Scope\nEndoscopy', action: 'Available' },
  { icon: 'video', title: 'Video\nParade & Walk', action: 'Available' },
  { icon: 'truck', title: 'Transport\nQuotes & Booking', action: 'Get Quote' },
  { icon: 'shield-halved', title: 'Insurance\nCover Your Horse', action: 'Get Quote' },
  { icon: 'gavel', title: 'Bidding Agent\nDomestic & Int', action: 'Enquire' },
  { icon: 'clipboard-list', title: 'Legal\nContracts & Advice', action: 'Enquire' },
  { icon: 'chart-simple', title: 'Lodging\nStabling & Yards', action: 'Book Now' },
];

export default function SaleTeamServicesHubScreen({
  onBack,
  onOpenHome,
  onOpenSales,
  onOpenShortlist,
  onOpenActivity,
}: SaleTeamServicesHubProps) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable onPress={onBack} hitSlop={10} style={styles.headerButton}>
            <FontAwesome6
              name="arrow-left"
              iconStyle="solid"
              size={18}
              color={palette.goldBright}
            />
          </Pressable>
          <Text style={styles.headerTitle}>SALE TEAM & SERVICES HUB</Text>
          <Pressable hitSlop={10} style={styles.headerButton}>
            <FontAwesome6
              name="user-plus"
              iconStyle="solid"
              size={16}
              color={palette.goldBright}
            />
          </Pressable>
        </View>

        <View style={styles.introCard}>
          <View style={styles.introIcon}>
            <FontAwesome6
              name="headset"
              iconStyle="solid"
              size={23}
              color={palette.goldBright}
            />
          </View>
          <View style={styles.introCopy}>
            <Text style={styles.introTitle}>Your team. Your experts.</Text>
            <Text style={styles.introText}>Everyone you need, in one place.</Text>
          </View>
          <Pressable style={styles.inviteButton}>
            <FontAwesome6
              name="user-plus"
              iconStyle="solid"
              size={10}
              color={palette.goldBright}
            />
            <Text style={styles.inviteText}>Invite Member</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SALE TEAM</Text>
          <View style={styles.teamHeaderRight}>
            <Text style={styles.teamCount}>7 Members</Text>
            <Pressable hitSlop={8}>
              <Text style={styles.manageText}>Manage</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.teamList}>
          {teamMembers.map(member => (
            <TeamRow key={member.name} member={member} />
          ))}
          <Pressable style={styles.viewMembersButton}>
            <Text style={styles.viewMembersText}>View All Members</Text>
            <FontAwesome6
              name="chevron-down"
              iconStyle="solid"
              size={10}
              color={palette.goldBright}
            />
          </Pressable>
        </View>

        <Text style={styles.servicesTitle}>SERVICES</Text>
        <View style={styles.servicesGrid}>
          {services.map(service => (
            <ServiceTile key={service.title} service={service} />
          ))}
        </View>

        <Text style={styles.quickTitle}>QUICK ACTIONS</Text>
        <View style={styles.quickGrid}>
          <QuickAction icon="plus" label="Request\nService" />
          <QuickAction icon="comment" label="Message\nTeam" />
          <QuickAction icon="paper-plane" label="Share\nUpdate" />
          <QuickAction icon="clipboard-list" label="Team\nBriefing" />
        </View>

        
      </ScrollView>

      <BottomTabs
        onBack={onBack}
        onOpenHome={onOpenHome}
        onOpenSales={onOpenSales}
        onOpenShortlist={onOpenShortlist}
        onOpenActivity={onOpenActivity}
      />
    </SafeAreaView>
  );
}

function TeamRow({ member }: { member: TeamMember }) {
  return (
    <Pressable style={styles.teamRow}>
      <Image source={horseHero} resizeMode="cover" style={styles.avatar} />
      <View style={styles.teamCopy}>
        <View style={styles.memberNameRow}>
          <Text style={styles.memberName}>{member.name}</Text>
          {member.you ? (
            <View style={styles.youBadge}>
              <Text style={styles.youText}>YOU</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.memberRole}>{member.role}</Text>
      </View>
      <View style={styles.onSite}>
        <View style={styles.onlineDot} />
        <Text style={styles.onSiteText}>On Site</Text>
      </View>
      <FontAwesome6
        name="comment"
        iconStyle="regular"
        size={15}
        color={palette.goldBright}
      />
    </Pressable>
  );
}

function ServiceTile({ service }: { service: Service }) {
  return (
    <Pressable style={styles.serviceTile}>
      <FontAwesome6
        name={service.icon}
        iconStyle="solid"
        size={20}
        color={palette.goldBright}
      />
      <Text style={styles.serviceTitle}>{service.title}</Text>
      <Text style={styles.serviceAction}>{service.action}</Text>
    </Pressable>
  );
}

function QuickAction({ icon, label }: { icon: IconName; label: string }) {
  return (
    <Pressable style={styles.quickAction}>
      <FontAwesome6
        name={icon}
        iconStyle="solid"
        size={14}
        color={palette.goldBright}
      />
      <Text style={styles.quickActionText}>{label}</Text>
    </Pressable>
  );
}

function BottomTabs({
  onBack,
  onOpenHome,
  onOpenSales,
  onOpenShortlist,
  onOpenActivity,
}: SaleTeamServicesHubProps) {
  return (
    <View style={styles.tabBar}>
      <TabItem icon="house" label="Home" onPress={onOpenHome} />
      <TabItem icon="gavel" label="Sales" onPress={onOpenSales} />
      <TabItem icon="star" label="Shortlist" onPress={onOpenShortlist} />
      <TabItem icon="user-group" label="Team" active onPress={onOpenActivity} />
      <TabItem icon="ellipsis" label="More" onPress={onBack} />
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
    height: 56,
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
    fontSize: 15,
    fontWeight: '500',
  },

  introCard: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.panel,
    paddingHorizontal: 11,
    gap: 9,
    marginBottom: 10,
  },

  introIcon: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  introCopy: {
    flex: 1,
  },

  introTitle: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '900',
  },

  introText: {
    color: palette.white,
    fontSize: 8,
    marginTop: 4,
  },

  inviteButton: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.gold,
    paddingHorizontal: 8,
  },

  inviteText: {
    color: palette.goldBright,
    fontSize: 8,
    fontWeight: '800',
  },

  sectionHeader: {
    height: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitle: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '900',
  },

  teamHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  teamCount: {
    color: palette.muted,
    fontSize: 9,
    fontWeight: '700',
  },

  manageText: {
    color: palette.goldBright,
    fontSize: 9,
    fontWeight: '800',
  },

  teamList: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    backgroundColor: palette.panel,
    overflow: 'hidden',
    marginBottom: 11,
  },

  teamRow: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: palette.borderSoft,
    paddingHorizontal: 10,
    gap: 10,
  },

  avatar: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: palette.panelSoft,
  },

  teamCopy: {
    flex: 1,
  },

  memberNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  memberName: {
    color: palette.white,
    fontSize: 10,
    fontWeight: '700',
  },

  youBadge: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: palette.gold,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },

  youText: {
    color: palette.goldBright,
    fontSize: 7,
    fontWeight: '900',
  },

  memberRole: {
    color: palette.muted,
    fontSize: 8,
    marginTop: 4,
  },

  onSite: {
    width: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.green,
  },

  onSiteText: {
    color: palette.white,
    fontSize: 8,
  },

  viewMembersButton: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  viewMembersText: {
    color: palette.goldBright,
    fontSize: 9,
    fontWeight: '800',
  },

  servicesTitle: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '900',
    marginBottom: 7,
  },

  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 11,
  },

  serviceTile: {
    width: '23.7%',
    minHeight: 92,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.panel,
    paddingHorizontal: 4,
  },

  serviceTitle: {
    color: palette.white,
    fontSize: 8,
    lineHeight: 11,
    textAlign: 'center',
    marginTop: 8,
  },

  serviceAction: {
    color: palette.goldBright,
    fontSize: 7,
    fontWeight: '800',
    marginTop: 5,
  },

  quickTitle: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '900',
    marginBottom: 7,
  },

  quickGrid: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 10,
  },

  quickAction: {
    flex: 1,
    minHeight: 43,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.panel,
  },

  quickActionText: {
    color: palette.white,
    fontSize: 8,
    lineHeight: 11,
  },

  requestCard: {
    minHeight: 75,
    flexDirection: 'row',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: palette.gold,
    backgroundColor: '#070604',
    overflow: 'hidden',
  },

  requestImage: {
    width: 78,
    backgroundColor: palette.panelSoft,
  },

  requestCopy: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  requestTitle: {
    color: palette.goldBright,
    fontSize: 12,
    fontWeight: '800',
  },

  requestText: {
    color: palette.white,
    fontSize: 8,
    marginTop: 5,
  },

  makeRequestButton: {
    alignSelf: 'flex-start',
    height: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.gold,
    paddingHorizontal: 12,
    marginTop: 8,
  },

  makeRequestText: {
    color: palette.goldBright,
    fontSize: 8,
    fontWeight: '800',
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
