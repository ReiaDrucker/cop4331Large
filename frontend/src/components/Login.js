
import React, { useState } from 'react';
var jwt = require('jsonwebtoken');

const BASE_URL = 'http://localhost:5000/';

if( process.env.NODE_ENV == 'production')
{
  BASE_URL = 'https://cop4331-g25.herokuapp.com/';
}





function Login() {

  var loginName;
  var loginPassword;

  //  password for token encryption
  var ePassword = "shhhhh";

  const [message, setMessage] = useState('');



  const doLogin = async event => {
    event.preventDefault();

    var js = '{"userName":"'
      + loginName.value
      + '","Password":"'
      + loginPassword.value + '"}';

    try {
      var token = jwt.sign(js, ePassword);

      var tokenJSON = '{"token":"' + token + '"}';

      const response = await fetch(BASE_URL + 'api/loginAdmin',
        { method: 'POST', body: tokenJSON, headers: { 'Content-Type': 'application/json' } });

      // verify returned token
      var res = jwt.verify(JSON.parse(await response.text()).token, ePassword);

      if (res.error != "") {
        setMessage('User/Password combination incorrect');
      }
      else {

        if (res.isVerified === false){
          setMessage('Please check you email to verify your account');
        }

        else{
          var user = { firstName: res.firstName, lastName: res.lastName, id: res.id, userName: loginName.value }
          localStorage.setItem('user_data', JSON.stringify(user));
  
          setMessage('');
          window.location.href = '/cards';
        }
      }
    }
    catch (e) {
      alert(e.toString());
      return;
    }

    // // START TEST DEBUG
    // try {

    //   var js2 = '{"userName":"'
    //     + loginName.value
    //     + '","Password":"'
    //     + loginPassword.value + '"}';


    //   var token = jwt.sign(js2, 'shhhhh');

    //   var tokenJSON = '{"token":"' + token + '"}';

    //   document.getElementById("inner-title").innerHTML = tokenJSON;

    //   const responseTEST = await fetch(BASE_URL + 'api/jwtTest',
    //     { method: 'POST', body: tokenJSON, headers: { 'Content-Type': 'application/json' } });

    //     var res2 = JSON.parse(await responseTEST.text());
    //   alert(res2.Password);


    // }
    // catch (e) {
    //   alert(e.toString());
    //   return;
    // }
    // // END TEST DEBUG

  }

  // swap to signup
  const gotoSignup = event => {
    event.preventDefault();

    document.getElementById("loginDiv").style.display = "none";
    document.getElementById("signupDiv").style.display = "block";
  }


  return (
    <div id="loginDiv">
      <form onSubmit={doLogin}>
        <span id="inner-title">Login</span><br /><br />
        <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
        <button type="button" id="loginButton" class="buttons" onClick={doLogin}> Login </button> <br />
        <button type="button" id="switchToSignup" class="buttons" onClick={gotoSignup}>Make Account</button>

      </form>
      <span id="loginResult">{message}</span>
    </div>
  );
};

export default Login;
