import app from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyB6IU_v1uW_H1xso-2pP5EfcW1MCwQhOfA",
  authDomain: "easyeats-a662b.firebaseapp.com",
  databaseURL: "https://easyeats-a662b.firebaseio.com",
  projectId: "easyeats-a662b",
  storageBucket: "easyeats-a662b.appspot.com",
  messagingSenderId: "38887412175"
};

app.initializeApp(config);

export default app;