import {StyleSheet} from 'react-native';
import Colors from './Colors';

const GlobalStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  }as const,
});

export default GlobalStyles;
