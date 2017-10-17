import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Container from '../containers/Container';
import Router from '../config/router';

export default class Splash extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    setTimeout(() => {
        this.props.navigator.push(Router.getRoute('login'));
    }, 2000)
  }

  render() {
    return (
      <Container>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../assets/images/splash-logo/trayceLogo.png')}/>
          <Text style={styles.title}>trayce</Text>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    /*...Font.style('Melbourne-Light'),*/
    fontWeight: 'normal',
    fontSize: 80,
    color: 'white'
  }
})
