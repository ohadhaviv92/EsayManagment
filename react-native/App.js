import React from "react";
import { createSwitchNavigator } from "react-navigation";
import {I18nManager} from 'react-native';
import AuthNav from "./AuthNav";
import HomeNav from "./HomeNav";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const store = (configureStore()).store;
const persistor = (configureStore()).persistor;
export default class App extends React.Component {
  componentDidMount(){
    I18nManager.forceRTL(true);
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNav />
        </PersistGate>
      </Provider>
    );
  }
}

const AppNav = createSwitchNavigator({
  AuthNav,
  HomeNav
});
