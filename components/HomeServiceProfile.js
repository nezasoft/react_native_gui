import React,{useEffect} from 'react';
import {View,Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FONT,COLOR,SIZE,KEY,images,icons} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeServiceProfile = () => {

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

  return (
    <>
     <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.headerTitle}>user Profile</Text>
        <TouchableOpacity onPress={requestData}>
            <Text style={styles.headerBtn}>Refresh</Text>
        </TouchableOpacity>
        </View>

    <View style={{backgroundColor: COLOR.primary, margin:5, padding:5,borderRadius:5}}>
        <Text>Home User Profile</Text>
    </View>
</View>
    
    </>
   
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
  
export default HomeServiceProfile