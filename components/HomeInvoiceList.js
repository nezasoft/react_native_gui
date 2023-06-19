import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View,Text,TouchableOpacity,FlatList,ActivityIndicator, StyleSheet} from "react-native";
import {FONT,COLOR,SIZE,KEY,images,icons} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InvoiceHomeCard from "../components/cards/InvoiceHomeCard";
const key = KEY;
const HomeInvoiceList = () => {
    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState([]); 
    const [error, setError] = useState(null);
    const [nodata, setNoData] = useState(false);
    const router = useRouter();
    const [userid, setUserId] = useState('');
    const [cname, setClientName] = useState('');

    readUserData();
    if(userid===null){
        router.push('/signin');
    }

    async function readUserData(){
        try{
           const userid = await AsyncStorage.getItem('userID');
           const cname = await AsyncStorage.getItem('cname');
    
           if(userid!==null){               
           setUserId(userid);
           setClientName(cname);   
           }else{
                //alert("Error occured fetching your data!");
                //redirect user to signin 
                router.push('/signin');
           }           
    
        }catch(err){
            alert(err);
    
        }
    }


  async function requestData() {
    setSpinner(true);   
      try {
        await fetch('https://hansin.nezasoft.net/api/all_invoices/', {
          method: 'POST',
          body: JSON.stringify({
            clientID: userid,
            //clientID: 111,
            AuthKey: key,
            limit : 6,
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

     const [selectedInvoice, setSelectedInvoice] = useState();

     const viewInvoice = (item) => {
       router.push(`/invoice_detail/${item.invoiceID}`);
       setSelectedInvoice(item.invoiceID);
     };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Recent Invoices</Text>
      <TouchableOpacity onPress={requestData}>
        <Text style={styles.headerBtn}>Refresh</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.cardsContainer}>
          
      {spinner ? (
         <ActivityIndicator animating = {spinner} size="large" color="#2e3192"   /> 

      ): nodata ? (  
        <Text style={{padding: 5, margin:5, fontSize:SIZE.large, color : COLOR.secondary}}>No data available at the moment. Please refresh!</Text>
      ) : ( 
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <InvoiceHomeCard
              item={item}
              viewInvoice={viewInvoice}
            />
          )}
          keyExtractor={(item) => item.invoiceID}
          contentContainerStyle={{ columnGap: SIZE.medium }}
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
  
export default HomeInvoiceList