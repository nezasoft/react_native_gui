import React from 'react'
import {FONT,COLOR,SIZE,images,icons} from "../../constants";
import { View,Text,TouchableOpacity, StyleSheet,Image} from "react-native";
const InvoiceHomeCard = ({item, viewInvoice}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={viewInvoice}>
            <TouchableOpacity style={styles.logoContainer}>
                <Image
                   source={icons.invoices} 
                    resizeMode='contain' 
                    style={styles.logImage}
                />
           </TouchableOpacity>
           <View style={styles.textContainer}>
            <Text style={styles.jobName} numberOfLines={1} >
                {item?.invoiceNo}
            </Text>

            <Text  style={styles.jobType}>
                {item?.prodName}
            </Text>

           </View>
        </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      padding: SIZE.small,
      borderRadius: SIZE.small,
      backgroundColor: "#FFF",
      shadowColor: COLOR.white,
    },
    logoContainer: {
      width: 50,
      height: 50,
      backgroundColor: COLOR.white,
      borderRadius: SIZE.medium,
      justifyContent: "center",
      alignItems: "center",
    },
    logImage: {
      width: "70%",
      height: "70%",
    },
    textContainer: {
      flex: 1,
      marginHorizontal: SIZE.small,
    },
    jobName: {
      fontSize: SIZE.small,
      fontFamily: FONT.Regular,
      color: COLOR.primary,
    },
    jobType: {
      fontSize: SIZE.xsmall,
      fontFamily: FONT.Regular,
      color: COLOR.gray,
      marginTop: 3,
      textTransform: "capitalize",
    },
  });
export default InvoiceHomeCard