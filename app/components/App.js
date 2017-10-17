import React, {Component} from 'react';

import {
  NavigationContext,
  NavigationProvider,
  StackNavigation
} from '@exponent/ex-navigation';

import ActionSheet from '@exponent/react-native-action-sheet';

import Router from '../config/router';
import store from '../config/store';
import Drawer from '../containers/Drawer';

import SplashScreen from 'react-native-smart-splash-screen'

class App extends Component {
  static childContextTypes = {
    actionSheet: React.PropTypes.func,
  }

  getChildContext() {
    return {
      actionSheet: () => this._actionSheetRef,
    };
  }

  constructor(props) {
    super(props);

    this._loadAppData = this._loadAppData.bind(this);

    if (props.session.fetchToken && props.session.token) {
      this._loadAppData();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.session.fetchToken && nextProps.session.token) {
      this._loadAppData();
    }

    if (nextProps.session.fetchToken && !nextProps.session.token) {
      this.forceUpdate();
    }
  }

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.close(SplashScreen.animationType.fade, 600, 400);
    }, 1500);
  }

  _loadAppData() {
    this.props.getExpenseCategories();
    this.props.getExpenseAssignments();
    // this.props.getUserInfo();
  }

  render() {
    const navigationContext = new NavigationContext({
      router: Router,
      store: store
    });

    const {session} = this.props;
    const initialRoute = (session.fetchToken && session.token) ? 'home' : 'login';

    return (
      <NavigationProvider context={navigationContext}>
        <Drawer>
          <ActionSheet ref={component => this._actionSheetRef = component}>
            <StackNavigation initialRoute={Router.getRoute(initialRoute)}/>
          </ActionSheet>
        </Drawer>
      </NavigationProvider>
    );
  }
}

export default App;
