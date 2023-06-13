import React from 'react';
import {FONT,COLOR,SIZE,images,icons} from "../constants";
import {View, Text, StyleSheet,Image, TouchableOpacity} from "react-native";

const InvoiceList = ({invoice,handleNavigate}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
            <TouchableOpacity style={styles.logoContainer}>
                <Image
                    source={icons.invoices}
                    resizeMode='contain'
                    style={styles.logImage}
                />
           </TouchableOpacity>
           <View style={styles.textContainer}>
            <Text style={styles.jobName} numberOfLines={1} >
                {invoice?.invoice_no}
            </Text>

            <Text  style={styles.jobType}>
                {invoice?.prodName}
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
        padding: SIZE.medium, 
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
        marginHorizontal: SIZE.medium,
      },
      jobName: {
        fontSize: SIZE.medium,
        fontFamily: "DMBold",
        color: COLOR.primary,
      },
      jobType: {
        fontSize: SIZE.small + 2,
        fontFamily: "DMRegular",
        color: COLOR.gray,
        marginTop: 3,
        textTransform: "capitalize",
      },
      iconSize : {
        height:30,
        width:30,
    },

});

export default InvoiceList