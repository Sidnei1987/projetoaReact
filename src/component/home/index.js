/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import TaskList from './../taskList/index';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';

import Login from './../login/index';
import firebase from './../../services/firebaseConnection';

export default function Home() {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const inputRef = useRef(null);

    const [newTask, setNewTask] = useState('');
    const [key, setkey] = useState('');

useEffect(() => {
    function getUser() {
    if (!user) {
        return;
    }
    firebase
        .database()
        .ref('tarefas')
        .child(user)
        .once('value', snapshot => {
        setTasks([]);

        snapshot?.forEach(childItem => {
            let data = {
                key: childItem.key,
                nome: childItem.val().nome,
            };
            setTasks(oldTasks => [...oldTasks, data]);
        });
        });
    }
    getUser();
  }, [user]); //pramostra os item já cadastrado depoi que eu sai do app e volta

    function handleAdd() {
    if (newTask === '') {
    return;
    }

    //Usuario q edita uma tarefa
    if (key !== '') {
    firebase
        .database()
        .ref('tarefas')
        .child(user)
        .child(key)
        .update({
        nome: newTask,
        })
        .then(() => {
        const taskIndex = tasks.findIndex(item => item.key === key);
        const taskClone = tasks;
        taskClone[taskIndex].nome = newTask;
        setTasks([...taskClone]);
        });

        Keyboard.dismiss();
            setNewTask('');
            setkey('');
        return;
    }

    let tarefas = firebase.database().ref('tarefas').child(user);
    let chave = tarefas.push().key;

    tarefas
    .child(chave)
    .set({
        nome: newTask,
        })
    .then(() => {
        const data = {
        key: chave,
        nome: newTask,
        };
        setTasks(oldTasks => [...oldTasks, data]);
        });
    setNewTask('');
    Keyboard.dismiss();
    }

    function handleDelete(key) {
    firebase
    .database()
    .ref('tarefas')
    .child(user)
    .child(key)
    .remove()
    .then(() => {
        const findTasks = tasks.filter(item => item.key !== key);
        setTasks(findTasks);
    });
    }

    function handleEdit(data) {
    setkey(data.key);
    setNewTask(data.nome);
    inputRef.current.focus();
}

    if (!user) {
    return <Login changeStatus={user => setUser(user)} />;
}

return (
    <SafeAreaView style={styles.container}>



    {/* <View style={{flexDirection: 'row', marginBottom: 8 }}>
        <TouchableOpacity>
            <Feather name="x-circle" size={20} color="#FF0000" />
        </TouchableOpacity>
        <Text style={{marginLeft: 5, color:'#FF0000'}}>
            Você está editando uma tarefa!
            </Text>
    </View> */}

    <View style={styles.containerTask}>
        <TextInput
        style={styles.input}
        placeholder="O que vai fazer hoje?"
        value={newTask}
        onChangeText={text => setNewTask(text)}
        ref={inputRef}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
        <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    </View>

    <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
        <TaskList
            data={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
        />
        )}
        />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop: 65,
    paddingHorizontal: 10,
    backgroundColor: '#F2f6fc',
},
    containerTask: {
    flexDirection: 'row',
},
    input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#141414',
    height: 45,
    },
    buttonAdd: {
    backgroundColor: '#141414',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
    },
    buttonText: {
    color: '#FFF',
    fontSize: 22,
    },
});
