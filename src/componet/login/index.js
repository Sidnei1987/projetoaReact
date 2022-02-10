/* eslint-disable prettier/prettier */
import Toast from 'react-native-toast-message';
import React, {useState} from 'react';
import firebase from '../../services/firebaseConnection';
//import {Toast} from 'react-bootstrap';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function Login({changeStatus}) {
  const [type, setType] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    if (type === 'login') {
       firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          console.log(response)
          changeStatus(response.user.uid && response.user.token);
        });
    } else {
      Toast.show({
        position:'bottom',
        bottomOffset:40,
        autoHide:5,
        type:'error',
        text1: 'Erro',
        text2: 'Usuario ou senha invalido!',
      });



      //   const user = firebase
      //     .auth()
      //     .createUserWithEmailAndPassword(email, password)
      //     .then(response => {
      //       changeStatus(response.user.uid);
      //     });
  }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Toast
      onShow={()=>{handleLogin;}}
        style={{backgroundColor:'red'}}

      />
      <TextInput
        placeholder="Seu email"
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />

      <TextInput
        placeholder="*********"
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.handleLogin} onPress={handleLogin}>
        <Text style={styles.loginText}>
          {type === 'login' ? 'Acessar' : 'Cadastra'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          setType(type => (type === 'login' ? 'cadastrar' : 'login'))
        }>
        <Text style={{textAlign: 'center'}}>
          {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#F2f6fc',
    paddingHorizontal: 10,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    height: 45,
    padding: 10,
    borderWidth: 2,
    borderColor: '#141414',
  },
  handleLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141414',
    height: 45,
    marginBottom: 10,
  },
  loginText: {
    color: '#FFF',
    fontSize: 17,
  },
});
