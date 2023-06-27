import React from 'react'
import { View, Text, Pressable , StyleSheet,SafeAreaView} from "react-native";
import {COLOR,FONT, KEY,SIZE, images} from '../constants';
const ChatTextComponent = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.containerMain}>
      <Text> Main Content Here</Text>
      <View style={styles.bottomView}>
        <Text style={styles.textStyle}>Bottom View</Text>
      </View>
    </View>
  </SafeAreaView>
);
};

const styles = StyleSheet.create({
containerMain: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
bottomView: {
  width: '100%',
  height: 50,
  backgroundColor: COLOR.primary,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute', //Here is the trick
  bottom: 0, //Here is the trick
},
textStyle: {
  color: '#fff',
  fontSize: 18,
},
});
export default ChatTextComponent