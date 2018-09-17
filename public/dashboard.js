
$(function() {
    displayActs();
})

/*
function getActs(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
    setTimeout(function(){ callbackFn(MOCK_DATA)}, 1);
}
*/

// this function stays the same when we connect
// to real API later
function displayActs() {
    $('main').html('<nav role="navigation"><button id="createButton">Create</button></nav>');
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/acts/",
        "method": "GET",
        "headers": {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Postman-Token": "ae7f52c1-2f73-4c46-8924-1e7c990044fd"
        }
    }
    $.ajax(settings).done(function (response) {
        for (index in response) {
       $('main').append(
        `<p>${response[index].title} 
        <button id="readButton" data-id="${index}">Read</button> 
        <button id="updateButton" data-id="${index}">Update</button> 
        <button id="deleteButton" data-id="${response[index].id}">Delete</button></p>`);
    }
    });
}

// Cancel button
$('body').on('click', '#cancelButton', function(event) {
    displayActs();
});

// Save button for updated item
$('body').on('submit', '#update', function(event) {
    event.preventDefault();
    const title = $(event.target).find('#title').val()
    const date = $(event.target).find('#date').val()
    const location = $(event.target).find('#location').val()
    const description = $(event.target).find('#description').val()
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/acts/"+IDnumForUpdatedItem,
        "method": "PUT",
        "headers": {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Postman-Token": "896edf59-f81a-4149-a4ea-17cba7cd13a4"
        },
        "processData": false,
        "data": "{\"id\": \""+IDnumForUpdatedItem+"\", \"title\": \""+title+"\", \"location\": \""+location+"\", \"date\": \""+date+"\", \"description\": \""+description+"\"  }"
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    console.log('Updated item saved. All items reloaded');
    displayActs();
});

// Save button for new item
$('body').on('submit', '#create', function(event) {
    event.preventDefault();
    const title = $(event.target).find('#title').val()
    const date = $(event.target).find('#date').val()
    const location = $(event.target).find('#location').val()
    const description = $(event.target).find('#description').val()
    console.log(title, date, location, description);
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/acts",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Postman-Token": "5a7b6244-b71d-4734-9724-c99caef66c1b"
        },
        "processData": false,
        "data": "{\"title\": \""+title+"\", \"location\": \""+location+"\", \"date\": \""+date+"\", \"description\": \""+description+"\"  }"
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log('New item saved. All items reloaded');
        displayActs();
    });  
});

// Create new act
$('body').on('click', '#createButton', function(event) {
    $('main').html(`
        <form id="create">
        <input type="text" required id="title" placeholder="Title" name="Name">
        <input type="text" required id="date" placeholder="When?" name="Date">
        <input type="text" required id="location" placeholder="Where?" name="Location">
        <textarea id="description" required rows="3" cols="80" placeholder="Describe your act of kindness" name="Description"></textarea>
        <button id="cancelButton">Cancel</button>
        <button id="saveNewButton">Save</button>
        </form>
    `);
});

const settingsForGETrequest = {
      "async": true,
      "crossDomain": true,
      "url": "/api/acts/",
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Postman-Token": "ec33e43e-e96d-4f9a-854c-a9858d974d5e"
      }
    }

// Read act
$('body').on('click', '#readButton', function(event) {
	const index = $(event.target).data('id')
    $.ajax(settingsForGETrequest).done(function (response) {
      console.log(response);
    $('main').html(`
        <p>${response[index].title}</p>
        <p>${response[index].date}</p>
        <p>${response[index].location}</p>
        <p>${response[index].description}</p>
        <button id="cancelButton">Back</button>
        <button id="updateButton" data-id="${index}">Update</button> 
    `);
    });
});

// This variable is global so that it can be
// used by the other "update" event listener
let IDnumForUpdatedItem = null;

// Update act
$('body').on('click', '#updateButton', function(event) {
	const index = $(event.target).data('id')
    $.ajax(settingsForGETrequest).done(function (response) {
    IDnumForUpdatedItem = response[index].id;
    console.log(IDnumForUpdatedItem);
    $('main').html(`
        <form id="update">
        <input value="${response[index].title}" type="text" id="title" name="Name">
        <input value="${response[index].date}" type="text" id="date" name="Date">
        <input value="${response[index].location}" type="text" id="location" name="Location">        
        <textarea id="description" rows="3" cols="80" name="Description">${response[index].description}</textarea>
        <button id="cancelButton">Cancel</button>
        <button id="saveUpdatedButton">Save</button>
        </form>
    `);
    });
    // Page is populated with same interface as New Act except it's pre-filled with existing data
    // If all inputs are correctly filled out, displayActs Fn populates page with updated item      
});  

// Delete act
$('body').on('click', '#deleteButton', function(event) {
	const idNum = $(event.target).data('id');
    const settings = {
      "async": true,
      "crossDomain": true,
      "url": "/api/acts/"+idNum,
      "method": "DELETE",
      "headers": {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "Postman-Token": "dcbb85c5-091c-4d18-ab88-ecf533b844de"
      }
    }
    $.ajax(settings).done();
    displayActs();
    console.log('Item deleted. Remaining items reloaded')
});




function createAct() {  
    // Use this later?    
}

function readAct() {  
    // Use this later?    
}

function updateAct() {
    // Use this later?    
}

function deleteAct() {
    // Use this later?    
}  
