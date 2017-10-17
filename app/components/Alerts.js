import React, {Component} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import {Kohana} from 'react-native-textinput-effects';
import {NavigationStyles} from '@exponent/ex-navigation';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Platform
} from 'react-native';

export const RedAlert = (title, subtitle) => {
  return (
    <View style={[styles.alert, styles.redAlert]}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export const GreenAlert = (title, subtitle) => {
  return (
    <View style={[styles.alert, styles.greenAlert]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  alert: {
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  redAlert: {
    backgroundColor: '#E3534E',
  },
  greenAlert: {
    backgroundColor: '#27AE60',
  },
  subtitle: {
    color: 'white',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'transparent',
    fontWeight: 'normal',
    fontSize: 15,
    flex: 1
  },
  title: {
    color: 'white',
    ...Platform.select({
      android: {
        /*fontFamily: 'SFUIText-Semibold',*/
      },
    }),
    backgroundColor: 'transparent',
    fontWeight: 'normal',
    fontSize: 15,
    flex: 1
  }
})
