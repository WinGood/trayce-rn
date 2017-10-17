import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Platform
} from 'react-native';


import {EvilIcons} from 'react-native-vector-icons/EvilIcons';
import {FontAwesome} from 'react-native-vector-icons/FontAwesome';
import {MaterialIcons} from 'react-native-vector-icons/FontAwesome';
import Router from '../config/router';
import Container from '../containers/Container';
import StatusBar from '../containers/StatusBar';

export default class SendPasswordSuccess extends Component {
  constructor() {
    super();


    this._goToForgotPass = this._goToForgotPass.bind(this);
  };


  _goToForgotPass() {
    this.props.navigator.push(Router.getRoute('change_password'));
  }

  render() {
    return (
      <Container>
      {/*<StatusBar status='close' />*/}
        <View style={styles.wrapper}>
        <TouchableOpacity style={{position: 'absolute', top: 35, left: 15}}
                          onPress={this._goToForgotPass}>
          <EvilIcons style={{backgroundColor: 'transparent'}} name="close" size={40} color="white"/>
        </TouchableOpacity>
          <View style={styles.send_success}>
            <Image source={require('../assets/images/success/group.png')}/>
          </View>
            <Text style={styles.title}>
              We’ve sent you an email with a link
              to reset your password!
            </Text>
        </View>
      </Container>
    )
  };
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  send_success: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 100,
  },

})
