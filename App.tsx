// App.js
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import listproduct from './src/Trangchu';
import ContactPage from './src/lienhe';
import LoginScreen from './src/Dangnhap';
import Giohang from './src/Giohang';
import DangKi from './src/DangKi';
import { CartProvider } from './src/CartContext';

const Drawer = createDrawerNavigator();
const Stack =  createNativeStackNavigator();


const MyDrawer = () => {
  return (
     <CartProvider>
    <Drawer.Navigator initialRouteName="TrangChu">
     <Drawer.Screen name="Sản phẩm" component={listproduct} />
     <Drawer.Screen name="Liên hệ" component={ContactPage} />
     <Drawer.Screen name="Giỏ hàng" component={Giohang} />
   </Drawer.Navigator>
   </CartProvider>
   
 
  );
}

const App = () => {
  return (
    <CartProvider>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Dangnhap">
      <Stack.Screen name="Dangnhap" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DangKi" component={DangKi} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={MyDrawer} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer></CartProvider>
    
  
   
  );
}

export default App;

const styles = StyleSheet.create({});
