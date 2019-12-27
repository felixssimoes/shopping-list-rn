import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

import IconButton from './icon_button';

const ItemsList = ({ items, onEditItem, style }) => {
  return (
    <FlatList
      style={style}
      data={items}
      keyExtractor={item => item.id}
      renderItem={({ item }) => _renderItem(item, () => onEditItem(item))}
    />
  );
};

const _renderItem = (item, onPressEdit) => {
  return (
    <View style={styles.cellContainer}>
      <Text style={styles.itemNameText}>{item.name}</Text>
      <IconButton name="edit" onPress={onPressEdit} color="blue" size={30} />
    </View>
  );
};

const styles = StyleSheet.create({
  cellContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemNameText: {
    flex: 1,
    fontSize: 20,
  },
});

export default ItemsList;
