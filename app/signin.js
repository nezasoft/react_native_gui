import React from 'react';
import {Text, View, ScrollView,StyleSheet,TextInput,Image} from 'react-native';
import {FONT,COLOR,SIZE,images,icons} from "../constants";
const signin = () => {
  return (
    <ScrollView>
        
        <View style={styles.inputForm}>
        <View>
            <Text><Image source={images.logo} /></Text>
        </View>
            <Text styles={styles.h1}>signin</Text>
            <TextInput placeholder="Username" />
            <TextInput placeholder="Password" />
        </View>
        
    </ScrollView>

  
  )
}
const styles = StyleSheet.create({
    inputForm : {
        backgroundColor: COLOR.white,
        borderColor: COLOR.primary,
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
        padding: 10,
        marginTop : "2%",
        marginBottom : "2%",
        marginLeft:"30%",
        marginRight : "30%",
        color: COLOR.white,
    },
    h1 : {
        fontSize: SIZE.large,
        fontFamily: FONT.Bold,
    }

});
export default signin;

