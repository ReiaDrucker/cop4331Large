import React, { useState } from 'react';
var jwt = require('jsonwebtoken');

const BASE_URL = 'https://cop4331-g25.herokuapp.com/';

function ProfilePanel() {

    //  password for token encryption
    var ePassword = "shhhhh";

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;

    var loginNameUpdate;
    var loginPasswordUpdate;

    const [message, setMessage] = useState('');



    const doEditProfile = async event => {
        // event.preventDefault();

        // var js = '{"userName":"'
        //     + loginNameUpdate.value
        //     + '","Password":"'
        //     + loginPasswordUpdate.value + '"}';

        // try {
        //     var token = jwt.sign(js, ePassword);

        //     var tokenJSON = '{"token":"' + token + '"}';

        //     const response = await fetch(BASE_URL + 'api/loginAdmin',
        //         { method: 'POST', body: tokenJSON, headers: { 'Content-Type': 'application/json' } });

        //     // verify returned token
        //     var res = jwt.verify(JSON.parse(await response.text()).token, ePassword);

        //     if (res.error != "") {
        //         setMessage('User/Password combination incorrect');
        //     }
        //     else {

        //         if (res.isVerified === false) {
        //             setMessage('Please check you email to verify your account');
        //         }

        //         else {
        //             var user = { firstName: res.firstName, lastName: res.lastName, id: res.id, userName: loginName.value }
        //             localStorage.setItem('user_data', JSON.stringify(user));

        //             setMessage('');
        //             window.location.href = '/cards';
        //         }
        //     }
        // }
        // catch (e) {
        //     alert(e.toString());
        //     return;
        // }

        
        // TODO - Entire function


        // TODO - REMEMBER TO CHECK FOR EMPTY VALUE ON PASSWORD OR USERNAME


        // TODO - REMEMBER TO UPDATE user_data AFTER PROFILE EDIT!!!!!!

        // Return to original page on completion
        document.getElementById("PendingPanel").style.display = "block";
        document.getElementById("ActivePanel").style.display = "none";
        document.getElementById("DeniedPanel").style.display = "none";
        document.getElementById("AllPanel").style.display = "none";
        document.getElementById("RespondPanel").style.display = "none";
        document.getElementById("NavBarHolder").style.display = "block";

        // hide profile panel
        document.getElementById("ProfilePanel").style.display = "none";

    }

    // swap back to trips panel
    const exitProfile = event => {
        event.preventDefault();

        // return to pending page, restore navBar
        document.getElementById("PendingPanel").style.display = "block";
        document.getElementById("ActivePanel").style.display = "none";
        document.getElementById("DeniedPanel").style.display = "none";
        document.getElementById("AllPanel").style.display = "none";
        document.getElementById("RespondPanel").style.display = "none";
        document.getElementById("NavBarHolder").style.display = "block";

        // hide profile panel
        document.getElementById("ProfilePanel").style.display = "none";
    }


    return (
        <div id="ProfilePanel">
            <form onSubmit={doEditProfile}>
                <span id="inner-title">Edit Profile</span><br /><br />
                <input type="text" id="loginNameUpdate" placeholder="Updated Username" ref={(c) => loginNameUpdate = c} /><br />
                <input type="password" id="loginPasswordUpdate" placeholder="Updated Password" ref={(c) => loginPasswordUpdate = c} /><br />
                <button type="button" id="updateProfileButton" class="buttons" onClick={doEditProfile}> Update Profile </button> <br />
                <button type="button" id="exitProfileButton" class="buttons" onClick={exitProfile}>Cancel</button>

            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
};

export default ProfilePanel;