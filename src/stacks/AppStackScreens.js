import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { UserContext } from "../context/UserContext";

import AuthStackScreens from "./AuthStackScreens";
import MainStackScreens from "./MainStackScreens";
import LoadingScreen from "../screens/LoadingScreen";
import Onboarding from "../components/Onboarding";

import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default AppStackScreens = () => {
  const AppStack = createStackNavigator();

  //smth new!
  const [loading, setLoading] = useState(true);
    const [viewedOnboarding, setViewedOnboarding] = useState(false);

    const checkOnboarding = async () => {
        try {
            const value = await AsyncStorage.getItem('@viewedOnboarding');

            if (value!==null) {
                setViewedOnboarding(true);
            }
        } catch (err) {
            console.log('Error @checkOnboarding: ', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkOnboarding();
    }, []);
    //until here

  const [user] = useContext(UserContext);

  return (
    // <AppStack.Navigator headerMode="none">
    //   {user.isLoggedIn === null ? (
    //     <AppStack.Screen name="Loading" component={LoadingScreen} />
    //   ) : user.isLoggedIn ? (
    //     <AppStack.Screen name="Main" component={MainStackScreens} />
    //   ) : (
    //     <AppStack.Screen name="Auth" component={AuthStackScreens} />
    //   )}
    // </AppStack.Navigator>
    <AppStack.Navigator headerMode="none">
      
      {user.isLoggedIn === null ? (
    <AppStack.Screen name="Loading" component={LoadingScreen} />
  ) : user.isLoggedIn === false ? (
      <AppStack.Screen name="Auth" component={AuthStackScreens} />
    ) : viewedOnboarding == false ? (
      <AppStack.Screen name="Onboarding" component={Onboarding} />
    ) : (
      <AppStack.Screen name="Main" component={MainStackScreens} />
    )}
  </AppStack.Navigator>
  );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
  },
});
