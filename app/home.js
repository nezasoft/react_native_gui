import {View, Text, SafeAreaView, StyleSheet,Image, TouchableOpacity} from "react-native";
import {useState} from "react";
import {FONT,COLOR,SIZE,images,icons} from "../constants";
import {Stack, useRouter} from "expo-router";
//import Ionicons from "@expo/vector-icons/Ionicons";

const Home = () =>{
    const router = useRouter();
    const displayMenu = () =>{
        router.push('/menu');
    };
    const displayProfile = () =>{
        router.push('/profile');
    };
    return(
        <SafeAreaView styles={{flex:1, backgroundColor: COLOR.primary}}>
            <Stack.Screen  options={{
                headerStyle: {backgroundColor: COLOR.white},
                headerShadowVisible: false,
                headerLeft: () => (
                    <TouchableOpacity style={styles.menuBtnLeft} onPress={displayMenu}>
                        <Image  style={styles.iconSize} source={icons.stack} />
                    </TouchableOpacity>
                ),
                headerRight: () =>(
                    <TouchableOpacity style={styles.menuBtnRight} onPress={displayProfile}> <Image  style={styles.iconSize} source={icons.profile} /></TouchableOpacity>
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
        backgroundColor: COLOR.primary,
        borderRadius: 5,
        padding: 5,
        margin:10,
    },
    menuBtnRight : {
        backgroundColor: COLOR.primary,
        borderRadius: 5,
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

 