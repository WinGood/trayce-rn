import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Switch,
  TextInput,
  Dimensions,
  Platform
} from 'react-native';


import {NavigationStyles} from '@exponent/ex-navigation';

import Container from '../containers/Container';
import StatusBar from '../containers/StatusBar';
import Router from '../config/router';
let {height, width} = Dimensions.get('window');

class NewCard extends Component {

  static route = {
    styles: {
      ...NavigationStyles.SlideVertical
    }
  }

  constructor() {
    super();

    this.state = {
      flag: true,
      firstInputFocus: false,
      secondInputFocus: false,
      thirdInputFocus: false,
      fourthInputFocus: false
    }

    this._goToCards     = this._goToCards.bind(this);
    this._onFocusFirst  = this._onFocusFirst.bind(this);
    this._onFocusSecond = this._onFocusSecond.bind(this);
    this._onFocusThird  = this._onFocusThird.bind(this);
    this._onFocusFourth = this._onFocusFourth.bind(this);
  }

  _goToCards() {
    this.props.navigator.push(Router.getRoute('my_cards_tmp'));
  }

  pressInputs() {
    console.warn(this._firstInput.props.editable);
  }

  _onFocusFirst() {
    this.setState({firstInputFocus: true})
  }

  _onFocusSecond() {
    this.setState({secondInputFocus: true})
  }

  _onFocusThird() {
    this.setState({thirdInputFocus: true})
  }

  _onFocusFourth() {
    this.setState({fourthInputFocus: true})
  }

  render() {
    return (
      <Container>
        <StatusBar status="close" title="LINK NEW CARD"/>
        <View style={styles.wrapper}>
          <View style={styles.center}>
            <Text
              style={[styles.centerText, Platform.OS === 'ios' ? {marginTop: 25} : {marginTop: 25, fontFamily: 'SFUIText-Semibold'}]}>
              Enter the credit card number for the card you want to use with
              Trayce</Text>
            <Text style={styles.centerText}>
              Trayce will use this to identify your card and make sure that
              it is valid. We will not store it.
            </Text>
          </View>
          <TouchableOpacity activeOpacity={1} style={styles.inputs}>
            <View
              style={[styles.inputView, {borderTopLeftRadius: 5, flex: 1, borderBottomLeftRadius: 5}]}>
              <TextInput
                style={[styles.input, {borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}
                placeholder="0000"
                placeholderTextColor='#E2E2E2'
                maxLength={4}
                returnKeyType={"next"}
                keyboardType='numeric'
                ref="FirstInput"
                onFocus={this._onFocusFirst}
                onChangeText={(text) => {
              if (text.length >= 4) {
                this.refs.SecondInput.focus();
              }
            }}
              >
              </TextInput>
              <View style={[{
              marginTop: -2,
              borderRadius: 50,
              height: 5,
              marginBottom: 5,
              backgroundColor: "#CCCCCC"
            },
          this.state.firstInputFocus ? {backgroundColor: "#87B5D6"} : {}
        ]}/>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={[styles.input, {borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}
                placeholder="0000"
                placeholderTextColor='#E2E2E2'
                keyboardType='numeric'
                maxLength={4}
                onFocus={this._onFocusSecond}
                ref="SecondInput"
                onChangeText={(text) => {
              if (text.length >= 4) {
                this.refs.ThirdInput.focus();
              }else if (text.length <= 0) {
                this.refs.FirstInput.focus();
              }
            }}
              >
              </TextInput>
              <View style={[{
              marginTop: -2,
              borderRadius: 50,
              height: 5,
              marginBottom: 5,
              backgroundColor: "#CCCCCC"
            },
          this.state.secondInputFocus ? {backgroundColor: "#87B5D6"} : {}
        ]}/>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={[styles.input, {borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}
                placeholder="0000"
                placeholderTextColor='#E2E2E2'
                keyboardType='numeric'
                maxLength={4}
                onFocus={this._onFocusThird}
                ref="ThirdInput"
                onChangeText={(text) => {
              if (text.length >= 4) {
                this.refs.FourthInput.focus();
              }else if (text.length <= 0) {
                this.refs.SecondInput.focus();
              }
            }}
              >
              </TextInput>
              <View style={[{
              marginTop: -2,
              borderRadius: 50,
              height: 5,
              marginBottom: 5,
              backgroundColor: "#CCCCCC"
            },
          this.state.thirdInputFocus ? {backgroundColor: "#87B5D6"} : {}
        ]}/>
            </View>
            <View
              style={[styles.inputView, {borderBottomRightRadius: 5, borderTopRightRadius: 5}]}>
              <TextInput
                style={[styles.input, {borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}
                placeholder="0000"
                placeholderTextColor='#E2E2E2'
                keyboardType='numeric'
                maxLength={4}
                onFocus={this._onFocusFourth}
                ref="FourthInput"
                onChangeText={(text) => {
              if (text.length <= 0) {
                this.refs.ThirdInput.focus();
              }
            }}
              >
              </TextInput>
              <View style={[{
              marginTop: -2,
              borderRadius: 50,
              height: 5,
              marginBottom: 5,
              backgroundColor: "#CCCCCC"
            },
          this.state.fourthInputFocus ? {backgroundColor: "#87B5D6"} : {}
        ]}/>
            </View>
          </TouchableOpacity>
          <View style={styles.buttons}>
            <TouchableOpacity activeOpacity={1}
                              style={[styles.button,
                {
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                },
                this.state.flag ?
                  {backgroundColor: '#8AB9DB'}
                : {backgroundColor: '#458B99'}
            ]}
                              onPress={() => this.setState({flag: true})}>
              <Text style={styles.btnText}>PRIVATE</Text>
            </TouchableOpacity>
            <View style={{width: 1, backgroundColor: 'transparent'}}></View>
            <TouchableOpacity activeOpacity={1}
                              style={[styles.button,
            {
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            },
            this.state.flag ?
              {backgroundColor: '#458B99'}
            : {backgroundColor: '#8AB9DB'}
        ]}
                              onPress={() => this.setState({flag: false})}>
              <Text style={styles.btnText}>BUSINESS</Text>
            </TouchableOpacity>
          </View>
          <TouchableHighlight
            style={styles.buttonBottom}
            underlayColor='#04adaf'
            onPress={this._goToCards}
          >
            <Text style={styles.btnBottomText}>LINK NEW CARD</Text>
          </TouchableHighlight>
        </View>
      </Container>
    )
  }
}

let styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    flex: 1,
    marginTop: height / 6
  },
  center: {
    paddingHorizontal: 15
  },
  centerText: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 16,
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Regular'),*/
      },
    }),
    color: 'white',
    textAlign: 'center',
    marginTop: 20
  },
  inputs: {
    marginTop: 40,
    flexDirection: 'row',
    flex: 1,
  },
  inputView: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 1,
    paddingHorizontal: 5,

    ...Platform.select({
      ios: {
        paddingVertical: 20,
        marginBottom: 20,
      },
    })
  },
  input: {
    paddingTop: 5,
    fontSize: 25,
    paddingLeft: 5,
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Regular'),*/
      },
    }),
    backgroundColor: 'transparent',
    fontWeight: 'normal',
  },
  buttons: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        marginTop: 70,
      },
    })
  },
  buttonBottom: {
    backgroundColor: '#04adaf',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 25,
  },
  btnBottomText: {
    color: 'white',
    textAlign: 'center',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 19.5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16.5,
    paddingHorizontal: 10,
  },
  btnText: {
    color: '#56626F',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Regular'),*/
      },
    }),
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    fontSize: 16,
  },
})

export default NewCard;
