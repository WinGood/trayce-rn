import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';


export default class Search extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchValue: '',
      searchPlaceholder: 'Search',
    }
  }

  render() {
    return (
      <View style={styles.search}>
        <Image source={require('../assets/images/search/group.png')}/>
        <TextInput
          style={styles.searchInput}
          placeholder={this.state.searchPlaceholder}
          placeholderTextColor='#56626f'
          onFocus={() => this.setState({searchPlaceholder: ''})}
          onEndEditing={() => this.setState({searchPlaceholder: 'Search'})}
          returnKeyType="search"
          underlineColorAndroid="transparent"
          {...this.props}
        />
      </View>
    )
  };
}

const styles = StyleSheet.create({
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
    // ...Platform.select({
    //   android: {
    //     ...Font.style('SFUIText-Regular'),
    //   },
    // }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    color: '#4D5863',
    paddingLeft: 10,
  },
})
