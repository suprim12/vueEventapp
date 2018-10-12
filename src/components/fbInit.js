import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './fbConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
firebaseApp.firestore({timestampsInSnapshots: true})
export default firebaseApp.firestore()
