import React, {useState,useEffect} from 'react';
import {Text, View, ScrollView,StyleSheet,TextInput,Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import {FONT,COLOR,SIZE,images,icons,KEY} from "../constants";
import {useRouter,Stack} from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
const key = KEY;

const signin = () => {
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [spinner, setSpinner] = useState(false);
    const router = useRouter();
    
    const handleSignIn = () =>{
   
          if(username.length==0){
            alert("Please enter username or email")
          }else if(password.length==0){
                alert("Please enter your password!");
          }else{                   
            loginRequest();                 
          }  
        
    };

     

    async function loginRequest() {
      setSpinner(true);   
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
                //console.log(data);             
                storeData(data.userID);
                AsyncStorage.setItem('cname', data.clientName);
                router.push('/home');
              } else if(data.status==0) {
                AsyncStorage.clear();
                //set error
                alert("Wrong username / email");
               //console.log(data);
              }else{
                alert("Unknown error occured!");
              }
            })
            
        } catch (error) {
          console.log(error);
        }

        setSpinner(false);
      }

     async function  storeData(data){
        try{
          await AsyncStorage.setItem('userID',data);
        }catch(err){
          console.log(err);
          alert("Error saving data");
        }
      };
    
  return (
    <View  style={styles.mainContent} >  
    <Stack.Screen  options={{
        headerStyle: {backgroundColor: COLOR.white},
        headerShadowVisible: false,
        headerTitle:"",
        }}
    /> 
   
    <ScrollView style={{marginTop:"5%"}}>
        
        <View style={styles.inputForm}>
        <View style={styles.logo}>
            <Image source={images.logo} style={{width:200,height:52}}   />
        </View>
            <Text style={styles.large_font}>Signin</Text>
            <TextInput style={styles.textInput} onChangeText={(username) => setUserName(username)} placeholder="Username" />
            <TextInput style={styles.textInput} placeholder="Password" onChangeText={(password) => setPassword(password)} secureTextEntry={true}/>
            {// show spinner when sening request. other wise show buttonr
             spinner===true ?
             <ActivityIndicator animating = {spinner} size="small" color="#170190"  />
             : 
            <TouchableOpacity onPress={handleSignIn} style={styles.btn}>
                <Text style={{color:COLOR.white}}>Sign In</Text>
            </TouchableOpacity>
            
          }
            
      
             <TouchableOpacity onPress={() => router.push("/forgot_pass")} style={styles.action_link}>
             <Text style={{color:COLOR.grey}}>Forgot Password?</Text>
              </TouchableOpacity>
            
            

            
            
        </View>
        
    </ScrollView>
    </View>
 
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
        borderWidth: 1,
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
        backgroundColor: COLOR.secondary,
        height:"100%",
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

