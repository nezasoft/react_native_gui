import {View, Text, SafeAreaView, StyleSheet,Image, TouchableOpacity} from "react-native";
import {useState} from "react";
import {FONT,COLOR,SIZE,images,icons} from "../constants";
import {Stack, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
//import Ionicons from "@expo/vector-icons/Ionicons";


const Home = () =>{

    const userid = readUserID();
    //const fname = AsyncStorage.getItem('fname');
    const router = useRouter();
    const displayMenu = () =>{
        router.push('/menu');
    };
    const displayProfile = () =>{
        router.push('/profile');
    };

   if(userid===null){
        router.push('/signin');
    }

    async function readUserID(){
        try{
           const userid = await AsyncStorage.getItem('userID');
    
           if(userid!==null){
                return userid;
    
           }else{
                //alert("Error occured fetching your data!");
                //redirect user to signin 
                router.push('/signin');
           }           
    
        }catch(err){
            alert(err);
    
        }
    }

    return(
        <SafeAreaView styles={{flex:1, backgroundColor: COLOR.primary}}>
            <Stack.Screen  options={{
                headerStyle: {backgroundColor: COLOR.white},
                headerShadowVisible: false,
                headerLeft: () => (
                    <TouchableOpacity style={styles.menuBtnLeft} onPress={displayMenu}>
                      <Text><Image  style={styles.iconSize} source={icons.stack} /></Text>  
                    </TouchableOpacity>
                ),
                headerRight: () =>(
                    <TouchableOpacity style={styles.menuBtnRight} onPress={displayProfile}>
                        <Text>
                         <Image  style={styles.iconSize} source={icons.profile} />
                         </Text>
                    </TouchableOpacity>
                ),
                headerTitle:"",
                }}
            />
            <View>
                <Text style={styles.headerText}>Welcome to my first app</Text>
                <Text style={styles.regularText}>Am excited!</Text>
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    headerText : {
        fontSize: SIZE.large,
        fontFamily: FONT.Bold,
        color: COLOR.primary,
        margin:10,
        padding: 10,
    },
    regularText: {
        fontSize: SIZE.small,
        fontFamily: FONT.Regular,
        color: COLOR.secondary,
        margin:10,
        padding: 10,
    },
    header : {
        backgroundColor: COLOR.secondary,
        color: COLOR.white,
        flex: 3,
        justifyContent: "center",
        alignItems: "center",


    },
    menuBtnLeft : {
        padding: 5,
        margin:10,
    },
    menuBtnRight : {
        padding: 5,
        margin:10,
    },
    iconSize : {
        height:30,
        width:30,

    },
}
  
);

export default Home;

 