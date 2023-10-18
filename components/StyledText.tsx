import { theme } from '../constants/theme';
import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, {fontSize: 20, color: theme.colors.primary}]} />;
}
