import {Stack} from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    //Ensure any route can link back to `/`
    initialRouteName: "/",
};

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMSansBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMSansRegular : require('../assets/fonts/DMSans-Regular.ttf'),
        DMSansMedium : require('../assets/fonts/DMSans-Medium.ttf'),
    });
 if(!fontsLoaded){
    return null;
 }

 SplashScreen.hideAsync();

 return (
    <Stack initialRouteName="signin">
        <Stack.Screen name="home" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="forgot_pass" />
    </Stack>
    
    
 );

};

export default Layout;