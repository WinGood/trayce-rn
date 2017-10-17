import React, { PropTypes, Component } from 'react';
import {
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
} from 'react-native';

import BaseInput from './BaseInput.js';

const PADDING = 16;

export default class Hideo extends BaseInput {

  static propTypes = {
    /*
     * this is applied as background color of icon
     */
    iconBackgroundColor: PropTypes.string,

    /*
     * This is the icon component you are importing from react-native-vector-icons.
     * import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
     * iconClass={FontAwesomeIcon}
     */
    iconClass: PropTypes.func.isRequired,
    /*
     * Passed to react-native-vector-icons library as name prop
     */
    iconName: PropTypes.string.isRequired,
    /*
     * Passed to react-native-vector-icons library as color prop
     */
    iconColor: PropTypes.string,
  };

  static defaultProps = {
    iconColor: 'white',
    iconBackgroundColor: '#899dda',
    height: 48,
    animationDuration: 200,
  };

  render() {
    const {
      iconClass,
      iconColor,
      iconName,
      labelStyle,
      label,
      iconBackgroundColor,
      style: containerStyle,
      inputStyle,
      height: inputHeight,
    } = this.props;
    const {
      focusedAnim,
      value,
    } = this.state;
    const AnimatedIcon = Animated.createAnimatedComponent(iconClass);

    return (
      <View style={[containerStyle, styles.container]} onLayout={this._onLayout}>
        <TouchableWithoutFeedback onPress={this._focus}>
          <Animated.View style={{
            backgroundColor: iconBackgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            height: inputHeight,
            width: focusedAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [40, 30],
            }),
          }}>
            <AnimatedIcon
              name={iconName}
              color={iconColor}
              style={{
                marginLeft: 15,
                fontSize: focusedAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [25, 15],
                }),
              }}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this._focus}>
         <Animated.View style={{
           position: 'absolute',
           top: PADDING,
           opacity: focusedAnim.interpolate({
             inputRange: [0, 1],
             outputRange: [1, 0],
           }),
         }}>
           <Text style={[styles.label, labelStyle]}>
             {label}
           </Text>
         </Animated.View>
       </TouchableWithoutFeedback>
        <TextInput
          ref="input"
          {...this.props}
          style={[styles.textInput, inputStyle]}
          value={value}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          underlineColorAndroid={'transparent'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'white',
      overflow: 'hidden',
    },
    label: {
      fontSize: 16,
      fontFamily: 'Arial',
      fontWeight: 'bold',
      color: '#D2D2D2',
      backgroundColor: 'transparent',
      marginLeft: 16,
      paddingLeft: 1,
    },
    textInput: {
      flex: 1,
      paddingHorizontal: PADDING,
      color: 'black',
      backgroundColor: 'transparent',
      fontSize: 16,
    },

});
