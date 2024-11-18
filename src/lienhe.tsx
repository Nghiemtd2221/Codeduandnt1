import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React from 'react';

const ContactPage = () => {
  const handlePressPhone = () => {
    Linking.openURL('tel:037889922');
  };

  const handlePressEmail = () => {
    Linking.openURL('mailto:nghiemtdph44856@gmail.com');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contactContainer}>
        <Text style={styles.headerText}>Liên hệ</Text>
        <Text style={styles.contactText}>Số điện thoại:</Text>
        <TouchableOpacity onPress={handlePressPhone}>
          <Text style={styles.contactLink}>037889922</Text>
        </TouchableOpacity>
        <Text style={styles.contactText}>Email:</Text>
        <TouchableOpacity onPress={handlePressEmail}>
          <Text style={styles.contactLink}>nghiemtdph44856@gmail.com</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ContactPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  contactContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  contactText: {
    fontSize: 18,
    marginBottom: 10,
  },
  contactLink: {
    fontSize: 18,
    color: 'blue',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
});
