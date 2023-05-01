import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./views/Home";
import Favorites from "./views/Favorites";
import { Feather } from "@expo/vector-icons";
import { Provider, connect } from "react-redux";
import storeConfig from "./store/storeConfig";

const Tab = createBottomTabNavigator();

const store = storeConfig();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Search"
            component={Home}
            options={{ tabBarIcon: () => <Feather name="search" /> }}
          />
          <Tab.Screen
            name="Favorites"
            component={Favorites}
            options={{ tabBarIcon: () => <Feather name="star" /> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
