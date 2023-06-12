import {View, Text, SafeAreaView,ScrollView, StyleSheet,Image, TouchableOpacity} from "react-native";
import {useState} from "react";
import {FONT,COLOR,SIZE,images,icons} from "../constants";
import {Stack, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
//import Ionicons from "@expo/vector-icons/Ionicons";

//AsyncStorage.clear();

const Home = () =>{


    const [userid, setUserId] = useState('');
    const [fname, setFName] = useState('');
    const router = useRouter();
    readUserData();
    const displayMenu = () =>{
        router.push('/menu');
    };
    const displayProfile = () =>{
        router.push('/profile');
    };

  if(userid===null){
        router.push('/signin');
    }

    async function readUserData(){
        try{
           const userid = await AsyncStorage.getItem('userID');
           const fname = await AsyncStorage.getItem('fname');
    
           if(userid!==null){               
           setUserId(userid);
           setFName(fname);   
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
                headerStyle: {backgroundColor: COLOR.secondary},
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
            <View style={{backgroundColor: COLOR.secondary, height:"8%"}}>
                <Text style={styles.headerText}>Hello, {`${fname}`} </Text>
                <Text style={{color:COLOR.white, margin:4, fontSize: SIZE.medium}} >Welcome back! Its nice to see you </Text>
            </View>
            <View>
            <View style={[styles.homeCardItem, styles.shadowProp]}>
                <Text style={styles.headerText}> <Image source={icons.invoices} style={styles.iconSize}/> Invoices</Text>
                <Text>Item 2</Text>
            </View>
            <View style={{flexDirection:"column", justifyContent:"space-between",  margin:5,height: "28%", borderWidth:1, borderRadius: 5,padding:5}}>
                <Text>Item 1</Text>
                <Text>Item 2</Text>
            </View>
            <View style={{flexDirection:"column", justifyContent:"space-between",  margin:5,height: "28%", borderWidth:1, borderRadius: 5,padding:5}}>
                <Text>Item 1</Text>
                <Text>Item 2</Text>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity onPress={() => router.push("/home")}  style={styles.iconStyle}><Image source={icons.home} style={styles.iconSize}/></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/invoices")}  style={styles.iconStyle}><Image source={icons.invoices} style={styles.iconSize}/></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/payments")}  style={styles.iconStyle}><Image source={icons.payment} style={styles.iconSize}/></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/chat")}  style={styles.iconStyle}><Image source={icons.chat} style={styles.iconSize}/></TouchableOpacity>
                <TouchableOpacity onPress={() => {AsyncStorage.clear(); router.push("/signin")}}  style={styles.iconStyle}><Image source={icons.logout} style={styles.iconSize}/></TouchableOpacity>
            </View>
            
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    headerText : {
        fontSize: SIZE.large,
        fontFamily: FONT.Bold,
        color: COLOR.white,
        margin: 4,

    },
    regularText: {
        fontSize: SIZE.small,
        fontFamily: FONT.Regular,
        color: COLOR.secondary,

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
    iconStyle : {
        borderWidth: 1,
        borderColor: COLOR.secondary,
        borderRadius: 5,
        padding: 2,
    },

    footer : { flexDirection :"row",  
    justifyContent:"space-between", 
    margin:5,height: "5%", 
    paddingLeft:5,
    paddingRight:5,
},
homeCardItem : {
    flexDirection:"column", 
    justifyContent:"space-between",
    margin:5,height: "28%", 
    borderWidth:1, 
    borderRadius: 5,
    padding:5,
    color : COLOR.white,


},
shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
}
  
);

export default Home;

 