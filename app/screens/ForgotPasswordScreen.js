import React, {Component} from 'react';
import {FontAwesome} from '@exponent/vector-icons';
import {Kohana} from 'react-native-textinput-effects';

import { NavigationStyles } from '@exponent/ex-navigation';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Platform
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Container from '../containers/Container';

export default class ForgotPassword extends Component {
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
        <View style={styles.wrapper}>
        <View style={{ position: 'relative' }}>
          <Text style={styles.title}>Resset your password</Text>
          {
            true ?  <Text style={styles.subtitle}>The passwords don’t match!</Text>
                 :  null
          }
        </View>
          <View style={styles.inputs}>
            {this.NewPass()}
            <View style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          height: 1,
                          marginHorizontal: 3,
                        }}></View>
            {this.ConfirmPass()}
            {
              true ? <View style={{
                            backgroundColor: '#e3534e',
                            height: 5,
                            marginHorizontal: 3,
                            borderRadius: 5,
                            marginTop: -10,
                            marginBottom: 5,
              }}></View> : null
            }


          </View>
          <LinearGradient
            colors={['#04adaf', '#8ab9db']}
            style={{alignItems: 'center', borderRadius: 5, }}
            start={[0, 0.5]}
            end={[1, 1]}
          >
            <TouchableOpacity activeOpacity={1}
              style={styles.button}
              underlayColor='#ccc'
              onPress={() => alert('press')}
            >
              <Text style={styles.btnText}>DONE</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Container>
    )
  };

  NewPass() {
    return (
      <Kohana
        label={'New password'}
        iconClass={FontAwesome}
        iconName={'lock-outline'}
        iconColor={'#04adaf'}
        labelStyle={styles.label}
        style={styles.input}
        secureTextEntry={true}
      />
    )
  };

  ConfirmPass() {
    return (
      <Kohana
        label={'Confirm password'}
        iconClass={FontAwesome}
        iconName={'lock-outline'}
        iconColor={'#04adaf'}
        labelStyle={styles.label}
        style={styles.input}
        secureTextEntry={true}
      />
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
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
    borderRadius: 6,
    backgroundColor: 'white',
    marginBottom: 170,
  },
  input: {
    marginLeft: -1,
    flex: 1,
    borderRadius: 15,
    paddingVertical: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
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
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 23,
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
