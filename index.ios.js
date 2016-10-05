import React, { Component } from 'react';
import Firebase from 'firebase';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  View
} from 'react-native';
import Items from './items.ios';
import Item from './item.ios';

class devdacticFirebase extends Component {
  renderScene(route, navigator) {
    if(route.name === 'items') {
      return <Items navigator={navigator}></Items>
    }

    if(route.name === 'item') {
      return <Item navigator={navigator} title={route.title}/>
    }
  }

  render() {
    return(
      <View style={styles.appContainer}>
        <Navigator
          initialRoute={{name: 'items'}}
          renderScene={this.renderScene.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 appContainer:{
   flex: 1,
   height: 400,
   width: 375
  }
});

AppRegistry.registerComponent('devdacticFirebase', () => devdacticFirebase);
