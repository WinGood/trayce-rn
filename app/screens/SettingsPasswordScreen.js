import React, {Component} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import StylingHideo from '../components/inputs/StylingHideo';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';


import { NavigationStyles } from '@exponent/ex-navigation';

let { height, width } = Dimensions.get('window');

import Router from '../config/router';
import Container from '../containers/Container';
import StatusBar from '../containers/StatusBar';

import LinearGradient from 'react-native-linear-gradient';

export default class SettingsPassword extends Component {
  constructor() {
    super();
  };

  render() {
    return (
      <Container>
        <StatusBar status='back' title='CHANGE PASSWORD' />
          <View style={styles.wrapper}>
            <View style={styles.inputs}>
              <StylingHideo
                label='Current password'
                iconClass={MaterialIcons}
                iconName={'lock-outline'}
                secureTextEntry={true}
                style={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}
               />
              <View style={{backgroundColor: 'white', marginTop: 50, borderRadius: 5}}>
                <StylingHideo
                  label='New password'
                  iconClass={MaterialIcons}
                  iconName={'lock-outline'}
                  secureTextEntry={true}
                 />
                <View style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  height: 1,
                  marginHorizontal: 3,
                }}></View>
                <StylingHideo
                  label='Repeat password'
                  iconClass={MaterialIcons}
                  iconName={'lock-outline'}
                  secureTextEntry={true}
                  style={{borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}
                 />
              </View>
            </View>
            <LinearGradient
              colors={['#04adaf', '#8ab9db']}
              style={{alignItems: 'center', borderRadius: 5, marginBottom: 30}}
              start={[0, 0.5]}
              end={[1, 1]}
            >
              <TouchableOpacity activeOpacity={1}
                style={styles.button}
                underlayColor='#04adaf'
                onPress={this._goToSendPasswordSuccess}
              >
                <Text style={styles.btnText}>SAVE</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
      </Container>
    )
  };

  // _close = () => {
  //   this.props.navigator.pop()
  // };

  _goToSendSuccess = () => {
     this.props.navigator.push(Router.getRoute('send_success'));
  }
  _goToAddExpense = () => {
     this.props.navigator.push(Router.getRoute('add_expense'));
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: height / 6,
  },
  input: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 25,
    backgroundColor: 'white',
    overflow: 'hidden'
  },
  label: {
    width: 300,
    color: '#56626f',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    paddingVertical: 25,
    fontSize: 16
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 21,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    fontSize: 18
  }
})
