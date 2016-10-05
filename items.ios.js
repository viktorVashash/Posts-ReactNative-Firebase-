import React, { Component } from 'react';
import Firebase from 'firebase';
import RadioButton from 'react-native-radio-button';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TextInput,
  ListView
} from 'react-native';
import Item from './item.ios';

class Items extends Component {
  constructor(props) {
    super(props);

    const config = {
      apiKey: "AIzaSyBztWWnibxrvfRQYN7g-_u6PzW93IwJgX0",
      authDomain: "my-first-app-80b34.firebaseapp.com",
      databaseURL: "https://my-first-app-80b34.firebaseio.com",
      storageBucket: "my-first-app-80b34.appspot.com",
      messagingSenderId: "1035104481671"
    };

    const data = Firebase.initializeApp(config);
    const myFirebaseRef = data.database().ref();

    this.itemsRef = myFirebaseRef.child('items');

    this.state = {
      newTodo: '',
      todoSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };

    this.items = [];
  }

  componentDidMount() {
    this.itemsRef.on('child_added', (dataSnapshot) => {
      this.items.push({
        id: dataSnapshot.key,
        text: dataSnapshot.val().todo,
        finished: dataSnapshot.val().finished
      });

      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });
    });

    this.itemsRef.on('child_removed', (dataSnapshot) => {
        this.items = this.items.filter((item) => item.id !== dataSnapshot.key);
        this.setState({
          todoSource: this.state.todoSource.cloneWithRows(this.items)
        });
    });

    this.itemsRef.on('child_changed', (dataSnapshot) => {
      this.items = this.items.map((item) => {
        if(item.text === dataSnapshot.val().todo && item.finished !== dataSnapshot.val().finished) {
          item = {
            id: dataSnapshot.key,
            text: dataSnapshot.val().todo,
            finished: dataSnapshot.val().finished
          };
          return item;
        } else {
          return item;
        }
      });
      this.setState({
        todoSource: this.state.todoSource.cloneWithRows(this.items)
      });
    })
  }

  navigate(routeName, rowData, removeFunc) {
    this.props.navigator.push({
      name: routeName,
      title: {
        item: rowData,
        remove: removeFunc
      }
    })
  }

  addTodo() {
    if(this.state.newTodo !== '') {
      this.itemsRef.push({
        todo: this.state.newTodo,
        finished: false
      });
      this.setState({
        newTodo: ''
      });
    }
  }

  changeItem(rowData) {
    this.itemsRef.child(rowData.id).update({todo: rowData.text, finished: !rowData.finished});
  }

  removeItem(id) {
    this.itemsRef.child(id).remove();
  }

  renderRow(rowData) {
    return(
        <TouchableHighlight
          underlayColor='#ddd'
          onPress={this.navigate.bind(this, 'item', rowData, this.removeItem.bind(this))}
        >
          <View>
            <View style={styles.row}>
              <Text style={[styles.todoText, rowData.finished ? styles.todoTextChanged : '']}>{rowData.text}</Text>
              <RadioButton
                animation={'bounceIn'}
                isSelected={rowData.finished}
                onPress={this.changeItem.bind(this, rowData)} />
            </View>
          <View style={styles.separator} />
          </View>
        </TouchableHighlight>
    );
  }

  render() {
    return(
      <Image source={require('./Default.png')} style={styles.appContainer}>
        <View style={styles.titleView}>
           <Text style={styles.titleText}>
             My Todo App
           </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({newTodo: text})}
            value={this.state.newTodo}
          />
          <TouchableHighlight style={styles.button} onPress={() => this.addTodo()} underlayColor='#ddd'>
            <Text style={styles.btnText}>Add</Text>
          </TouchableHighlight>
        </View>
        <ListView dataSource={this.state.todoSource} renderRow={this.renderRow.bind(this)} />
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
  titleView:{
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  inputContainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#0393f7',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff'
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 6,
  },
  input: {
    color: '#fff',
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#111',
  },
  todoText: {
    flex: 1,
    color: '#fff'
  },
  todoTextChanged: {
    textDecorationLine: 'line-through',
    textDecorationColor: '#111'
  }
});

export default Items;
