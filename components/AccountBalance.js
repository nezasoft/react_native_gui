import React, {useState,useEffect} from 'react';
import {View, Text,ActivityIndicator} from 'react-native';
import {FONT,COLOR,SIZE,KEY,images,icons} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = KEY;
const AccountBalance = () => {
const key = KEY;
    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState([]); 
    const [nodata, setNoData] = useState(false);


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
    {spinner ? (
        <ActivityIndicator style={{marginTop:"20%"}} animating = {spinner} size="large" color={COLOR.primary}   />              
    ): nodata ? (  
        <Text style={{padding: 5, margin:5, fontSize:SIZE.small, color : COLOR.secondary}}>No data available at the moment. Please refresh!</Text>
    ) : ( 
    <View style={{padding:5, margin: 5, backgroundColor: COLOR.secondary, alignItems:"center"}}>
       <Text style={{fontFamily: FONT.Regular,fontSize : SIZE.small, color: COLOR.white}}>Current Balance:</Text>
        <Text style={{fontFamily: FONT.Regular,fontSize : SIZE.large, color: COLOR.white}}>{data.currency} {data.accBalance}</Text>
       </View>
    )}
  </>
  )
}

export default AccountBalance