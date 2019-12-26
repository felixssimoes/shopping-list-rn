import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const BlankScreen = ({ message }) => {
  return (
    <>
      <SafeAreaView style={styles.screenContainer}>
        <Text>{message}</Text>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BlankScreen;
