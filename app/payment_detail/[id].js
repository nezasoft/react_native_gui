import {Stack,  useGlobalSearchParams} from "expo-router";
import { useCallback, useState, useEffect } from "react";
import{Text,ScrollView,SafeAreaView,ActivityIndicator,RefreshControl, StyleSheet,Image} from "react-native";
import {FONT,COLOR,SIZE,images,icons,KEY} from "../../constants";
import Receipt from "../../components/Receipt";

import React from 'react';
const key = KEY;

const PaymentDetail = () => {
    const params = useGlobalSearchParams();
    const receipt_id = params.id;
    const [refreshing, setRefreshing] = useState(false);
    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState([]);
    const [nodata, setNoData] = useState(false);

    const onRefresh = useCallback(()=>{
        setRefreshing(true);
        refetch();
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
    
     },[]);
    
     const refetch = () => {
        requestData();
       };

       async function requestData() {
        setSpinner(true);   
          try {
            await fetch('https://hansin.nezasoft.net/api/single_payment/', {
              method: 'POST',
              body: JSON.stringify({
                receiptID: receipt_id,
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
           //console.log(data);
           
    
  return (
    <SafeAreaView styles={{flex:1, backgroundColor: COLOR.primary}}>
    <Stack.Screen  options={{
        headerStyle: {backgroundColor: COLOR.white},
        headerShadowVisible: false,               
        headerTitle:"Payment Detail",
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
              data?.map((item) => { 
                <Receipt
                 compEmail ={item.company.compEmail}
                 compLogo ={item.company.compLogo}
                 compMobile ={item.company.compMobile}
                 compName ={item.company.compName}
                 compPhy ={item.company.compPhy}
                 compVAT ={item.company.compVAT}
                 compWeb ={item.company.compWeb}
                 amount = {item.receipt.amount}
                 chqNo = {item.receipt.chqNo}
                 clientName = {item.receipt.clientName}
                 currDesc = {item.receipt.currDesc}
                 invoiceNo = {item.receipt.invoiceNo}
                 itemDesc = {item.receipt.itemDesc}
                 payMode = {item.receipt.payMode}
                 prodName = {item.receipt.prodName}
                 receiptID = {item.receipt.receiptID}
                 refNo = {item.receipt.refNo}
                 sysDate = {item.receipt.sysDate}
                 valDate = {item.receipt.valDate}                    
                />
              })
                
            )}

        </ScrollView>
        </SafeAreaView>
  )
}

styles = StyleSheet.create({
 

});
export default PaymentDetail