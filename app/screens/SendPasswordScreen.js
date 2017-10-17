import React, {Component} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StylingHideo from '../components/inputs/StylingHideo';
import {NavigationStyles} from '@exponent/ex-navigation';

import LinearGradient from 'react-native-linear-gradient';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';

import Router from '../config/router';
import Container from '../containers/Container';
import StatusBar from '../containers/StatusBar';

let {height, width} = Dimensions.get('window');

export default class SendPassword extends Component {
  constructor() {
    super();
  };

  static route = {
    styles: {
      ...NavigationStyles.SlideVertical,
    },
  };

  render() {
    return (
      <Container>
        <StatusBar status='close'/>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Forgot your password?</Text>
          <Text style={styles.subtitle}>
            No worries! Enter your email
            address and we’ll send you an email to reset it!
          </Text>
          <View>
            <View style={styles.inputs}>
              <StylingHideo
                style={{paddingVertical: 6}}
                styleLabel={{paddingVertical: 5}}
                label={'Your email'}
                iconClass={FontAwesome}
                iconName={'envelope-o'}
              />
            </View>
            <LinearGradient
              colors={['#04adaf', '#8ab9db']}
              style={{alignItems: 'center', borderRadius: 5}}
              start={[0, 0.5]}
              end={[1, 1]}
            >
              <TouchableOpacity activeOpacity={1}
                                style={styles.button}
                                underlayColor='#04adaf'
                                onPress={this._goToSendPasswordSuccess}
              >
                <Text style={styles.btnText}>RESET PASSWORD</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Container>
    )
  };

  // _close = () => {
  //   this.props.navigator.pop()
  // };

  _goToSendPasswordSuccess = () => {
    this.props.navigator.push(Router.getRoute('send_password_success'));
  }

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: height / 6,
    justifyContent: 'flex-start',
  },
  title: {
    color: 'white',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    paddingVertical: 8,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 45,
  },
  subtitle: {
    marginTop: -50,
    marginBottom: 10,
    color: 'white',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    paddingVertical: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  inputs: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: 'white',
    marginBottom: -5,
    zIndex: 10001
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 21,
    paddingTop: 26,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    zIndex: 1,
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
