import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import { theme } from '../constants/theme';

type Props = {
  children: React.ReactNode;
  imageSource: any;
};

const Background = ({ children , imageSource}: Props) => (
  <ImageBackground
    source={imageSource}
    resizeMode="cover"
    style={styles.background}
  >
    <KeyboardAvoidingView style={styles.container} behavior='height'>
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(Background);