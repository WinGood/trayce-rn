import React, {Component} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import StylingHideo from '../components/inputs/StylingHideo';

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

import LinearGradient from 'react-native-linear-gradient';

class Attendee extends Component {
  constructor(props) {
    super(props);

    this._handleFullName    = this._handleFullName.bind(this);
    this._handleCompanyName = this._handleCompanyName.bind(this);
    this._handleRemove      = this._handleRemove.bind(this);

    // this.state = {
    //   fullName: '',
    //   companyName: ''
    // }
  }

  _handleFullName(event) {
    this.props.onChange(this.props.index, 'fullName', event.nativeEvent.text);
    // this.setState({
    //   fullName: event.nativeEvent.text
    // });
  }

  _handleCompanyName(event) {
    this.props.onChange(this.props.index, 'companyName', event.nativeEvent.text);
    // this.setState({
    //   companyName: event.nativeEvent.text
    // });
  }

  _handleRemove() {
    this.props.removeAttendee(this.props.index);
  }

  render() {
    return (
      <View style={styles.attendee}>
        <LinearGradient
          colors={['#04adaf', '#8ab9db']}
          style={{height: 44, borderRadius: 5,
      marginBottom: -5, paddingBottom: 5}}
          start={[0, 0.5]}
          end={[1, 1]}
        >
          <View style={styles.header}>
            <Text
              style={styles.headerText}>Attendee {this.props.index + 1}</Text>
            <TouchableOpacity onPress={this._handleRemove}>
              <Octicons style={{backgroundColor: 'transparent'}}
                        name="remove-close" size={22} color="white"></Octicons>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={styles.bady}>
          <View style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              height: 1,
              marginHorizontal: 3,
            }}></View>
          <StylingHideo
            label={'Full name'}
            iconClass={MaterialIcons}
            iconName={'face'}
            style={styles.attendeeInput}
            onChange={this._handleFullName}
            value={this.props.fullName}
          />
          <View style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              height: 1,
              marginHorizontal: 3,
            }}></View>
          <StylingHideo
            label={'Company name'}
            iconClass={MaterialIcons}
            iconName={'business'}
            onChange={this._handleCompanyName}
            value={this.props.companyName}
            style={[styles.attendeeInput, {borderBottomLeftRadius: 5, borderBottomRightRadius: 5}]}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  attendee: {
    borderRadius: 5,
    marginBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 18
  },
  headerText: {
    color: 'white',
    ...Platform.select({
      android: {
        /*fontFamily: 'SFUIText-Semibold',*/
      },
    }),
    backgroundColor: 'transparent',
    fontWeight: '500',
    fontSize: 17
  },
  attendeeInput: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  body: {
    borderRadius: 15,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  addAttendee: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  }
})

export default Attendee;
