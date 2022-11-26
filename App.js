import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  AntDesign,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import Settings from "./containers/Settings";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import ProfileUserScreen from "./containers/ProfileUserScreen";
import DescribeScreen from "./containers/DescribeScreen";
import AroundMe from "./containers/AroundMe";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userID, setUserId] = useState(null);

  function LogoTitle() {
    return <FontAwesome5 name="airbnb" size={40} color="#EB5A62" />;
  }

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  const setID = async (id) => {
    if (id) {
      await AsyncStorage.setItem("userID", id);
    }
    setUserId(id);
  };

  // const setID = async ()

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);
      setIsLoading(false);
    };
    bootstrapAsync();
  }, []);
  if (isLoading === true) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userToken === null ? (
          <>
            <Stack.Screen name="SignIn">
              {() => <SignInScreen setToken={setToken} setID={setID} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {() => <SignUpScreen setToken={setToken} setID={setID} />}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "tomato",
                  tabBarInactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={() => ({
                          headerTitle: () => <LogoTitle />,

                          // header: () => (
                          //   <FontAwesome5
                          //     name="airbnb"
                          //     size={50}
                          //     color="#EB5A62"
                          //   />
                          // ),
                        })}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <Settings />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Describe"
                        options={({ navigation }) => ({
                          headerLeft: () => (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.goBack();
                              }}
                            >
                              <AntDesign
                                name="arrowleft"
                                size={24}
                                color="grey"
                              />
                            </TouchableOpacity>
                          ),
                        })}
                      >
                        {() => <DescribeScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Around"
                  options={{
                    tabBarLabel: "Around Me",
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome name="map-marker" size={24} color="grey" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundMe"
                        options={{
                          title: "Around Me",
                        }}
                      >
                        {() => <AroundMe />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="TabSettings"
                  options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="user" size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{
                          title: "Your Profile",
                        }}
                      >
                        {() => (
                          <ProfileUserScreen
                            userToken={userToken}
                            setToken={setToken}
                            userID={userID}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
