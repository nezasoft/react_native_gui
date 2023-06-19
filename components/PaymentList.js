import React from 'react';
import {FONT,COLOR,SIZE,images,icons} from "../constants";
import {View, Text, StyleSheet,Image, TouchableOpacity} from "react-native";

const PaymentList = ({item, selectedReceipt, viewReceipt}) => {

  return (
       <TouchableOpacity style={styles.container(selectedReceipt,item)} onPress={()=> viewReceipt(item)}>
     <View style={{flexDirection :"row",  justifyContent:"space-between", }}>
      <View>
            <TouchableOpacity>
                <Image source={icons.payment} 
                resizeMode='contain'
                style={styles.iconSize}
                />
            </TouchableOpacity>
      </View>
      <View>
            
            <Text style={styles.itemName(selectedReceipt, item)} numberOfLines={1}>
                {item.prodName}
            </Text>
            <View style={styles.infoContainer}>
                <Text style={styles.itemNo(selectedReceipt, item)} numberOfLines={1}>
                 Receipt # :   {item.receiptNo} Amount :   {item.curr_desc +  " "+ item.amount}
                </Text>
            </View>

            <View style={styles.infoWrapper}>
                <Text style={styles.green_pill}>Pay Mode: {item.payment_mode}</Text>
                <Text style={styles.valid_date(selectedReceipt, item)}>Pay Date: {item.sysDate}</Text>
                <Text style={styles.valid_date(selectedReceipt, item)}>Valid Date :  {item?.valDate} </Text>               
            </View>
      </View>      
  </View>
        </TouchableOpacity>
  )
}
const styles = StyleSheet.create({

    iconSize : {
      height:60, 
      width:60,

  },
  container: (selectedReceipt, item) => ({
    width: "98%",
    padding: 5,
    margin : 5,
    backgroundColor: selectedReceipt === item.receiptID ? COLOR.primary : "#FFF",
    borderRadius: 8,
    justifyContent: "space-between",
    shadowColor: COLOR.primary,

  }),
  logoContainer: (selectedReceipt, item) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedReceipt === item.receiptID ? "#FFF" : COLOR.white,
    borderRadius: SIZE.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  itemName: (selectedReceipt, item) => ({
    fontSize: SIZE.medium,
    fontFamily: FONT.Medium,
    color: selectedReceipt=== item.receiptID ?  COLOR.white : "#B3AEC6" ,
    marginTop: SIZE.small,
  }),
  infoContainer: {
    marginTop: SIZE.small,
  },
  itemNo: (selectedReceipt, item) => ({
    fontSize: 12,
    fontFamily: FONT.Medium,
    color: selectedReceipt === item.receiptID ? COLOR.white : COLOR.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  valid_date: (selectedReceipt, item) => ({
    fontSize: 8,
    fontFamily: FONT.Regular,
    color: selectedReceipt === item.receiptID ? COLOR.white : COLOR.white,
    marginRight : 5,
    marginLeft : 5,
    backgroundColor: COLOR.secondary,
    borderRadius: 5,
    padding: 2,
  }),
  red_pill: {
    fontSize: 10,
    fontFamily: FONT.Regular,
    color: COLOR.white,
    marginRight : 5,
    marginLeft : 5,
    backgroundColor: "#C4062C",
    borderRadius: 5,
    padding: 2,
  },

  green_pill: {
    fontSize: 8,
    fontFamily: FONT.Regular,
    color: COLOR.white,
    marginRight : 5,
    marginLeft : 5,
    backgroundColor:"#03A523",
    borderRadius: 5,
    padding: 2,
  },
  


});
export default PaymentList