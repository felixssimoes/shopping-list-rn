import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Button,
} from 'react-native';

import ItemName from 'ui/components/item_name';
import { ScrollView } from 'react-native-gesture-handler';

const ListScreen = () => {
  const nameRef = useRef(null);
  const [items, setItems] = useState([]);
  const [itemIndex, setItemIndex] = useState(null);

  useEffect(() => nameRef.current.focus(), []);

  const onSubmitItemName = value => {
    console.log('name set to:', value);
    if (value === '') {
      nameRef.current.blur();
      return;
    }

    if (itemIndex !== null) {
      items[itemIndex] = value;
    } else {
      items.push(value);
    }
    setItems([...items]);
    setItemIndex(null);
  };

  const onCancelNameChange = () => {
    return nameRef.current.blur();
  };

  return (
    <View style={styles.screenContainer}>
      <TouchableWithoutFeedback onPress={() => nameRef.current.blur()}>
        <View style={StyleSheet.absoluteFill} />
      </TouchableWithoutFeedback>
      <ItemName
        ref={nameRef}
        onSubmit={onSubmitItemName}
        onCancel={onCancelNameChange}
      />
      <ScrollView style={{ flex: 1 }}>
        {items.map((name, index) => (
          <View
            key={`${name}${index}`}
            style={{
              alignSelf: 'stretch',
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Text style={{ flex: 1 }}>{name}</Text>
            <Button
              title="edit"
              onPress={() => {
                setItemIndex(index);
                nameRef.current.setName(items[index]);
                nameRef.current.focus();
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

ListScreen.navigationOptions = {
  title: 'My Shopping List',
};

export default ListScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
});
