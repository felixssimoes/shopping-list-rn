import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';

import ItemName from 'ui/components/item_name';
import { ScrollView } from 'react-native-gesture-handler';
import { getAllItems } from 'store/selectors';
import { addItem } from 'data/repository/items.repository';

const ListScreen = () => {
  const nameRef = useRef(null);
  const [itemIndex, setItemIndex] = useState(null);

  const items = useSelector(state => getAllItems(state));

  useEffect(() => nameRef.current.focus(), []);

  const onSubmitItemName = value => {
    console.log('name set to:', value);
    if (value === '') {
      nameRef.current.blur();
      return;
    }

    if (itemIndex !== null) {
      // items[itemIndex] = value;
    } else {
      addItem({ name: value });
    }
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
        {items.map(({ name }, index) => (
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
