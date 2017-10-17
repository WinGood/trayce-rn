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

export default class SendExpenseSuccess extends Component {
  constructor() {
    super();

    state = {
      fontLoaded: false,
    };
  };
  
  componentDidMount() {
    setTimeout(() => {
      this.props.navigator.replace(Router.getRoute('home'));
    }, 2000)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>
            HOORAY!
          </Text>
          <View style={styles.send_success}>
            <Image source={require('../assets/images/success/group.png')}/>
          </View>
          <Text style={styles.subtitle}>
            YOUR EXPENSE HAS BEEN SENT
          </Text>
        </View>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4D5863',
    flex: 1,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  send_success: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 35,
  },
  subtitle: {
    color: 'white',
    marginTop: 35,
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Regular'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    fontSize: 18,
    textAlign: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

})
