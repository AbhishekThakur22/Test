import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Animated,
} from 'react-native';
const hexOpacityValue = '40';

class Accordion extends Component {
  constructor(props) {
    super(props);

    this.icons = {
      up: require('../../assets/images/arrowUp.png'),
      down: require('../../assets/images/arrowDown.png'),
    };

    this.state = {
      sideIcon: props.sideIcon,
      colorCode: props.color,
      title: props.title,
      totalAmount: props.totalSaleAmount,
      expanded: false,
      animation: new Animated.Value(),
    };
  }
  componentDidMount() {
    if (this.props.title === 'Sales') {
      this.toggle();
    }
  }
  toggle() {
    let initialValue = this.state.expanded
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight,
      finalValue = this.state.expanded
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded,
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue,
    }).start();
  }

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height,
    });
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height,
    });
  }

  render() {
    let icon = this.icons.down;

    if (this.state.expanded) {
      icon = this.icons.up;
    }

    return (
      <Animated.View style={[styles.container]}>
        <View
          style={[
            styles.titleContainer,
            this.state.expanded && styles.noLowerBorderRadius,
          ]}
          onLayout={() => {
            this._setMinHeight.bind(this);
          }}
          onStartShouldSetResponderCapture={this.toggle.bind(this)}>
          <View
            style={[
              styles.sideImageContainer,
              {backgroundColor: this.state.colorCode + hexOpacityValue},
            ]}>
            <Image
              style={[styles.sideImage, {tintColor: this.state.colorCode}]}
              source={this.state.sideIcon}
            />
          </View>
          <Text style={[styles.title, {color: this.state.colorCode}]}>
            {this.state.title}
          </Text>
          <TouchableHighlight style={styles.button} underlayColor="#000000">
            <Image style={styles.buttonImage} source={icon} />
          </TouchableHighlight>
        </View>
        {this.state.expanded ? (
          <View
            style={[styles.body]}
            onLayout={() => {
              this._setMaxHeight.bind(this);
            }}>
            {this.props.children}
          </View>
        ) : null}
      </Animated.View>
    );
  }
}
export default Accordion;

var styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    // backgroundColor: '#fff',
  },
  noLowerBorderRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  titleContainer: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    flex: 1,
    flexDirection: 'row',
    elevation: 3,
    // borderBottomWidth: 0.5,
    borderColor: '#656565',
    justifyContent: 'center',
  },
  title: {
    // flex: 1,
    //padding: 10,
    // flexDirection: 'row',
    //color: '#389EBE',
    // paddingTop: 12,
    paddingLeft: 5,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 14,
    flex: 1,
  },
  titleAmount: {
    padding: 10,
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  sideImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
  },
  sideImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#000000',
    alignSelf: 'center',
  },
  buttonImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: '#000000',
    // marginTop: 10,
    marginRight: 5,
  },
  body: {
    // paddingTop: 5,
    // backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    // paddingTop: 0,
  },
  lowerBorderRadius: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});
