import {observable, action, toJS, observe} from 'mobx';
import {isEqual, get, isEmpty, map} from 'lodash';
import {
  apiResponseStatus,
  HTTP_ERROR,
  NavigationService,
  showToast,
} from '../common/utils';
import moment from 'moment';

import {
  fetchPlanets,
  fetchPlanetDetails,
  fetchPlanetsBySearch,
} from '../services';

const convertDateFormat = dataList =>
  map(dataList, item => {
    item.debtorDate = moment(item.Date).format('MMMM Do YYYY');
    return item;
  });

export default class UserModel {
  @observable planetDetails = {};
  @observable planets = [];
  @observable responseErrorCode = 200;

  setApplicationInstance(instanceAppModel) {
    this.applicationModel = instanceAppModel;
  }

  onLoading(isLoading) {
    this.applicationModel.setLoader(isLoading);
  }

  @action
  setStorePlanets(value) {
    this.planets = value;
  }

  getPlanets() {
    return toJS(this.planets);
  }

  @action
  setStorePlanetDetails(value) {
    this.planetDetails = value;
  }

  getPlanetDetails() {
    return toJS(this.planetDetails);
  }

  @action
  async fetchData(key) {
    this.onLoading(true);
    const data = await fetchPlanets(key);
    console.log('ssssssssssssssss', data);
    this.onLoading(false);
    if (!isEmpty(get(data, 'categories'))) {
      this.setStorePlanets(get(data, 'categories', []));
    }
  }

  @action
  async fetchPlanetsBySearch(searchKey) {
    this.onLoading(true);
    const data = await fetchPlanetsBySearch(searchKey);
    this.onLoading(false);
    if (!isEmpty(get(data, 'results'))) {
      this.setStorePlanets(get(data, 'results', []));
    }
  }

  @action
  async fetchPlanetDetails(key) {
    this.onLoading(true);
    const data = await fetchPlanetDetails(key);
    this.onLoading(false);
    if (!isEmpty(data)) {
      this.setStorePlanetDetails(data);
    }
  }

  @action
  async saveUser({userName, password}, navigation) {
    try {
      showToast({
        text: 'Login Successfully!',
        position: 'top',
        type: 'success',
      });
      navigation.navigate('Search');
    } catch (err) {
      console.log('Signing Error', err);
    }
  }

  @action
  piggybackWatcherForStatus = observe(apiResponseStatus, change => {
    if (isEqual(change.newValue, HTTP_ERROR.UNAUTHORIZED.CODE)) {
      this.handle401ErrorCode(change.newValue);
    }
    if (isEqual(change.newValue, HTTP_ERROR.OK.CODE)) {
      console.log(`ERRROR  ${HTTP_ERROR.OK.CODE}`) //eslint-disable-line
      this.setApiResponseErrorStatus(change.newValue);
    }
  });

  async handle401ErrorCode(errorCode) {
    this.setApiResponseErrorStatus(errorCode);
    NavigationService.navigate('Auth');
  }

  @action
  setApiResponseErrorStatus(errorCode) {
    this.isAuthenticated = false;
    this.responseErrorCode = errorCode;
  }

  getApiResponseErrorStatus() {
    return this.responseErrorCode;
  }
}
