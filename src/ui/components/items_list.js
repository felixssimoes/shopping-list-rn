import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import IconButton from './icon_button';

const ItemsList = ({ items, onEditItem, style }) => {
  const sectionsData = [
    {
      id: 'unchecked',
      title: 'Shopping List',
      data: items.map(i => ({ key: i.id, ...i })),
    },
    {
      id: 'checked',
      title: 'Often bought',
      data: [],
    },
  ];

  const _renderItem = ({ item, index, section }, rowMap) => {
    console.log(rowMap);
    return (
      <TouchableHighlight
        onPress={() => console.log('You touched me')}
        underlayColor={'#AAA'}>
        <View style={styles.cellContainer}>
          <Text style={styles.itemNameText}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  const _renderHiddenItem = ({ item, index, section }, rowMap) => {
    return (
      <View style={styles.cellHiddenActions}>
        <IconButton
          name="edit"
          color="blue"
          size={30}
          onPress={() => {
            onEditItem(item);
            _closeRow(rowMap, item.id);
          }}
        />
      </View>
    );
  };

  const _renderSectionHeader = ({ section }) => {
    if (section.id === 'unchecked') {
      return null;
    }
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    );
  };

  const _closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  return (
    <SwipeListView
      useSectionList
      sections={sectionsData}
      renderItem={_renderItem}
      renderHiddenItem={_renderHiddenItem}
      renderSectionHeader={_renderSectionHeader}
      rightOpenValue={-50}
      disableRightSwipe
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      closeOnScroll
      closeOnRowOpen
      closeOnRowBeginSwipe
    />
  );
};

const styles = StyleSheet.create({
  sectionHeaderText: {
    fontSize: 15,
  },
  sectionHeaderContainer: {
    height: 30,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  cellHiddenActions: {
    backgroundColor: '#eee',
    alignItems: 'flex-end',
  },
  cellContainer: {
    backgroundColor: '#fff',
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
