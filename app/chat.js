import React, {useState,useEffect} from 'react';
import {Stack, useRouter} from 'expo-router';
import {Text, View,StyleSheet,SafeAreaView,Pressable,FlatList, ActivityIndicator} from 'react-native';
import { Feather } from "@expo/vector-icons";
import {COLOR,FONT, KEY,SIZE, images} from '../constants';
import ChatComponent from '../components/ChatComponent';
import AsyncStorage from "@react-native-async-storage/async-storage";
const key = KEY;

const chat = () => {
    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState([]);
    const [nodata, setNoData] = useState(false);
    const [selectedMsg, setSelectedMsg] = useState();
    const [userid, setUserID] = useState('');
    const router = useRouter();

    //lets get all the chat messages
    async function requestData() {
        setSpinner(true);   
          try {
            const userid = await AsyncStorage.getItem('userID');
            await fetch('https://messenger.nezasoft.net/api/', {
              method: 'POST',
              body: JSON.stringify({
               clientID: userid,
                //clientID: 111,
                AuthKey: key,
                limit : 1000,
              }),
            })
              .then((respose) => {
                if (respose.ok) {
                  return respose.json()
                }
                throw new Error('error')
              })
              .then((data) => {
    
                if (data) {
    
                  if(data?.status!==0){ 
                     setData(data.data);
                     setNoData(false);
                     //console.log(data); 
                  }else{
                    //console.log(data); 
                     //console.log("No data returned!"); 
                     setNoData(true);
                  }
                 }else{
                   alert("Unknown error occured!");
                 }  
              })
              
            } catch (error) {
              //setError(error);
              console.log(error);
            }
    
          setSpinner(false);
        }
    
        useEffect(()=>{
          requestData();
         },[]);


    const composeMsg = () => {
        router.push('/compose');
    };

  return (
    <SafeAreaView style={styles.chatscreen}>
            <Stack.Screen  options={{
                headerStyle: {backgroundColor: COLOR.white},
                headerShadowVisible: false,
                headerRight: () =>(
                  <Pressable onPress={composeMsg}>
                      <Feather name='edit' size={20} color='#2e3192' />
                  </Pressable>
                ),
                headerTitle:"Messages",
                }}
            />
            <View style={styles.chatlistContainer}>
            {spinner ? (
                     <ActivityIndicator style={{marginTop:"20%"}} animating = {spinner} size="large" color={COLOR.primary}  /> 
            ): nodata ? (  
                <View style={styles.chatemptyContainer}>
                <Text style={styles.chatemptyText}>No messages!</Text>
                <Text style={{fontSize:SIZE.small, fontFamily: FONT.Medium, color: COLOR.white}}>Click the icon above to compose message!</Text>
               </View>
             ) : ( 
                    
                <FlatList
                data={data}
                renderItem={({ item }) => 
                <ChatComponent 
                item={item} 
                />
            }
                keyExtractor={(item) => item.itemID}
            />
            )}          
            </View>    
        </SafeAreaView>
  )
}

export default chat

const styles = StyleSheet.create({
  chatscreen: {
    backgroundColor: COLOR.background,
    flex: 1,
    padding: 10,
    position: "relative",
},
chatheading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e3192",
},
chattopContainer: {
    backgroundColor: "#F7F7F7",
    height: 70,
    width: "100%",
    padding: 20,
    justifyContent: "center",
    marginBottom: 15,
    elevation: 2,
},
chatheader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
},
chatlistContainer: {
    paddingHorizontal: 10,
},
chatemptyContainer: {
    width: "100%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLOR.secondary,
    borderColor: COLOR.white,
    borderWidth: 1,
    borderRadius: 20,
    marginTop: "50%",
},
chatemptyText: {color: COLOR.white, fontFamily:FONT.Medium,  fontWeight: "bold", fontSize: 24, paddingBottom: 10 },
messagingscreen: {
    flex: 1,
},
messaginginputContainer: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
},
messaginginput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    marginRight: 10,
    borderRadius: 20,
},
messagingbuttonContainer: {
    width: "30%",
    backgroundColor: "green",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
},
modalbutton: {
    width: "40%",
    height: 45,
    backgroundColor: "green",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
},
modalbuttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
},
modaltext: {
    color: "#fff",
},
modalContainer: {
    width: "100%",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    elevation: 1,
    height: 400,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    paddingVertical: 50,
    paddingHorizontal: 20,
},
modalinput: {
    borderWidth: 2,
    padding: 15,
},
modalsubheading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
},
mmessageWrapper: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 15,
},
mmessage: {
    maxWidth: "50%",
    backgroundColor: "#f5ccc2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 2,
},
mvatar: {
    marginRight: 5,
},
cchat: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    height: 80,
    marginBottom: 10,
},
cavatar: {
    marginRight: 15,
},
cusername: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
},
cmessage: {
    fontSize: 14,
    opacity: 0.7,
},
crightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
},
ctime: {
    opacity: 0.5,
},
});