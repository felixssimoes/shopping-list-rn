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
import { addItem, updateItem } from 'data/repository/items.repository';

const ListScreen = () => {
  const nameRef = useRef(null);

  const items = useSelector(state => getAllItems(state));
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => nameRef.current.focus(), []);

  const onSubmitItemName = async value => {
    if (value === '') {
      nameRef.current.blur();
      return;
    }

    if (selectedItem !== null) {
      if (!(await updateItem({ ...selectedItem, name: value }))) {
        return false;
      }
    } else {
      if (!(await addItem({ name: value }))) {
        return false;
      }
    }
    setSelectedItem(null);

    return true;
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
        {items.map((item, index) => (
          <View
            key={`${item.name}${index}`}
            style={{
              alignSelf: 'stretch',
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Text style={{ flex: 1 }}>{item.name}</Text>
            <Button
              title="edit"
              onPress={() => {
                setSelectedItem(item);
                nameRef.current.setName(item.name);
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
