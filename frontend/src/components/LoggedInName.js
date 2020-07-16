import React from 'react';

function LoggedInName()
{

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };    

    const goToProfile = event =>
    {
      event.preventDefault();

      // hide all panels + navbar
      document.getElementById("PendingPanel").style.display = "none";
      document.getElementById("ActivePanel").style.display = "none";
      document.getElementById("DeniedPanel").style.display = "none";
      document.getElementById("AllPanel").style.display = "none";
      document.getElementById("RespondPanel").style.display = "none";
      document.getElementById("NavBarHolder").style.display = "none";
      document.getElementById("subTitle").style.display = "none";

      // goto profile panel
      document.getElementById("ProfilePanel").style.display = "block";
    }


  return(
   <div id="loggedInDiv">
   <span id="userName">Logged In As {firstName} {lastName}</span>
   <button type="button" id="profileButton" class="buttons" onClick={goToProfile}> Profile </button>
   <button type="button" id="logoutButton" class="buttons" 
     onClick={doLogout}> Log Out </button>
   </div>
  );

};


export default LoggedInName;
