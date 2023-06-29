import React,{useState,useEffect} from 'react';
import {Text, View,StyleSheet,SafeAreaView,ActivityIndicator,FlatList} from 'react-native';
import ChatTextComponent from '../../components/ChatTextComponent';
import Messages from '../../components/Messages';
import {Stack,  useGlobalSearchParams} from "expo-router";
import {FONT,COLOR,SIZE,images,icons,KEY} from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = KEY;
        
const reply = () => {
const params =  useGlobalSearchParams();
const chatID = params.id;
const [spinner, setSpinner] = useState(false);
const [nodata, setNoData] = useState(false);
const [data, setData] = useState([]);
const [senderName, setSenderName] = useState('');


async function getSenderName(){
    const sendername = await AsyncStorage.getItem('senderName');
    setSenderName(sendername);
}

async function requestData() {
    setSpinner(true);
      try {
        const userid = await AsyncStorage.getItem('userID');
        const chatid = await AsyncStorage.getItem('chatID');
        
        await fetch('https://messenger.nezasoft.net/api/messages/', {
          method: 'POST',
          body: JSON.stringify({
           clientID: userid,
            chatID: chatid,
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

            if (data) {

              if(data?.status!==0){ 
                 setData(data.data);
                 setNoData(false);
                // console.log(data); 
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
  return (
    <SafeAreaView style={{backgroundColor: COLOR.background, height: "100%"}}>
            {spinner ? (
                <>
                <Stack.Screen  options={{
                        headerStyle: {backgroundColor: COLOR.white},
                        headerShadowVisible: false,
                        headerTitle:"Loading...",
                        }}
                    />
                <ActivityIndicator style={{marginTop:"20%"}} animating = {spinner} size="large" color={COLOR.primary}  /> 
                </>
                    
            ): nodata ? ( 
                <>
                <Stack.Screen  options={{
                    headerStyle: {backgroundColor: COLOR.white},
                    headerShadowVisible: false,
                    headerTitle:"No Messages",
                    }}
                /> 
                 <ActivityIndicator style={{marginTop:"5%"}} animating = {spinner} size="large" color={COLOR.primary}  /> 
                <Text style={styles.noMessages}>No chats available at the moment. Please refresh!</Text>
                </> 
                
             ) : ( 
          
        <View>
            <Stack.Screen  options={{
                    headerStyle: {backgroundColor: COLOR.white},
                    headerShadowVisible: false,
                    headerTitle:"Conversation",
                    }}
                />
               <FlatList
                data={data}
                renderItem={({ item }) => 
                <Messages
                item={item} 
                />
               }
                keyExtractor={(item) => item.msgID}
            />
        </View>

        )}  
        <ChatTextComponent />
    </SafeAreaView>
    
  )
}

styles = StyleSheet.create({
    noMessages : {
        padding: 5,
        margin:5, 
        fontSize:SIZE.small,
        color : COLOR.white,
        fontFamily: FONT.Bold,
        backgroundColor: COLOR.primary,
        borderRadius: 5,
        alignItems : "center",
        justifyContent: "center",
    },

});
export default reply