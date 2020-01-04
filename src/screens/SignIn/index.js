import React, { Fragment } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Container, Content, Form, Item, Input, Label, Button } from 'native-base'
import { observer, inject } from "mobx-react"
import { rsWidth, rsHeight } from '../../common/responsiveHW';

@inject('userModel')
@observer
export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '', password: ''
    }
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  onSignIn = () => {
    const { userName, password } = this.state
    const { userModel, navigation, } = this.props
    userModel.saveUser({ userName, password }, navigation )
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.logoSection}>
            <Image style={styles.logo} source={require("../../assets/images/logo.png")} />
          </View>
          <Form>
            <Item stackedLabel >
              <Label>User Name</Label>
              <Input
                placeholder="Username"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.userName}
                onChangeText={val => this.onChangeText('userName', val)} />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.password}
                onChangeText={val => this.onChangeText('password', val)} />
            </Item>
          </Form>
          <Button style={{ margin: 20 }} block info onPress={this.onSignIn}>
            <Text style={{ color: '#fff' }}>Sign In</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: rsHeight('100%'),
    width: rsWidth('100%')
  },

  logoSection: {
    flex: 1,
    marginTop: rsHeight('100%') / 8,
    marginBottom: 30,
  },
  logo: {
    width: 160,
    height: 160,
    // justifyContent:'center',
    alignSelf: 'center'
  },
  logoText: {
    color: '#ECF0F1',
    fontSize: 13,
    left: 30,
  },
  icon: {
    width: 24,
    height: 24,
  },
})