import React, {Component} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StylingHideo from '../components/inputs/StylingHideo';
import {NavigationStyles} from '@exponent/ex-navigation';

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

import LinearGradient from 'react-native-linear-gradient';

import Router from '../config/router';
import StatusBar from '../containers/StatusBar';

let {height, width} = Dimensions.get('window');

export default class CreateAccount extends Component {
  constructor() {
    super();

    this.state = {
      photo: false
    }
  };

  static route = {
    styles: {
      ...NavigationStyles.SlideVertical,
    },
  };

  render() {
    return (
      <View>
        <LinearGradient
          colors={['#04adaf', '#56626f']}
          style={{height: height/2.9}}
          start={[0, 0.5]}
          end={[1, 1]}
        >
          <StatusBar status="close"/>
          <TouchableOpacity style={styles.photo_uploader}
                            onPress={() => this.setState({photo: !this.state.photo})}>
            { !this.state.photo ?
              <MaterialIcons
                name="add-a-photo"
                size={55}
                color="white"
                style={styles.pluse}/>

              :
              <View style={{zIndex: 10001, overflow: 'hidden'}}>
                <Image style={styles.avatar} resizeMode={'cover'}
                       source={require('../assets/images/avatar.jpg')}/>
              </View>
            }
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.wrapper}>
          <StylingHideo
            style={{paddingVertical: 6}}
            styleLabel={{paddingVertical: 5}}
            label={'Full name'}
            iconClass={MaterialIcons}
            iconName={'face'}
          />
          {this.hr()}
          <StylingHideo
            style={{paddingVertical: 6}}
            styleLabel={{paddingVertical: 5}}
            label={'Your email'}
            iconClass={MaterialIcons}
            iconName={'mail-outline'}
            keyboardType="email-address"
          />
          {this.hr()}
          <StylingHideo
            style={{paddingVertical: 6}}
            styleLabel={{paddingVertical: 5}}
            label={'Password'}
            iconClass={MaterialIcons}
            iconName={'lock-outline'}
            secureTextEntry={true}
          />
          {this.hr()}
          <LinearGradient
            colors={['#04adaf', '#8ab9db']}
            style={styles.btnGradient}
            start={[0, 0.5]}
            end={[1, 1]}
          >
            <TouchableOpacity style={styles.button} onPress={this._goToHome}>
              <Text style={styles.btnText}>SIGN UP</Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={styles.WrappTextLink}>
            <Text style={styles.Text}>Already have an account?</Text>
            <Text style={styles.linkText} onPress={this._goToLogin}>Sign
              in</Text>
          </View>
        </View>
      </View>
    )
  };

  hr() {
    return (
      <View style={styles.hr}></View>
    )
  };

  _goToSendSuccess = () => {
    this.props.navigator.push(Router.getRoute('send_success'));
  };

  _goToLogin = () => {
    this.props.navigator.pop();
  };

  _goToHome = () => {
    this.props.navigator.push(Router.getRoute('home'));
  };

};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  pluse: {
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 20
  },
  photo_uploader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: height / 9,

  },
  input: {
    flex: 1,
    borderRadius: 15,
    paddingVertical: 2,
    backgroundColor: 'white',
    overflow: 'hidden',
    justifyContent: 'center'
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
    paddingVertical: 2,
    fontSize: 16
  },
  hr: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginHorizontal: 3
  },
  btnGradient: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 30,
  },
  button: {
    flex: 1,
    width: width / 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 10
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
  WrappTextLink: {
    flex: 1,
    flexDirection: 'row',

    justifyContent: 'center',
    marginTop: 10
  },
  Text: {
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    fontSize: 16,
    paddingHorizontal: 5,
    color: '#56626f'
  },
  linkText: {
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#04adaf'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    ...Platform.select({
      android: {
        borderRadius: width
      },
      ios: {
        borderRadius: 50,
      }
    }),
  }

})
