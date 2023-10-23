import {useState} from 'react';
import{View,Text,StyleSheet,Image} from "react-native";
import {FONT,COLOR,SIZE,images,icons} from "../constants";

const Invoice = ({data}) => {
  return (
    data?.map((item) => {
      console.log(item);
    
    <View   style={{margin:5, padding : 5, borderWidth : 1, borderRadius : 5, backgroundColor : COLOR.white}}>
    <View style={{flex :1 , flexDirection : "row",}}>
        <View style={{margin : 5, padding : 5, width : "20%"}}>
          <Image source={'https://hansin.nezasoft.net/images/logos/nerve_logo.png'} />                      
        </View>
        <View style={{margin : 5, padding : 5, width : "20%"}}>
            <Text style={{fontSize : SIZE.small, textAlign : "center", color : COLOR.primary}}>Bill Invoice</Text>
        </View>
        <View style={{margin : 5, padding : 5, width : "50%"}}>
            <Text style={styles.companyText}>Physical Address : {item.company.compEmail} </Text>
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
      <Text style={styles.contentInfo}>Bill Date : {item.invoice.sysDate}</Text>
      <Text style={styles.contentInfo}>Due Date : {item.invoice.valDate}</Text>
      <Text style={styles.contentInfo}>Invoice No : {item.invoice.invoiceNO}</Text>
      </View>
    </View>
    <View style={styles.banner}>
    <Text style={styles.contentHeader}>Customer Details</Text>
      <View style={{marginTop: 10,marginRight : 50, textAlign : "right"}}>
          <Text style={styles.contentInfo}>Client A/C : </Text>
          <Text style={styles.contentInfo}>Client Name : {item.invoice.clientName}</Text>
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
      <View><Text style={styles.billMenuItem}>{item.invoice.prodName} </Text></View>
      <View><Text style={styles.billMenuItem}>{item.item.item_desc} </Text></View>
      <View><Text style={styles.billMenuItem}>{item.item.remarks} </Text></View>
      <View><Text style={styles.billMenuItem}>{item.item.rate} </Text></View>
      <View><Text style={styles.billMenuItem}> {item.item.qty} </Text></View>
      <View><Text style={styles.billMenuItem}> {item.item.amount}  </Text></View>      
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
  )
}


const styles = StyleSheet.create({
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
   export default Invoice;