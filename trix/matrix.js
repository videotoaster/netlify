async function login(homeserv, username, password) {
  var token = "0";
  
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
      token = json.access_token.toString(); 
    } else {
      token = this.status.toString();
    }
  };
  
  // send HTTP request
  xhttp.open("POST", document.getElementById("matrix_homeserv").value+"/_matrix/client/r0/login", true);
  xhttp.send(JSON.stringify(data));
  
  // return false/access token
  return token;
}

function error(error) {
  document.getElementById("error").innerHTML = error;
  document.getElementById("error").display = "block";
}

async function main() {
  // get form data to log in
  var hs = document.getElementById("matrix_homeserv").value;
  var un = document.getElementById("matrix_username").value;
  var pw = document.getElementById("matrix_password").value;
  
  // you know what this does
  const token = await login(hs,un,pw);
  
  // add errors n stuff
  if (token == 255) { error("Apparently, no response recieved from homeserver."); }
  if (token == 400) { error("Invalid request sent to homeserver. Homeserver may be offline."); }
  if (token == 403) { error("Invalid username/password. Are you on the right homeserver?"); }
  
  console.log("Connected to "+hs+", token: "+token);
}
