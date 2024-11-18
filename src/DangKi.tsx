// src/Dangki.js
import { Alert, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import LoginScreen from './Dangnhap';
import axios from 'axios';

const DangKi = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleRegister = async () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Lỗi', 'Tên tài khoản và mật khẩu không được để trống');
      return;
    }

    if (password !== confirmPass) {
      Alert.alert('Lỗi', 'Mật khẩu không khớp');
      return;
    }

    try {
      const response = await axios.post('http:// 192.168.1.54:4000/users', {
        username,
        password,
      });

      if (response.status === 201) {
        Alert.alert('Thành công', `Bạn đã đăng ký thành công ${username}`);
        navigation.navigate('Dangnhap');
      } else {
        Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      
      <TextInput
        style={styles.input}
        placeholder='Nhập userName'
        onChangeText={txt => setUsername(txt)}
      />
      <TextInput
        style={styles.input}
        placeholder='Nhập mật khẩu'
        secureTextEntry={true}
        onChangeText={pas => setPass(pas)}
      />
      <TextInput
        style={styles.input}
        placeholder='Nhập lại mật khẩu'
        secureTextEntry={true}
        onChangeText={pas => setConfirmPass(pas)}
      />

      <Pressable style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnText}>Đăng ký</Text>
      </Pressable>
      <Pressable style={styles.btn}  onPress={() =>navigation.navigate('Dangnhap')}>
        <Text style={styles.btnText}>Trở về</Text>
      </Pressable>
    </View>
  );
};

export default DangKi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    fontSize: 15,
  },
  btn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
