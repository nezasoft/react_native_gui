import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View,Text,TouchableOpacity,FlatList,ActivityIndicator, StyleSheet} from "react-native";
import {FONT,COLOR,SIZE,KEY,images,icons} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InvoiceHomeCard from "../components/cards/ReceiptHomeCard";
const key = KEY;
const HomeReceiptList = () => {
    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState([]); 
    const [error, setError] = useState(null);
    const [nodata, setNoData] = useState(false);
    const router = useRouter();

  async function requestData() {
    setSpinner(true);   
      try {
        const userid = await AsyncStorage.getItem('userID');
        await fetch('https://hansin.nezasoft.net/api/all_payments/', {
          method: 'POST',
          body: JSON.stringify({
            clientID: userid,
            //clientID: 111,
            AuthKey: key,
            limit : 4,
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
               // console.log(data); 
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

     const [selectedReceipt, setSelectedReceipt] = useState();

     const viewReceipt = (item) => {
       router.push(`/payment_detail/${item.invoiceID}`);
       setSelectedReceipt(item.receiptID);
     };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Recent Payments</Text>
    </View>

    <View style={styles.cardsContainer}>
          
      {spinner ? (
         <ActivityIndicator animating = {spinner} size="large" color={COLOR.primary}   /> 

      ): nodata ? (  
        <Text style={{padding: 5, margin:5, fontSize:SIZE.small, color : COLOR.secondary}}>No data available at the moment. Please refresh!</Text>
      ) : ( 
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <InvoiceHomeCard
              item={item}
              viewReceipt={viewReceipt}
            />
          )}
          keyExtractor={(item) => item.receiptID}
          contentContainerStyle={{ columnGap: SIZE.small }}
          horizontal
        />
      )}
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
    container: {
      marginTop: SIZE.xlarge,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerTitle: {
      fontSize: SIZE.large,
      fontFamily: FONT.Medium,
      color: COLOR.primary,
    },
    headerBtn: {
      fontSize: SIZE.small,
      fontFamily: FONT.Medium,
      color: COLOR.white,
      borderRadius : 5,
      backgroundColor: COLOR.secondary,
      padding : 5,
    },
    cardsContainer: {
      marginTop: SIZE.medium,
    },
  });
  
export default HomeReceiptList