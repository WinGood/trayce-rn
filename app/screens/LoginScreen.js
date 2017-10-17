import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import StylingHideo from '../components/inputs/StylingHideo';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  InteractionManager,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Platform
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';

import Container from '../containers/Container';
import {RedAlert} from '../components/Alerts';

let {height, width} = Dimensions.get('window');

export default class Login extends Component {
  constructor(props) {
    super(props);

    this._goToHome            = this._goToHome.bind(this);
    this._goToCreateAccount   = this._goToCreateAccount.bind(this);
    this._goToForgotPass      = this._goToForgotPass.bind(this);
    this._handleEmailInput    = this._handleEmailInput.bind(this);
    this._handlePasswordInput = this._handlePasswordInput.bind(this);
    this._login               = this._login.bind(this);

    this.state = {
      email: '',
      password: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.session.loading && nextProps.session.token) {
      InteractionManager.runAfterInteractions(() => {
        this._goToHome();
      });
    }
  }

  render() {
    const {session} = this.props;

    return (
      <Container>
        <Spinner visible={session.loading}/>
        <View style={styles.wrapper}>
          <View style={styles.logo}>
            <Image source={require('../assets/images/logo/trayceLogo.png')}/>
          </View>
          {
            (session.error)
              ?
                <View>
                  <View style={{
                                backgroundColor: '#e3534e',
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                marginTop: -32,
                                marginBottom: -3,
                                justifyContent: 'center',
                                height: 35,
                                zIndex: 100000,
                  }}>
                    <Text style={styles.subtitle}>Email or password is incorrect!</Text>
                </View>
                </View>
              :
              null
          }
          <View style={[styles.inputs, (!session.error) ? {borderTopLeftRadius: 5,
            borderTopRightRadius: 5,} : {}]}>
            <StylingHideo
              style={{paddingVertical: 6}}
              styleLabel={{paddingVertical: 5}}
              autoCorrect={false}
              autoCapitalize="none"
              label='Your email'
              iconClass={MaterialIcons}
              iconName={'mail-outline'}
              keyboardType="email-address"
              value={this.state.email}
              onChange={this._handleEmailInput}
            />
            <View
              style={{backgroundColor: 'rgba(0, 0, 0, 0.1)',height: 1,marginHorizontal: 3}}></View>
            <StylingHideo
              style={{paddingVertical: 6}}
              styleLabel={{paddingVertical: 5}}
              label={'Password'}
              iconClass={MaterialIcons}
              iconName={'lock-outline'}
              secureTextEntry={true}
              value={this.state.password}
              onChange={this._handlePasswordInput}
            />
          </View>

          <LinearGradient
            colors={['#04adaf', '#8ab9db']}
            style={{alignItems: 'center', borderRadius: 5, paddingTop: 5, marginTop: -5, height: 66}}
            start={[0, 0.5]}
            end={[1, 1]}
          >
            <TouchableOpacity activeOpacity={1} style={styles.button}
                              underlayColor='#04adaf'
                              onPress={this._login}>
              <Text style={styles.btnText}>SIGN IN</Text>
            </TouchableOpacity>
          </LinearGradient>
          {this.links()}
        </View>
      </Container>
    );
  }

  _handleEmailInput(event) {
    this.setState({
      email: event.nativeEvent.text
    });
  }

  _handlePasswordInput(event) {
    this.setState({
      password: event.nativeEvent.text
    });
  }

  _login() {
    this.props.login(this.state.email, this.state.password);
  }

  _goToForgotPass() {
    const uid = this.props.navigation.currentNavigatorUID;
    this.props.push(uid, 'send_password');
  }

  _goToCreateAccount() {
    const uid = this.props.navigation.currentNavigatorUID;
    this.props.push(uid, 'create_account');
  }

  _goToHome() {
    const uid = this.props.navigation.currentNavigatorUID;
    this.props.replace(uid, 'home');
  }

  links() {
    return (
      <View style={styles.links}>
        <Text style={styles.linkText} onPress={this._goToCreateAccount}>Sign
          up</Text>
        <Text style={[styles.linkText, {textAlign: 'right'}]}
              onPress={this._goToForgotPass}>Forgot password?</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    marginTop: height / 9,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height / 15,
    marginTop: 15,
  },
  subtitle: {
    color: 'white',
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Medium'),*/
      },
    }),
    zIndex: 100001,
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    paddingVertical: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  inputs: {
    // borderTopLeftRadius: 5,
    // borderTopRightRadius: 5,
    backgroundColor: 'white',
    paddingBottom: 2,
    zIndex: 10000,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  inputText: {
    color: '#56626f',
    fontSize: 16
  },
  label: {
    flex: 1,
    color: '#56626f',
    fontWeight: 'normal',
    paddingVertical: 5,
    fontSize: 16,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 22,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    fontSize: 18
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 5,
  },
  linkText: {
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'normal',
    fontSize: 16,
    color: 'white',
    flex: 1,
  }
})
