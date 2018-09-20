$('form').submit(event=>{
    console.log('Signup button clicked');
    event.preventDefault();
    const username = $(event.currentTarget).find('.user').val();// username input
    console.log('Check if username is available. Yes, it is');
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
    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log('New user saved.');
	    window.location="dashboard.html";
    });
    console.log('Password created');
    console.log('Account Created. Logged in.'); 
})