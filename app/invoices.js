import {View, Text, SafeAreaView,FlatList, StyleSheet,Image,ActivityIndicator,ImageBackground, TouchableOpacity} from "react-native";
import {useState,useEffect} from "react";
import {FONT,COLOR,SIZE,images,icons,KEY} from "../constants";
import {Stack, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InvoiceList from "../components/InvoiceList";
const key = KEY;
const invoices = () => {
    const [spinner, setSpinner] = useState(false);
    const [userid, setUserId] = useState('');
    const [data, setData] = useState([]);
    const [nodata, setNoData] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
 
    readUserData();
    async function readUserData(){
      try{
         const userid = await AsyncStorage.getItem('userID');
  
         if(userid!==null){               
         setUserId(userid);  
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


     const [selectedInvoice, setSelectedInvoice] = useState();

     const viewInvoice = (item) => {
       router.push(`/invoice_detail/${item.invoiceID}`);
       setSelectedInvoice(item.invoiceID);
     };

  return (
    <SafeAreaView styles={{flex:1, backgroundColor: COLOR.primary}}>
      <Stack.Screen  options={{
                headerStyle: {backgroundColor: COLOR.white},
                headerShadowVisible: false,               
                headerTitle:"Invoices",
                }}
            /> 
     
    <View style={{backgroundColor: COLOR.secondary, height : "100%"}}>
            <ImageBackground source={images.pic2} >
            <View >
                <Text style={styles.headerText}>
                    Invoice Report
                </Text>
                <TouchableOpacity onPress={requestData} >
                    <Text style={styles.viewMore}>Refresh</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
            <View>
                {spinner ? (
                     <ActivityIndicator style={{marginTop:"20%"}} animating = {spinner} size="large" color="#ffffff"   /> 
                      
                  ): nodata ? (  
                      <Text style={{padding: 5, margin:5, fontSize:SIZE.large, color : COLOR.white}}>No data available at the moment. Please refresh!</Text>
                 ) : ( 
                  
                  <FlatList
                  data={data}
                  renderItem={({ item }) => (
                    <InvoiceList
                      item={item}
                      selectedInvoice={selectedInvoice}
                      viewInvoice={viewInvoice}
                    />
                  )}
                  keyExtractor={(item) => item.invoiceID}
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
export default invoices