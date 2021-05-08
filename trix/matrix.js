async function login(homeserv, username, password) {
  // we need this thing because it does POST stuff
  var xhttp = new XMLHttpRequest();
  
  // we need this JSON to log in, matrix api will get very angry if we don't have it
  var data = {
     "type": "m.login.password",
     "user": username,
     "password": password
  }
  
  // on return value, set token to return (or alternatively an error)
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      var token = json.access_token;
      
    } else {
      // it's probably an error, return false
      token = false;
    }
  };
  
  // send HTTP request
  xhttp.open("POST", document.getElementById("matrix_homeserv").value+"/_matrix/client/r0/login", true);
  xhttp.send(JSON.stringify(data));
  
  // return false/access token
  return token;
}
function main() {
  // get form data to log in
  var hs = document.getElementById("matrix_homeserv").value;
  var un = document.getElementById("matrix_username").value;
  var pw = document.getElementById("matrix_password").value;
  
  // you know what this does
  await var token = login(hs,un,pw);
  
  console.log("Connected to "+hs+", token: "+token);
}
