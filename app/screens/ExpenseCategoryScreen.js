import React, {Component} from 'react';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  Dimensions,
  TextInput,
  Platform
} from 'react-native';


import Checkbox from '../components/Checkbox';
import StatusBar from '../containers/StatusBar';
import Search from '../components/Search';
let {height, width} = Dimensions.get('window');

export default class ExpenseCategory extends Component {
  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);

    this.state = {
      list: props.categories,
      data: props.categories
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

  _setCategory(category) {
    this.props.setExpenseCategory(category);
    const navigatorUID = this.props.navigation.currentNavigatorUID;
    this.props.pop(navigatorUID);
  }

  render() {
    const {selectedCategories} = this.props;
    const {data} = this.state;
    const length = data.length - 1;

    return (
      <View style={styles.container}>
        <ScrollView>
          <StatusBar status='back' title='CATEGORY'/>
          <View style={styles.wrapper}>
            <Search onChange={this._handleOnChange}/>
            <View style={styles.data}>
              {
                data.map((category, index) => {
                  const finded  = (selectedCategories && selectedCategories.id === category.id);
                  const checked = (finded) ? true : false;
                  const noBb    = (index == length) ? {borderBottomWidth: 0} : {};

                  return (
                    <View key={category.id} style={[styles.row, noBb]}>
                      <Checkbox
                        checked={checked}
                        name={`checkbox${category.id}`}
                        style={{backgroundColor: '#fff', color:'#04ADAF', borderRadius: 50}}
                        size={18}
                        onChange={this._setCategory.bind(this, category)}
                      >
                        <Text style={styles.rowText}>{category.name}</Text>
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
    marginTop: height / 6
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
  data: {
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 30,
  },
  row: {
    paddingHorizontal: 15,
    borderBottomColor: 'rgba(0, 0, 0, 0.9)',
    borderBottomWidth: 1,
    paddingBottom: 1,
  },
  rowText: {
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Regular'),*/
      },
    }),
    marginLeft: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    color: '#4D5863',
    fontSize: 16,
    paddingVertical: 10.5,
  }
})
