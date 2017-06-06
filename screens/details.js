import React from 'react'
import {
  View,
  Text
} from 'react-native'

import { Card, Badge, Icon } from 'react-native-elements'
import { Styles, Screen } from 'react-native-chunky'

export default class ItemDetailsScreen extends Screen {

  render() {
    return (<Card title={this.props.data().title}>
        <Text> {this.props.data().details || 'Details coming soon'} </Text>
    </Card>)
  }
}
