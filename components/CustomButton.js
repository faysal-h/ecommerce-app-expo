import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function CustomButton({ onPress, buttonText , customStyle}) {
  return (
      <Pressable
        style={({ pressed }) => [
          styles.button,customStyle,
          {
            // backgroundColor: '#008E97', // Change color when pressed
            opacity: pressed ? 0.85 : 1,
          },
        ]}
        onPress={onPress}
      >
        {({ pressed }) => (
          <Text style={styles.buttonText}>
            {pressed ? buttonText : buttonText}
          </Text>
        )}
      </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    // flexGrow:1,
    backgroundColor:'#008E97',
    padding: 10,
    borderRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign:'center'
  },
});

export default CustomButton;
