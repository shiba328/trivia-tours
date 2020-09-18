const firebase = require('firebase/app')
require('firebase/database')
require('firebase/firestore')
require('firebase/auth')
require('firebase/storage')
require('firebase/functions')

try {
  firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
  })
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error(
      'Firebase initialization error raised',
      err.stack
    )
  }
}
// eslint-disable-next-line
export default ({ store }, inject) => {
  inject('firebase', firebase)
  inject('db', firebase.firestore())
}
const st = firebase.storage()
const fb = firebase.firestore
const auth = firebase.auth()
const db = firebase.firestore()
const fv = firebase.firestore.FieldValue
const timestamp = fv.serverTimestamp()
export { db, auth, fv, timestamp, fb, st }
