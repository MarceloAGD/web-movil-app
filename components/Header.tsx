import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../constants/theme';

type Props = {
  children: React.ReactNode;
};

const Header = ({ children }: Props) => (
  <Text style={styles.header}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
    marginBottom: 14,
    textShadowColor: '#fff',
    textShadowOffset: {width: 5, height: 2},
    textShadowRadius: 10
  },
  
});

export default memo(Header);