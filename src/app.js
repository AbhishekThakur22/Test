import React, { Component } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Root, Spinner } from 'native-base'
import { observer, inject } from "mobx-react"
import RootNavigator from './routes/stackNavigator'

@inject('applicationModel')
@observer
export default class App extends Component {
  render() {
    const { applicationModel } = this.props
    let rootContent = null
    if (applicationModel.getLoader()) {
      rootContent = (<View style={styles.loading}><Spinner color='green' /></View>)
    }
    return (
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}>
        <Root>
          {rootContent}
          <RootNavigator />
        </Root>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 99
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  }
});