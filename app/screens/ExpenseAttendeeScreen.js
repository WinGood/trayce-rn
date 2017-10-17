import React, {Component} from 'react';
import {EvilIcons} from 'react-native-vector-icons/EvilIcons';
import {FontAwesome} from 'react-native-vector-icons/FontAwesome';
import {MaterialIcons} from 'react-native-vector-icons/FontAwesome';
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

import StatusBar from '../containers/StatusBar';
import Attendee from '../components/Attendee';

let {height, width} = Dimensions.get('window');
export default class ExpenseAttendee extends Component {
  constructor(props) {
    super(props);

    let state = {
      attendees: [{
        fullName: '',
        companyName: ''
      }]
    }
    
    if (props.selectedAttendees) {
      state = {
        attendees: props.selectedAttendees
      }
    }

    this.state = state;

    this.addAttendee    = this.addAttendee.bind(this);
    this.removeAttendee = this.removeAttendee.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this._onBack        = this._onBack.bind(this);
  }

  addAttendee() {
    const {attendees} = this.state;
    let validate = true;

    attendees.forEach((attende) => {
      if (attende.fullName == '' || attende.companyName == '') {
        validate = false;
      }
    });

    if (!validate) {
      return;
    }

    const copy = [...this.state.attendees];
    copy.push({
      fullName: '',
      companyName: ''
    });

    this.setState({
      attendees: copy
    });
  }

  removeAttendee(index) {
    const copy = [...this.state.attendees];
    copy.splice(index, 1);

    this.setState({
      attendees: copy
    });
  }

  handleOnChange(index, key, value) {
    const copy       = [...this.state.attendees];
    copy[index][key] = value;

    this.setState({
      attendees: copy
    });
  }

  _onBack() {
    const {attendees} = this.state;
    let validatAttendees = [];

    attendees.forEach((attende) => {
      if (attende.fullName != '' && attende.companyName != '') {
        validatAttendees.push(attende);
      }
    });

    if (!validatAttendees.length) {
      validatAttendees = '';
    }

    this.props.setExpenseAttendees(validatAttendees);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar onPress={this._onBack} status='back' title='ATTENDEES'/>
          <View style={styles.wrapper}>
            {
              this.state.attendees.map((attendee, index) => {
                return (
                  <Attendee key={index}
                            index={index}
                            fullName={attendee.fullName}
                            companyName={attendee.companyName}
                            onChange={this.handleOnChange}
                            removeAttendee={this.removeAttendee}/>
                );
              })
            }
            <TouchableOpacity style={styles.addAttendee}
                              onPress={this.addAttendee}>
              <Image
                source={require('../assets/images/add-attendee/group.png')}/>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4D5863',
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 20,
    marginTop: height / 6,
    marginBottom: 30,
  },
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
    fontWeight: '500',
    fontSize: 17
  },
  body: {
    borderRadius: 15,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  input: {
    paddingVertical: 4,
    backgroundColor: 'white',
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
    paddingVertical: 4,
    fontSize: 16
  },
  addAttendee: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  }
})
