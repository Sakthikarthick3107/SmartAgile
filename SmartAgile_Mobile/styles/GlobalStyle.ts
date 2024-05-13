import {StyleSheet} from 'react-native';
import Colors from './Colors';
import { Dimensions } from 'react-native';

const {width,height} = Dimensions.get('window')

const GlobalStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent:'center'
    //backgroundColor: Colors.background,
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
    alignItems:'center',
    justifyContent:'center',
    //backgroundColor: Colors.background,
    width : width*0.9,
  },
  scrollAuthContainer:{
    display: 'flex',
    flexGrow: 1,
    //alignItems:'center',
    //backgroundColor: Colors.background,
    width : width*0.9,
  },
  textStyle:{
    color:'black',
    fontFamily:'Poppins',
    fontSize:18,
  },
  rowBetween:{
    display:'flex',
    flexDirection:'row',
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',

  },
  curvedButton:{
    padding:5,
    borderRadius:50,
    backgroundColor:Colors.primary,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:10
  },
  btnText:{
    color:Colors.White,
    fontFamily:'Poppins',
    fontSize:14,
  },

  employeeIcon:{
    height: width*0.1,
    width:width*0.1,
    borderRadius:50
  },
  searchBar:{
    borderRadius:20,
    backgroundColor:Colors.White,
    paddingVertical:7,
    paddingHorizontal:20,
    marginVertical:10,
    elevation:2
  },
  smallText:{
    fontFamily:'Poppins',
    fontSize:12,
    color:Colors.text
  }
});

export default GlobalStyles;
