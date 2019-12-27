import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';

import IconButton from './icon_button';
import { getAllCheckedItems, getAllUncheckedItems } from 'store/selectors';
import Icon from 'react-native-vector-icons/FontAwesome';

const ItemsList = forwardRef(
  ({ onEditItem, onCheckItem, onUncheckItem, style }, ref) => {
    const checkedItems = useSelector(state => getAllCheckedItems(state));
    const uncheckedItems = useSelector(state => getAllUncheckedItems(state));

    let listRowMap = null;

    useImperativeHandle(ref, () => ({
      closeAllRows: _closeAllRows,
    }));

    const sectionsData = [
      {
        id: 'unchecked',
        title: 'Shopping List',
        data: uncheckedItems.map(i => ({ key: i.id, ...i })),
      },
      {
        id: 'checked',
        title: 'Often bought',
        data: checkedItems.map(i => ({ key: i.id, ...i })),
      },
    ];

    const _onToggleItemCheck = item => {
      if (item.checked) {
        onUncheckItem(item);
      } else {
        onCheckItem(item);
      }
    };

    const _renderItem = ({ item, index, section }, rowMap) => {
      listRowMap = rowMap;
      const iconName = item.checked ? 'shopping-cart' : 'square-o';
      return (
        <TouchableHighlight
          onPress={() => _onToggleItemCheck(item)}
          underlayColor={'#AAA'}>
          <View style={styles.cellContainer}>
            <Text style={styles.itemNameText}>{item.name}</Text>
            <Icon name={iconName} size={24} />
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
      if (section.id === 'unchecked' || section.data.length === 0) {
        return null;
      }
      return (
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
      );
    };

    const _closeRow = (rowMap, rowKey) => {
      console.log(rowMap);
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };

    const _closeAllRows = () => {
      if (listRowMap === null) {
        return;
      }
      Object.keys(listRowMap).forEach(rowKey => listRowMap[rowKey].closeRow());
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
        keyboardShouldPersistTaps="always"
      />
    );
  },
);

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
