import React, { Fragment } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Container, Content, Header, Title, ListItem, Left, Body, Form, Item, Input, Label, Button, Icon } from 'native-base'
import { observer, inject } from "mobx-react"
import { get } from 'lodash'
import { rsWidth, rsHeight } from '../../common/responsiveHW';

@inject("userModel", "applicationModel")
@observer
export default class PlanetDetails extends React.Component {

  static navigationOptions = {
    header: null,
  };

  fetchDebtorDetails = async () => {
    const { userModel, navigation } = this.props
    const url = navigation.getParam('url', null)
    try {
      await userModel.fetchPlanetDetails(url)
    } catch (err) {
      console.log('error:', err)
    }
  }

  componentDidMount() {
    this.fetchDebtorDetails()
  }

  renderPlanetDetails = () => {
    const { userModel } = this.props
    const PlanetDetails = userModel.getPlanetDetails()
    const { name, rotation_period, orbital_period, diameter, climate, gravity, terrain, surface_water, population } = PlanetDetails
    return (
      <Fragment>
        <ListItem>
          <Left>
            <Text>Name</Text>
          </Left>
          <Body>
            <Text>{name}</Text>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Rotation_period</Text>
          </Left>
          <Body>
            <Text>{rotation_period}</Text>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Orbital_period</Text>
          </Left>
          <Body>
            <Text>{orbital_period}</Text>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Diameter</Text>
          </Left>
          <Body>
            <Text>{diameter}</Text>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <Text>climate</Text>
          </Left>
          <Body>
            <Text>{climate}</Text>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Gravity</Text>
          </Left>
          <Body>
            <Text>{gravity}</Text>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Terrain</Text>
          </Left>
          <Body>
            <Text>{terrain}</Text>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Surface_water</Text>
          </Left>
          <Body>
            <Text>{surface_water}</Text>
          </Body>
        </ListItem>
        <ListItem>
          <Left>
            <Text>Population</Text>
          </Left>
          <Body>
            <Text>{population}</Text>
          </Body>
        </ListItem>
      </Fragment>
    )
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: '#1D89E4' }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Planet Details</Title>
          </Body>
        </Header>
        <Content>
          {this.renderPlanetDetails()}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: rsHeight('100%'),
    width: rsWidth('100%')
  },
})