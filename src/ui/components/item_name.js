import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

const ItemName = forwardRef(({ onSubmit, onCancel }, ref) => {
  const inputRef = useRef(null);
  const [nameValue, setNameValue] = useState('');

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    blur: () => inputRef.current.blur(),
    setName: newName => setNameValue(newName),
  }));

  const onPressOk = async () => {
    if (!(await onSubmit(nameValue))) {
      return;
    }
    setNameValue('');
  };

  const onPressCancel = () => {
    setNameValue('');
    onCancel();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        ref={inputRef}
        value={nameValue}
        onChangeText={setNameValue}
        placeholder="Item name..."
        onSubmitEditing={onPressOk}
      />
      <Button title="Cancel" onPress={onPressCancel} />
      <Button title="Ok" onPress={onPressOk} />
    </View>
  );
});

export default ItemName;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
});
