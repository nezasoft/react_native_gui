import React, {useState} from 'react';
import {Text, View, ScrollView,SafeAreaView,StyleSheet,TextInput,Image,Button, TouchableOpacity} from 'react-native';
import {FONT,COLOR,SIZE,images,icons} from "../constants";
import {useRouter, Stack} from "expo-router";

const forgot_pass = () => {

    const [email, setEmail] = useState('');
    const router = useRouter();
    const handleSignIn = () =>{
        router.push('/signin');
    };
    const handleForgotPassword = () =>{
        router.push('/forgot_pass');
    }
  return (
    <SafeAreaView styles={{flex:1, backgroundColor: COLOR.primary}}>
    <Stack.Screen  options={{
        headerStyle: {backgroundColor: COLOR.white},
        headerShadowVisible: false,
        headerTitle:"",
        }}
    />
    <View style={styles.mainContent} >  
    <ScrollView style={{marginTop:"20%"}}>
        
        <View style={styles.inputForm}>
        <View style={styles.logo}>
            <Text><Image source={images.logo}   /></Text>
        </View>
            <Text style={styles.large_font}>Forgot Password</Text>
            <TextInput style={styles.textInput} onChangeText={(email) => setEmail(email)} placeholder="Email Address" />
            <TouchableOpacity onPress={handleForgotPassword} style={styles.btn}>
                <Text style={{color:COLOR.white}}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignIn} style={styles.action_link}>
                <Text style={{color:COLOR.grey}}>Sign In</Text>
            </TouchableOpacity>
            
        </View>
        
    </ScrollView>

    <View style={styles.footer}>
        <Text style={{color:COLOR.white, fontSize:SIZE.small}}>Powered by www.nezasoft.net</Text>
    </View>

    </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    inputForm : {
        backgroundColor: COLOR.white,
        borderColor: COLOR.primary,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "column",
        padding: 10,
        marginTop : "2%",
        marginBottom : "2%",
        marginLeft:"10%",
        marginRight : "10%",
        color: COLOR.white,
        borderRadius: 4,
        borderColor: COLOR.secondary,
    },
    textInput : {
        backgroundColor: "#F4F3F9",
        color: COLOR.primary,
        borderColor: COLOR.secondary,
        borderRadius: 10,
        marginBottom: 20,
        height: 45,
        width: "100%",
        padding: 5,
        paddingLeft: 10,
        alignItems : "center",

    },
    large_font : {
        fontSize: SIZE.large,
        fontFamily: FONT.Bold,
        color: COLOR.grey,
        marginBottom: 10,
    },
    footer: {
        fontSize: SIZE.small,
        color: COLOR.white,
        marginTop: "88.5%",
        marginBottom: 0,
        alignItems: "center",
    },
    mainContent : {
        backgroundColor: "#000000",
    },
    logo : {
        padding: 5,
        marginBottom: 20,
    },
    btn : {
        borderRadius: 50,
        backgroundColor: COLOR.secondary,
        color : COLOR.white,
        height: 40,
        padding: 10,
        width: "100%",
        alignItems : "center",
    },
    action_link : {
        fontSize: SIZE.xsmall,
        margin: 10,
    }

});

export default forgot_pass