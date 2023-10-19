import {Stack, useGlobalSearchParams} from "expo-router";
import { useCallback, useState, useEffect } from "react";
import{Text,ScrollView,SafeAreaView,ActivityIndicator,RefreshControl, StyleSheet,Image} from "react-native";
import {FONT,COLOR,SIZE,images,icons,KEY} from "../../constants";
import Invoice from "../../components/Invoice";

import React from 'react';
const key = KEY;

const InvoiceDetail = () => {
    const params = useGlobalSearchParams();
    const invoice_id = params.id;
    const [refreshing, setRefreshing] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState([]);
    const [nodata, setNoData] = useState(false);
   
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
           },[invoice_id]);
           //console.log(data);   
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
            { 
            
            spinner ? (
                <ActivityIndicator style={{marginTop : 5}} size='large' color={COLOR.secondary} />
            ) : nodata ? (
                <Text style={{padding: 5, margin:5, fontSize:SIZE.small, color : COLOR.secondary}}>No data available</Text>
            ) : (           
                <Invoice            
                data={data}               
                />                
            )}

        </ScrollView>
        </SafeAreaView>
  )
}

styles = StyleSheet.create({

});
export default InvoiceDetail