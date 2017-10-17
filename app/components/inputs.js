import React from 'react';
import { Kohana } from 'react-native-textinput-effects';
import { StyleSheet, Platform } from 'react-native';

export const InputDefault = (label, iconClass, iconName) => {
  return(
    <Kohana
      label={label}
      iconClass={iconClass}
      iconName={iconName}
      iconColor={'#04adaf'}
      labelStyle={styles.label}
      style={styles.input}
      inputStyle={{ color: '#56626f' }}
    />
  )
}

export const InputEmail = (label, iconClass, iconName) => {
  return(
    <Kohana
      label={label}
      iconClass={iconClass}
      iconName={iconName}
      iconColor={'#04adaf'}
      labelStyle={styles.label}
      style={styles.input}
      inputStyle={{ color: '#56626f' }}
      keyboardType="email-address"
    />
  )
}

export const InputPassword = (label, iconClass, iconName) => {
  return(
    <Kohana
      label={label}
      iconClass={iconClass}
      iconName={iconName}
      iconColor={'#04adaf'}
      labelStyle={styles.label}
      style={styles.input}
      inputStyle={{ color: '#56626f' }}
      secureTextEntry={true}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
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
    fontWeight: 'normal',
    paddingVertical: 5,
    fontSize: 16
  }
});
