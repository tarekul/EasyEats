import app from 'firebase/app';
import axios from 'axios';
import 'firebase/database';

( async function () {
  let config = null;
  const getConfig = ( async function () {
    let { data } = await axios({
      method: 'GET',
      url: `https://eze-api.herokuapp.com/fb/`,
      headers: {
        tkn: 8850,
      }
    })
    return {
      apiKey: data.fb,
      authDomain: "easyeats-a662b.firebaseapp.com",
      databaseURL: "https://easyeats-a662b.firebaseio.com",
      projectId: "easyeats-a662b",
      storageBucket: "easyeats-a662b.appspot.com",
      messagingSenderId: "38887412175"
    }
  }())
  return await (async function () {
    if (!config) {
      config = await getConfig;
    }
    return await app.initializeApp(config);
  }())
}())

export default app;