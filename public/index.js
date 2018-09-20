$('#login-form').submit(event=>{
    console.log('Login button clicked');
    event.preventDefault();
    const username = $(event.currentTarget).find('.user').val();// username input
    console.log('Check if username exists. Yes, it does');
    const password = $(event.currentTarget).find('.pw').val();// password input
    console.log('Check if password is correct. Yes, it is');
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/auth/login",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Postman-Token": "5a7b6244-b71d-4734-9724-c99caef66c1b"
        },
        "processData": false,
        "data": JSON.stringify( { username, password } )
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        localStorage.authToken=response.authToken;
        console.log('Logged in.');
	    window.location="dashboard.html";
    });
})

$('#registerLink').click(event=>{
    window.location="register.html";
    // if username exists, return error msg "already exists"
})