import React, {useState} from 'react';
import {Text, View, ScrollView,StyleSheet,SafeAreaView,TextInput,Image,Button, TouchableOpacity} from 'react-native';
import {FONT,COLOR,SIZE,images,icons} from "../constants";
import {useRouter,Stack} from "expo-router";
const key = 'Test12345$';

const signin = () => {
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [requesting, setRequesting] = useState(false);
    const router = useRouter();
    const handleSignIn = () =>{
          if(username.length==0){
            alert("Please enter username or email")
          }else if(password.length==0){
                alert("Please enter your password!");
          }else{
            setRequesting(true);
            loginRequest();
          }
    
        
    };
    const handleForgotPassword = () =>{
        router.push('/forgot_pass');
    }
    async function loginRequest() {
        try {
          await fetch('https://hansin.nezasoft.net/api/single_user/', {
            method: 'POST',
            body: JSON.stringify({
              username: username,
              password: password,
              AuthKey: key,
            }),
          })
            .then((respose) => {
              if (respose.ok) {
                return respose.json()
              }
              throw new Error('error')
            })
            .then((data) => {
              if (data.userID) {
                console.log(data);
                localStorage.setItem('user', data.userID);
                localStorage.setItem('fname', data.fName);
                router.push('/');
              } else if(data.status==0) {
                localStorage.clear();
                //set error
                alert("Wrong username / email");
               //console.log(data);
              }else{
                alert("Unknown error occured!");
              }
            })
        } catch (error) {
          console.log(error.message);
        }
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
            <Text style={styles.large_font}>Signin</Text>
            <TextInput style={styles.textInput} onChangeText={(username) => setUserName(username)} placeholder="Username" />
            <TextInput style={styles.textInput} placeholder="Password" onChangeText={(password) => setPassword(password)} secureTextEntry={true}/>
        
            <TouchableOpacity onPress={handleSignIn} style={styles.btn}>
                <Text style={{color:COLOR.white}}>Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword} style={styles.action_link}>
                <Text style={{color:COLOR.grey}}>Forgot Password?</Text>
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
        marginTop: "73%",
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
export default signin;

