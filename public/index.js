acts = [ 
	{
		"name": "item1",
		"date": "text",
		"location": "place"
	},
 	{
 		"name": "item2",
		"date": "text",
		"location": "place"
 	},
 	{
		"name": "item3",
		"date": "text",
		"location": "place"
	},
 	{
 		"name": "item4",
		"date": "text",
		"location": "place"
 	},
 	{
		"name": "item5",
		"date": "text",
		"location": "place"
	},
 	{
 		"name": "item6",
		"date": "text",
		"location": "place"
 	} 
]

$(function() { 
	$('#login-form').submit(event=>{
		console.log('Hello'); 
    event.preventDefault();
		const username = $(event.currentTarget).find('.user').val();// username input
    console.log(username);
		const password = $(event.currentTarget).find('.pw').val();// password input
    console.log(password);
		login(username, password);
  	window.location="dashboard.html"
	  displayItems();
  })
})

$(function() { 
  $('#create-item').submit(event=>{
    console.log('Hello create'); 
    event.preventDefault();
    window.location="index.html"
  })
})

function login(username, password) {
	return {
		username,
		token: "123"
	}
}

function displayItems() {
  console.log('Hello displayItems');
  $('.append-results').append(`
    <div>
      <div>
      ${acts[0]}
      </div>
    </div>
  `);
}