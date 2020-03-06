import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyDeUtdfEK4GVa0MEMStFZ2o63ZZxBRvqxI",
    authDomain: "reactapp-7dd41.firebaseapp.com",
    databaseURL: "https://reactapp-7dd41.firebaseio.com",
    projectId: "reactapp-7dd41",
    storageBucket: "reactapp-7dd41.appspot.com",
    messagingSenderId: "8969282525",
    appId: "1:8969282525:web:bbb38e768082f752330c34",
    measurementId: "G-ESZ4F0S51K"
  };

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        // Referenciando a database para acessar em outros locais
        this.app = app.database();
        this.storage = app.storage();
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout() {
        return app.auth().signOut();
    }

    async register(nome, email, password) {
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    getCurrentUid() {
        return app.auth().currentUser && app.auth().currentUser.uid;
    }

    async getUserName(callback) {
        if(!app.auth().currentUser) {
            return null;
        }
        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
        .once('value').then(callback);
    }

}

export default new Firebase();