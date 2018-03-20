import React from 'react'
import ListView from './components/ListView'
import DeckDetail from './components/DeckDetail'
import AddDeck from './components/AddDeck'
import CardListView from './components/CardListView'
import AddCard from './components/AddCard'
import { StyleSheet, Text, View } from 'react-native'
import { TabNavigator,StackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const MainNavigator = StackNavigator({
  Home: {
    screen: ListView
  },
  DeckDetail: {
    screen: DeckDetail
  },
  AddDeck:{
    screen: AddDeck
  },
  CardListView:{
    screen: CardListView
  },
  AddCard:{
    screen: AddCard
  },
}, {
    headerMode: 'none',
})
export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
