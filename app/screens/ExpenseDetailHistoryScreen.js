import React, {Component} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {Kohana} from 'react-native-textinput-effects';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Platform
} from 'react-native';


import {NavigationStyles} from '@exponent/ex-navigation';

let {height, width} = Dimensions.get('window');

import Router from '../config/router';
import Container from '../containers/Container';
import StatusBar from '../containers/StatusBar';
import Search from '../components/Search';

import LinearGradient from 'react-native-linear-gradient';

export default class ExpenseDetailHistory extends Component {
  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);

    this.state = {
      list: props.route.params.expenses,
      expenses: props.route.params.expenses
    }
  }

  _handleOnChange(event) {
    let filtered  = [];
    let searchStr = event.nativeEvent.text.toLowerCase();

    if (!searchStr) {
      filtered = this.state.list;
    } else {
      filtered = this.state.expenses.filter((expense) => {
        if (expense.merchant) {
          if (expense.merchant.toLowerCase().indexOf(searchStr) !== -1) {
            return true;
          }
        }
      });
    }

    this.setState({
      expenses: filtered
    });
  }

  render() {
    const {categories, month, assignments} = this.props.route.params;
    const {expenses} = this.state;

    return (
      <Container>
        <ScrollView>
          <StatusBar status="back" title="EXPENSE HISTORY"/>
          <View style={styles.wrapper}>
            <Search onChange={this._handleOnChange}/>
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
                    style={styles.headerText}>{month.name.toUpperCase()} {month.year}</Text>
                </View>
              </LinearGradient>
              <View style={styles.bady}>
                <View style={styles.data}>
                  {
                    expenses.map((expense, index) => {
                      const category = categories.find(
                        category => category.id === expense.category_id);
                      // const assignment = assignments.find(assignment => assignment.id ===)

                      return (
                        <TouchableOpacity activeOpacity={0.7}
                                            style={[styles.row]}
                                            key={index}
                                            onPress={this._goToExpense.bind(this, expense, category)}>
                          <View
                            style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'}}>
                            <View style={styles.rowLeft}>
                              <Text
                                style={styles.rowText1}>{expense.payed_date}</Text>
                              <Text
                                style={styles.rowText2}>{expense.merchant}</Text>
                              {
                                (category)
                                  ?
                                  <Text
                                    style={styles.rowText3}>{category.name}</Text>
                                  :
                                  null
                              }
                            </View>

                            <View
                              style={{flexDirection: 'row', alignItems: 'center'}}>
                              <Text
                                style={styles.rowRightText}>{expense.amount} {expense.currency}</Text>
                              <EvilIcons
                                name="chevron-right"
                                size={26} color="#56626F"/>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    )
  };

  _goToExpense(expense, category) {
    this.props.navigator.push(Router.getRoute('expense', {
      expense,
      category
    }));
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: height / 6,
  },
  search: {
    borderRadius: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  searchInput: {
    backgroundColor: 'transparent',
    height: 42,
    flex: 1,
    fontSize: 16,
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Regular'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    color: '#4D5863',
    paddingLeft: 10,
  },
  attendee: {
    borderRadius: 5,
    marginBottom: 30,
    marginTop: 35,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0)',
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
  data: {
    borderRadius: 5,
  },
  row: {
    paddingLeft: 15,
    paddingRight: 5,
    marginBottom: 1,
    backgroundColor: 'white',
  },
  rowText1: {
    ...Platform.select({
      android: {
        /*fontFamily: 'SFUIText-Semibold',*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    color: '#56626F',
    fontSize: 12,
    paddingTop: 3,
  },
  rowText2: {
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    color: '#56626F',
    fontSize: 18,
  },
  rowText3: {
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Regular'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    color: '#56626F',
    fontSize: 12,
    paddingBottom: 3,
  },
  rowRightText: {
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Regular'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    color: '#56626F',
    fontSize: 18,
  }
})
