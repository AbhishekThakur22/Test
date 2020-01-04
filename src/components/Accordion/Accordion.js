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

class Accordion extends Component {
  constructor(props) {
    super(props);

    this.icons = {
      up: require('../../assets/images/arrowUp.png'),
      down: require('../../assets/images/arrowDown.png'),
    };

    this.state = {
      sideIcon: props.sideIcon,
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
      <Animated.View style={styles.container}>
        <View
          style={[styles.titleContainer, {backgroundColor: this.props.bgColor}]}
          onLayout={() => {
            this._setMinHeight.bind(this);
          }}
          onStartShouldSetResponderCapture={this.toggle.bind(this)}>
          <Image style={styles.buttonImage} source={this.state.sideIcon} />
          <Text style={styles.title}>{this.state.title}</Text>
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
    // backgroundColor: '#fff',
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#656565',
  },
  title: {
    // flex: 1,
    //padding: 10,
    // flexDirection: 'row',
    //color: '#389EBE',
    paddingTop: 12,
    paddingLeft: 5,
    fontWeight: 'bold',
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
  },
  buttonImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: '#000000',
    marginTop: 10,
    marginRight: 5,
  },
  body: {
    padding: 10,
    paddingTop: 0,
  },
});
