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

export default class ExpenseHistory extends Component {
  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);

    this.state = {
      list: [],
      history: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.history) {
      this.setState({
        list: nextProps.history,
        history: nextProps.history
      });
    }
  }

  componentWillMount() {
    if (!this.props.history.length) {
      const now  = new Date();
      const year = now.getFullYear();
      if (year != 2016) {
        this.props.getExpenseHistory(year);
        this.props.getExpenseHistory(2016);
      } else {
        this.props.getExpenseHistory(2016);
      }
    }
  }

  _handleOnChange(event) {
    let filtered  = [];
    let searchStr = event.nativeEvent.text.toLowerCase();

    if (!searchStr) {
      filtered = this.state.list;
    } else {
      filtered = this.state.history.filter((year) => {
        const yearName = '' + year.year;
        if (yearName.toLowerCase().indexOf(searchStr) !== -1) {
          return true;
        }
      });
    }

    this.setState({
      history: filtered
    });
  }

  render() {
    const {history} = this.state;

    return (
      <Container>
        <ScrollView ref="view">
          <StatusBar title="EXPENSE HISTORY" status="burger"/>
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
                  <Text style={styles.headerText}>HISTORY</Text>
                </View>
              </LinearGradient>
              <View style={styles.bady}>
                <View style={styles.data}>
                  {
                    (history.length)
                      ?
                      history.map((year, index) => {
                        return year.months.map((months, index) => {
                          let row = null;
                          if (months.expenses.length) {
                            row = (
                              <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={this._goToExpenseDetailHistory.bind(this, months.expenses, {
                                name: months.name,
                                year: year.year
                              }, this.props.categories, this.props.assignments)}
                                style={styles.row}>
                                <View
                                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'}}>
                                  <Text
                                    style={[styles.rowText, Platform.OS === 'ios' ? {} :
                      {fontFamily: 'SFUIText-Semibold'}]}>{months.name} {year.year}</Text>
                                  <View
                                    style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text
                                      style={styles.rowText}>({months.expenses.length})</Text>
                                    <EvilIcons
                                      name="chevron-right"
                                      size={26} color="#56626F"/>
                                  </View>
                                </View>
                              </TouchableOpacity>
                            )
                          }

                          return row;
                        })
                      })
                      :
                      null
                  }
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Container>
    )
  };

  _goToExpenseDetailHistory(expenses, month, categories, assignments) {
    this.props.navigator.push(Router.getRoute('expense_detail_history', {
      expenses,
      month,
      categories,
      assignments
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
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
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
    paddingHorizontal: 15,
    marginBottom: 1,
    backgroundColor: 'white',
  },
  rowText: {
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Regular'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    color: '#56626F',
    fontSize: 16,
    paddingVertical: 10.5,
  }
})
