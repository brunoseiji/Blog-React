import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

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

        this.app = app.database();
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password)
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

}

export default new Firebase();