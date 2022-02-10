/* eslint-disable prettier/prettier */
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
  apiKey: 'AIzaSyAHjWB5ymZ5Jc9QhYOOp0HrRHNZ4bNhyhU',
  authDomain: 'tarefas-71ed0.firebaseapp.com',
  projectId: 'tarefas-71ed0',
  storageBucket: 'tarefas-71ed0.appspot.com',
  messagingSenderId: '419938764914',
  appId: '1:419938764914:web:1edd7ac6aea211b33d9aeb',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
