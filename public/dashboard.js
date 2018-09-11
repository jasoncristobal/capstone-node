const MOCK_DATA = {
  "acts": [ 
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
};


$(function() {
    getActs(displayActs);
})

function getActs(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
    setTimeout(function(){ callbackFn(MOCK_DATA)}, 1);
}

// this function stays the same when we connect
// to real API later
function displayActs(data) {
    $('main').html('<nav role="navigation"><button id="createButton">Create</button></nav>');
    for (index in data.acts) {
       $('main').append(
        `<p>${data.acts[index].name} 
        <button id="readButton" data-id="${index}">Read</button> 
        <button id="updateButton" data-id="${index}">Update</button> 
        <button id="deleteButton" data-id="${index}">Delete</button></p>`);
    }
}

// Cancel button
$('body').on('click', '#cancelButton', function(event) {
    getActs(displayActs);
});

// Save button for updated item
$('body').on('submit', '#saveUpdatedButton', function(event) {
    const name = $(event.target).find('#name').val()
    const date = $(event.target).find('#date').val()
    const location = $(event.target).find('#location').val()
    console.log(name, date, location);
    console.log('Updated item saved. All items reloaded');
    getActs(displayActs);
});

// Save button for new item
$('body').on('submit', '#create', function(event) {
    const name = $(event.target).find('#name').val()
    const date = $(event.target).find('#date').val()
    const location = $(event.target).find('#location').val()
    console.log(name, date, location);
    console.log('New item saved. All items reloaded');
    getActs(displayActs);
});

// Create new act
$('body').on('click', '#createButton', function(event) {
    $('main').html(`
        <form id="create">
        <input type="text" id="name" placeholder="Enter name" name="Name">
        <input type="text" id="date" placeholder="Enter date" name="Date">
        <input type="text" id="location" placeholder="Enter location" name="Location">
        <button id="cancelButton">Cancel</button>
        <button id="saveNewButton">Save</button>
        </form>
    `);
});

// Read act
$('body').on('click', '#readButton', function(event) {
	const index = $(event.target).data('id')
    $('main').html(`
    	<p>${MOCK_DATA.acts[index].name}</p>
    	<p>${MOCK_DATA.acts[index].date}</p>
    	<p>${MOCK_DATA.acts[index].location}</p>
    	Read act page will appear here
        <button id="cancelButton">Back</button>
    `);
});

// Update act
$('body').on('click', '#updateButton', function(event) {
	const index = $(event.target).data('id')
    $('main').html(`
        <form id="create">
        <input value="${MOCK_DATA.acts[index].name}" type="text" id="name" placeholder="Enter name" name="Name">
        <input value="${MOCK_DATA.acts[index].date}" type="text" id="date" placeholder="Enter date" name="Date">
        <input value="${MOCK_DATA.acts[index].location}" type="text" id="location" placeholder="Enter location" name="Location">
        <button id="cancelButton">Cancel</button>
        <button id="saveUpdatedButton">Save</button>
        </form>
    `);
    // Page is populated with same interface as New Act except it's pre-filled with existing data
    // If all inputs are correctly filled out, displayActs Fn populates page with updated item      
});  

// Delete act
$('body').on('click', '#deleteButton', function(event) {
	const index = $(event.target).data('id') + 1;
    getActs(displayActs);
    console.log('Item' + index + ' deleted. Remaining items reloaded')
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
