import React, {Component} from 'react';
import Hideo from './Hideo';

import {
  StyleSheet,
  Platform
} from 'react-native';

export default class StylingHideo extends Component {
  constructor(){
    super();
  }

  render() {
    return (
      <Hideo
          {...this.props}
          label={this.props.label}
          iconClass={this.props.iconClass}
          iconName={this.props.iconName}
          iconColor="#04adaf"
          labelStyle={[styles.label, this.props.styleLabel]}
          iconBackgroundColor={'transparent'}
          style={[styles.input, {borderTopLeftRadius: 5, borderTopRightRadius: 5}, this.props.style]}
          inputStyle={styles.inputText}
       />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    justifyContent: 'center',
    // minHeight: 58
    paddingVertical: 8,
  },
  inputText: {
    color: '#56626f',
    fontSize: 16,
    // ...Platform.select({
    //   android: {
    //     /*...Font.style('SFUIText-Medium'),*/
    //   },
    // }),
  },
  label: {
    flex: 1,
    color: '#56626f',
    // ...Platform.select({
    //   android: {
    //     /*...Font.style('SFUIText-Medium'),*/
    //   },
    // }),
    fontWeight: 'normal',
    paddingVertical: 5,
    fontSize: 16,
  },
});
