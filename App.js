import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Input } from  './components/Input';
import { Button } from './components/Button';

export default class App extends React.Component{

  state ={
    email: '',
    password: '',
    authenticating: false,
  }

  componentWillMount(){
    var firebaseConfig = {
      apiKey: "AIzaSyB6V13o2O1OchUvWyu2CBUIrhQ8bZNvfiY",
      authDomain: "iparking-d0433.firebaseapp.com",
      databaseURL: "https://iparking-d0433.firebaseio.com",
      projectId: "iparking-d0433",
      storageBucket: "iparking-d0433.appspot.com",
      messagingSenderId: "698406937404",
      appId: "1:698406937404:web:3f956537f7cc9411373439",
      measurementId: "G-YYTQZGN8G3"
    };
   
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    console.log(firebase)
  }
  SignUp = (email, password) => {
    try {
      firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => { 
                 console.log(user);
           });
    } catch (error) {
      console.log(error.toString(error));
    }
  };
/*
//for the login part
  Login = (email, password) => {
    try {
      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(res => {
             console.log(res.user.email);
      });
} catch (error) {
      console.log(error.toString(error));
    }
  };
*/
  onPressSignIn(){
    this.setState({
      authenticating: true,
    });
  }

  renderCurrentState(){
    if (this.state.authenticating){
      return(
        <View style={styles.form}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
    return(
      <View  style={styles.form}>
         < Input
        placeholder ="Enter your email..."
        label = 'Email'
        onChangeText={email => this.setState({email})}
        value={this.state.email}
    />
       < Input
        placeholder ="Enter your password..."
        label = 'Password'
        secureTextEntry
        onChangeText={password => this.setState({password})}
        value={this.state.password}
      />

      < Button onPress={() => {this.onPressSignIn()}} /* onPress={() => this.LogIn(this.state.email, this.state.password) }*/>Log In</Button>
      < Button onPress={() => {this.onPressSignIn(); this.SignUp(this.state.email, this.state.password)}}>Sign Up</Button>
   
      </View>  
    )
  }
  render(){
  return (
    <View style={styles.container}>
      {this.renderCurrentState()}
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  form:{
    flex: 1,
  }
});
