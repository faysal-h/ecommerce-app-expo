import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const PhoneNumberValidation = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const validatePhoneNumber = () => {
    // Define the regular expression pattern
    const pattern = /^03\d{9}$/;

    if (pattern.test(phoneNumber)) {
      // Phone number is valid
      Alert.alert('Success', 'Phone number is valid');
    } else {
      // Phone number is not valid
      Alert.alert('Error', 'Invalid phone number. Please enter a valid phone number in the format 03xxxxxxxxx');
    }
  };

  return (
    <View>
      <Text>03XX XXXXXXX:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setPhoneNumber(text)}
        value={phoneNumber}
        keyboardType="numeric"
      />
      <Button title="Validate" onPress={validatePhoneNumber} />
    </View>
  );
};

export default PhoneNumberValidation;
