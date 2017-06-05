import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  ActivityIndicator,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  Keyboard,
} from 'react-native'
import { FormLabel, FormInput, Button, Icon, FormValidationMessage, Card } from 'react-native-elements'

import { Styles, Screen } from 'react-native-chunky'

let window = Dimensions.get('window'),
  screen = Dimensions.get('window'),
  smallScreen  = screen.height < 500;

export default class LoginScreen extends Screen {

  constructor(props) {
    super(props)
    this.state = { email: "", password: "", error: "", progress: false, loginOffset: new Animated.Value(0),}
    this._onLoginPressed = this.onLoginPressed.bind(this)
    this._onEmailChanged = this.onEmailChanged.bind(this)
    this._onPasswordChanged = this.onPasswordChanged.bind(this)
  }

  componentWillMount() {
    super.componentWillMount()
    this.keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow.bind(this));
    this.keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide.bind(this));
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.keyboardWillShowSubscription.remove();
    this.keyboardWillHideSubscription.remove();
  }


  onEmailChanged(email) {
    this.setState({ email })
  }

  onPasswordChanged(password) {
    this.setState({ password })
  }

  onLoginPressed() {
    this.setState({ progress: true, error: "" })
    this.props.signIn({ username: this.state.email, password: this.state.password })
  }

  keyboardWillShow(e) {
    Animated.timing(this.state.loginOffset, {
      duration: 220,
      toValue: Platform.OS ==='ios' ? (smallScreen ? -250 : -70) : (smallScreen ? -180 : -130),
    }).start();

  }

  keyboardWillHide() {
    Animated.timing(this.state.loginOffset, {
      duration: 220,
      toValue: 0
    }).start()
  }

  onDataError(type, error) {
    this.setState({ error, progress: false })
  }

  onData(type, data) {
    this.transitions.showDashboard()
  }

  renderError() {
    if (!this.state.error) {
      return (<View/>)
    }

    return (<FormValidationMessage style={this.styles.formError}>
          { this.state.error.message }
      </FormValidationMessage>)
  }

  renderProgress() {
    return (
      <View style={this.styles.containers.main}>
        <ActivityIndicator
          animating={true}
          style={{height: 120}}
          size="small"/>
      </View>)
  }

  get styles () {
    return Object.assign(super.styles, styles(this.props))
  }

  renderContent() {
    return (
      <View style={this.styles.container}>
      <Animated.View style={[{ transform: [{translateY: this.state.loginOffset}]}]}>
        <Icon
          reverse={this.props.dark}
          size={80}
          style={this.styles.logo}
          name='lock'
          color='#37474F'
        />
        <Card
          title='Please Sign In'
          titleStyle={this.styles.formHeader}
          style={this.styles.formContainer}>
          <FormInput
            placeholder={'Enter Your Email'}
            onChangeText={this._onEmailChanged}
            autoCorrect={false}
            blurOnSubmit={false}
            autoCapitalize='none'
            style={this.styles.formTextField}/>
          <FormInput
            placeholder={'Enter Your Password'}
            onChangeText={this._onPasswordChanged}
            secureTextEntry={true}
            autoCorrect={false}
            blurOnSubmit={false}
            style={this.styles.formTextField}/>
          <Button
            style={this.styles.formButton}
            backgroundColor='#039BE5'
            onPress={this._onLoginPressed}
            icon={{name: 'user-circle-o', type: 'font-awesome'}}
            title='SIGN IN NOW' />
          </Card>
          { this.renderError() }
        </Animated.View></View>
        )
  }

  renderForm() {
    return (
      <ScrollView contentContainerStyle={this.styles.container}>
        { this.renderContent() }
      </ScrollView>)
  }

  render() {
    return (this.state.progress ? this.renderProgress() : this.renderForm())
  }
}

const styles = (props) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.dark ? '#37474F' : '#FAFAFA'
  },
  logo: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  formHeader: {
    padding: 10,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 20,
    borderRadius: 4,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  formError: {
    marginTop: 0,
    alignSelf: "center"
  },
  formTextField: {
    height: 60,
    width: 200,
    alignSelf: "center",
    marginBottom: 0,
    padding: 0,
    backgroundColor: "#ffffff"
  },
  formButton: {
    margin: 50
  }
})
