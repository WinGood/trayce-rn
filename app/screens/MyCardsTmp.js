import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Switch,
  Dimensions,
  Animated,
  Platform
} from 'react-native';



import Router from '../config/router';
import Container from '../containers/Container';
import StatusBar from '../containers/StatusBar';
import Card from '../components/Card';
import BlackSplash from '../components/BlackSplash';

let {height, width} = Dimensions.get('window');

class MyCardsTmp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      remove: false,
    };

    this._goToNewCard = this._goToNewCard.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        remove: true
      })
    }, 2000);    // Don't forget start!
  }

  _goToNewCard() {
    this.props.navigator.push(Router.getRoute('new_card'));
  }


  render() {

    return (
      <Container>
        <StatusBar status="burger" title="MY CARDS"
                   openDrawer={this.openDrawer}/>

        { true ?
          <View style={{marginTop: height/6, paddingHorizontal: 15}}><Card />
          </View> :
          <View style={styles.wrapper}>
            <View style={styles.center}>
              <Image style={{backgroundColor: 'transparent'}}
                     source={require('../assets/images/credit-card/creditCard.png')}/>
              <Text style={[styles.centerText, {marginTop: 25}]}>
                You haven’t linked any cards yet.</Text>
              <Text style={styles.centerText}>
                When you link your credit card to Trayce, we
                can help you fill out your expense reports for you!
              </Text>
            </View>
            <TouchableHighlight
              style={styles.button}
              underlayColor='#04adaf' >
          {/* onPress={this._goToNewCard}  */}

              <Text style={styles.btnText}>LINK NEW CARD</Text>
            </TouchableHighlight>
          </View>
        }
      </Container>
    )
  }
}

let styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flex: 1,
    marginTop: height / 7
  },
  center: {
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    paddingHorizontal: width / 11,
    marginTop: height / 7
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
  button: {
    backgroundColor: '#04adaf',
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
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
    fontSize: 18,
    paddingVertical: 19.5,
  }
})

export default MyCardsTmp;
