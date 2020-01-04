import React, { Fragment } from 'react'
import { FlatList, Alert } from 'react-native'
import {
  Container, Left, Body, Right, Text, ListItem, Header, Input, Icon, Item, Button
} from 'native-base';
import { get, debounce, isEmpty } from 'lodash'
import { observer, inject, } from "mobx-react"
import { NavigationActions } from 'react-navigation';

import { STORE_KEY } from '../../common/utils'
import Accordion from '../../components/Accordion/Accordion';

const sideBlueIcon = require('../../assets/images/logo.png');

@inject("userModel", "applicationModel")
@observer
export default class Search extends React.Component {

  constructor(props) {
    super(props)
    const { userModel, applicationModel } = props
    userModel.setApplicationInstance(applicationModel)
    this.state = { searchKey: '' }
    this.debounceSearchPlanets = debounce(searchString => {
      this.autocompleteSearch(searchString)
    }, 300)
  }

  fetchDateWiseDebtorData = async () => {
    const { userModel } = this.props
    try {
      await userModel.fetchData(STORE_KEY.GET_PLANETS)
    } catch (err) {
      console.log('error:', err)
    }
  }

  componentDidMount() {
    this.fetchDateWiseDebtorData()
  }

  changeQuery = value => {
    this.setState({ searchKey: value }, () => {
      this.debounceSearchPlanets(this.state.searchKey);
    });
  };

  autocompleteSearch = (key) => {
    this._fetchPlanetsOnSearch(key);
  };

  _fetchPlanetsOnSearch = async (query) => {
    const { userModel } = this.props
    try {
      await userModel.fetchPlanetsBySearch(query)
    } catch (err) {
      console.log('error:', err)
    }
  };

  onLogoutHandler = () => {
    const { navigation } = this.props
    navigation.dispatch({
      type: NavigationActions.NAVIGATE,
      routeName: 'SignIn',
      action: {
        type: NavigationActions.RESET,
        index: 0,
        actions: [{ type: NavigationActions.NAVIGATE, routeName: 'SignIn' }]
      }
    })
  }

  onLogout = () => {
    Alert.alert(   // Shows up the alert without redirecting anywhere
      'Confirmation required',
      'Do you really want to logout?',
      [
        { text: 'Accept', onPress: () => { this.onLogoutHandler() } },
        { text: 'Cancel' }
      ]
    );
  }

  onClickDebtor = selectedPlanet => {
    const selectedPlanetUrl = get(selectedPlanet, 'url', '')
    this.props.navigation.navigate('PlanetDetails', { url: selectedPlanetUrl })
  }


  categoryKeyExtractor = (item, index) => {
    return `${item.categoryName}_${index}`
  }

  subCategoryKeyExtractor = (item, index) => {
    return `${item.subCategoryname}_${index}`
  }

  itemKeyExtractor = (item, index) => {
    return `${item}_${index}`
  }

  onClickDebtor = selectedDebtor => {
    const debtorID = get(selectedDebtor, 'DebtorID', 1)
    this.props.navigation.navigate('DebtorDetails', { DebtorID: debtorID })
  }
  
  renderSubCategoryEl = ({ item }) => (<Fragment>
    {!isEmpty(item.subCategoryname) && <ListItem itemDivider>
         <Text>{item.subCategoryname}</Text>
      </ListItem>}
      {this.renderSbCtgryItemList(get(item,'items',[]))}
  </Fragment>
  )

  renderItem = ({ item }) =>
  (<ListItem>
  <Body>
  <Text>{item}</Text>
  </Body>
  </ListItem>)

renderSbCtgryItemList = (itemList = []) => {
    return (<FlatList
      data={itemList}
      numColumns={1}
      renderItem={this.renderItem}
      keyExtractor={this.itemKeyExtractor}
    />
    )
  }

  renderSubCategoryList = (subCategories = []) => {
    return (<FlatList
      data={subCategories}
      numColumns={1}
      renderItem={this.renderSubCategoryEl}
      keyExtractor={this.subCategoryKeyExtractor}
    />
    )
  }

  renderCategory = ({ item }) => {
    return (<Fragment>
      <Accordion  title={item.category.servingSize ? 
        get(item,'category.categoryName','category name') + ` (${item.category.servingSize})` : 
        get(item,'category.categoryName','category name')}>
      {this.renderSubCategoryList(get(item,'category.subcategories',[]))}
      </Accordion>
    </Fragment>
    )
  }

  render() {
    const { userModel } = this.props
    const { searchKey } = this.state
    const categories = userModel.getPlanets()
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search"
              value={searchKey}
              onChangeText={this.changeQuery} />
            <Button transparent onPress={this.onLogout}>
              <Icon type='AntDesign' name="logout" />
            </Button>
          </Item>
        </Header>
        <FlatList
          data={categories}
          numColumns={1}
          renderItem={this.renderCategory}
          keyExtractor={this.categoryKeyExtractor}
        />
      </Container>
    )
  }
}