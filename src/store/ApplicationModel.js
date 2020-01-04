import { observable, action, toJS } from 'mobx'

export default class ApplicationModel {
  @observable loader = false

  @action
  setLoader(value) {
    this.loader = value
  }

  getLoader() {
    return toJS(this.loader)
  }
}
