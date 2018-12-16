import { AppLoading, Font } from 'expo';
import React from 'react';
import { AppRegistry } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Provider from '../components/provider';
// import Home from './components/Home';
import RnIndex from './components/RnIndex';
import WebIndex from './components/WebIndex';
import { OTHERS, UIBARS, UICONTROLS, UIVIEWS } from './demoList';

const getOptions = title => ({
  title,
  headerStyle: {
    backgroundColor: 'black',
  },
  headerTintColor: 'white',
});

const scenes = {
  // Home: {
  //   screen: Home,
  //   navigationOptions: getOptions('Ant Design Mobile'),
  // },
  native: {
    screen: RnIndex,
    navigationOptions: getOptions('Antm React Native'),
  },
  web: {
    screen: WebIndex,
    navigationOptions: getOptions('Antm Web Component'),
  },
};

[...UIVIEWS, ...UICONTROLS, ...OTHERS, ...UIBARS].map((component) => {
  const Module = component.module.default;
  scenes[component.title] = {
    screen: Module,
    navigationOptions: getOptions(component.title),
  };
});

const RootNavigator = createStackNavigator(scenes);


class App extends React.Component {
  state = {
    theme: null,
    currentTheme: null,
    isReady: false,
  }
  changeTheme = (theme, currentTheme) => {
    this.setState({ theme, currentTheme });
  }
  async componentDidMount() {
    await Font.loadAsync(
      'antoutline',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antoutline.ttf'));

    await Font.loadAsync(
      'antfill',
      // eslint-disable-next-line
      require('@ant-design/icons-react-native/fonts/antfill.ttf'));
    // eslint-disable-next-line
    this.setState({ isReady: true });
  }
  render() {
    const { theme, currentTheme, isReady } = this.state;
    if (!isReady) {
      return <AppLoading />;
    }
    return (<Provider theme={theme}>
      <RootNavigator screenProps={{ changeTheme: this.changeTheme, currentTheme }} />
    </Provider>);
  }
}


AppRegistry.registerComponent('kitchen-sink', () => App);

export default App;
