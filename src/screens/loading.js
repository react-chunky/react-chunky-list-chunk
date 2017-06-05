import React, { Component } from 'react'
import {
  Image,
  View,
  ActivityIndicator
} from 'react-native'

import { Styles, Screen } from 'react-native-chunky'

export default class LoadingScreen extends Screen {

  componentDidMount() {
    this.props.checkAuth()
  }

  onDataError(type, error) {
    this.transitions.showLogin()
  }

  onData(type, data) {
    this.transitions.showDashboard({ auth: data })
  }

  render() {
    return (
      <View style={this.styles.containers.main}>
        <ActivityIndicator
          animating={true}
          style={{height: 120}}
          size="small"/>
      </View>)
  }
}
