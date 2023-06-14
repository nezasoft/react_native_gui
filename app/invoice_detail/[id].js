import {Stack, useRouter, useGlobalSearchParams} from "expo-router";
import { useCallback, useState, useEffect } from "react";
import{View,Text,ScrollView,SafeAreaView,ActivityIndicator,RefreshControl} from "react-native";
import {FONT,COLOR,SIZE,images,icons,KEY} from "../../constants";

import React from 'react';
const key = KEY;

const InvoiceDetail = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const invoice_id = params.id;
    const [refreshing, setRefreshing] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState([]);
    

    const onRefresh = useCallback(()=>{
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    
     },[]);
    
     const refetch = () => {
        requestData();
       };

       async function requestData() {
        setSpinner(true);   
          try {
            await fetch('https://hansin.nezasoft.net/api/single_invoice/', {
              method: 'POST',
              body: JSON.stringify({
                //clientID: userid,
                invoiceID: invoice_id,
                AuthKey: key,
                limit : 1,
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
                  console.log(data); 
                  setData(data.data);
                } else if(data?.status===0) {
                  //set error
                  alert("No record(s) found!");
                 //console.log(data);
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
    <SafeAreaView styles={{flex:1, backgroundColor: COLOR.primary}}>
    <Stack.Screen  options={{
        headerStyle: {backgroundColor: COLOR.white},
        headerShadowVisible: false,               
        headerTitle:"Invoice Detail",
        }}
    /> 
    <ScrollView showsVerticalScrollIndicator={false}
        RefreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
            {spinner? (
                <ActivityIndicator style={{marginTop : 5}} size='large' color={COLOR.secondary} />
            ) : data?.status==0 ? (
                <Text style={{padding: 5, margin:5, fontSize:SIZE.large, color : COLOR.secondary}}>No data available</Text>
            ) : (
                <View style={{margin:5, padding : 5, borderWidth : 1, borderRadius : 5, backgroundColor : COLOR.white}}>
                    
                    <View style={{flex :1 , flexDirection : "row",}}>
                        <View style={{margin : 5, padding : 5, width : "20%"}}>
                            <Text>Logo</Text>
                        </View>
                        <View style={{margin : 5, padding : 5, width : "20%"}}>
                            <Text style={{fontSize : SIZE.large, textAlign : "center", color : COLOR.primary}}>Bill Invoice</Text>
                        </View>
                        <View style={{margin : 5, padding : 5, width : "50%"}}>
                            <Text style={{fontSize : SIZE.xsmall, textAlign : "right"}}>Physical Address : </Text>
                            <Text style={{fontSize : SIZE.xsmall, textAlign : "right"}}>Postal Address : </Text>
                            <Text style={{fontSize : SIZE.xsmall, textAlign : "right"}}>Telephone No : </Text>
                            <Text style={{fontSize : SIZE.xsmall, textAlign : "right"}}>Mobile No : </Text>
                            <Text style={{fontSize : SIZE.xsmall, textAlign : "right"}}>Email Address: </Text>
                            <Text style={{fontSize : SIZE.xsmall, textAlign : "right"}}>Website: </Text>
                        </View>                                             
                    </View>

                    <View style={{margin : 5, padding : 5, width : "95%", borderWidth : 1}}>

                    </View>
                    
                    <Text>Invoice Content Here</Text>

                </View>
            )}

        </ScrollView>
        </SafeAreaView>
  )
}

export default InvoiceDetail