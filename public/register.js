$('form').submit(event=>{
    event.preventDefault();
    const username = $(event.currentTarget).find('.user').val();// username input
    const password = $(event.currentTarget).find('.pw').val();// password input
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/users",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Postman-Token": "5a7b6244-b71d-4734-9724-c99caef66c1b"
        },
        "processData": false,
        "data": JSON.stringify( { username, password } )
    }
    // These 4 "const" variables are for checking the username and password inputs
    const emptyUsername = settings.data.includes("\"username\":\"\"");
    const emptyPassword = settings.data.includes("\"password\":\"\"");
    const startOfPasswordKey = settings.data.search("\"password\":")
    const endOfString = settings.data.lastIndexOf("}")
    $.ajax(settings).done(function (response) {
        $('.error').html('')
        $('nav').html(`
            <p class="signed-up">Account created!</p>
            <p><a href="/" id="#registerLink" class="signed-up">Please sign in here</a></p>
        `)
    }).fail(function (err) { 
        if (emptyUsername === true || emptyPassword === true) { // if one or both are empty
            $('.error').html('Please complete both fields')
        } else if (endOfString-startOfPasswordKey < 21) { 
            /* If the password has the minimum required # of characters, 
            then 21+ is the # of characters between the start of the password 
            key (line 21) and the end of the string (line 22). Less than 21 
            means the password length is less than the required minimum. */
            $('.error').html('Password must be at least 8 characters')
        } else {
            $('.error').html('Username already taken. Choose another.')
        }
    });
})

$('main').on('click', '#registerLink', event=> {
    window.location="index.html";
})