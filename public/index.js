$('#login-form').submit(event=>{
    console.log('Login button clicked');
    event.preventDefault();
    const username = $(event.currentTarget).find('.user').val();// username input
    console.log('Check if username exists. Yes, it does');
    const password = $(event.currentTarget).find('.pw').val();// password input
    console.log('Check if password is correct. Yes, it is');
    window.location="dashboard.html";
})

$('#registerLink').click(event=>{
    window.location="register.html";
    // if username exists, return error msg "already exists"
})