import React from 'react';
import {FONT,COLOR,SIZE,images,icons} from "../constants";
import {View, Text, StyleSheet,Image, TouchableOpacity} from "react-native";

const InvoiceList = ({item, selectedInvoice, viewInvoice}) => {
  return (
    <TouchableOpacity style={styles.container(selectedInvoice,item)} onPress={()=> viewInvoice(item)}>
            <TouchableOpacity>
                <Image source={icons.invoices} 
                resizeMode='contain'
                style={styles.iconSize}
                />
            </TouchableOpacity>
            <Text style={styles.itemName(selectedInvoice, item)} numberOfLines={1}>
                {item.prodName}
            </Text>

            <View style={styles.infoContainer}>
                <Text style={styles.itemNo(selectedInvoice, item)} numberOfLines={1}>
                 Inv # :   {item.invoiceNo}
                </Text>
            </View>

            <View style={styles.infoWrapper}>
                <Text style={styles.valid_date(selectedInvoice, item)}> Bill Date: {item.sysDate}</Text>
                <Text style={styles.valid_date(selectedInvoice, item)} >Valid Date :  {item?.valDate} </Text>
                <Text style={styles.valid_date(selectedInvoice, item)} >Status :  {item?.invStatus} </Text>
                

            </View>

        </TouchableOpacity>
  )
}
const styles = StyleSheet.create({

      iconSize : {
        height:30,
        width:30,
    },
    container: (selectedInvoice, item) => ({
      width: "98%",
      padding: 5,
      margin : 5,
      backgroundColor: selectedInvoice === item.invoiceID ? COLOR.primary : "#FFF",
      borderRadius: SIZE.medium,
      justifyContent: "space-between",
      shadowColor: COLOR.primary,

    }),
    logoContainer: (selectedInvoice, item) => ({
      width: 50,
      height: 50,
      backgroundColor: selectedInvoice === item.invoiceID ? "#FFF" : COLOR.white,
      borderRadius: SIZE.medium,
      justifyContent: "center",
      alignItems: "center",
    }),
    logoImage: {
      width: "70%",
      height: "70%",
    },
    itemName: (selectedInvoice, item) => ({
      fontSize: SIZE.medium,
      fontFamily: FONT.Medium,
      color: selectedInvoice === item.invoiceID ?  COLOR.white : "#B3AEC6" ,
      marginTop: SIZE.small / 1.5,
    }),
    infoContainer: {
      marginTop: SIZE.large,
    },
    itemNo: (selectedInvoice, item) => ({
      fontSize: SIZE.large,
      fontFamily: FONT.Medium,
      color: selectedInvoice === item.invoiceID ? COLOR.white : COLOR.primary,
    }),
    infoWrapper: {
      flexDirection: "row",
      marginTop: 5,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    valid_date: (selectedInvoice, item) => ({
      fontSize: SIZE.xsmall,
      fontFamily: FONT.Regular,
      color: selectedInvoice === item.invoiceID ? COLOR.white : COLOR.white,
      marginRight : 5,
      marginLeft : 5,
      backgroundColor: COLOR.secondary,
      borderRadius: 5,
      padding: 2,
    }),
    
 

});

export default InvoiceList