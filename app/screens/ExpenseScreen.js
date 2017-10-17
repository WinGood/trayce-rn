import React, {Component} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {Kohana} from 'react-native-textinput-effects';

import {NavigationStyles} from '@exponent/ex-navigation';
import Modal from 'react-native-simple-modal';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Switch,
  ScrollView,
  Platform
} from 'react-native';

import MDSwitch from '../components/MDSwitch';

import Router from '../config/router';
import Container from '../containers/Container';
import StatusBar from '../containers/StatusBar';

let {height, width} = Dimensions.get('window');

export default class Expense extends Component {
  constructor() {
    super();

    this.state = {
      openModal: false,
      doneAll: false
    }

    this._modal      = this._modal.bind(this);
    this._closeModal = this._closeModal.bind(this);
  };


  _modal() {
    this.setState({openModal: !this.state.openModal})
  }

  _closeModal() {
    this.setState({openModal: false})
  }

  render() {
    const {expense, category} = this.props.route.params;

    let value = expense.amount;
    value     = parseFloat(value).toFixed(2);

    return (
      <View style={styles.container}>

        <ScrollView>
          <StatusBar status='back' title="EXPENSE"/>
          <View style={styles.wrapper}>
            <View style={styles.wrappMoney}>
              <View>
                <View style={styles.money}>
                  <Text style={styles.moneyText}>{value}</Text>
                </View>
                <View style={styles.circle}>
                  <Text style={styles.circleText}>{expense.currency}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.photo} onPress={this._modal}>
                <Image style={{resizeMode: 'contain',width: width / 3,
    height: height / 4.7}}
                       source={{
                        uri: `http://res.cloudinary.com/www-mollerhoj-com/image/upload/c_thumb,h_300,w_240/v1/${expense.cloudinary_picture_id}.jpg`
                       }}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.secondWrapp}>
            <View style={styles.list}>
              <View style={[styles.row, {paddingRight: 38}]}>
                <Text style={styles.rowLeftText}>Date</Text>
                <Text style={styles.rowRightText}>{expense.payed_date}</Text>
              </View>
              <View style={[styles.row, {paddingRight: 35}]}>
                <Text style={styles.rowLeftText}>Merchant</Text>
                <Text style={styles.rowRightText}>{expense.merchant}</Text>
              </View>
              {
                (category)
                  ?
                  <View style={[styles.row, {paddingRight: 35}]}>
                    <Text style={styles.rowLeftText}>Category</Text>
                    <TouchableOpacity style={styles.chevron}>
                      <Text style={styles.rowRightText}>{category.name}</Text>
                    </TouchableOpacity>
                  </View>
                  :
                  null
              }
              <View style={[styles.row, {paddingRight: 35}]}>
                <Text style={styles.rowLeftText}>Assigned to</Text>
                <TouchableOpacity style={styles.chevron}>
                  <Text style={styles.rowRightText}>Assignment</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.row, {paddingRight: 35}]}>
                <Text style={styles.rowLeftText}>Comment</Text>
                <Text style={styles.rowRightText}>{expense.comment}</Text>
              </View>
            </View>
            <View style={styles.options}>
              <View
                style={[styles.row, Platform.OS === 'ios' ? {paddingRight: 35} : {paddingRight: 30}]}>
                <Text style={styles.optionsLeftText}>Billable</Text>
                {
                  (Platform.OS == 'ios')
                    ?
                    <Switch
                      style={{backgroundColor: 'white', borderRadius: 15}}
                      value={expense.is_billable}
                    />
                    :
                    <MDSwitch
                      active={expense.is_billable}/>
                }
              </View>
              <View
                style={[styles.row, Platform.OS === 'ios' ? {paddingRight: 35} : {paddingRight: 30}]}>
                <Text style={styles.optionsLeftText}>Reimbursable</Text>
                {
                  (Platform.OS == 'ios')
                    ?
                    <Switch
                      style={{backgroundColor: 'white', borderRadius: 15}}
                      value={true}
                    />
                    :
                    <MDSwitch
                      active={true}/>
                }
              </View>
            </View>
          </View>
        </ScrollView>
        <Modal
          open={this.state.openModal}
          offset={100}
          overlayBackground={'rgba(0, 0, 0, 0.75)'}
          animationDuration={200}
          animationTension={40}
          modalDidClose={this._closeModal}

          containerStyle={{
               justifyContent: 'center',
               zIndex: 10001,
               padding: 0,
               flex: 1,
            }}
          modalStyle={{
               backgroundColor: '#000',
               padding: 0,
               flex: 1,
               margin: 0,
            }}>
          <TouchableOpacity activeOpacity={1} onPress={this._closeModal}
                            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{resizeMode: 'contain', width: width, height: height}}
                   source={{
                    uri: `http://res.cloudinary.com/www-mollerhoj-com/image/upload/c_thumb,h_300,w_240/v1/${expense.cloudinary_picture_id}.jpg`
                   }}/>
          </TouchableOpacity>
        </Modal>
      </View>
    )
  };

  _goToSendExpenseSuccess = () => {
    this.props.navigator.push(Router.getRoute('send_expense_success'));
  }
  _goToExpenseCategory    = () => {
    this.props.navigator.push(Router.getRoute('expense_category'));
  }
  _goToExpenseAssignment  = () => {
    this.props.navigator.push(Router.getRoute('expense_assignment'));
  }
  _goToExpenseAttendee    = () => {
    this.props.navigator.push(Router.getRoute('expense_attendee'));
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
  },
  wrappMoney: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 40,
  },
  money: {
    width: width / 2.5,
    height: width / 2.5,
    backgroundColor: "#5E6872",
    borderRadius: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
  },
  moneyText: {
    color: '#fff',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    fontSize: 35,
    width: width / 2.5,
    textAlign: 'center'
  },
  circle: {
    position: 'absolute',
    backgroundColor: '#8ab9db',
    borderRadius: (width / 2),
    width: width / 6.2,
    height: width / 6.2,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -10,
    right: -10,
  },
  circleText: {
    color: '#fff',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 17,
    width: width / 6,
    textAlign: 'center'

  },
  photo: {
    borderColor: '#5E6872',
    borderWidth: 5,
    borderRadius: 5,
    marginRight: -5,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0)',
    width: width / 3,
    height: height / 4.7,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  row: {
    backgroundColor: '#56626F',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
    flex: 1,
    paddingLeft: 20,
  },
  rowLeftText: {
    color: '#8ab9db',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    fontSize: 15,
    flex: 1,
  },
  rowRightText: {
    flex: 1,
    paddingVertical: 10,
    textAlign: 'right',
    color: 'white',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Regular'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    fontSize: 15,
    paddingLeft: 5,
  },
  chevron: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  options: {
    paddingVertical: 20,
  },
  optionsLeftText: {
    color: 'white',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    fontSize: 15,
    width: 150,
    paddingVertical: 10,

  },
  button: {
    backgroundColor: '#04adaf',
    marginHorizontal: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    fontSize: 18
  }
})
