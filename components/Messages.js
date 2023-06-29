import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLOR,FONT, KEY,SIZE, images} from '../constants';

const Messages = ({item,userid}) => {
  return (

    <View style={styles.mainContent}>
        <View style={styles.messageContainer} >        
                <Text style={styles.textMessage}>{item.message}</Text>             
                <View style={styles.messageFooter}>
                    <Text style={styles.textSender}>{item.sFName + " " + item.lFName}</Text>
                    <Text style={styles.textTime}>{item.createdAt}</Text>
                </View>             
            </View>
    </View>
    
  )
}
export default Messages
const styles = StyleSheet.create({
    mainContent:{
        padding: 5,
    },
    messageContainer:{
        margin: 5,
        padding: 5,
        borderRadius: 5,
        backgroundColor: COLOR.secondary
    },
    textMessage:{
        fontFamily: FONT.Regular,
        fontSize: SIZE.xsmall,
        color: COLOR.white,
        textAlign: "left",
     
    },
    textTime:{
        fontFamily: FONT.Regular,
        fontSize: 7,
        color: COLOR.white,
        textAlign :"right",
    },
    textSender:{
        fontFamily: FONT.Regular,
        fontSize: 7,
        color: COLOR.white,
        textAlign :"left",
    },
    time :{
        marginLeft : "20%",
    },
    messageFooter : {flex:1,
         flexDirection: "row",
         justifyContent:"space-between",
          marginTop: 5 }
    
});