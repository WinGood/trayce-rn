import React, {Component} from 'react';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Kohana} from 'react-native-textinput-effects';
import DatePicker from 'react-native-datepicker';
import {NavigationStyles} from '@exponent/ex-navigation';

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
  TextInput,
  PickerIOS,
  Animated,
  Picker,
  findNodeHandle,
  KeyboardAvoidingView,
  InteractionManager,
  Platform
} from 'react-native';

var showCurrency = [{currency: 'DKK', label: 'DKK (Danish Kroner)'}, {
  currency: 'SEK',
  label: 'SEK (Swedish Kroner)'
}, {currency: 'NOK', label: 'NOK (Norwegian Kroner'}, {
  currency: 'ISK',
  label: 'ISK (Icelandic Krona)'
}, {currency: 'EUR', label: 'EUR (Euro)'}, {
  currency: 'GBP',
  label: 'GBP (British Pounds)'
}, {
  currency: 'CHF',
  label: 'CHF (Swiss Franc)'
}, {currency: 'USD', label: 'USD (US Dollars)'}, {
  currency: 'PLN',
  label: 'PLN (Polish Zloty)'
}];

import ImagePicker from 'react-native-image-crop-picker';
import Router from '../config/router';
import StatusBar from '../containers/StatusBar';
import {RedAlert, GreenAlert} from '../components/Alerts';
import Modal from 'react-native-simple-modal';

import MDSwitch from '../components/MDSwitch';
import KeyboardHandler from '../components/KeyboardHandler';
import uploadImage from '../utilities/uploadImage';

let {height, width} = Dimensions.get('window');

var PickerItemIOS = PickerIOS.Item;

var PickerCustom = React.createClass({
  getInitialState() {
    const index = showCurrency.findIndex(currency => currency.currency == this.props.showCurrency.currency);
    return {
      curValue: 0,
      index: (index != -1) ? index : 0
    }
  },
  changeValue(curValue, index) {
    this.setState({
      curValue,
      index
    })
  },
  componentDidMount: function() {
    Animated.timing(this.props.offSet, {
      duration: 300,
      toValue: 125
    }).start()
  },
  closeModal(cb) {
    Animated.timing(this.props.offSet, {
      duration: 300,
      toValue: height
    }).start(cb);
  },
  chooseValue() {
    this.closeModal(() => {
      this.props.closeModal();
      this.props.changeCurrency(showCurrency[this.state.curValue], this.state.index);
    });
  },
  render() {
    return (
      <Animated.View style={{
        backgroundColor: 'white',
        zIndex: 20000,
        position: 'absolute',
        width: width,
        bottom: height/5.7, transform: [{translateY: this.props.offSet}] }}>
        <View style={styles.closeButtonContainer}>
          <TouchableHighlight onPress={ this.chooseValue }
                              underlayColor="transparent"
                              style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Choose</Text>
          </TouchableHighlight>
        </View>
        <Picker
          selectedValue={this.state.index}
          onValueChange={this.changeValue}>
          {showCurrency.map((curValue, index) => (
            <Picker.Item
              key={curValue.currency}
              value={index}
              label={curValue.label}
            />
          ))}
        </Picker>
      </Animated.View>
    )
  }
})

export default class IncompleteExpense extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.route.params.expense,
      offSet: new Animated.Value(height),
      modal: false
    }

    this._openModal  = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);

    this._goToSendExpenseSuccess = this._goToSendExpenseSuccess.bind(this);
    this.checkAmount             = this.checkAmount.bind(this);
    this.clearAmount             = this.clearAmount.bind(this);
    this.formatedMoney           = this.formatedMoney.bind(this);
    this.formatedMoneyEnd        = this.formatedMoneyEnd.bind(this);
    this.changeCurrency          = this.changeCurrency.bind(this);
    this.changePhoto             = this.changePhoto.bind(this);
    this._handleMerchantInput    = this._handleMerchantInput.bind(this);
    this._validateForm           = this._validateForm.bind(this);
    this._removeExpense          = this._removeExpense.bind(this);
  }

  componentWillUnmount() {
    this.props.resetNewExpense();
  }

  componentWillMount() {
    this.props.setExpenseCategory(this.state.category);
    this.props.setExpenseAssignment(this.state.assignment);
  }

  changePhoto() {
    ImagePicker.openCamera({
      width: 170,
      height: 350,
      cropping: false
    }).then(image => {
      if (image && image.path) {
        uploadImage(image, (err, id) => {
          if (err) return;

          this.setState({
            photo: image,
            cloudinaryId: id
          });
        });
      }
    });
  }

  _handleMerchantInput(event) {
    this.setState({
      merchantName: event.nativeEvent.text
    });
  }

  changeCurrency(selected, index) {
    this.setState({
      currency: selected
    });
  }

  clearAmount() {
    this.setState({amountPlaceholder: ''});
    this.refs.kh.inputFocused(this, 'amount');
  }

  checkAmount(text) {
    this.setState({amountPlaceholder: '0.00'});
  }

  formatedMoney(text) {
    let ftext = text.replace(/[.]/, ",");
    this.setState({valueMoney: ftext})
  }

  inputFocused(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        110, //additionalOffset
        true
      );
    }, 50);
  }

  formatedMoneyEnd() {
    let value = this.state.valueMoney;

    if (value !== null && value !== '') {
      value = value.replace(/[,]/, ".");
      value = parseFloat(value).toFixed(2);
      value = String(value);
      value = value.replace(/[.]/, ",");
      this.setState({valueMoney: value});
    }
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  _currency(value) {
    this.setState({
      ...this.state,
      value: value
    });
  }

  _goToSendExpenseSuccess() {
    const expense = {
      ...this.state,
      valueMoney: parseInt(this.state.valueMoney),
      category: this.props.selectedCategories,
      assignment: this.props.selectedAssignment
    }

    this.props.removeExpenseFromIncomplete(expense);
    this.props.addExpense(expense);
    this.props.navigator.replace(Router.getRoute('send_expense_success'));
  }

  _goToExpenseCategory = () => {
    this.props.navigator.push(Router.getRoute('expense_category'));
  }

  _goToExpenseAssignment = () => {
    this.props.navigator.push(Router.getRoute('expense_assignment'));
  }

  _removeExpense() {
    this.props.removeExpenseFromIncomplete(this.state);
    this.setState({openModal: false});

    InteractionManager.runAfterInteractions(() => {
      this.props.navigator.pop();
    });
  }

  _openModal() {
    this.setState({openModal: true})
  }

  _closeModal() {
    this.setState({openModal: false})
  }

  _focused(refName) {
    this.refs[refName].focus();
  }

  _validateForm(props) {
    const requiredField = [{
      field: 'merchantName',
      name: 'Merchant'
    }, {
      field: 'valueMoney',
      name: 'Amount'
    }, {
      field: 'photo',
      name: 'Photo'
    }, {
      field: 'category',
      name: 'Category'
    }, {
      field: 'assignment',
      name: 'Assignment'
    }];

    let errorsList = [];

    for (let field in props) {
      if (props.hasOwnProperty(field)) {
        const find = requiredField.find(req => req.field === field);

        if (find && !props[field]) {
          errorsList.push(find);
        }
      }
    }

    return errorsList;
  }

  render() {
    const expenseCategoryText   = (this.props.selectedCategories) ? this.props.selectedCategories.name : 'Expense category';
    const expenseAssignmentText = (this.props.selectedAssignment) ? this.props.selectedAssignment.name : 'Assignment';

    const errors = this._validateForm({
      ...this.state,
      category: this.props.selectedCategories,
      assignment: this.props.selectedAssignment
    });

    return (
      <View style={styles.container}>
        <Modal
          open={this.state.openModal}
          offset={100}
          overlayBackground={'rgba(0, 0, 0, 0.75)'}
          animationDuration={200}
          animationTension={40}
          modalDidOpen={() => undefined}
          modalDidClose={this.closeModal}
          closeOnTouchOutside={true}
          containerStyle={{
             justifyContent: 'center',
             zIndex: 10001,
             padding: 0
          }}
          modalStyle={{
             borderRadius: 5,
             backgroundColor: '#F5F5F5',
             padding: 0
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{
                color: '#56626F',
                ...Platform.select({
                  android: {
                    /*fontFamily: 'SFUIText-Semibold',*/
                  },
                }),
                backgroundColor: 'rgba(0,0,0,0)',
                fontWeight: 'normal',
                fontSize: 17,
                textAlign: 'center',
                paddingVertical: 17,
                width: width/1.5
              }}>
              DO YOU WANT TO DELETE THIS EXPENSE
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity onPress={this._closeModal} activeOpacity={1}
                                style={{backgroundColor: '#E3534E', flex: 1, borderBottomLeftRadius: 5}}>
                <Text style={{
                    color: '#fff',
                    ...Platform.select({
                      android: {
                        /*fontFamily: 'SFUIText-Semibold',*/
                      },
                    }),
                    backgroundColor: 'rgba(0,0,0,0)',
                    fontWeight: 'normal',
                    fontSize: 17,
                    paddingVertical: 20,
                    textAlign: 'center'
                  }}>NO</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1}
                                onPress={this._removeExpense}
                                style={{backgroundColor: '#04ADAF', flex: 1, borderBottomRightRadius: 5}}>
                <Text
                  style={{
                    color: '#fff',
                    ...Platform.select({
                      android: {
                        /*fontFamily: 'SFUIText-Semibold',*/
                      },
                    }),
                    backgroundColor: 'rgba(0,0,0,0)',
                    fontWeight: 'normal',
                    fontSize: 17,
                    paddingVertical: 20,
                    textAlign: 'center'
                  }}
                >YES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <KeyboardHandler ref='kh' offset={0} keyboardShouldPersistTaps={false}
                         style={styles.container}>
          <StatusBar status='back' title="EXPENSE" delete="true"
                     openModal={this._openModal}/>
          <View style={styles.wrapper}>
            <View style={{ marginBottom: 25}}>
              {
                (errors.length)
                  ?
                  RedAlert(errors[0].name, 'The expense is missing')
                  :
                  GreenAlert('GREAT!', 'The expense is ready to be sent')
              }
            </View>
            <View style={styles.wrappMoney}>
              <View>
                <View style={styles.money}>
                  <TextInput
                    style={[styles.moneyText, {zIndex: 10001, flex: 1, textAlign: 'center'}]}
                    placeholder="0,00"
                    placeholderTextColor="white"
                    onBlur={this.checkAmount}
                    onFocus={this.clearAmount}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onChangeText={this.formatedMoney}
                    value={this.state.valueMoney}
                    onEndEditing={this.formatedMoneyEnd}
                    maxLength={7}
                    underlineColorAndroid="transparent"
                    ref='amount'/>
                </View>
                {Platform.OS === 'android' ?
                  <View style={styles.circleView}>
                    <Picker
                      selectedValue={this.state.currency}
                      onValueChange={(curValue) => this.changeCurrency(curValue)}
                      style={styles.circle}
                    >
                      {showCurrency.map((curValue) => (
                        <Picker.Item
                          key={curValue.currency}
                          value={curValue}
                          label={curValue.label}
                        />
                      ))}
                    </Picker>
                  </View>

                  :

                  <View style={styles.container}>
                    <TouchableHighlight style={styles.circleView}
                                        underlayColor="transparent"
                                        onPress={ () => this.setState({modal: true}) }>
                      <Text
                        style={styles.showCurrency}>{this.state.currency.currency}</Text>
                    </TouchableHighlight>
                  </View>

                }
              </View>
              <TouchableOpacity onPress={this.changePhoto} style={styles.photo}>
                {
                  this.state.photo ?
                    <Image style={
                  {
                    width: (width / 3)-10,
                    height: (height / 4.7)-10
                  }} resizeMode={'cover'}
                           source={{uri: this.state.photo.path}}/>
                    :
                    <MaterialIcons name="camera-alt" size={50} color="#5E6872"/>
                }
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.secondWrapp}>
            <View style={styles.list}>
              <TouchableOpacity activeOpacity={1} onPress={
                  () => this.refs.date.onPressDate()
                }  style={[styles.row, {paddingRight: 42}]}>
                <Text style={styles.rowLeftText}>Date</Text>
                <DatePicker
                  date={this.state.date}
                  mode="date"
                  ref="date"
                  placeholder="Select Date"
                  placeholderTextColor="white"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                   dateTouchBody: {
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end'
                  },
                   dateInput: {
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                     borderWidth: 0,
                     flex: 1,
                   },
                   dateText: {
                     paddingVertical: 10,
                     textAlign: 'right',
                     color: 'white',
                     backgroundColor: 'rgba(0,0,0,0)',
                     fontWeight: 'normal',
                     fontSize: 15,

                   },
                   placeholderText: {
                        color: 'white'
                      },
                   }}
                  onDateChange={(date) => {this.setState({date: date})}}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={
                this._focused.bind(this, "name")

              } style={[styles.row, {paddingRight: 36}]}>
                <Text style={styles.rowLeftText}>Merchant</Text>
                <TextInput style={styles.rowRightText}
                           placeholder={this.state.merchantName}
                           placeholderTextColor="white"
                           underlineColorAndroid="transparent"
                           onChange={this._handleMerchantInput}
                           ref='name'
                           placeholder="Merchant name"
                           onFocus={() => {
                             this.refs.kh.inputFocused(this, 'name');
                             this.setState({merchantNamePlaceholder: ''});
                             if (!(this.state.merchantName)) {
                               //TODO rework this ugly workaround for non-working clearTextOnFocus={true}
                               this.setState({merchantName: ' '})
                             }

                           }}
                           onEndEditing={() => {
                             this.setState({merchantName: this.state.merchantName.trim()})
                           }}
                           value={this.state.merchantName}
                >
                </TextInput>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1}
                                onPress={this._goToExpenseCategory}
                                style={[styles.row, {paddingRight: 10}]}>
                <Text style={styles.rowLeftText}>Category</Text>
                <View style={styles.chevron}>
                  <Text style={styles.rowRightText}>{expenseCategoryText}</Text>
                  <EvilIcons
                    name="chevron-right"
                    size={26} color="white" style={{marginLeft: 0}}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1}
                                onPress={this._goToExpenseAssignment}
                                style={[styles.row, {paddingRight: 10}]}>
                <Text style={styles.rowLeftText}>Assigned to</Text>
                <View style={styles.chevron}>
                  <Text
                    style={styles.rowRightText}>{expenseAssignmentText}</Text>
                  <EvilIcons
                    name="chevron-right"
                    size={26} color="white" style={{marginLeft: 0}}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={
                this._focused.bind(this, "comment")
              } style={[styles.row, {paddingRight: 36}]}>
                <Text style={styles.rowLeftText}>Comment</Text>
                <TextInput style={styles.rowRightText}
                           placeholder="Comment"
                           ref="comment"
                           placeholderTextColor="white"
                           underlineColorAndroid="transparent"
                           onChange={(event) => {this.setState({comment : event.nativeEvent.text})}}
                           onFocus={() => {
                             this.refs.kh.inputFocused(this, 'comment');
                             this.setState({commentPlaceholder: ''});
                             if (!(this.state.comment)) {
                               //TODO rework this ugly workaround for non-working clearTextOnFocus={true}
                               this.setState({comment: ' '})
                             }

                           }}
                           onEndEditing={() => {
                             this.setState({comment: this.state.comment.trim()})
                           }}
                           value={this.state.comment}
                >
                </TextInput>
              </TouchableOpacity>
              {/*<View style={[styles.row, {paddingRight: 35}]}>
               <View style={{flexDirection: 'row', alignItems: 'center'}}>
               <Text style={styles.rowLeftText}>Comment</Text>
               {!this.state.doneAll &&
               <View style={{
               backgroundColor: '#E3534E',
               height: 15,
               width: 15,
               borderRadius: 50,
               marginLeft: 7
               }}/>
               }
               </View>
               <TextInput style={styles.rowRightText}
               placeholder="Comment"
               placeholderTextColor="white"
               onSubmitEditing={this._doneAll}
               >
               </TextInput>
               </View>*/}
            </View>
            <View style={styles.options}>
              <View
                style={[styles.row, Platform.OS === 'ios' ? {paddingRight: 35} : {paddingRight: 30}]}>
                <Text style={styles.optionsLeftText}>Billable</Text>
                {
                  (Platform.OS == 'ios')
                    ?
                    <Switch
                      onValueChange={(value) => this.setState({billable: value})}
                      style={{backgroundColor: 'white', borderRadius: 15}}
                      value={this.state.billable}
                    />
                    :
                    <MDSwitch
                      active={this.state.billable}
                      onChangeState={(value) => this.setState({billable: value})}/>
                }
              </View>
              <View
                style={[styles.row, Platform.OS === 'ios' ? {paddingRight: 35} : {paddingRight: 30}]}>
                <Text style={styles.optionsLeftText}>Reimbursable</Text>
                {
                  (Platform.OS == 'ios')
                    ?
                    <Switch
                      onValueChange={(value) => this.setState({reimbursable: value})}
                      style={{backgroundColor: 'white', borderRadius: 15}}
                      value={this.state.reimbursable}
                    />
                    :
                    <MDSwitch
                      active={this.state.reimbursable}
                      onChangeState={(value) => this.setState({reimbursable: value})}/>
                }
              </View>
            </View>
            {
              (!errors.length)
                ?
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={this._goToSendExpenseSuccess}
                  style={styles.button}
                >
                  <Text
                    style={[styles.btnText]}>SEND</Text>
                </TouchableOpacity>
                :
                <View
                  style={[styles.button, styles.buttonDisable]}
                >
                  <Text
                    style={[styles.btnText, styles.btnTextDisable]}>SEND</Text>
                </View>
            }
          </View>
        </KeyboardHandler>
        { this.state.modal ?
          <PickerCustom closeModal={() => this.setState({ modal: false })}
                        offSet={this.state.offSet}
                        changeCurrency={this.changeCurrency}
                        showCurrency={this.state.currency}/> : null }
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
  circleView: {
    position: 'absolute',
    backgroundColor: '#8ab9db',
    borderRadius: (width / 2),
    width: width / 6.2,
    height: width / 6.2,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -10,
    right: -10,
    overflow: 'hidden',
    padding: 0,
  },
  circle: {
    backgroundColor: 'transparent',
    width: width / 6.2,
    height: width / 4,
    marginLeft: width/38,
    alignItems: 'center',
    zIndex: 100005,
    flex: 1,
    justifyContent: 'center',
    color: 'white',
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
    flex: 1
  },
  rowRightText: {
    width: 140,
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
    paddingVertical: 17.5,
  },
  buttonDisable: {
    backgroundColor: 'rgba(4, 173, 175, 0.29)'
  },
  btnTextDisable: {
    color: 'rgba(250, 250, 250, 0.29)'
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
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1
  },
  closeButton: {
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  closeButtonText: {
    color: '#027afe'
  },
})
