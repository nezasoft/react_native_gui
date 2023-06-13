import React, {useState} from 'react';
import {Text,View,StyleSheet,SafeAreaView,Image, TouchableOpacity} from 'react-native';
import {FONT,COLOR,SIZE,images,icons} from "../constants";
import {Stack, useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatGrid } from 'react-native-super-grid';

const menu = () => {
    const [userid, setUserId] = useState('');
    const [fname, setFName] = useState('');
    const [items, setItems] = React.useState([
        { name: 'TURQUOISE', code: '#1abc9c' },
        { name: 'EMERALD', code: '#2ecc71' },
        { name: 'PETER RIVER', code: '#3498db' },
        { name: 'AMETHYST', code: '#9b59b6' },
        { name: 'WET ASPHALT', code: '#34495e' },
        { name: 'GREEN SEA', code: '#16a085' },
        { name: 'NEPHRITIS', code: '#27ae60' },
        { name: 'BELIZE HOLE', code: '#2980b9' },
        { name: 'WISTERIA', code: '#8e44ad' },
        { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
        { name: 'SUN FLOWER', code: '#f1c40f' },
        { name: 'CARROT', code: '#e67e22' },
        { name: 'ALIZARIN', code: '#e74c3c' },
        { name: 'CLOUDS', code: '#ecf0f1' },
        { name: 'CONCRETE', code: '#95a5a6' },
        { name: 'ORANGE', code: '#f39c12' },
        { name: 'PUMPKIN', code: '#d35400' },
        { name: 'POMEGRANATE', code: '#c0392b' },
        { name: 'SILVER', code: '#bdc3c7' },
        { name: 'ASBESTOS', code: '#7f8c8d' },
      ]);
    const router = useRouter();
    readUserData();

    const displayMenu = () =>{
        router.push('/menu');
    };
    const displayProfile = () =>{
        router.push('/profile');
    };

    if(userid===null){
        router.push('/signin');
    }

    async function readUserData(){
        try{
           const userid = await AsyncStorage.getItem('userID');
           const fname = await AsyncStorage.getItem('fname');
    
           if(userid!==null){               
           setUserId(userid);
           setFName(fname);   
           }else{
                //alert("Error occured fetching your data!");
                //redirect user to signin 
                router.push('/signin');
           }           
    
        }catch(err){
            alert(err);
    
        }
    }
  return (
    <SafeAreaView styles={{flex:1, backgroundColor: COLOR.primary}}>
        <Stack.Screen  options={{
                headerStyle: {backgroundColor: COLOR.white},
                headerShadowVisible: false,
                headerLeft: () => (
                    <TouchableOpacity style={styles.menuBtnLeft} onPress={displayMenu}>
                      <Text><Image  style={{width:25, height:25}} source={icons.stack} /></Text>  
                    </TouchableOpacity>
                ),
                headerRight: () =>(
                    <TouchableOpacity style={styles.menuBtnRight} onPress={displayProfile}>
                        <Text>
                         <Image  style={{width:25, height:25}} source={icons.profile} />
                         </Text>
                    </TouchableOpacity>
                ),
                headerTitle:"Menu",
                textAlign: "center",
                }}
            />

<FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCode}>{item.code}</Text>
        </View>
      )}
    />


    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
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
    regularText: {
        fontSize: SIZE.small,
        fontFamily: FONT.Regular,
        color: COLOR.secondary,

    },
    header : {
        backgroundColor: COLOR.secondary,
        color: COLOR.white,
        flex: 3,
        justifyContent: "center",
        alignItems: "center",


    },
    menuBtnLeft : {
        padding: 5,
        margin:10,
    },
    menuBtnRight : {
        padding: 5,
        margin:10,
    },
    iconSize : {
        height:30,
        width:30,
    },
    iconStyle : {
        padding: 1,
    },

footer : { 
    flexDirection :"row",  
    justifyContent:"space-between", 
    height: "5%", 
    paddingLeft:5,
    paddingRight:5,
},
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },

}
  
);

export default menu