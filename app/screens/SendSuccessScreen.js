import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Platform
} from 'react-native';



import Router from '../config/router';
import Container from '../containers/Container';

export default class SendSuccess extends Component {
  constructor() {
    super();


  };



  render() {
    return (
      <Container>
        <View style={styles.wrapper}>
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
