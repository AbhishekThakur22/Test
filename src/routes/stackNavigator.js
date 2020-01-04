import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

import SignIn from '../screens/SignIn'
import Search from '../screens/Search'
import PlanetDetails from '../screens/PlanetDetails'

const AppNavigator = createStackNavigator({
  SignIn: {
    screen: SignIn
  },
  Search: {
    screen: Search
  },
  PlanetDetails: {
    screen: PlanetDetails
  },
}, {
  initialRouteName: 'SignIn',
  headerMode: 'none',
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

export default createAppContainer(AppNavigator);