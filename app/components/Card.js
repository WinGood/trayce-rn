import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform
} from 'react-native';


let { height, width } = Dimensions.get('window');
//#E3534E
class Card extends Component {
constructor(){
  super();

  this.state = {
    remove: false,
  }
}

  render() {
    return (
      <View>
        <TouchableOpacity activeOpacity={1}
          style={[styles.card,
            this.state.remove ?
              {borderTopLeftRadius: 5, borderTopRightRadius: 5}
              :
              {borderRadius: 5}
          ]} onPress={() => this.setState({remove: !this.state.remove})}>
          <Image style={styles.cardImage} width={79} height={50} source={require("../assets/images/credit-card/creditCard.png")} />
          <View style={styles.textWrapp}>
            <Text style={styles.cardText}>Business card</Text>
            <Text style={styles.cardText}>1234-5678-9123-4567</Text>
          </View>
        </TouchableOpacity>
        {
          this.state.remove &&
          <View style={styles.remove}>
            <Text style={styles.removeText}>DELETE</Text>
          </View>
        }

      </View>

    )
  }
}

let styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
  },
  textWrapp: {
    justifyContent: 'space-between',
    marginLeft: 15,
  },
  cardText: {
    ...Platform.select({
      android: {
        /*...Font.style('SFUIText-Regular'),*/
      },
    }),
    backgroundColor: 'transparent',

    fontSize: 16,
    color: '#56626F'
  },
  remove: {
    marginTop: 1,
    backgroundColor: '#e3534e',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  removeText: {
    ...Platform.select({
      android: {
        /*fontFamily: 'SFUIText-Semibold',*/
      },
    }),
    backgroundColor: 'transparent',
    fontSize: 16,
    color: 'white',
    paddingVertical: 10,
    flex: 1,
    textAlign: 'center'
  }
})

export default Card;
