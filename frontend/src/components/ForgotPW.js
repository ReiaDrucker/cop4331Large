import React, { useState } from 'react';
var jwt = require('jsonwebtoken');

const BASE_URL = 'https://cop4331-g25.herokuapp.com/';

function ForgotPW() {

    var email;
  
    //  password for token encryption
    var ePassword = "shhhhh";
  
    const [message, setMessage] = useState('');
  
  
  
    const doForgotPW = async event => {
      event.preventDefault();
  
      // var js = '{"userName":"'
      //   + loginName.value
      //   + '","Password":"'
      //   + loginPassword.value + '"}';
  
      // try {
      //   var token = jwt.sign(js, ePassword);
  
      //   var tokenJSON = '{"token":"' + token + '"}';
  
      //   const response = await fetch(BASE_URL + 'api/loginAdmin',
      //     { method: 'POST', body: tokenJSON, headers: { 'Content-Type': 'application/json' } });
  
      //   // verify returned token
      //   var res = jwt.verify(JSON.parse(await response.text()).token, ePassword);
  
      //   if (res.error != "") {
      //     setMessage('User/Password combination incorrect');
      //   }
      //   else {
  
      //     if (res.isVerified === false) {
      //       setMessage('Please check you email to verify your account');
      //     }
  
      //     else {
      //       var user = { firstName: res.firstName, lastName: res.lastName, id: res.id, userName: loginName.value }
      //       localStorage.setItem('user_data', JSON.stringify(user));
  
      //       setMessage('');
      //       window.location.href = '/cards';
      //     }
      //   }
      // }
      // catch (e) {
      //   alert('LOGIN:' + e.toString());
      //   return;
      // }
    }
  
    // swap to login page
    const gotoLogin = event => {
      event.preventDefault();
  
      document.getElementById("loginDiv").style.display = "block";
      document.getElementById("signupDiv").style.display = "none";
      document.getElementById("ForgotDiv").style.display = "none";
    }
  
  
    return (
      <div id="ForgotDiv">
        <form onSubmit={doForgotPW}>
          <span id="inner-title">Provide Your Email for Password Recovery</span><br /><br />
          <input type="text" id="forgotEmail" placeholder="Email" ref={(c) => email = c} /><br />
          <button type="button" id="forgotRecover" class="buttons" onClick={doForgotPW}> Recover Password </button> <br />
          <button type="button" id="forgotToLogin" class="buttons" onClick={gotoLogin}>Return to Login</button> <br />
  
        </form>
        <span id="ForgotResult">{message}</span>
      </div>
    );
  };
  
  export default ForgotPW;
  