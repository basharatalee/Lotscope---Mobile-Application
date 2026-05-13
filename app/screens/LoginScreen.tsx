import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
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
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.heroArea}>
          <Image
            source={lsLogo}
            resizeMode="contain"
            style={styles.logo}
          />

          <View style={styles.copyBlock}>
            <Text style={styles.pitchLine}>Buy Better.</Text>
            <Text style={styles.pitchLine}>Optimize Smarter.</Text>
            <Text style={styles.pitchLine}>Win More.</Text>
          </View>

          <Image
            source={require('../../assets/black-horse.png')}
            resizeMode="contain"
            style={styles.horseWrap}
          />
        </View>

        <View style={styles.actions}>
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
          <Text style={styles.accountText}>
            New to Lotscope?
          </Text>

          <Pressable>
            <Text style={styles.accountLink}>
              {' '}Create Account
            </Text>
          </Pressable>
        </View>
      </View>
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
      style={[
        styles.authButton,
        isGold ? styles.authButtonGold : null,
      ]}>
      <View style={styles.authIcon}>
        {icon}
      </View>

      <Text
        style={[
          styles.authText,
          isGold ? styles.authTextDark : null,
        ]}>
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

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 12,
    paddingBottom: 30,
    backgroundColor: palette.black,
  },

  heroArea: {
    flex: 1,
    minHeight: 500,
  },

  logo: {
    width: 230,
    height: 178,
    marginTop: 34,
    marginLeft: -40,
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
    top: -20,
    right: -110,
    width: 340,
    height: 540,
  },

  actions: {
    marginTop: -24,
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
