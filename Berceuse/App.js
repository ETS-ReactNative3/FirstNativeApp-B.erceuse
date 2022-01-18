import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Search from './components/Search'

function Home({navigation}) {
  return (
    <LinearGradient 
    style={styles.containerHome}
    colors={['#c31432', '#240b36']}>

    <View>
      <Text style={styles.title}>
        Bienvenue sur B.erceuse !
      </Text>
      <Text style={styles.text} onPress={() => navigation.navigate("Recherche")}>
        Vous cherchez une berceuse ?
      </Text>
    </View>

    </LinearGradient>
  )
}



function About() {
  return (
    <LinearGradient
    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
    colors={['#c31432', '#240b36']}
    style={styles.containerHome}
    >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.textAbout}>
        Cette application permet de trouver une berceuse et de pouvoir l'écouter.
      </Text>
      <Text style={styles.textAbout}>Copyright© 2022: Maxime Paupy</Text>
    </View>
    </LinearGradient>
  )
}

const Tab = createBottomTabNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'Recherche') {
            iconName = focused ? 'search' : 'search';
          }
            else if (route.name === 'A propos') {
            iconName = focused ? 'comments' : 'comments';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'white',
        tabBarStyle:{
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          elevation:0,
          bottom: 10,
        }
        
      })}
      >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Recherche" component={Search} options={{ headerShown: false }} />
        <Tab.Screen name="A propos" component={About} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
   containerHome: {
     flex:1,
     justifyContent: 'center',
     alignItems: 'center',
   },
   mainContainer: {
   flex:1, 
   justifyContent: 'center',
   alignItems: 'center',
   },
    title: {
      fontSize: 30,
      color: '#f1f1f1',
      fontFamily: 'LobsterTwo-Bold'
    },
    text: {
      fontSize:19,
      textAlign: 'center',
      color:'#6dd5ed',
      fontFamily: 'RobotoCondensed-Regular'
    },
    btn: {
      borderColor: '#000',
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 25,
      width: 150,
      margin:10,
    },
    textAbout: {
      fontSize: 20,
      color: '#fff',
      fontFamily:'RobotoCondensed-Regular',
      margin: 20,
    },
})

