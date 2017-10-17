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

import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerLayout from 'react-native-drawer-layout';
let {height, width} = Dimensions.get('window');

class Drawer extends Component {
  constructor(props) {
    super(props);

    this._setDrawer   = this._setDrawer.bind(this);
    this._goPage      = this._goPage.bind(this);
    this.previousPage = 'home';
  }

  _goPage(page) {
    if (this.previousPage != page) {
      let navigatorUID = this.props.navigation.currentNavigatorUID;
      this.props.replace(navigatorUID, page);
      this.drawer.closeDrawer();
      this.previousPage = page;
    } else {
      this.drawer.closeDrawer();
    }
  }

  _goToHome = () => {
    this._goPage('home');
  }

  _goToExpenseHostory = () => {
    this._goPage('expense_history');
  }

  _goToPersonalSettings = () => {
    this._goPage('personal_settings');
  }

  _goToNotification = () => {
    this._goPage('notifications');
  }

  _goToCards = () => {
    this._goPage('cards');
  }

  _goToLogout = () => {
    this.props.logout();
    this._goPage('login');
  }

  _setDrawer(drawer) {
    this.drawer = drawer;
    this.props.setDrawer(drawer);
  }

  render() {
    const lockMode = (this.props.session.token) ? 'unlocked' : 'locked-closed';

    const navigationView = (
      <View style={styles.drawer}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={1} onPress={this._goToHome}>
            <Image source={require('../assets/images/drawer/combinedShapeCopy.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.hr}/>
          <TouchableOpacity style={styles.row} onPress={this._goToHome}>
            <Foundation name="dollar" size={30} color="white"
                        style={{width: 60, textAlign: 'center'}}/>
            <Text style={styles.rowText}>EXPENSES</Text>
          </TouchableOpacity>
          <View style={styles.hr}/>
          <TouchableOpacity style={styles.row}
                            onPress={this._goToExpenseHostory}>
            <MaterialIcons name="format-list-bulleted" size={25} color="white"
                           style={{width: 60, textAlign: 'center'}}/>
            <Text style={styles.rowText}>EXPENSE HISTORY</Text>
          </TouchableOpacity>
          <View style={styles.hr}/>
          <TouchableOpacity style={styles.row}
                            onPress={this._goToPersonalSettings}>
            <MaterialIcons name="face" size={25} color="white"
                           style={{width: 60, textAlign: 'center'}}/>
            <Text style={styles.rowText}>SETTINGS</Text>
          </TouchableOpacity>
          <View style={styles.hr}/>
          <TouchableOpacity style={styles.row} onPress={this._goToNotification}>
            <MaterialIcons name="chat-bubble-outline" size={25} color="white"
                           style={{width: 60, textAlign: 'center'}}/>
            <Text style={styles.rowText}>NOTIFICATIONS</Text>
          </TouchableOpacity>
          <View style={styles.hr}/>
          <TouchableOpacity style={styles.row} onPress={this._goToCards}>
            <MaterialIcons name="credit-card" size={25} color="white"
                           style={{width: 60, textAlign: 'center'}}/>
            <Text style={styles.rowText}>MY CARDS</Text>
          </TouchableOpacity>
          <View style={styles.hr}/>
          <TouchableOpacity style={styles.row} onPress={this._goToLogout}>
            <MaterialIcons name="exit-to-app" size={25} color="white"
                           style={{width: 60, textAlign: 'center'}}/>
            <Text style={styles.rowText}>LOGOUT</Text>
          </TouchableOpacity>
          <View style={styles.hr}/>
        </View>
      </View>
    );

    return (
      <DrawerLayout
        drawerLockMode={lockMode}
        drawerWidth={width-60}
        ref={this._setDrawer}
        keyboardDismissMode="on-drag"
        statusBarBackgroundColor="blue"
        renderNavigationView={() => navigationView}>
        {this.props.children}
      </DrawerLayout>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: '#56626F',
  },
  header: {
    height: 90,
    alignItems: 'center',
    marginTop: 70,
  },
  body: {
    flex: 1,
  },
  hr: {
    height: 1,
    backgroundColor: '#4B5660',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 5,
  },
  rowText: {
    color: 'white',
    // ...Platform.select({
    //   android: {
    //     /*fontFamily: 'SFUIText-Semibold',*/
    //   },
    // }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 17,
  }
});

export default Drawer;
