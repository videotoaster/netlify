function login(homeserv, username, password) {
  // AJAX
  var xhttp = new XMLHttpRequest();
  // JSON to POST to API
  var data = {
     "type": "m.login.password",
     "user": username,
     "password": password
  }
  // on return value, set token
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      var token = json.access_token;
      console.log("Connected to "+homeserv+", token: "+token);
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
  // Get form data
  var hs = document.getElementById("matrix_homeserv").value;
  var un = document.getElementById("matrix_username").value;
  var pw = document.getElementById("matrix_password").value;
  // log in
  var token = login(hs,un,pw);
}
