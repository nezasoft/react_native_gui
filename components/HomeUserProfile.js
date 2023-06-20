import React,{useEffect,useState} from 'react';
import { useRouter } from "expo-router";
import {View,Text, TouchableOpacity, StyleSheet,ActivityIndicator,} from 'react-native';
import {FONT,COLOR,SIZE,KEY,images,icons} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = KEY;
const HomeUserProfile = () => {
    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState([]); 
    const [error, setError] = useState(null);
    const [nodata, setNoData] = useState(false);
    const router = useRouter();

  async function requestData() {
    setSpinner(true);   
      try {
        const userid = await AsyncStorage.getItem('userID');
        await fetch('https://hansin.nezasoft.net/api/user_profile/', {
          method: 'POST',
          body: JSON.stringify({
            clientID: userid,
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
                setData(data);
                setNoData(false);
                console.log(data); 
             }else{
               console.log(data); 
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
    <>
     <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        </View>
        {spinner ? (
                     <ActivityIndicator style={{marginTop:"20%"}} animating = {spinner} size="large" color="#2e3192"   />              
        ): nodata ? (  
                      <Text style={{padding: 5, margin:5, fontSize:SIZE.small, color : COLOR.secondary}}>No data available at the moment. Please refresh!</Text>
        ) : ( 
    <View style={{justifyContent: "space-between",flexDirection:"row",backgroundColor: COLOR.primary, margin:5, padding:5,borderRadius:10,marginBottom:50}}>
        <View>
            <Text style={styles.profileText}>Account Name: </Text>
            <Text style={styles.profileText}>Email: </Text>
            <Text style={styles.profileText}>Mobile : </Text>
            <Text style={styles.profileText}>Tel. No: </Text>
            <Text style={styles.profileText}>Street: </Text>
        </View>
        <View>
            <Text style={styles.profileTextPill}>{data?.clientName} </Text>
            <Text style={styles.profileTextPill}>{data?.Email}</Text>
            <Text style={styles.profileTextPill}>{data?.mobileNo}</Text>
            <Text style={styles.profileTextPill}>{data?.telNo}</Text>
            <Text style={styles.profileTextPill}>{data?.street}</Text>
        </View>
        <View>
            <Text style={styles.profileText}>Service: </Text>
            <Text style={styles.profileText}>Username: </Text>
            <Text style={styles.profileText}>Acc. No: </Text>
            <Text style={styles.profileText}>Acc. Active: </Text>
            <Text style={styles.profileText}>Active Since: </Text>
        </View> 
        <View>
            <Text style={styles.profileTextPill}>{data?.prodName} </Text>
            <Text style={styles.profileTextPill}>{data?.Username} </Text>
            <Text style={styles.profileTextPill}>{data?.accNo}</Text>
            <Text style={styles.profileTextPill}>{data?.accStatus}</Text>
            <Text style={styles.profileTextPill}>{data?.activeSince}</Text>
        </View>
       
       
        
        
        
        
    </View>
    )}
</View>
    
    </>
   
  )
}

const styles = StyleSheet.create({
    container: {
      marginTop: SIZE.xlarge,
      height: 300,
      marginBottom: 5,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: SIZE.large,
      fontFamily: FONT.Medium,
      color: COLOR.primary,
    },
    headerBtn: {
      fontSize: SIZE.small,
      fontFamily: FONT.Medium,
      color: COLOR.white,
      borderRadius : 5,
      backgroundColor: COLOR.secondary,
      padding : 5,
    },
    cardsContainer: {
      marginTop: SIZE.medium,
    },
    profileText:{
        fontSize:SIZE.xsmall,
        fontFamily: FONT.Regular,
        margin:1,
        padding:1
    },
    profileTextPill:{
        fontSize:SIZE.xsmall,
        fontFamily: FONT.Regular,
        textAlign:"center",
        borderRadius:10, 
        backgroundColor:COLOR.secondary,
         color:COLOR.white,
         padding: 1,
         margin: 1,
    }
  });
  
export default HomeUserProfile