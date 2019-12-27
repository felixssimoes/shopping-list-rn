import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';

import ItemName from 'ui/components/item_name';
import { getAllItems } from 'store/selectors';
import {
  addItem,
  updateItem,
  checkItem,
  uncheckItem,
} from 'data/repository/items.repository';
import ItemsList from 'ui/components/items_list';

const ListScreen = () => {
  const nameRef = useRef(null);
  const listRef = useRef(null);

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

  const _onCheckItem = item => {
    checkItem(item);
  };

  const _onUncheckItem = item => {
    uncheckItem(item);
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
        onFocus={() => listRef.current.closeAllRows()}
      />
      <ItemsList
        ref={listRef}
        style={styles.itemsList}
        items={items}
        onEditItem={item => {
          setSelectedItem(item);
          nameRef.current.setName(item.name);
          nameRef.current.focus();
        }}
        onCheckItem={_onCheckItem}
        onUncheckItem={_onUncheckItem}
      />
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
  itemsList: {
    flex: 1,
  },
});
