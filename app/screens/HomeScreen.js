import React, {Component} from 'react';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  InteractionManager,
  Dimensions,
  Platform
} from 'react-native';

import {NavigationStyles} from '@exponent/ex-navigation';

let {height, width} = Dimensions.get('window');

import Router from '../config/router';
import Container from '../containers/Container';
import StatusBar from '../containers/StatusBar';
import uploadImage from '../utilities/uploadImage';
import store from '../config/store';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: store.getState(),
      loading: false
    }

    this._makePhoto         = this._makePhoto.bind(this);
    this._onOpenActionSheet = this._onOpenActionSheet.bind(this);
    this._getDate           = this._getDate.bind(this);
  }

  static contextTypes = {
    actionSheet: React.PropTypes.func,
  }

  _goToIncomplExpense(expense) {
    this.props.navigator.push(Router.getRoute('incomplete_expense', {
      expense: expense
    }));
  }

  _onOpenActionSheet() {
    let options           = ['Take Photo', 'Choose From Library', 'Cancel'];
    let cancelButtonIndex = 2;
    this.context.actionSheet().showActionSheetWithOptions({
        options,
        cancelButtonIndex
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            ImagePicker.openCamera({
              width: 170,
              height: 350,
              cropping: false
            }).then(image => {
              if (image && image.path) {
                this.setState({
                  loading: true
                });

                uploadImage(image, (err, id) => {
                  if (err) return;

                  this.setState({
                    loading: false
                  });

                  InteractionManager.runAfterInteractions(() => {
                    this.props.navigator.push(Router.getRoute('add_expense', {
                      photo: image,
                      cloudinaryId: id
                    }));
                  });
                });
              }
            });
            break;
          case 1:
            ImagePicker.openPicker({}).then(image => {
              if (image && image.path) {
                this.setState({
                  loading: true
                });

                uploadImage(image, (err, id) => {
                  if (err) return;

                  this.setState({
                    loading: false
                  });

                  InteractionManager.runAfterInteractions(() => {
                    this.props.navigator.push(Router.getRoute('add_expense', {
                      photo: image,
                      cloudinaryId: id
                    }));
                  });
                });
              }
            });
            break;
        }
      });
  }

  _getDate() {
    const now    = new Date();
    const days   = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayofWeek = days[now.getDay()];
    const month     = months[now.getMonth()];
    const day       = now.getDate();
    const str       = `${dayofWeek} ${month} ${day}`;

    return (
      <Text style={styles.subtitle}>
        {str}
      </Text>
    );
  }

  _makePhoto() {
    this._onOpenActionSheet();
  }

  render() {
    const {incomplete} = this.props;

    return (
      <Container>
        <Spinner visible={this.state.loading}/>
        <StatusBar status="burger"/>
        <View style={styles.wrapper}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            {
              (!incomplete.length)
                ?
                <View style={styles.logo}>
                  <TouchableOpacity
                    activeOpacity={1}>
                    <Image
                      source={require('../assets/images/logo/trayceLogo.png')}/>
                  </TouchableOpacity>
                  {this._getDate()}
                </View>
                :
                <View style={styles.logo}>
                  <View style={styles.incompleteExpenses}>
                    <Image
                      style={{justifyContent: 'center', alignItems: 'center'}}
                      source={require('../assets/images/red-logo/combinedShape.png')}>
                      <Text
                        style={styles.incompleteExpensesText}>{incomplete.length}</Text>
                    </Image>
                  </View>
                  <Text style={styles.subtitle}>Incomplete expenses</Text>
                  <View style={{marginTop: 6}}>
                    {
                      incomplete.map((expense, index) => {
                        return (
                          <View key={index}
                                style={[styles.row, {width: width-30}]}>
                            <TouchableHighlight underlayColor='transparent'
                                                onPress={this._goToIncomplExpense.bind(this, expense)}>
                              <View
                                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'}}>
                                <View style={styles.rowLeft}>
                                  <View style={{
                            backgroundColor: '#E3534E',
                            height: 10,
                            width: 10,
                            borderRadius: 50,
                            marginRight: 5,
                            marginLeft: 5,
                            zIndex: 10,
                          }}/>
                                  <View>
                                    <Text
                                      style={styles.rowText1}>{expense.date}</Text>
                                    <Text
                                      style={styles.rowText2}>{expense.merchantName}</Text>
                                    <Text
                                      style={styles.rowText3}>{(expense.category) ? expense.category.name : null}</Text>
                                  </View>
                                </View>
                                <View
                                  style={{flexDirection: 'row', alignItems: 'center'}}>
                                  <Text
                                    style={styles.rowRightText}>
                                    {expense.valueMoney} {(expense.currency) ? expense.currency.currency : null}
                                  </Text>
                                  <EvilIcons
                                    name="chevron-right"
                                    size={26} color="#56626F"/>
                                </View>
                              </View>
                            </TouchableHighlight>
                          </View>
                        );
                      })
                    }
                  </View>
                </View>
            }
            <View style={styles.buttons}>
              <TouchableOpacity activeOpacity={1} style={[styles.button, {borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5}]} underlayColor='#04A9AB'
                                onPress={this._makePhoto}>
                <Text style={styles.btnText}>SNAP RECEIPT</Text>
              </TouchableOpacity>
              <View style={{width: 1, backgroundColor: '#000'}}></View>
              <TouchableOpacity activeOpacity={1} style={[styles.button, {borderTopRightRadius: 5,
                    borderBottomRightRadius: 5}]} underlayColor='#04A9AB'
                                onPress={this._goToAddExpense}>
                <Text style={styles.btnText}>NEW EXPENSE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    );
  };

  _goToSendSuccess = () => {
    this.props.navigator.push(Router.getRoute('send_success'));
  }

  _goToAddExpense = () => {
    this.props.navigator.push(Router.getRoute('add_expense'));
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: height / 6,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    fontSize: 16,
    textAlign: 'center',
    flex: 1,
    width: 200,
  },
  logo: {
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#04adaf',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  btnText: {
    color: 'white',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    fontSize: 17,
  },
  incompleteExpenses: {},
  incompleteExpensesText: {
    color: 'white',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    fontSize: 50,
  },
  row: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 3,
    marginBottom: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    zIndex: 0,
    marginBottom: 10
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
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
    fontSize: 17,
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
    fontSize: 17,
  }
});

export default Home;
