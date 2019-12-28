import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SnackBar = ({ title, onPressUndo }) => {
  return (
    <SafeAreaView style={styles.snackbarSafeArea}>
      <View style={styles.snackbarContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <TouchableOpacity onPress={onPressUndo}>
          <Text style={styles.undoText}>UNDO</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  undoText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 15,
    color: '#fff',
  },
  snackbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  snackbarSafeArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#666',
  },
});

export default SnackBar;
