import React, {Component} from 'react';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Kohana} from 'react-native-textinput-effects';
import DatePicker from 'react-native-datepicker';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Switch,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  findNodeHandle,
  Picker,
  Animated,
  PickerIOS,
  PixelRatio
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';

import MDSwitch from '../components/MDSwitch';
import KeyboardHandler from '../components/KeyboardHandler';
import {NavigationStyles} from '@exponent/ex-navigation';

import Router from '../config/router';
import StatusBar from '../containers/StatusBar';
import uploadImage from '../utilities/uploadImage';

let {height, width} = Dimensions.get('window');

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

var PickerItemIOS = PickerIOS.Item;

var PickerCustom = React.createClass({
  getInitialState() {
    const index = showCurrency.findIndex(
      currency => currency.currency == this.props.showCurrency.currency);
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

const MERCHANT_PLACEHOLDER = 'Merchant Name';
const COMMENT_PLACEHOLDER  = 'Comment';

class NewExpense extends Component {
  static route = {
    styles: {
      ...NavigationStyles.SlideVertical
    }
  }

  constructor(props) {
    super(props);
    let today = new Date();
    today     = today.toISOString().slice(0, 10).replace(/-/g, "-");

    this.state = {
      date: today,

      amountPlaceholder: '0,00',
      comment: '',
      commentPlaceholder: COMMENT_PLACEHOLDER,
      merchantName: '',
      merchantPlaceholder: MERCHANT_PLACEHOLDER,
      currency: showCurrency[0],
      valueMoney: null,
      modal: false,
      offSet: new Animated.Value(height),
      billable: false,
      reimbursable: false,
      photo: (props.route.params.photo) ? props.route.params.photo : null,
      cloudinaryId: (props.route.params.cloudinaryId) ? props.route.params.cloudinaryId : null
    }

    this.clearAmount          = this.clearAmount.bind(this);
    this.formatedMoney        = this.formatedMoney.bind(this);
    this.formatedMoneyEnd     = this.formatedMoneyEnd.bind(this);
    this.changeCurrency       = this.changeCurrency.bind(this);
    this.changePhoto          = this.changePhoto.bind(this);
    this._handleMerchantInput = this._handleMerchantInput.bind(this);
    this._validateForm        = this._validateForm.bind(this);

    this.isAddedExpense = false;
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

  componentWillUnmount() {
    const init = [{
      key: 'photo',
      value: null
    }];

    let save = false;

    init.forEach((item) => {
      if (this.state[item.key] != item.value) {
        save = true;
      }
    });

    const expense = {
      ...this.state,
      category: this.props.expense.selectedCategories,
      assignment: this.props.expense.selectedAssignment
    }

    if (save && !this.isAddedExpense) {
      this.props.addIncompleteExpense(expense);
    }

    this.props.resetNewExpense();
  }

  _handleMerchantInput(event) {
    this.setState({
      merchantName: event.nativeEvent.text,
      merchantPlaceholder: (event.nativeEvent.text) ? event.nativeEvent.text : MERCHANT_PLACEHOLDER
    });
  }

  changeCurrency(selected, index) {
    this.setState({
      currency: selected
    });
  }

  clearAmount() {
    this.setState({amountPlaceholder: ''});
    // this.refs.kh.inputFocused(this, 'amount');
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

  _focused(refName) {
    this.refs[refName].focus();
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

    this.setState({amountPlaceholder: '0,00'});
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

  _goToSendExpenseSuccess = () => {
    const currency = (!this.state.currency.currency) ? {
      currency: showCurrency[this.state.currency]
    } : {};

    const expense = {
      ...this.state,
      ...currency,
      valueMoney: parseInt(this.state.valueMoney),
      category: this.props.expense.selectedCategories,
      assignment: this.props.expense.selectedAssignment
    }

    this.props.addExpense(expense);
    this.isAddedExpense = true;
    this.props.navigator.replace(Router.getRoute('send_expense_success'));
  }
  _goToExpenseCategory    = () => {
    this.props.navigator.push(Router.getRoute('expense_category'));
  }
  _goToExpenseAssignment  = () => {
    this.props.navigator.push(Router.getRoute('expense_assignment'));
  }
  _goToExpenseAttendee    = () => {
    this.props.navigator.push(Router.getRoute('expense_attendee'));
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
    const {expense} = this.props;
    const expenseCategoryText   = (expense.selectedCategories) ? expense.selectedCategories.name : 'Expense category';
    const expenseAssignmentText = (expense.selectedAssignment) ? expense.selectedAssignment.name : 'Assignment';
    const expenseAttendeesText  = (expense.selectedAttendees) ? 'Select ' + expense.selectedAttendees.length + ' attendee' : 'Attendees/guests';

    const errors = this._validateForm({
      ...this.state,
      category: expense.selectedCategories,
      assignment: expense.selectedAssignment
    });

    return (
      <View style={{flex: 1}}>
        <KeyboardHandler ref='kh' offset={0} keyboardShouldPersistTaps={false}
                         style={styles.container}>
          <StatusBar status='close' title="NEW EXPENSE"/>
          <View style={styles.wrapper}>
            <View style={styles.wrappMoney}>
              <View>
                <View style={styles.money}>
                  <TextInput
                    style={[styles.moneyText, {zIndex: 10001, flex: 1, textAlign: 'center'}]}
                    placeholder={this.state.amountPlaceholder}
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
                      {Object.keys(showCurrency).map((curValue) => (
                        <Picker.Item
                          key={curValue}
                          value={curValue}
                          label={showCurrency[curValue].label}
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
              } style={[styles.row, {paddingRight: 42}]}>
                <Text style={styles.rowLeftText}>Date</Text>
                <DatePicker
                  date={this.state.date}
                  mode="date"
                  ref="date"
                  placeholder="Select Date"
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
                           placeholder={this.state.merchantPlaceholder}
                           placeholderTextColor="white"
                           underlineColorAndroid="transparent"
                           onChange={this._handleMerchantInput}
                           ref='name'
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
              <TouchableOpacity activeOpacity={1}
                                onPress={this._goToExpenseAttendee}
                                style={[styles.row, {paddingRight: 10}]}>
                <Text style={styles.rowLeftText}>Attendees</Text>
                <View style={styles.chevron}>
                  <Text
                    style={styles.rowRightText}>{expenseAttendeesText}</Text>
                  <EvilIcons
                    name="chevron-right"
                    size={26} color="white"
                    style={{marginLeft: 0}}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={
                this._focused.bind(this, "comment")
              } style={[styles.row, {paddingRight: 36}]}>
                <Text style={styles.rowLeftText}>Comment</Text>
                <TextInput style={styles.rowRightText}
                           placeholder={this.state.commentPlaceholder}
                           ref="comment"
                           placeholderTextColor="white"
                           underlineColorAndroid="transparent"
                           value={this.state.comment}
                           placeholder="Comment"
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
                  (Platform.OS === 'ios')
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
  showtimeContainer: {
    borderTopColor: '#ededed',
    borderTopWidth: 1,
  },
  showCurrency: {
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
  buttonDisable: {
    backgroundColor: 'rgba(4, 173, 175, 0.29)'
  },
  btnTextDisable: {
    color: 'rgba(250, 250, 250, 0.29)'
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
  buttonText: {
    textAlign: 'center'
  },
  closeButtonText: {
    color: '#027afe'
  },

  container: {
    backgroundColor: '#4D5863',
    flex: 1,
  },
  wrapper: {
    marginTop: height / 6,
    paddingHorizontal: 20,
  },
  wrappMoney: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 40
  },
  money: {
    width: width / 2.5,
    height: width / 2.5,
    backgroundColor: "#5E6872",
    borderRadius: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
    overflow: 'hidden',
    flex: 1,
  },
  moneyText: {
    color: '#fff',
    // ...Platform.select({
    //   android: {
    //     ...Font.style('SFUIText-Light'),
    //   },
    // }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    fontSize: 35,
    textAlign: 'center',
    padding: 0,
    margin: 0,
    flex: 1,
    width: width / 2.5,
    height: width / 2.5,
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
    marginLeft: width / 38,
    alignItems: 'center',
    zIndex: 100005,
    flex: 1,
    justifyContent: 'center',
    color: 'white',
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
    alignItems: 'center'
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
    // ...Platform.select({
    //   android: {
    //     ...Font.style('SFUIText-Light'),
    //   },
    // }),
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    fontSize: 15,
    flex: 1,
  },
  rowRightText: {
    flex: 1,
    paddingVertical: 10,
    textAlign: 'right',
    color: 'white',
    // ...Platform.select({
    //   android: {
    //     ...Font.style('SFUIText-Regular'),
    //   },
    // }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    fontSize: 15,
    marginRight: 5,
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
    // ...Platform.select({
    //   android: {
    //     ...Font.style('SFUIText-Light'),
    //   },
    // }),
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
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    // ...Platform.select({
    //   android: {
    //     ...Font.style('SFUIText-Medium'),
    //   },
    // }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 19.5,
  }
})

export default NewExpense;
