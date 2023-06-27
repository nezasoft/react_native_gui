import React from 'react'
import {View,Text,StyleSheet,SafeAreaView,ImageBackground,TouchableOpacity,ActivityIndicator,FlatList} from 'react-native';
import {useState,useEffect} from "react";
import {FONT,COLOR,SIZE,images,icons,KEY} from "../constants";
import {Stack, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PaymentList from "../components/PaymentList";
const key = KEY;
const payments = () => {
    const [spinner, setSpinner] = useState(false);
    const [data, setData] = useState([]);
    const [nodata, setNoData] = useState(false);
    const [error, setError] = useState(null);
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
            limit : 1000,
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
       router.push(`/payment_detail/${item.receiptID}`);
       setSelectedReceipt(item.receiptID);
     };
     
  return (
    <SafeAreaView styles={{flex:1, backgroundColor: COLOR.primary}}>
      <Stack.Screen  options={{
                headerStyle: {backgroundColor: COLOR.white},
                headerShadowVisible: false,               
                headerTitle:"Payments",
                }}
            /> 
      <View style={{backgroundColor: COLOR.background, height : "100%"}}>
            <ImageBackground source={images.pic2} >
            <View >
                <Text style={styles.headerText}>
                    Payment Report
                </Text>
                <TouchableOpacity onPress={requestData}  >
                    <Text style={styles.viewMore}>Refresh</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
            <View>
                {spinner ? (
                     <ActivityIndicator style={{marginTop:"20%"}} animating = {spinner} size="large" color={COLOR.primary}  /> 
                      
                ): nodata ? (  
                      <Text style={{padding: 5, margin:5, fontSize:SIZE.small, color : COLOR.white}}>No data available at the moment. Please refresh!</Text>
                ) : ( 
                  
                  <FlatList
                  data={data}
                  renderItem={({ item }) => (
                    <PaymentList
                      item={item}
                      selectedReceipt={selectedReceipt}
                      viewReceipt={viewReceipt}
                    />
                  )}
                  keyExtractor={(item) => item.receiptID}
                  contentContainerStyle={{ columnGap: SIZE.medium }}
                  vertical
                />
                )}
            </View>
        </View> 

    </SafeAreaView>  
  )
}

const styles = StyleSheet.create({
  iconStyle : {
    padding: 1,
},
footer : { 
  flexDirection :"row",  
  justifyContent:"space-between", 
  marginTop: 5,
  height: "5%", 
  paddingLeft:5,
  paddingRight:5,
},
iconSize : {
  height:30,
  width:30,
},
mainContent : {

},
headerText : {
  fontSize: SIZE.large,
  fontFamily: FONT.Bold,
  color: COLOR.white,
  margin: 4,

},
invoiceHeaderText : {
  fontSize: SIZE.large,
  fontFamily: FONT.Bold,
  color: COLOR.secondary,
  margin: 4,

},
viewMore : {
  color: COLOR.white,
  backgroundColor: COLOR.secondary,
  borderColor: COLOR.white,
  width: 100,
  borderWidth: 1,
  borderRadius: 15,
  marginTop: 8,
  margin: 5,
  padding:2,
  fontSize : SIZE.medium,
  textAlign :"center",
}

});
export default payments