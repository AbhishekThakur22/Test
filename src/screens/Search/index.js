import React, { Fragment } from 'react'
import { FlatList, Alert, StyleSheet } from 'react-native'
import {
  Container, Left, Body, Right, Text, ListItem, Header, Input, Icon, Item, Button, View
} from 'native-base';
import { get, debounce, isEmpty } from 'lodash'
import { observer, inject, } from "mobx-react"
import { NavigationActions } from 'react-navigation';

import { STORE_KEY } from '../../common/utils'
import Accordion from '../../components/Accordion/Accordion';

const sideBlueIcon = require('../../assets/images/logo.png');
const categoryImages = [
  image = require('../../assets/images/meat.png'),
  image = require('../../assets/images/fish.png'),
  image = require('../../assets/images/apple-fruit.png'),
  image = require('../../assets/images/apple-fruit.png'),
  image = require('../../assets/images/roast-turkey.png'),
  image = require('../../assets/images/roast-turkey.png'),
]

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
  
  renderSubCategoryEl = ({ item }, colorCode) => (<Fragment>
    {!isEmpty(item.subCategoryname) && <View style={styles.subCategoryListContainer}>
         <Text style={{color: colorCode}}>{item.subCategoryname.toUpperCase()}</Text>
      </View>}
      {this.renderSbCtgryItemList(get(item,'items',[]))}
  </Fragment>
  )

  renderItem = ({ item }) =>
  (
    <View style={styles.subCategoryItemContainer}>
  <Text>{item}</Text>
    </View>
  )

renderSbCtgryItemList = (itemList = []) => {
    return (<FlatList
      data={itemList}
      numColumns={1}
      renderItem={this.renderItem}
      keyExtractor={this.itemKeyExtractor}
    />
    )
  }

  renderSubCategoryList = (subCategories = [], colorCode, categoryQuote) => {
    return (<FlatList
    style={styles.subCategoryList}
      data={subCategories}
      numColumns={1}
      renderItem={(item) => this.renderSubCategoryEl(item, colorCode)}
      keyExtractor={this.subCategoryKeyExtractor}
      ListFooterComponent={() => 
        !isEmpty(categoryQuote) && <View style={styles.categoryQuoteView}>
          <Text style={styles.categoryQuoteText}>
            {categoryQuote}
          </Text>
        </View>
      }
    />
    )
  }

  renderCategory = ({ item, index }) => {
    return (<Fragment>
      <View style={styles.accordionContainer}>
      <Accordion  title={item.category.servingSize ? 
        get(item,'category.categoryName','category name') + ` (${item.category.servingSize})` : 
        get(item,'category.categoryName','category name')}
        sideIcon={categoryImages[index]}
        color={get(item,'category.colorCode','#000000')}
        >
      {this.renderSubCategoryList(get(item,'category.subcategories',[]), 
      get(item,'category.colorCode','#000000'),
      get(item,'category.quote',''))}
      {!isEmpty(item.category.protip) && <View>
        <Text>
          {item.category.protip}
        </Text>
      </View>}
      </Accordion>
      </View>
    </Fragment>
    )
  }

  render() {
    const { userModel } = this.props
    const { searchKey } = this.state
    const categories = userModel.getPlanets()
    return (
      <Container style={styles.container} >
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

const styles=StyleSheet.create({
  container: {backgroundColor: '#E0E0E0'},
  subCategoryListContainer : {
    marginTop: 10, 
    marginLeft: 10
  },
  subCategoryItemContainer: {
    paddingVertical: 10,
    paddingLeft: 10, 
    justifyContent: 'center', 
  borderBottomWidth: 1,
   borderColor: '#E0E0E0', 
  width: '100%'
},
subCategoryList: {
  backgroundColor: '#FFFFFF', 
paddingTop: 5
},
categoryQuoteText: {
  padding: 15,
  backgroundColor: '#F0F8FF', 
textAlign: 'center', 
borderRadius: 12,
},
categoryQuoteView: {
  flex: 0, 
  padding: 15,
   alignSelf: 'center',
    justifyContent: 'center'
  },
  accordionContainer: {marginBottom: 10}
})