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
        JelleeRoman: require('../assets/fonts/Jellee-Roman.ttf'),
        CoolveticaBold : require('../assets/fonts/coolvetica-compressed-hv.otf'),
        CoolveticaRegular : require('../assets/fonts/coolvetica-condensed-rg.otf'),
        Gladifilthefte : require('../assets/fonts/Gladifilthefte.ttf'),
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