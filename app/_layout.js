import {Stack} from "expo-router";
import { useFonts } from "expo-font";
//import * as SplashScreen from "expo-splash-screen";

//SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    //Ensure any route can link back to `/`
    initialRouteName: "app",
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

 return (
    <Stack initialRouteName="home">
        <Stack.Screen name="home" />
    </Stack>
 );

};

export default Layout;