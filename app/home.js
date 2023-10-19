import {View, Text, SafeAreaView,ScrollView, StyleSheet,Image,ImageBackground,Pressable, TouchableOpacity} from "react-native";
import {useState} from "react";
import {FONT,COLOR,SIZE,images,icons} from "../constants";
import {Stack, useRouter} from "expo-router";
import { NavigationContainer } from '@react-navigation/native';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import HomeInvoiceList from "../components/HomeInvoiceList";
import HomeReceiptList from "../components/HomeReceiptList";
import HomeUserProfile from "../components/HomeUserProfile";
import HomeServiceProfile from "../components/HomeServiceProfile";
import AccountBalance from "../components/AccountBalance";
import {SimpleLineIcons,MaterialIcons,MaterialCommunityIcons,FontAwesome} from "@expo/vector-icons";
 

SplashScreen.preventAutoHideAsync();
//import Ionicons from "@expo/vector-icons/Ionicons";
//AsyncStorage.clear();
const Home = () =>{
    const [userid, setUserId] = useState('');
    const [cname, setClientName] = useState('');
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
           const cname = await AsyncStorage.getItem('cname');
    
           if(userid!==null){               
           setUserId(userid);
           setClientName(cname);   
           }else{
                //alert("Error occured fetching your data!");
                //redirect user to signin 
                router.push('/signin');
           }           
    
        }catch(err){
            alert(err);
    
        }
    }

    function Home({ navigation }) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Welcome to our Home Screen</Text>
          <Text>Checkout screens from the tab below</Text>
           <Pressable
            onPress={() => navigation.openDrawer()}
            style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
          >
          <Text>Open Drawer</Text>
          </Pressable>
        </View>
      );
    }
    
    function Conference({ navigation }) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{fontSize: 20}}>Conference Details</Text>
          <Pressable
            onPress={() => navigation.navigate('Story')}
            style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
          >
          <Text>Go to Story</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.openDrawer()}
            style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
          >
          <Text>Open Drawer</Text>
          </Pressable>
        </View>
      );
    }
    
    function Story({ navigation }) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{fontSize: 20}}>Our Story</Text>
           <Pressable
            onPress={() => navigation.navigate('Conference')}
            style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
          >
          <Text>Go to Conference</Text>
          </Pressable>
        </View>
      );
    }
    const Drawer = createDrawerNavigator();

    return(
      
    <>
    
    <SafeAreaView styles={{flex:1, backgroundColor: COLOR.white}}> 

            <Stack.Screen  options={{
                headerStyle: {backgroundColor: COLOR.white},
                headerShadowVisible: false,
                headerLeft: () => (
                    <Pressable onPress={() => {}} style={styles.menuBtnLeft}>
                      <Text><Image  style={{width:25, height:25}} source={icons.stack} /></Text>  
                    </Pressable>
                ),
                headerRight: () =>(
                    <Pressable style={styles.menuBtnRight} onPress={displayProfile}>
                        <Text>
                         <Image  style={{width:25, height:25}} source={icons.profile} />
                         </Text>
                    </Pressable>
                ),
                headerTitle:"Home",
                }}
            />
         <ScrollView showsVerticalScrollIndicator={true} style={{backgroundColor: COLOR.background}}>
            <View style={{backgroundColor: COLOR.secondary, height:60}}>
            <ImageBackground source={images.pic1} style={{height:"100%", width:"100%"}}>
                <Text style={styles.headerText}>Hello, {`${cname}`} </Text>
                <Text style={{color:COLOR.white, margin:3, fontSize: SIZE.small,fontFamily: FONT.Regular}} >Welcome back! Its nice to see you </Text>
                </ImageBackground>
            </View>                     
            <View>
                <AccountBalance/>
                <View style={{margin:5,padding:5, borderColor: "#2e3192"}}>
                    <HomeInvoiceList /> 
                    <HomeReceiptList />
                    <HomeUserProfile /> 
                    <HomeServiceProfile />   
                </View>      
            </View>
            </ScrollView>
            <View style={styles.footer}>               
                <TouchableOpacity onPress={() => router.push("/home")}  style={styles.iconStyle}><Image source={icons.home} style={styles.iconSize}/><Text style={{fontSize:SIZE.xsmall,fontFamily: FONT.Regular}}>Home</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/invoices")}  style={styles.iconStyle}><Image source={icons.invoices} style={styles.iconSize}/><Text style={{fontSize:SIZE.xsmall,fontFamily: FONT.Regular}}>Invoices</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/payments")}  style={styles.iconStyle}><Image source={icons.payment} style={styles.iconSize}/><Text style={{fontSize:SIZE.xsmall,fontFamily: FONT.Regular}}>Payments</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/chat")}  style={styles.iconStyle}><Image source={icons.chat} style={styles.iconSize}/><Text style={{fontSize:SIZE.xsmall,fontFamily: FONT.Regular}}>Chat</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {AsyncStorage.clear(); router.push("/signin")}}  style={styles.iconStyle}><Image source={icons.logout} style={styles.iconSize}/><Text style={{fontSize:SIZE.xsmall,fontFamily: FONT.Regular}}>Logout</Text></TouchableOpacity>            
            </View>
        </SafeAreaView>

    </>
    );
};



const styles = StyleSheet.create({
    headerText : {
        fontSize: SIZE.medium,
        fontFamily: FONT.Bold,
        color: COLOR.white,
        margin: 5,
        padding: 5,
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
        padding: 1,
    },
footer : { 
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZE.xsmall,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    fontFamily: FONT.Regular,
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

 