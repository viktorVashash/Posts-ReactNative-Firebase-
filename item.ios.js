import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

class Item extends Component {
  constructor(props) {
    super(props);
  }

  backToItems() {
    this.props.navigator.pop();
  }

  removeItem() {
    this.props.title.remove(this.props.title.item.id);
    this.props.navigator.pop();
  }

  render() {
    const { finished } = this.props.title.item;

    return(
      <Image source={require('./Default.png')} style={[styles.appContainer, styles.content]}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.backToItems.bind(this)}
          underlayColor='#ddd'
        >
          <Text style={styles.btnText}>Back</Text>
        </TouchableHighlight>
        <View style={styles.row}>
          <Text
            style={[styles.titleText, finished ? styles.todoTextChanged : '']}
          >
            {this.props.title.item.text}
          </Text>
          <TouchableHighlight
            style={styles.buttonDelete}
            onPress={this.removeItem.bind(this)}
            underlayColor='#ddd'
          >
            <Text style={styles.deleteBtnText}>Delete</Text>
          </TouchableHighlight>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
    height: 400,
    width: 375
 },
  titleText:{
    color: '#fff',
    marginTop: 7,
    textAlign: 'left',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    height: 400,
    width: 375
  },
  row: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#fff',
    marginTop: 10,
    height: 25,
    width: 55
  },
  buttonDelete: {
    height: 36,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
    flex: 2,
    flexDirection: 'row',
    marginLeft: 60,
    justifyContent: 'center',
    backgroundColor: '#c80000'
  },
  todoTextChanged: {
    textDecorationLine: 'line-through',
    textDecorationColor: '#111'
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 2,
  },
  deleteBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 6,
  }
});

export default Item;
