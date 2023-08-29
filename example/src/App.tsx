import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import ProxySide from './components/ProxySide';
import EmbededSide from './components/EmbededSide';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home "
          component={Home}
          options={{ title: 'Welcome to Nearpay SDK' }}
        />
        <Stack.Screen
          name="Embeded"
          component={EmbededSide}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Proxy" component={ProxySide} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // return (
  //   <View style={styles.container}>
  //     <EmbededSide />
  //     {/* Proxy side */}
  //     <View style={styles.hr}></View>
  //     <NearpayProvider nearpay={remoteNearpay}>
  //       <ProxySide />
  //     </NearpayProvider>
  //   </View>
  // );
}

// const styles = StyleSheet.create({
//   box: {
//     width: 60,
//     height: 60,
//     marginVertical: 20,
//   },
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   containerrow: {
//     flexDirection: 'row',
//     //marginBottom : 10,
//     marginBottom: '5%',
//   },
//   buttonContainer: {
//     flex: 1,
//   },
//   hr: {
//     height: 10,
//     width: '70%',
//     backgroundColor: 'black',
//   },
// });
