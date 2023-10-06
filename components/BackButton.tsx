import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type Props = {
  goBack: () => void;
};

const BackButton = ({ goBack }: Props) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <Image style={styles.image} source={require('../assets/arrow_back_2.png')} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20 + getStatusBarHeight(),
    left: 0,
    alignSelf: 'center',
    
    
  },
  image: {
    width: 40,
    height: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default memo(BackButton);