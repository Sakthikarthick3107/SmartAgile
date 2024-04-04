import {StyleSheet} from 'react-native';
import Colors from './Colors';
import { Dimensions } from 'react-native';

const {width,height} = Dimensions.get('window')

const GlobalStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  }as const,

  authContainer:{
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: Colors.background,
  } as const,

  scrollContainer:{
    display: 'flex',
    flexGrow: 1,
    backgroundColor: Colors.background,
    width : width*0.9
  },
  textStyle:{
    color:'black',
    fontFamily:'Poppins',
    fontSize:20
  },
  rowBetween:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between'
  }
});

export default GlobalStyles;
