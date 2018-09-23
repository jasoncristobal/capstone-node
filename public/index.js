$('#login-form').submit(event => {
    console.log('Login button clicked');
    event.preventDefault();
    const username = $(event.currentTarget).find('.user').val();// username input
    const password = $(event.currentTarget).find('.pw').val();// password input
    if (!username || !password) {
        $('.error').html('<p>Please complete both fields</p>')
    }
    console.log('Passed If statement');
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
        "data": JSON.stringify({ username, password })
    }
    const emptyUsername = settings.data.includes("\"username\":\"\"");
    const emptyPassword = settings.data.includes("\"password\":\"\"");
    console.log(emptyUsername+' and '+emptyPassword)
    $.ajax(settings).done(function (response) {
        localStorage.authToken = response.authToken;
        window.location = "dashboard.html";
    }).fail(function (err) { // to handle request errors ( 404, 400, 500 ... )
        if (emptyUsername === true || emptyPassword === true) { // one or both are empty
            console.log('1')
            $('.error').html('Please complete both fields')
        } else { // neither are empty
            console.log('2')
            $('.error').html('Username and/or Password Incorrect')
        } 
    });
})

$('#registerLink').click(event => {
    window.location = "register.html";
    // if username exists, return error msg "already exists"
})