import React, { Component, PropTypes } from 'react';
import { Text, TouchableHighlight, TouchableOpacity, Dimensions, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'underscore';

var BACKGROUND_COLOR, BORDER_RADIUS, BORDER_WIDTH, COLOR, MARGIN, SIZE;
let { height, width } = Dimensions.get('window');
class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            backgroundColor: '#FFF',
            borderRadius: 0,
            borderWidth: 1,
            checked: props.checked,
            color: '#000',
            name: '',
            onChange: null,
            size: 18
        };
    }

    componentDidMount() {
        this.setState(_.extend(this.props.style, _.omit(this.props, 'style')))
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.setState({ checked: nextProps.checked});
    }
    render() {
        BACKGROUND_COLOR = this.state.backgroundColor;
        BORDER_RADIUS = this.state.borderRadius;
        BORDER_WIDTH = this.state.borderWidth;
        COLOR = this.state.color;
        MARGIN = this.state.margin;
        SIZE = this.state.size;
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity activeOpacity={1}
                  onPress={() => { this._toggleCheck() }}
                  style={[{backgroundColor: BACKGROUND_COLOR, borderColor: COLOR,
                          borderRadius: BORDER_RADIUS, borderWidth: BORDER_WIDTH,
                          height: SIZE, margin: MARGIN, width: SIZE },
                        this.state.checked ? {borderWidth: 0} : {}]}>
                  <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                      { this.state.checked &&
                      <Ionicons name='ios-checkmark-circle' size={SIZE+4} color={COLOR} style={{backgroundColor: 'transparent'}} /> }
                  </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1}
                  onPress={() => { this._toggleCheck() }}
                  style={{flex: 1, width: width-60}}
                  >
                  {this.props.children}
              </TouchableOpacity>
            </View>

        );
    }

    _toggleCheck() {
        var checked = !this.state.checked;
        this.setState({ checked: checked });
        this.props.onChange && this.props.onChange(this.props.name, checked);
    }
}

Checkbox.propTypes = {
    checked: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    size: PropTypes.number,
    style: PropTypes.object,
}

module.exports = Checkbox;
