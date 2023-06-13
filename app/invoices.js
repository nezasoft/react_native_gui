import {View, Text, SafeAreaView,ScrollView, StyleSheet,Image,ActivityIndicator, TouchableOpacity} from "react-native";
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
    const [error, setError] = useState(null);
    const router = useRouter();
 
    //readUserData();
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
            //clientID: userid,
            clientID: 103,
            AuthKey: key,
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
              //console.log(data); 
              setData(data.data);
            } else if(data.status==0) {
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


  return (
    <SafeAreaView styles={{flex:1, backgroundColor: COLOR.primary}}>
      <Stack.Screen  options={{
                headerStyle: {backgroundColor: COLOR.white},
                headerShadowVisible: false,               
                headerTitle:"Invoices",
                }}
            />
<View>
            <View >
                <Text >
                    Invoices
                </Text>
                <TouchableOpacity >
                    <Text>Show all</Text>
                </TouchableOpacity>
            </View>
            
            <View>
                {spinner ? (
                     <ActivityIndicator animating = {spinner} size="large" color="#170190"  />      
                ) : (
                  
                    data?.map((invoice)=>{
                        <InvoiceList 
                        invoice={invoice}
                        key={`invoice-id-${invoice.invoiceID}`}
                        handleNavigate={()=> router.push(`/invoice_detail/${invoice.invoiceID}`)} 
                        />
                    })
                )}
            </View>
        </View>
    

    <View style={styles.footer}>
                
                <TouchableOpacity onPress={() => router.push("/home")}  style={styles.iconStyle}><Image source={icons.home} style={styles.iconSize}/></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/invoices")}  style={styles.iconStyle}><Image source={icons.invoices} style={styles.iconSize}/></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/payments")}  style={styles.iconStyle}><Image source={icons.payment} style={styles.iconSize}/></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("/chat")}  style={styles.iconStyle}><Image source={icons.chat} style={styles.iconSize}/></TouchableOpacity>
                <TouchableOpacity onPress={() => {AsyncStorage.clear(); router.push("/signin")}}  style={styles.iconStyle}><Image source={icons.logout} style={styles.iconSize}/></TouchableOpacity>            
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



});
export default invoices