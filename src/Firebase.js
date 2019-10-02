import firebase from 'firebase/app'

var firebaseConfig = {
  apiKey: 'AIzaSyBGGRy9mUGb08QVJCP7tLwUzMbD0LLJgOI',
  authDomain: 'graduation-task-d7fc3.firebaseapp.com',
  databaseURL: 'https://graduation-task-d7fc3.firebaseio.com',
  projectId: 'graduation-task-d7fc3',
  storageBucket: 'graduation-task-d7fc3.appspot.com',
  messagingSenderId: '755416615184',
  appId: '1:755416615184:web:4105f566a4aaf89ab3fd95'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
