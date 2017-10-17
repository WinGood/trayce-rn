import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
  Dimensions,
  Platform
} from 'react-native';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

let {height, width} = Dimensions.get('window');

export default class StatusBar extends Component {
  constructor(props) {
    super(props);

    this.pop = this.pop.bind(this);
  }

  pop() {
    const navigatorUID = this.props.navigation.currentNavigatorUID;
    this.props.pop(navigatorUID);
  }

  onPress(actionType) {
    switch (actionType) {
      case 1:
        this.pop();
        break;
      case 2:
        this.props.openDrawer();
        break;
      case 3:
        this.pop();
        break;
    }
    
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  render() {
    let content = null;

    if (this.props.status === 'back') {
      content = (
        <View style={styles.wrapper}>
          <TouchableOpacity style={{paddingHorizontal: 10, zIndex: 1}}
                            onPress={this.onPress.bind(this, 1)}>
            <Ionicons name='ios-arrow-back' size={36} color='white'/>
          </TouchableOpacity>
          <Text style={
            [styles.title,
              !!this.props.delete ?
              {marginLeft: 15}
            : {}]}>{this.props.title}</Text>
          { !!this.props.delete &&
          <TouchableOpacity style={{paddingHorizontal: 10, zIndex: 1}}
                            onPress={this.props.openModal}>
            <MaterialIcons name='delete' size={30} color='white'/>
          </TouchableOpacity>
          }
        </View>
      )
    } else if (this.props.status === 'burger') {
      content = (
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.menu} onPress={this.onPress.bind(this, 2)}>
            <Image source={require('../assets/images/burger/burger.png')}/>
          </TouchableOpacity>
          { !!this.props.title &&
          <Text style={styles.title}>{this.props.title}</Text> }
        </View>
      )
    } else if (this.props.status === 'close') {
      content = (
        <View style={styles.wrapper}>
          <TouchableOpacity style={styles.menu}
                            onPress={this.onPress.bind(this, 3)}>
            <EvilIcons name="close" size={40} color="white"/>
          </TouchableOpacity>
          { !!this.props.title &&
          <Text style={styles.title}>{this.props.title}</Text>
          }
        </View>
      )
    }

    return (
      <View style={styles.statusBar}>
        {content}
      </View>
    );
  }
}

StatusBar.propTypes = {
  title: React.PropTypes.string,
  status: React.PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  statusBar: {
    height: 40,
    top: 35,
    width: width,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    position: 'absolute',
  },
  wrapper: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',

  },
  menu: {
    zIndex: 10,
  },
  title: {
    color: 'white',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    flex: 1,
    marginLeft: -30,
  }
});
