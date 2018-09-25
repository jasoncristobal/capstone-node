$('#login-form').submit(event => {
    event.preventDefault();
    const username = $(event.currentTarget).find('.user').val();// username input
    const password = $(event.currentTarget).find('.pw').val();// password input
    if (!username || !password) { // if either one doesn't exist
        $('.error').html('<p>Please complete both fields</p>')
    }
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
    $.ajax(settings).done(function (response) {
        localStorage.authToken = response.authToken;
        window.location = "dashboard.html";
    }).fail(function (err) { 
        if (emptyUsername === true || emptyPassword === true) { // if one or both fieldsare empty
            $('.error').html('Please complete both fields')
        } else { // if both fields are filled out
            $('.error').html('Username and/or Password Incorrect')
        } 
    });
})

$('#registerLink').click(event => {
    window.location = "register.html";
})