import React from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'
import { ListScreen } from 'react-native-chunky'
import { ListItem, Icon } from 'react-native-elements'

export default class ItemsListScreen extends ListScreen {
  
  dataItem(data) {
    return {
      title: data.title,
      leftIcon: { name: 'code' }
    }
  } 

}