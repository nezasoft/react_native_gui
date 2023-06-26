import React from 'react';
import {Text, View,StyleSheet,SafeAreaView,Pressable,FlatList} from 'react-native';
import ChatTextComponent from '../components/ChatTextComponent';



const compose = () => {
  return (
    <SafeAreaView>
        <View>
             <Text>New Message</Text>
        </View>
        <ChatTextComponent />
    </SafeAreaView>
    
  )
}

export default compose