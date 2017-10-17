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

import {NavigationStyles} from '@exponent/ex-navigation';

let {height, width} = Dimensions.get('window');

import Router from '../config/router';
import Container from '../containers/Container';
import StatusBar from '../containers/StatusBar';

export default class PersonalSettings extends Component {
  constructor(props) {
    super(props);

    this.validateEmail = this.validateEmail.bind(this);
  }

  updateField(key, event) {
    const value = event.nativeEvent.text;
    if (key === 'email') {
      if (this.validateEmail(value)) {
        this.props.updateField(key, value);
      }
    } else {
      this.props.updateField(key, value);
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    return (
      <Container>
        <StatusBar title="PERSONAL SETTINGS" status="burger"/>
        <View style={styles.wrapper}>
          <View style={styles.photo_uploader}>
            <TouchableOpacity>
              <View style={{position: 'relative'}}>
                <MaterialIcons
                  name="add-a-photo"
                  size={55}
                  color="white"
                  style={styles.pluse}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.inputs}>
            <StylingHideo
              label={'Full name'}
              iconClass={MaterialIcons}
              iconName={'face'}
              onChange={this.updateField.bind(this, 'name')}
            />
            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                height: 1,
                marginHorizontal: 3,
              }}></View>
            <StylingHideo
              label={'Email'}
              iconClass={MaterialIcons}
              iconName={'mail-outline'}
              keyboardType="email-address"
              onChange={this.updateField.bind(this, 'email')}
            />
            <View style={{
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                height: 1,
                marginHorizontal: 3,
              }}></View>
            <StylingHideo
              label={'Phone'}
              iconClass={MaterialIcons}
              iconName={'phone-iphone'}
              keyboardType='numeric'
              style={{borderBottomRightRadius: 5, borderBottomLeftRadius: 5}}
              onChange={this.updateField.bind(this, 'phone_number')}
            />
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity activeOpacity={1} style={styles.button}
                              onPress={this._goToChangePassword}>
              <View style={{
                   flexDirection: 'row',
                   alignItems: 'center',
                   justifyContent: 'space-between',
               }}>
                <View style={styles.leftPart}>
                  <MaterialIcons name="lock-outline" size={25} color="#04adaf"
                                 style={{paddingVertical: 5}}/>
                  <Text style={styles.btnText}>Change password</Text>
                </View>
                <EvilIcons
                  name="chevron-right"
                  size={26} color="#56626f"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    )
  };

  _goToChangePassword = () => {
    this.props.navigator.push(Router.getRoute('settings_password'));
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: height / 6,
    paddingBottom: 30,
  },
  photo_uploader: {
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputs: {
    flex: 2,
    borderRadius: 6,
    backgroundColor: 'white',
    marginTop: 50,
  },
  input: {
    borderRadius: 15,
    paddingVertical: 5,
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
    paddingVertical: 5,
    fontSize: 16
  },
  buttonView: {
    flex: 2,
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 15,
    paddingLeft: 22.5,
    paddingRight: 17.5,
  },
  btnText: {
    color: '#56626f',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    paddingVertical: 5,
    fontSize: 16,
    paddingLeft: 17.5,
    flex: 1
  },
  leftPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})
