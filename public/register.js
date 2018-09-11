$('form').submit(event=>{
    console.log('Signup button clicked');
    event.preventDefault();
    const username = $(event.currentTarget).find('.user').val();// username input
    console.log('Check if username is available. Yes, it is');
    const password = $(event.currentTarget).find('.pw').val();// password input
    console.log('Password created');
    console.log('Account Created. Logged in.'); 
    window.location="dashboard.html";
})