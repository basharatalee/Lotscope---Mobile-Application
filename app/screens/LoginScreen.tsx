import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

const lsLogo = require('../../assets/ls-logo.jpeg') as ImageSourcePropType;

const palette = {
  black: '#020406',
  panel: '#05080d',
  gold: '#d3a144',
  goldBright: '#f0c66b',
  white: '#f7f2e7',
  muted: '#cacbd1',
  border: '#1b1a18',
};

function LoginScreen({ onContinue }: { onContinue: () => void }) {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isShort = height < 720;
  const horizontalPadding = isTablet ? 48 : 28;
  const contentWidth = Math.min(
    width - horizontalPadding * 2,
    isTablet ? 520 : 420,
  );
  const logoWidth = Math.min(contentWidth * 0.72, isTablet ? 280 : 230);
  const horseScale = isTablet ? 0.52 : isShort ? 0.78 : 0.9;
  const horseWidth = Math.min(
    width * horseScale,
    isTablet ? 460 : isShort ? 300 : 340,
  );
  const horseHeight = horseWidth * 1.59;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            minHeight: height,
            paddingHorizontal: horizontalPadding,
            paddingTop: isShort ? 8 : 12,
            paddingBottom: isShort ? 18 : 30,
          },
        ]}
      >
        <View style={[styles.content, { width: contentWidth }]}>
          <View
            style={[
              styles.heroArea,
              {
                minHeight: isTablet ? 560 : isShort ? 360 : 500,
              },
            ]}
          >
            <Image
              source={lsLogo}
              resizeMode="contain"
              style={[
                styles.logo,
                {
                  width: logoWidth,
                  height: logoWidth * 0.77,
                  marginTop: isShort ? 16 : 34,
                  marginLeft: -Math.min(horizontalPadding + 12, 40),
                },
              ]}
            />

            <View style={styles.copyBlock}>
              <Text style={styles.pitchLine}>The smarter way to</Text>
              <Text style={styles.pitchLine}>inspect, compare</Text>
              <Text style={styles.pitchLine}>and buy.</Text>
            </View>

            <Image
              source={require('../../assets/black-horse.png')}
              resizeMode="contain"
              style={[
                styles.horseWrap,
                {
                  top: isShort ? -34 : -20,
                  right: isTablet ? -60 : -110,
                  width: horseWidth,
                  height: horseHeight,
                },
              ]}
            />
          </View>

          <View
            style={[
              styles.actions,
              {
                marginTop: isShort ? -10 : -24,
              },
            ]}
          >
            <AuthButton
              icon={
                <FontAwesome6
                  name="apple"
                  iconStyle="brand"
                  size={24}
                  color={palette.black}
                />
              }
              title="Continue with Apple"
              variant="gold"
              onPress={onContinue}
            />

            <AuthButton
              icon={
                <FontAwesome6
                  name="google"
                  iconStyle="brand"
                  size={22}
                  color={palette.white}
                />
              }
              title="Continue with Google"
              onPress={onContinue}
            />

            <AuthButton
              icon={
                <FontAwesome6
                  name="envelope"
                  iconStyle="regular"
                  size={22}
                  color={palette.white}
                />
              }
              title="Continue with Email"
              onPress={onContinue}
            />
          </View>

          <View style={styles.accountRow}>
            <Text style={styles.accountText}>New to Lotscope?</Text>

            <Pressable>
              <Text style={styles.accountLink}> Create Account</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function AuthButton({
  icon,
  title,
  variant = 'dark',
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  variant?: 'dark' | 'gold';
  onPress: () => void;
}) {
  const isGold = variant === 'gold';

  return (
    <Pressable
      onPress={onPress}
      style={[styles.authButton, isGold ? styles.authButtonGold : null]}
    >
      <View style={styles.authIcon}>{icon}</View>

      <Text style={[styles.authText, isGold ? styles.authTextDark : null]}>
        {title}
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
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: palette.black,
  },

  content: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: palette.black,
  },

  heroArea: {
    flex: 1,
    width: '100%',
  },

  logo: {
    maxWidth: 280,
  },

  copyBlock: {
    marginTop: 10,
    zIndex: 2,
  },

  pitchLine: {
    color: palette.muted,
    fontSize: 14,
    lineHeight: 26,
    fontWeight: '800',
  },

  horseWrap: {
    position: 'absolute',
  },

  actions: {
    alignItems: 'center',
    gap: 12,
    paddingBottom: 32,
  },

  authButton: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    borderRadius: 6,
    backgroundColor: palette.panel,
    borderWidth: 1,
    borderColor: palette.border,
  },

  authButtonGold: {
    backgroundColor: palette.goldBright,
    borderColor: palette.gold,
  },

  authIcon: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  authText: {
    color: palette.white,
    fontSize: 18,
    fontWeight: '500',
  },

  authTextDark: {
    color: palette.black,
  },

  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 18,
  },

  accountText: {
    color: palette.muted,
    fontSize: 15,
    fontWeight: '700',
  },

  accountLink: {
    color: palette.goldBright,
    fontSize: 15,
    fontWeight: '800',
  },
});

export default LoginScreen;
