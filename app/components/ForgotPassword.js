import React, {Component} from 'react';
import {FontAwesome} from '@exponent/vector-icons';
import {Kohana} from 'react-native-textinput-effects';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export default class Login extends Component {
  constructor() {
    super();

    state = {
      fontLoaded: false,
    };
  };

  async componentDidMount() {
    await Font.loadAsync({
      'SFUIText-Light': require('../assets/fonts/SF-UI-Text-Light.ttf'),
      'SFUIText-Medium': require('../assets/fonts/SF-UI-Text-Medium.ttf'),
    });

    this.setState({fontLoaded: true});
  };


  render() {
    return (
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

          <LinearGradient
            colors={['#04adaf', '#8ab9db']}
            style={{alignItems: 'center', borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,}}
            start={[0, 0.5]}
            end={[1, 1]}
          >
            <TouchableHighlight style={styles.button} underlayColor='#ccc' onPress={() => alert('press')}>
              <Text style={styles.btnText}>DONE</Text>
            </TouchableHighlight>
          </LinearGradient>
        </View>
      </View>
    )
  };

  NewPass() {
    return (
      <Kohana
        label={'New password'}
        iconClass={FontAwesome}
        iconName={'lock'}
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
        iconName={'lock'}
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
    /*...Font.style('SFUIText-Medium'),*/
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
    /*...Font.style('SFUIText-Medium'),*/
    fontWeight: 'normal',
    paddingVertical: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  inputs: {
    borderRadius: 6,
    backgroundColor: 'white',
    marginBottom: 100,
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
    /*...Font.style('SFUIText-Medium'),*/
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
    /*...Font.style('SFUIText-Medium'),*/
    fontWeight: 'bold',
    fontSize: 18
  }
})
