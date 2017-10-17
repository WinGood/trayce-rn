import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Dimensions,
  Platform
} from 'react-native';

import MDSwitch from '../components/MDSwitch';

import Container from '../containers/Container';
import StatusBar from '../containers/StatusBar';

let {height, width} = Dimensions.get('window');

class Notifications extends Component {

  constructor() {
    super();

    this.state = {
      notifications: false,
      new_transaction: false,
      expense_approved: false,
      expense_denied: false,
      daily_reminder: false
    }
  }

  openDrawer() {
    this.refs.view.openDrawer();
  }

  whiteToggle() {
    return (
      <View style={styles.whiteToggle}>
        <Text style={styles.whiteToggleText}>Turn on notifications</Text>
        {
          (Platform.OS === 'ios')
            ?
            <Switch
              onValueChange={(value) => this.setState({notifications: !this.state.notifications})}
              style={{backgroundColor: 'white', borderRadius: 15}}
              value={this.state.notifications}
            />
            :
            <MDSwitch
              active={this.state.falseSwitchIsOn_2}
              onChangeState={(value) => this.setState({notifications: !this.state.notifications})}
              value={this.state.notifications}
              inactiveButtonColor = '#04adaf'
              inactiveButtonPressedColor = '#04adaf'
              activeButtonColor = '#04adaf'
              activeButtonPressedColor = '#04adaf'
              activeBackgroundColor = 'rgba(0,0,0,.30)'
              inactiveBackgroundColor = 'rgba(0,0,0,.20)'
             />
        }

      </View>
    )
  }

  listWhiteToggle() {
    return (
      <View style={styles.listWhiteToggle}>
        <View style={styles.whiteToggle}>
          <Text style={styles.whiteToggleText}>New transaction</Text>
          {
            (Platform.OS === 'ios')
              ?
              <Switch
                onValueChange={(value) => this.setState({new_transaction: !this.state.new_transaction})}
                style={{backgroundColor: 'white', borderRadius: 15}}
                value={this.state.new_transaction}
              />
              :
              <MDSwitch
                active={this.state.new_transaction}
                onValueChange={(value) => this.setState({new_transaction: !this.state.new_transaction})}
                value={this.state.new_transaction}
                inactiveButtonColor = '#04adaf'
                inactiveButtonPressedColor = '#04adaf'
                activeButtonColor = '#04adaf'
                activeButtonPressedColor = '#04adaf'
                activeBackgroundColor = 'rgba(0,0,0,.30)'
                inactiveBackgroundColor = 'rgba(0,0,0,.20)'
                 />
          }
        </View>
        {this.hr()}
        <View style={styles.whiteToggle}>
          <Text style={styles.whiteToggleText}>Expense is approved </Text>
          {
            (Platform.OS === 'ios')
              ?
              <Switch
                onValueChange={(value) => this.setState({expense_approved: !this.state.expense_approved})}
                style={{backgroundColor: 'white', borderRadius: 15}}
                value={this.state.expense_approved}
              />
              :
              <MDSwitch
                active={this.state.expense_approved}
                onValueChange={(value) => this.setState({expense_approved: !this.state.expense_approved})}
                value={this.state.new_transaction}
                inactiveButtonColor = '#04adaf'
                inactiveButtonPressedColor = '#04adaf'
                activeButtonColor = '#04adaf'
                activeButtonPressedColor = '#04adaf'
                activeBackgroundColor = 'rgba(0,0,0,.30)'
                inactiveBackgroundColor = 'rgba(0,0,0,.20)'
                 />
          }
        </View>
        {this.hr()}
        <View style={styles.whiteToggle}>
          <Text style={styles.whiteToggleText}>Expense is denied</Text>
          {
            (Platform.OS === 'ios')
              ?
              <Switch
                onValueChange={(value) => this.setState({expense_denied: !this.state.expense_denied})}
                style={{backgroundColor: 'white', borderRadius: 15}}
                value={this.state.expense_denied}
              />
              :
              <MDSwitch
                active={this.state.expense_denied}
                onValueChange={(value) => this.setState({expense_denied: !this.state.expense_denied})}
                value={this.state.expense_denied}
                inactiveButtonColor = '#04adaf'
                inactiveButtonPressedColor = '#04adaf'
                activeButtonColor = '#04adaf'
                activeButtonPressedColor = '#04adaf'
                activeBackgroundColor = 'rgba(0,0,0,.30)'
                inactiveBackgroundColor = 'rgba(0,0,0,.20)'
                 />
          }
        </View>
        {this.hr()}
        <View style={styles.whiteToggle}>
          <Text style={styles.whiteToggleText}>Daily reminder</Text>
          {
            (Platform.OS === 'ios')
              ?
              <Switch
                onValueChange={(value) => this.setState({daily_reminder: !this.state.daily_reminder})}
                style={{backgroundColor: 'white', borderRadius: 15}}
                value={this.state.daily_reminder}
              />
              :
              <MDSwitch
                active={this.state.daily_reminder}
                onValueChange={(value) => this.setState({daily_reminder: !this.state.daily_reminder})}
                value={this.state.daily_reminder}
                inactiveButtonColor = '#04adaf'
                inactiveButtonPressedColor = '#04adaf'
                activeButtonColor = '#04adaf'
                activeButtonPressedColor = '#04adaf'
                activeBackgroundColor = 'rgba(0,0,0,.40)'
                inactiveBackgroundColor = 'rgba(0,0,0,.20)'
                 />
          }
        </View>
      </View>
    )
  }

  hr() {
    return (
      <View style={{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1,
        marginHorizontal: 3,
      }}></View>
    )
  }

  render() {
    return (
      <Container>
        <StatusBar status="burger" title="NOTIFICATIONS"
                   openDrawer={this.openDrawer}/>
        <View style={styles.wrapper}>
          {this.whiteToggle()}
          {this.state.notifications &&
          this.listWhiteToggle()}
        </View>
      </Container>
    )
  }
}

let styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginTop: height / 6
  },
  whiteToggle: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16.5,
  },
  whiteToggleText: {
    color: '#56626F',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 16
  },
  whiteToggleSwitch: {
    backgroundColor: 'transparent'
  },
  listWhiteToggle: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 50,
  }
})

export default Notifications;
