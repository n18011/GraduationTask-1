import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'graduation-task-d7fc3.firebaseapp.com',
  databaseURL: 'https://graduation-task-d7fc3.firebaseio.com',
  projectId: 'graduation-task-d7fc3',
  storageBucket: 'graduation-task-d7fc3.appspot.com',
  messagingSenderId: '755416615184',
  appId: '1:755416615184:web:4105f566a4aaf89ab3fd95'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export default db
