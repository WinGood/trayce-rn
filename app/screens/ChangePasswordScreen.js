import React, {Component} from 'react';
import {EvilIcons} from 'react-native-vector-icons/EvilIcons';
import {FontAwesome} from 'react-native-vector-icons/FontAwesome';
import {MaterialIcons} from 'react-native-vector-icons/FontAwesome';

import StylingHideo from '../components/inputs/StylingHideo';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';



import Container from '../containers/Container';
import Router from '../config/router';
let { height, width } = Dimensions.get('window');

import LinearGradient from 'react-native-linear-gradient';

export default class ChangePassword extends Component {
  constructor() {
    super();

    this._goToHome = this._goToHome.bind(this);
  };

  _goToHome() {
    this.props.navigator.push(Router.getRoute('home'));
  }

  render() {
    return (
      <Container>
        <View style={styles.wrapper}>
        <View>
          <Text style={styles.title}>Resset your password</Text>
          {
            true ?  <Text style={styles.subtitle}>The passwords don’t match!</Text>
                 :  null
          }
        </View>
          <View style={styles.inputs}>
            <StylingHideo
              label={'Password'}
              iconClass={MaterialIcons}
              iconName={'lock-outline'}
              secureTextEntry={true}
             />
            <View style={styles.hr}></View>
            <StylingHideo
              label={'Confirm password'}
              iconClass={MaterialIcons}
              iconName={'lock-outline'}
              secureTextEntry={true}
             />
            {
              true ? <View style={styles.warnn}></View> : null
            }
          </View>
          <LinearGradient
            colors={['#04adaf', '#8ab9db']}
            style={{alignItems: 'center', borderRadius: 5, marginBottom: 220}}
            start={[0, 0.5]}
            end={[1, 1]}
          >
            <TouchableOpacity style={styles.button} activeOpacity={1} onPress={this._goToHome}>
              <Text style={styles.btnText}>DONE</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginTop: height/5
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
    zIndex: 10,
  },
  hr: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginHorizontal: 3,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 21,
    paddingTop: 26,
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
  },
  warnn: {
    backgroundColor: '#e3534e',
    height: 5,
    marginHorizontal: 3,
    borderRadius: 5,
    marginTop: -10,
    marginBottom: 5,
  }
})
