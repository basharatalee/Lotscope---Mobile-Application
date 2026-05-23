import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { SouthportTycoonAnalysis } from '../data/southportTycoonAnalysis';
import { useLotNote } from '../data/lotNotesStore';

type IconName =
  | 'arrow-left'
  | 'camera'
  | 'clipboard-list'
  | 'ellipsis'
  | 'file-lines'
  | 'gavel'
  | 'house'
  | 'lock'
  | 'microphone'
  | 'shield-halved'
  | 'star'
  | 'stethoscope'
  | 'truck'
  | 'user-group'
  | 'video'
  | 'gavel'
  | 'horse-head';

export type LotDetailData = {
  lotNumber: number;
  mareName?: string;
  type: string;
  sire: string;
  dam: string;
  age?: number;
  vendor?: string;
  cataloguePedigree?: string;
  photos?: number;
  priceGuide: string;
  vendorThinks: string;
  privacy: string;
  warning: string;
  analysis?: SouthportTycoonAnalysis;
};

type LotDetailsProps = {
  lot: LotDetailData;
  onBackToLots: () => void;
  onOpenHome?: () => void;
  onOpenShortlist?: () => void;
  onOpenTeam?: () => void;
  onOpenMore?: () => void;
};

const horseHero = require('../../assets/herolot.jpg') as ImageSourcePropType;

const palette = {
  black: '#020406',
  panel: '#070a0f',
  border: '#202127',
  borderSoft: '#151820',
  gold: '#d6a247',
  goldBright: '#f0c66b',
  white: '#f8f2e8',
  muted: '#a9adb7',
  mutedDark: '#6f7581',
  green: '#48b85d',
};

const pedigreeHeaderCandidates = [
  'matingpedigreestrength',
  'lotpedigreestrength',
  'pedigreestrengthscore',
  'pedigreestrength',
  'pedigree',
];

const rankHeaderCandidates = [
  'rankingscore',
  'rankscore',
  'rank',
];

function LotDetails({
  lot,
  onBackToLots,
  onOpenHome,
  onOpenShortlist,
  onOpenTeam,
  onOpenMore,
}: LotDetailsProps) {
  const [buyerNote, setBuyerNote] = useLotNote(lot.lotNumber);
  const analysisMetricRows = lot.analysis ? getAnalysisMetricRows(lot.analysis, lot.vendor) : [];
  const profileMetricRows = lot.analysis ? getProfileMetricRows(lot.analysis) : [];
  const sourceFieldRows = lot.analysis ? getSourceFieldRows(lot.analysis) : [];
  const hasPedigreeScore = lot.analysis ? hasSourceValue(lot.analysis, pedigreeHeaderCandidates) : false;
  const grade = lot.analysis ? getAnalysisGrade(lot.analysis) : '';

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <ImageBackground
          source={horseHero}
          resizeMode="cover"
          imageStyle={styles.heroImage}
          style={styles.hero}>
          <View style={styles.heroShade} />
          <View style={styles.heroTop}>
            <Pressable onPress={onBackToLots} hitSlop={10}>
              <FontAwesome6
                name="arrow-left"
                iconStyle="solid"
                size={17}
                color={palette.goldBright}
              />
            </Pressable>
            <View style={styles.heroActions}>
              <TopIcon icon="camera" />
              <TopIcon icon="video" />
              <TopIcon icon="microphone" />
              <TopIcon icon="clipboard-list" />
              <TopIcon icon="ellipsis" />
            </View>
          </View>

          <View style={styles.photoBadge}>
            <FontAwesome6
              name="camera"
              iconStyle="solid"
              size={9}
              color={palette.goldBright}
            />
            <Text style={styles.photoBadgeText}>{lot.photos ?? 12}</Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleCopy}>
              <Text style={styles.lotTitle}>Lot {lot.lotNumber}</Text>
              {lot.mareName ? (
                <Text style={styles.mareName}>{lot.mareName}</Text>
              ) : null}
              <Text style={styles.lotType}>{lot.type}</Text>
              <Text style={styles.pedigree}>{lot.sire} x {lot.dam}</Text>
            </View>
            <FontAwesome6
              name="star"
              iconStyle="regular"
              size={26}
              color={palette.goldBright}
            />
          </View>

          <View style={styles.mediaRow}>
            <MediaChip label="Vet Report" />
            <MediaChip label="Scope" />
            <MediaChip label="Video" />
          </View>

          <View style={styles.workflowRow}>
            <WorkflowButton label="OUT" />
            <WorkflowButton label="WATCH" active />
            <WorkflowButton label="SHORTLIST" />
            <WorkflowButton label="TOP PICK" />
          </View>

          <View style={styles.privateLine}>
            <FontAwesome6
              name="lock"
              iconStyle="solid"
              size={9}
              color={palette.muted}
            />
            <Text style={styles.privateText}>{lot.privacy}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.priceSection}>
          <View style={styles.priceHeader}>
            <Text style={styles.priceTitle}>MAGIC MILLIONS CATALOGUE</Text>
            <View style={styles.privateBadge}>
              <FontAwesome6
                name="lock"
                iconStyle="solid"
                size={8}
                color={palette.muted}
              />
              <Text style={styles.privateBadgeText}>Private</Text>
            </View>
          </View>

          <View style={styles.vendorBox}>
            <Text style={styles.vendorLabel}>Vendor:</Text>
            <FontAwesome6
              name="lock"
              iconStyle="solid"
              size={9}
              color={palette.goldBright}
            />
            <Text style={styles.vendorPrice}>{lot.vendor ?? lot.priceGuide}</Text>
          </View>
        </View>

        {lot.analysis ? (
          <View style={styles.analysisSection}>
            <View style={styles.analysisHeaderRow}>
              <Text style={styles.priceTitle}>STALLION MATCH OVERLAY</Text>
              <Text style={styles.analysisVerdict}>{lot.analysis.verdict}</Text>
            </View>
            {grade || lot.age !== undefined || lot.analysis ? (
              <View style={styles.overlayScoreBand}>
                {grade ? (
                  <View style={styles.overlayScorePrimary}>
                    <Text style={styles.overlayScoreValue}>
                      {grade}
                    </Text>
                    <Text style={styles.overlayScoreLabel}>
                      Grade
                    </Text>
                  </View>
                ) : null}
                {lot.age !== undefined ? (
                  <View style={styles.overlayScorePrimary}>
                    <Text style={styles.overlayScoreValue}>{lot.age}</Text>
                    <Text style={styles.overlayScoreLabel}>Age</Text>
                  </View>
                ) : null}
                {lot.analysis ? (
                  <View style={styles.overlayScoreSecondary}>
                    <Text style={styles.overlayScoreValue}>
                      {Math.round(lot.analysis.rankingScore)}
                    </Text>
                    <Text style={styles.overlayScoreLabel}>Rank</Text>
                  </View>
                ) : null}
              </View>
            ) : null}

            {analysisMetricRows.length > 0 ? (
              <View style={styles.analysisGrid}>
                {analysisMetricRows.map(metric => (
                  <AnalysisMetric
                    key={metric.label}
                    label={metric.label}
                    value={metric.value}
                  />
                ))}
              </View>
            ) : null}

            {profileMetricRows.length > 0 ? (
              <View style={styles.profileRow}>
                {profileMetricRows.map(metric => (
                  <ProfileMetric
                    key={metric.label}
                    label={metric.label}
                    value={metric.value}
                  />
                ))}
              </View>
            ) : null}

            <View style={styles.normalMetricRow}>
              <NormalMetric
                label="Match"
                value={`${Math.round(lot.analysis.matchRating)}%`}
              />
              {hasPedigreeScore ? (
                <NormalMetric
                  label="Pedigree Strength"
                  value={`${Math.round(lot.analysis.pedigreeStrength)}`}
                />
              ) : null}
              {lot.analysis.matchLabel ? (
                <NormalMetric label="Match Label" value={lot.analysis.matchLabel} />
              ) : null}
            </View>

            <Text style={styles.analysisTitle}>PEDIGREE ANALYSIS</Text>
            <Text style={styles.analysisText}>{lot.cataloguePedigree}</Text>

            {lot.analysis.dosageProfile ? (
              <>
                <Text style={styles.analysisTitle}>DOSAGE BREAKDOWN</Text>
                <Text style={styles.analysisText}>{lot.analysis.dosageProfile}</Text>
              </>
            ) : null}

            {lot.analysis.commercialNotes ? (
              <>
                <Text style={styles.analysisTitle}>COMMERCIAL NOTES</Text>
                <Text style={styles.analysisText}>{lot.analysis.commercialNotes}</Text>
              </>
            ) : null}

            {lot.analysis.aiInsights ? (
              <>
                <Text style={styles.analysisTitle}>AI INSIGHTS</Text>
                <Text style={styles.analysisText}>{lot.analysis.aiInsights}</Text>
              </>
            ) : null}

            {sourceFieldRows.length > 0 ? (
              <>
                <Text style={styles.analysisTitle}>CSV DATA SNAPSHOT</Text>
                <View style={styles.sourceFieldGrid}>
                  {sourceFieldRows.map(field => (
                    <SourceField key={field.label} label={field.label} value={field.value} />
                  ))}
                </View>
              </>
            ) : null}

            {lot.analysis.stallionMatchUrl ? (
              <>
                <Text style={styles.analysisTitle}>STALLION MATCH</Text>
                <Text style={styles.analysisLink}>{lot.analysis.stallionMatchUrl}</Text>
              </>
            ) : null}

            {lot.analysis.buyerNotes ? (
              <>
                <Text style={styles.analysisTitle}>BUYER NOTE</Text>
                <Text style={styles.analysisText}>{lot.analysis.buyerNotes}</Text>
              </>
            ) : null}

            <Text style={styles.analysisTitle}>MY LOT NOTE</Text>
            <View style={styles.noteBox}>
              <TextInput
                value={buyerNote}
                onChangeText={setBuyerNote}
                placeholder="Type private notes for this lot"
                placeholderTextColor={palette.mutedDark}
                multiline
                textAlignVertical="top"
                style={styles.noteInput}
              />
              <Text style={styles.noteHelper}>
                Saved privately on this device and shown in your shortlist.
              </Text>
            </View>
          </View>
        ) : null}

        <View style={styles.actionGrid}>
          <DetailAction icon="stethoscope" label="Request Vet" />
          <DetailAction icon="user-group" label="Ask Trainer" />
          <DetailAction icon="truck" label="Transport Quote" />
          <DetailAction icon="shield-halved" label="Notify Insurer" />
          <DetailAction icon="user-group" label="Share with Syndicate" />
          <DetailAction icon="file-lines" label="Add Note" />
        </View>

        <View style={styles.warningBox}>
          <FontAwesome6
            name="horse-head"
            iconStyle="solid"
            size={28}
            color={palette.goldBright}
          />
          <Text style={styles.warningText}>{lot.warning}</Text>
        </View>
      </ScrollView>

      <BottomTabs
        onOpenHome={onOpenHome}
        onOpenShortlist={onOpenShortlist}
        onOpenTeam={onOpenTeam}
        onOpenMore={onOpenMore}
      />
    </SafeAreaView>
  );
}

function TopIcon({ icon }: { icon: IconName }) {
  return (
    <Pressable style={styles.topIcon}>
      <FontAwesome6
        name={icon}
        iconStyle="solid"
        size={14}
        color={palette.goldBright}
      />
    </Pressable>
  );
}

function MediaChip({ label }: { label: string }) {
  return (
    <Pressable style={styles.mediaChip}>
      <Text style={styles.mediaChipText}>{label}</Text>
    </Pressable>
  );
}

function WorkflowButton({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <Pressable style={[styles.workflowButton, active ? styles.workflowActive : null]}>
      <Text style={[styles.workflowText, active ? styles.workflowTextActive : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

function DetailAction({ icon, label }: { icon: IconName; label: string }) {
  return (
    <Pressable style={styles.actionButton}>
      <FontAwesome6
        name={icon}
        iconStyle="solid"
        size={13}
        color={palette.white}
      />
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
  );
}

function AnalysisMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.analysisMetric}>
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.analysisMetricValue}>
        {value}
      </Text>
      <Text style={styles.analysisMetricLabel}>{label}</Text>
    </View>
  );
}

function ProfileMetric({
  label,
  value,
}: {
  label: string;
  value?: number;
}) {
  return (
    <View style={styles.profileMetric}>
      <Text style={styles.profileValue}>{value}</Text>
      <Text style={styles.profileLabel}>{label}</Text>
    </View>
  );
}

function NormalMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.normalMetric}>
      <Text style={styles.normalMetricLabel}>{label}</Text>
      <Text numberOfLines={2} style={styles.normalMetricValue}>{value}</Text>
    </View>
  );
}

function SourceField({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.sourceField}>
      <Text numberOfLines={1} style={styles.sourceFieldLabel}>{label}</Text>
      <Text numberOfLines={2} style={styles.sourceFieldValue}>{value}</Text>
    </View>
  );
}

function getAnalysisMetricRows(
  analysis: SouthportTycoonAnalysis,
  lotVendor?: string,
) {
  return [
    {
      label: 'Stallion',
      value: analysis.stallionName,
      candidates: ['stallionname', 'stallion', 'sirestallion', 'coveringstallion'],
    },
    {
      label: 'Grade',
      value: getAnalysisGrade(analysis),
      candidates: ['grade', 'lotgrade', 'horsegrade', 'maregrade', 'commercialgrade', 'matinggrade', 'commercialrating'],
    },
    {
      label: 'Farm',
      value: analysis.stallionFarm,
      candidates: ['stallionfarm', 'farm', 'stud'],
    },
    {
      label: 'Vendor',
      value: analysis.vendorName ?? lotVendor,
      candidates: ['vendorname', 'vendor', 'consignor', 'seller'],
    },
    {
      label: 'Rank Score',
      value: `${analysis.rankingScore}`,
      candidates: rankHeaderCandidates,
    },
    {
      label: 'Fee',
      value: analysis.stallionFee,
      candidates: ['stallionfee', 'fee', 'servicefee'],
    },
    {
      label: 'Lot ID',
      value: analysis.lotId,
      candidates: ['lotid'],
    },
    {
      label: 'Horse ID',
      value: analysis.horseId,
      candidates: ['horseid', 'sireid'],
    },
    {
      label: 'COB',
      value: analysis.countryOfBirth,
      candidates: ['countryofbirth', 'cob', 'country'],
    },
  ].filter(
    (metric): metric is {label: string; value: string; candidates: string[]} =>
      Boolean(metric.value) && hasSourceValue(analysis, metric.candidates),
  );
}

function getProfileMetricRows(analysis: SouthportTycoonAnalysis) {
  return [
    {
      label: 'Speed',
      value: analysis.speedScore,
      candidates: ['speedscore', 'speed', 'lotspeedpct', 'matingspeedpct'],
    },
    {
      label: 'Classic',
      value: analysis.classicScore,
      candidates: ['classicscore', 'classic', 'lotclassicpct', 'matingclassicpct'],
    },
    {
      label: 'Stamina',
      value: analysis.staminaScore,
      candidates: ['staminascore', 'stamina', 'lotstaminapct', 'matingstaminapct'],
    },
  ].filter(
    (metric): metric is {label: string; value: number; candidates: string[]} =>
      metric.value !== undefined && hasSourceValue(analysis, metric.candidates),
  );
}

function getAnalysisGrade(analysis: SouthportTycoonAnalysis) {
  return analysis.grade?.trim() || analysis.commercialRating.trim();
}

function getSourceFieldRows(analysis: SouthportTycoonAnalysis) {
  const {sourceFields, sourceFieldOrder} = analysis;

  if (!sourceFields) {
    return [];
  }

  const priorityHeaders = [
    'matingMatchRating',
    'matingPedigreeStrength',
    'matingDI',
    'matingCI',
    'lotPedigreeStrength',
    'lotDI',
    'lotCI',
    'stallionFee',
    'SireID',
    'SireUUID',
  ];
  const usedHeaders = new Set<string>();
  const priorityRows = priorityHeaders
    .map(label => {
      const entry = getOrderedSourceEntries(sourceFields, sourceFieldOrder).find(
        ([header]) => header.toLowerCase() === label.toLowerCase(),
      );

      if (!entry) {
        return null;
      }

      usedHeaders.add(entry[0]);
      return { label: entry[0], value: entry[1] };
    })
    .filter((row): row is { label: string; value: string } => row !== null);
  const extraRows = getOrderedSourceEntries(sourceFields, sourceFieldOrder)
    .filter(([label]) => !usedHeaders.has(label))
    .filter(([label]) => !label.toLowerCase().includes('url'))
    .map(([label, value]) => ({ label, value }));

  return [...priorityRows, ...extraRows];
}

function getOrderedSourceEntries(
  sourceFields: Record<string, string>,
  sourceFieldOrder: string[],
) {
  const usedHeaders = new Set<string>();
  const orderedEntries = sourceFieldOrder
    .filter(header => Object.prototype.hasOwnProperty.call(sourceFields, header))
    .map(header => {
      usedHeaders.add(header);
      return [header, sourceFields[header]] as [string, string];
    });
  const extraEntries = Object.entries(sourceFields).filter(
    ([header]) => !usedHeaders.has(header),
  );

  return [...orderedEntries, ...extraEntries];
}

function hasSourceValue(
  analysis: SouthportTycoonAnalysis,
  candidates: string[],
) {
  return Object.entries(analysis.sourceFields).some(([header, value]) => {
    const normalizedHeader = normalizeSourceHeader(header);
    return (
      value.length > 0 &&
      candidates.some(candidate => normalizedHeader === candidate)
    );
  });
}

function normalizeSourceHeader(header: string) {
  return header.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function BottomTabs({
  onOpenHome,
  onOpenShortlist,
  onOpenTeam,
  onOpenMore,
}: {
  onOpenHome?: () => void;
  onOpenShortlist?: () => void;
  onOpenTeam?: () => void;
  onOpenMore?: () => void;
}) {
  return (
    <View style={styles.tabBar}>
      <TabItem icon="house" label="Home" onPress={onOpenHome} />
      <TabItem icon="gavel" label="Sales" active />
      <TabItem icon="star" label="Shortlist" onPress={onOpenShortlist} />
      <TabItem icon="user-group" label="Team" onPress={onOpenTeam} />
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

  scrollContent: {
    paddingBottom: 94,
  },

  hero: {
    height: 199,
    justifyContent: 'space-between',
    backgroundColor: palette.black,
  },

  heroImage: {
    opacity: 0.9,
  },

  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },

  heroTop: {
    height: 47,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  heroActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
  },

  topIcon: {
    width: 18,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  photoBadge: {
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
    marginBottom: 8,
  },

  photoBadgeText: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '800',
  },

  content: {
    paddingHorizontal: 14,
    paddingTop: 7,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  titleCopy: {
    flex: 1,
    paddingRight: 12,
  },

  lotTitle: {
    color: palette.goldBright,
    fontSize: 22,
    fontWeight: '500',
  },

  lotType: {
    color: palette.white,
    fontSize: 12,
    marginTop: 4,
  },

  mareName: {
    color: palette.white,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 4,
  },

  pedigree: {
    color: palette.muted,
    fontSize: 11,
    marginTop: 5,
  },

  mediaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 9,
  },

  mediaChip: {
    width: 74,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#205728',
    backgroundColor: '#07140b',
  },

  mediaChipText: {
    color: palette.green,
    fontSize: 9,
    fontWeight: '600',
  },

  workflowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },

  workflowButton: {
    flex: 1,
    height: 31,
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
    height: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  privateText: {
    color: palette.muted,
    fontSize: 9,
  },

  divider: {
    height: 1,
    backgroundColor: palette.borderSoft,
    marginHorizontal: 14,
  },

  priceSection: {
    paddingHorizontal: 14,
    paddingTop: 11,
  },

  priceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  priceTitle: {
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
    minHeight: 33,
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

  analysisSection: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },

  analysisHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  analysisVerdict: {
    color: palette.goldBright,
    fontSize: 9,
    fontWeight: '900',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: palette.gold,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },

  analysisGrid: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
    marginBottom: 10,
  },

  overlayScoreBand: {
    minHeight: 68,
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },

  overlayScorePrimary: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: palette.gold,
    backgroundColor: '#171005',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  overlayScoreSecondary: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#101318',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  overlayScoreValue: {
    color: palette.goldBright,
    fontSize: 25,
    fontWeight: '900',
  },

  overlayScoreLabel: {
    color: palette.muted,
    fontSize: 9,
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center',
  },

  analysisMetric: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#101318',
    paddingHorizontal: 4,
  },

  normalMetricRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 7,
    marginBottom: 3,
  },

  normalMetric: {
    flexGrow: 1,
    minWidth: '31%',
    minHeight: 42,
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#0b0e13',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  normalMetricLabel: {
    color: palette.muted,
    fontSize: 8,
    fontWeight: '700',
  },

  normalMetricValue: {
    color: palette.white,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
  },

  analysisMetricValue: {
    color: palette.goldBright,
    fontSize: 12,
    fontWeight: '900',
  },

  analysisMetricLabel: {
    color: palette.muted,
    fontSize: 8,
    marginTop: 4,
  },

  profileRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 3,
  },

  profileMetric: {
    flex: 1,
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#664318',
    backgroundColor: '#100d07',
  },

  profileValue: {
    color: palette.white,
    fontSize: 11,
    fontWeight: '800',
  },

  profileLabel: {
    color: palette.goldBright,
    fontSize: 8,
    marginTop: 3,
  },

  analysisTitle: {
    color: palette.goldBright,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 10,
  },

  analysisText: {
    color: palette.muted,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 5,
  },

  sourceFieldGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 7,
  },

  sourceField: {
    width: '48.8%',
    minHeight: 48,
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#101318',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },

  sourceFieldLabel: {
    color: palette.goldBright,
    fontSize: 8,
    fontWeight: '800',
  },

  sourceFieldValue: {
    color: palette.muted,
    fontSize: 9,
    lineHeight: 12,
    marginTop: 4,
  },

  analysisLink: {
    color: palette.goldBright,
    fontSize: 10,
    lineHeight: 15,
    marginTop: 5,
  },

  noteBox: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#101318',
    padding: 9,
    marginTop: 7,
  },

  noteInput: {
    minHeight: 86,
    color: palette.white,
    fontSize: 11,
    lineHeight: 16,
    padding: 0,
  },

  noteHelper: {
    color: palette.mutedDark,
    fontSize: 8,
    marginTop: 8,
  },

  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 4,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 12,
  },

  actionButton: {
    width: '32%',
    minHeight: 53,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: '#101318',
    paddingHorizontal: 5,
  },

  actionText: {
    color: palette.white,
    fontSize: 8,
    fontWeight: '600',
    textAlign: 'center',
  },

  warningBox: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#7c4617',
    backgroundColor: '#090704',
    paddingHorizontal: 16,
    marginHorizontal: 14,
    marginTop: 13,
  },

  warningText: {
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

export default LotDetails;
