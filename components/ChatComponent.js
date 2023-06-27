import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {COLOR,FONT, KEY,SIZE, images} from '../constants';
import {useRouter} from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatComponent = ({ item, viewMessage, selectedMsg }) => {
    //const navigation = useNavigation();
    const [messages, setMessages] = useState({});
    const router = useRouter();

    //👇🏻 Retrieves the last message in the array from the item prop
    useLayoutEffect(() => {
        //setMessages(item.messages[item.messages.length - 1]);
    }, []);

    ///👇🏻 Navigates to the Messaging screen
    const handleNavigation = () => {
         storeData(item);
        router.push(`/reply/${item.itemID}`);

    };

    async function  storeData(item){
      
        try{
          await AsyncStorage.setItem('chatID',item.itemID);
          await AsyncStorage.setItem('senderName', item.firstName);
        }catch(err){
          console.log(err);
          alert("Error saving data");
        }
      }; 

    return (
        <Pressable style={styles.cchat} onPress={handleNavigation}>
            <Ionicons
                name='person-circle-outline'
                size={40}
                color={COLOR.secondary}
                style={styles.cavatar}
            />

            <View style={styles.crightContainer}>
                <View>
                    <Text style={styles.cusername}>{item.firstName + " "  +  item.lastName}</Text>
                    <Text style={styles.cmessage}>
                        {item?.title ? item.title : "Tap to start chatting"}
                    </Text>
                </View>
                <View>
                    <Text style={styles.ctime}>
                        {item?.createdAt ? item.createdAt : "now"}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
  

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
      fontSize: SIZE.medium,
      fontFamily: FONT.Medium,
      marginBottom: 5,
      fontWeight: "bold",
  },
  cmessage: {
      fontSize: SIZE.small,
      opacity: 0.7,
      fontFamily: FONT.Regular,
  },
  crightContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      flex: 1,
  },
  ctime: {
      opacity: 0.5,
      fontFamily: FONT.Regular,
      fontSize: SIZE.xsmall,
  },
  });
export default ChatComponent;