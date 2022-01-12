import * as React from "react";
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';

function Home({navigation}) {
  return (
    <LinearGradient 
    style={styles.container}
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

function Search({navigation}) {
  return (
    <LinearGradient
    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
    colors={['#c31432', '#240b36']}
    style={styles.container}
    >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.title}>
        Quelle Berceuse voulez vous écouter ?
      </Text>
      <TextInput
        label="Berceuse"
        placeholder="Votre berceuse !"
        style={styles.input}
      />
    </View>
    </LinearGradient>
  )
}

function About() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis aspernatur assumenda rem atque omnis incidunt dolorem necessitatibus blanditiis ipsa vel!
      </Text>
    </View>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Recherche" component={Search} />
        <Tab.Screen name="A propos" component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
   container: {
     flex:1, 
      justifyContent:'center',
      alignItems:'center',
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
    input: {
      marginVertical:15,
      borderColor: '#fff',
      backgroundColor: '#fff',
      borderRadius: 20,
      width:300,
    }

})

