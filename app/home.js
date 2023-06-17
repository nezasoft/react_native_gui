import {View, Text, SafeAreaView,ScrollView, StyleSheet,Image,ImageBackground, TouchableOpacity} from "react-native";
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

  /*if(userid===null){
        router.push('/signin');
    }
*/
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
                headerStyle: {backgroundColor: COLOR.white},
                headerShadowVisible: false,
                headerLeft: () => (
                    <TouchableOpacity style={styles.menuBtnLeft} onPress={displayMenu}>
                      <Text><Image  style={{width:25, height:25}} source={icons.stack} /></Text>  
                    </TouchableOpacity>
                ),
                headerRight: () =>(
                    <TouchableOpacity style={styles.menuBtnRight} onPress={displayProfile}>
                        <Text>
                         <Image  style={{width:25, height:25}} source={icons.profile} />
                         </Text>
                    </TouchableOpacity>
                ),
                headerTitle:"Home",
                }}
            />
            
            <View style={{backgroundColor: COLOR.secondary, height:"10%"}}>
            <ImageBackground source={images.pic1} style={{height:"100%"}}>
                <Text style={styles.headerText}>Hello, {`${fname}`} </Text>
                <Text style={{color:COLOR.white, margin:3, fontSize: SIZE.medium}} >Welcome back! Its nice to see you </Text>
                </ImageBackground>
            </View>                     
            <View>
                <View style={{padding:5, margin: 5, backgroundColor: COLOR.secondary, alignItems:"center"}}>
                    <Text style={{fontSize : SIZE.large, color: COLOR.white}}>Current Balance:</Text>
                    <Text style={{fontSize : SIZE.xlarge, color: COLOR.white}}>KES 10,500.00</Text>
                </View> 
                 
                    <View style={[styles.homeCardItem, styles.shadowProp]}>
                    
                        <Text style={styles.invoiceHeaderText}> <Image source={icons.invoices} style={{width:25, height:25}}/> Recent Invoices</Text>
                        <Text style={{color:COLOR.secondary}}>.....................................</Text>
                        <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
                            <View style={{flex:1,flexDirection:"row", justifyContent:"space-between"}}>
                                <View style={styles.invoiceCardItem}>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.large, color: COLOR.white,marginBottom:5}}>INV 12451</Text>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.medium, backgroundColor: COLOR.primary, color: COLOR.white,marginBottom: 5}}> 20 Mb Shared</Text>
                                        <Text style={{color : COLOR.white,fontSize: SIZE.small}}>1st July 2023</Text>
                                        <TouchableOpacity><Text style={styles.viewMore}>View</Text></TouchableOpacity>
                                </View>
                                <View style={styles.invoiceCardItem}>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.large, color: COLOR.white,marginBottom:5}}>INV 12451</Text>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.medium, backgroundColor: COLOR.primary, color: COLOR.white,marginBottom: 5}}> 20 Mb Shared</Text>
                                        <Text style={{color : COLOR.white,fontSize: SIZE.small}}>1st July 2023</Text>
                                        <TouchableOpacity><Text style={styles.viewMore}>View</Text></TouchableOpacity>
                                </View>
                                <View style={styles.invoiceCardItem}>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.large, color: COLOR.white,marginBottom:5}}>INV 12451</Text>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.medium, backgroundColor: COLOR.primary, color: COLOR.white,marginBottom: 5}}> 20 Mb Shared</Text>
                                        <Text style={{color : COLOR.white,fontSize: SIZE.small}}>1st July 2023</Text>
                                        <TouchableOpacity><Text style={styles.viewMore}>View</Text></TouchableOpacity>
                                </View>
                                <View style={styles.invoiceCardItem}>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.large, color: COLOR.white,marginBottom:5}}>INV 12451</Text>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.medium, backgroundColor: COLOR.primary, color: COLOR.white,marginBottom: 5}}> 20 Mb Shared</Text>
                                        <Text style={{color : COLOR.white,fontSize: SIZE.small}}>1st July 2023</Text>
                                        <TouchableOpacity><Text style={styles.viewMore}>View</Text></TouchableOpacity>
                                </View>
                             
                                
                          

                            </View>

                        </ScrollView>
                        <View><Text style={{ textAlign :"center", width:"40%", backgroundColor: COLOR.secondary,color: COLOR.white, borderRadius: 20, padding:5, margin: 5}}>View All Invoices  </Text></View>
                     
                    </View>
                
                    <View style={[styles.homeCardItem, styles.shadowProp]}>
                  
                        <Text style={styles.invoiceHeaderText }> <Image source={icons.payment} style={{width:25, height:25}}/> Recent payments</Text>
                        <Text style={{color:COLOR.secondary}}>.....................................</Text>
                        <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
                            <View style={{flex:1,flexDirection:"row", justifyContent:"space-between"}}>
                            <View style={styles.invoiceCardItemReverse}>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.large, color: COLOR.white,marginBottom:5}}> RECEIPT 12451</Text>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.medium, backgroundColor: COLOR.primary, color: COLOR.white,marginBottom: 5}}> 20 Mb Shared</Text>
                                        <Text style={{color : COLOR.white,fontSize: SIZE.small}}>1st July 2023</Text>
                                        <TouchableOpacity><Text style={styles.viewMore}>View</Text></TouchableOpacity>
                                </View>
                                <View style={styles.invoiceCardItemReverse}>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.large, color: COLOR.white,marginBottom:5}}> RECEIPT 12451</Text>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.medium, backgroundColor: COLOR.primary, color: COLOR.white,marginBottom: 5}}> 20 Mb Shared</Text>
                                        <Text style={{color : COLOR.white,fontSize: SIZE.small}}>1st July 2023</Text>
                                        <TouchableOpacity><Text style={styles.viewMore}>View</Text></TouchableOpacity>
                                </View>
                                <View style={styles.invoiceCardItemReverse}>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.large, color: COLOR.white,marginBottom:5}}> RECEIPT 12451</Text>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.medium, backgroundColor: COLOR.primary, color: COLOR.white,marginBottom: 5}}> 20 Mb Shared</Text>
                                        <Text style={{color : COLOR.white,fontSize: SIZE.small}}>1st July 2023</Text>
                                        <TouchableOpacity><Text style={styles.viewMore}>View</Text></TouchableOpacity>
                                </View>
                                <View style={styles.invoiceCardItemReverse}>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.large, color: COLOR.white,marginBottom:5}}> RECEIPT 12451</Text>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.medium, backgroundColor: COLOR.primary, color: COLOR.white,marginBottom: 5}}> 20 Mb Shared</Text>
                                        <Text style={{color : COLOR.white,fontSize: SIZE.small}}>1st July 2023</Text>
                                        <TouchableOpacity><Text style={styles.viewMore}>View</Text></TouchableOpacity>
                                </View>
                                <View style={styles.invoiceCardItemReverse}>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.large, color: COLOR.white,marginBottom:5}}> RECEIPT 12451</Text>
                                        <Text style={{fontWeight: "bold",fontSize: SIZE.medium, backgroundColor: COLOR.primary, color: COLOR.white,marginBottom: 5}}> 20 Mb Shared</Text>
                                        <Text style={{color : COLOR.white,fontSize: SIZE.small}}>1st July 2023</Text>
                                        <TouchableOpacity><Text style={styles.viewMore}>View</Text></TouchableOpacity>
                                </View>                                    
                            </View>                            
                        </ScrollView>

                        <View><Text style={{ textAlign :"center", width:"40%", backgroundColor: COLOR.primary,color: COLOR.white, borderRadius: 20, padding:5, margin: 5}}>View All Payments </Text></View>
                    </View>       
            </View>
            <View style={styles.footer}>
                
                <TouchableOpacity onPress={() => router.push("/home")}  style={styles.iconStyle}><Image source={icons.home} style={styles.iconSize}/></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/invoices")}  style={styles.iconStyle}><Image source={icons.invoices} style={styles.iconSize}/></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/payments")}  style={styles.iconStyle}><Image source={icons.payment} style={styles.iconSize}/></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/chat")}  style={styles.iconStyle}><Image source={icons.chat} style={styles.iconSize}/></TouchableOpacity>
                <TouchableOpacity onPress={() => {AsyncStorage.clear(); router.push("/signin")}}  style={styles.iconStyle}><Image source={icons.logout} style={styles.iconSize}/></TouchableOpacity>            
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
    invoiceHeaderText : {
        fontSize: SIZE.large,
        fontFamily: FONT.Bold,
        color: COLOR.secondary,
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
        padding: 1,
    },

footer : { 
    flexDirection :"row",  
    justifyContent:"space-between", 
    marginTop: 5,
    height: "4%", 
    paddingLeft:5,
    paddingRight:5,
},
homeCardItem : {
    flexDirection:"column", 
    justifyContent:"space-between",
    margin:5,
    height: "35%", 
    padding:5,
    color : COLOR.white,
    borderWidth : 1,
    borderColor : COLOR.secondary,
},
invoiceCardItem : {
    backgroundColor: COLOR.secondary,
    borderColor: COLOR.white,
    borderWidth: 1,
    borderRadius:5,
    height:"95%", 
    width:"25%",
    padding:5,
    margin:5,
},
invoiceCardItemReverse: {
    backgroundColor: COLOR.primary,
    borderColor: COLOR.white,
    borderWidth: 1,
    borderRadius:5,
    height:"95%", 
    width:"30%",
    padding:5,
    margin:5,
},
shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  viewMore : {
    color: COLOR.secondary,
    backgroundColor: COLOR.white,
    borderColor: COLOR.secondary,
    width: 35,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 8,
    padding:2,
    fontSize : SIZE.xsmall,
    textAlign :"center",


  },
}
  
);

export default Home;

 