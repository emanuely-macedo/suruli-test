import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ListaFilmes from "../screens/MoviesListScreen";

const Tab = createBottomTabNavigator()

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator 
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: "004c94",
                tabBarInactiveTintColor: "7890a5",
                tabBarLabelStyle: {
                    fontSize: 12,
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Lista de Filmes" 
                component={ListaFilmes}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="film"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}