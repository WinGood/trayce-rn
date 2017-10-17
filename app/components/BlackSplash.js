import React from 'react';
import { View, Text, Image, StyleSheet, Animated, Platform } from 'react-native';



export default class BlackSplash extends React.Component {
  constructor() {
    super()

    this.state = {
         fadeAnim: new Animated.Value(1), // init opacity 0
    };
  }

  componentDidMount() {
      setTimeout(() => {
       Animated.timing(          // Uses easing functions
         this.state.fadeAnim,    // The value to drive
         {toValue: 0, duration: 600}            // Configuration
       ).start();
     }, 1300);
     }


  render() {
    return (
      <Animated.View style={[styles.wrapp, {opacity: this.state.fadeAnim}]}>
          <Image source={require('../assets/images/black-splash/group2.png')}/>
          <Text style={styles.title}>{this.props.title}</Text>
      </Animated.View>
    )
  }
}


const styles = StyleSheet.create({
  wrapp: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  title: {
    marginTop: -40,
    color: 'white',
    zIndex: 11,
    ...Platform.select({
      android: {
        /*fontFamily: 'SFUIText-Semibold',*/
      },
    }),
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: 'rgba(0,0,0,0)',
  }
})
