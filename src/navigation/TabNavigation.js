import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ListaFilmes from "../screens/MoviesListScreen";

const Tab = createBottomTabNavigator()

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Lista de Filmes" component={ListaFilmes}/>
        </Tab.Navigator>
    );
}