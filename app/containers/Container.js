import React, {Component} from 'react';

import {
  StyleSheet
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default class Container extends Component {
  render() {
    return (
      <LinearGradient colors={['#04A9AB', '#56626F']} style={{flex: 1}}>
        {this.props.children}
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // right: 0,
    // bottom: 0
  },
});
