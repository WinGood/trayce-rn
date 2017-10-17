import React, {Component} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {Kohana} from 'react-native-textinput-effects';
import {NavigationStyles} from '@exponent/ex-navigation';

import LinearGradient from 'react-native-linear-gradient';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  Platform
} from 'react-native';

import Checkbox from '../components/Checkbox';
import StatusBar from '../containers/StatusBar';
let {height, width} = Dimensions.get('window');
import Search from '../components/Search';

export default class ExpenseAssignment extends Component {
  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);

    this.state = {
      list: props.assignments,
      data: props.assignments
    }
  }

  _handleOnChange(event) {
    let filtered  = [];
    let searchStr = event.nativeEvent.text.toLowerCase();

    if (!searchStr) {
      filtered = this.state.list;
    } else {
      filtered = this.state.data.filter((category) => {
        if (category.name.toLowerCase().indexOf(searchStr) !== -1) {
          return true;
        }
      });
    }

    this.setState({
      data: filtered
    });
  }

  _setAssignment(category) {
    this.props.setExpenseAssignment(category);
    const navigatorUID = this.props.navigation.currentNavigatorUID;
    this.props.pop(navigatorUID);
  }

  render() {
    const {selectedAssignment} = this.props;
    const {data} = this.state;
    const length = data.length - 1;

    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar status='back' title='ASSIGNMENT'/>
          <View style={styles.wrapper}>
            <Search onChange={this._handleOnChange}/>
            <LinearGradient
              colors={['#04adaf', '#8ab9db']}
              style={{height: 44,
                    borderRadius: 5,
                marginBottom: -5, paddingBottom: 5, marginTop: 35,}}
              start={[0, 0.5]}
              end={[1, 1]}
            >
              <View style={styles.header}>
                <Text style={styles.headerText}>CHOOSE</Text>
              </View>
            </LinearGradient>
            <View style={styles.data}>
              {
                data.map((assignment, index) => {
                  const finded  = (selectedAssignment && selectedAssignment.id === assignment.id);
                  const checked = (finded) ? true : false;
                  const noBb    = (index == length) ? {borderBottomWidth: 0} : {};

                  return (
                    <View key={assignment.id}
                          style={[styles.row, styles.rowMain, noBb]}>
                      <Checkbox
                        checked={checked}
                        name={`checkbox${assignment.id}`}
                        style={{backgroundColor: '#fff', color:'#04ADAF', borderRadius: 50}}
                        size={18}
                        onChange={this._setAssignment.bind(this, assignment)}
                      >
                        <Text
                          style={[styles.rowText, styles.rowTextMain]}>{assignment.name}</Text>
                      </Checkbox>
                    </View>
                  );
                })
              }
            </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: 'rgba(0,0,0,0.0)'
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
  searchInput: {
    backgroundColor: 'transparent',
    height: 44,
    flex: 1,
    fontSize: 16,
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Regular'),*/
      },
    }),
    fontWeight: 'normal',
    color: '#4D5863',
    paddingLeft: 10,
  },
  data: {
    backgroundColor: 'white',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    marginBottom: 30,
    overflow: 'hidden'
  },
  row: {
    paddingRight: 15,
    borderBottomColor: 'rgba(0, 0, 0, 0.9)',
    borderBottomWidth: 1,
    paddingBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 40,
    flex: 1,
  },
  rowMain: {
    paddingLeft: 15,
  },
  rowTextMain: {
    ...Platform.select({
      android: {
        /*fontFamily: 'SFUIText-Semibold',*/
      },
    }),
    fontWeight: 'normal',
    color: '#4D5863',
    fontSize: 16,
    paddingVertical: 10.5,
    paddingLeft: 10,
    flex: 1,
  },
  rowText: {
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Regular'),*/
      },
    }),
    fontWeight: 'normal',
    color: '#4D5863',
    fontSize: 16,
    paddingVertical: 10.5,
    paddingLeft: 10,
    flex: 1,
  }
})
