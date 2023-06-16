import {Stack, useRouter, useGlobalSearchParams} from "expo-router";
import { useCallback, useState, useEffect } from "react";
import{View,Text,ScrollView,SafeAreaView,ActivityIndicator,RefreshControl, StyleSheet,Image} from "react-native";
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
                 // console.log(data); 
                  setData(data.data);
                } else if(data?.status==0) {
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
            ) : data?.status==0 ? (
                <Text style={{padding: 5, margin:5, fontSize:SIZE.large, color : COLOR.secondary}}>No data available</Text>
            ) : (
              data?.map((item) => {               
                <View key={item.invoice.invoiceNo}  style={{margin:5, padding : 5, borderWidth : 1, borderRadius : 5, backgroundColor : COLOR.white}}>
                    <View style={{flex :1 , flexDirection : "row",}}>
                        <View style={{margin : 5, padding : 5, width : "20%"}}>
                          <Image source={'https://hansin.nezasoft.net/images/logos/logo_1.png'} />                      
                        </View>
                        <View style={{margin : 5, padding : 5, width : "20%"}}>
                            <Text style={{fontSize : SIZE.small, textAlign : "center", color : COLOR.primary}}>Bill Invoice</Text>
                        </View>
                        <View style={{margin : 5, padding : 5, width : "50%"}}>
                            <Text style={styles.companyText}>Physical Address : {item.company.compPhy} </Text>
                            <Text style={styles.companyText}>Postal Address : </Text>
                            <Text style={styles.companyText}>Mobile No : {item.company.compMobile}</Text>
                            <Text style={styles.companyText}>Email Address: {item.company.compEmail} </Text>
                            <Text style={styles.companyText}>Website: {item.company.compWeb} </Text>
                        </View>                                             
                    </View>

                    <View style={styles.banner}>
                      <Text style={styles.contentHeader}>Invoice Details</Text>
                      <View style={{marginTop: 10,marginRight : 50, textAlign : "right"}}>
                      <Text style={styles.contentInfo}>Company Name : {item.company.compName}</Text>
                      <Text style={styles.contentInfo}>VAT / PIN No :  {item.company.compVAT} </Text>
                      </View>
                      <View style={{marginTop: 10,marginLeft : 50, textAlign : "right"}}>
                      <Text style={styles.contentInfo}>Bill Date :</Text>
                      <Text style={styles.contentInfo}>Due Date :</Text>
                      <Text style={styles.contentInfo}>Invoice No :</Text>
                      </View>

                    </View>

                    <View style={styles.banner}>
                    <Text style={styles.contentHeader}>Customer Details</Text>
                      <View style={{marginTop: 10,marginRight : 50, textAlign : "right"}}>
                          <Text style={styles.contentInfo}>Client A/C :</Text>
                          <Text style={styles.contentInfo}>Client Name :</Text>
                          <Text style={styles.contentInfo}>Username :</Text>
                          
                      </View>
                      <View style={{marginTop: 10,marginLeft : 50, textAlign : "right"}}>
                      <Text style={styles.contentInfo}>Cellphone :</Text>
                      <Text style={styles.contentInfo}>Billing Address :</Text>
                      <Text style={styles.contentInfo}>Email Address :</Text>

                      </View>

                    </View>

                    <View style={styles.billInfo}>
                      <View><Text style={styles.billMenu}>Item  </Text></View>
                      <View><Text style={styles.billMenu}>Description </Text></View>
                      <View><Text style={styles.billMenu}>Billing Period </Text></View>
                      <View><Text style={styles.billMenu}>Unit Price </Text></View>
                      <View><Text style={styles.billMenu}> Qty </Text></View>
                      <View><Text style={styles.billMenu}> Total (Tax Inc.) </Text></View>      
                    </View>
                    <View style={styles.billInfoDetail}>
                      <View><Text style={styles.billMenuItem}>Item  </Text></View>
                      <View><Text style={styles.billMenuItem}>Description </Text></View>
                      <View><Text style={styles.billMenuItem}>Billing Period </Text></View>
                      <View><Text style={styles.billMenuItem}>Unit Price </Text></View>
                      <View><Text style={styles.billMenuItem}> Qty </Text></View>
                      <View><Text style={styles.billMenuItem}> Total  </Text></View>      
                    </View>

                    <View style={styles.bankDetails}>
                      <Text style={styles.contentHeader}>Bank Details</Text>
                        <View style={{marginTop:10}}>
                            <Text style={styles.bankItem}>Bank Name: </Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={styles.bankItem}>Account Name: </Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={styles.bankItem}>Account No: </Text>
                        </View>
                        <View style={{marginTop:10}}>
                            <Text style={styles.bankItem}>Branch Name: </Text>
                        </View>

                        
                    </View>
      

                </View>


              })
                
            )}

        </ScrollView>
        </SafeAreaView>
  )
}

styles = StyleSheet.create({
 contentHeader : {
  fontSize : SIZE.xsmall,
  fontWeight : "bold",
  color : COLOR.white,
  marginBottom : 5,
 },
 companyText : {
  fontSize : 8,
  textAlign : "right",
 },
 banner : {margin : 2,
   padding : 2,
   width : "95%",
   backgroundColor : COLOR.primary,
   flex : 1,
   flexDirection : "row",
  },
  contentInfo : {
    fontSize : 8,

  },
  billInfo : {
    borderWidth : 0.5,
    margin : 5,
    padding : 5,
    borderColor : COLOR.primary,
    flexDirection : "row",
    width : "95%",
    justifyContent:"space-between", 

  },
  billInfoDetail : {
    margin : 5,
    padding : 5,
    flexDirection : "row",
    width : "95%",
    justifyContent:"space-between", 

  },
  billMenu : {
    fontSize : 10,
    fontWeight : "bold",
    marginRight: 10,
  },

  billMenuItem : {
    fontSize : 8,
    fontWeight : "medium",
    marginRight: 10,
  },
  bankDetails : {
    margin : 5,
    padding : 5,
    flexDirection : "row",
    width : "95%",
    justifyContent:"space-between", 
    backgroundColor : COLOR.secondary,
  },
  bankItem : {
    fontSize : 8,
    fontWeight : "medium",
    marginRight: 10,
    color : COLOR.white,
  },

});
export default InvoiceDetail