import React, { forwardRef, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';

import IconButton from './icon_button';
import { getAllCheckedItems, getAllUncheckedItems } from 'store/selectors';
import Icon from 'react-native-vector-icons/FontAwesome';

const ItemsList = forwardRef(
  ({ onEditItem, onCheckItem, onUncheckItem, onDeleteItem, style }, ref) => {
    const checkedItems = useSelector(state =>
      getAllCheckedItems(state).sort(
        (i1, i2) => i2.checkedCount - i1.checkedCount,
      ),
    );

    const uncheckedItems = useSelector(state =>
      getAllUncheckedItems(state).sort(
        (i1, i2) => i2.uncheckedAt - i1.uncheckedAt,
      ),
    );

    useImperativeHandle(ref, () => ({
      closeAllRows: _closeAllRows,
    }));

    const sectionsData = [
      {
        id: 'unchecked',
        title: 'Shopping List',
        data: uncheckedItems.map(i => ({ key: i.id, shoppingItem: i })),
      },
      {
        id: 'checked',
        title: 'Often bought',
        data: checkedItems.map(i => ({ key: i.id, shoppingItem: i })),
      },
    ];

    const _onToggleItemCheck = shoppingItem => {
      if (shoppingItem.checked) {
        onUncheckItem(shoppingItem);
      } else {
        onCheckItem(shoppingItem);
      }
    };

    let _openRowRefs = [];

    const _onRowDidOpen = (rowKey, rowMap) => {
      _openRowRefs.push(rowMap[rowKey]);
    };

    const _renderItem = ({ item, index, section }, rowMap) => {
      const { shoppingItem } = item;
      const iconName = shoppingItem.checked ? 'shopping-cart' : 'square-o';

      return (
        <TouchableHighlight
          onPress={() => _onToggleItemCheck(shoppingItem)}
          underlayColor={'#AAA'}>
          <View style={styles.cellContainer}>
            <Text style={styles.itemNameText}>{shoppingItem.name}</Text>
            <Icon name={iconName} size={24} />
          </View>
        </TouchableHighlight>
      );
    };

    const _renderHiddenItem = ({ item, index, section }, rowMap) => {
      const { shoppingItem, key } = item;
      return (
        <View style={styles.cellHiddenActions}>
          <IconButton
            name="trash-o"
            color="red"
            size={30}
            onPress={() => onDeleteItem(shoppingItem)}
          />
          <IconButton
            name="edit"
            color="blue"
            size={30}
            onPress={() => {
              onEditItem(shoppingItem);
              _closeRow(rowMap, key);
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
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };

    const _closeAllRows = () => {
      _openRowRefs.forEach(rowRef => {
        rowRef && rowRef.closeRow && rowRef.closeRow();
      });
    };

    return (
      <SwipeListView
        useSectionList
        sections={sectionsData}
        renderItem={_renderItem}
        renderHiddenItem={_renderHiddenItem}
        renderSectionHeader={_renderSectionHeader}
        onRowDidOpen={_onRowDidOpen}
        rightOpenValue={-100}
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
    flexDirection: 'row',
    backgroundColor: '#eee',
    justifyContent: 'flex-end',
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
