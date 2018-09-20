$(function () {
    displayActs();
})

/*
function getActs(callbackFn) {
    // we use a `setTimeout` to make this asynchronous
    // as it would be with a real AJAX call.
    setTimeout(function(){ callbackFn(MOCK_DATA)}, 1);
}
*/

// This loads the main dashboard screen
function displayActs() {
    $('main').removeClass('main-for-read-act')
    $('h1').removeClass('h1-for-read-act')
    $('h1').html(`My Acts of Kindness`)
    $('h2').html('Click to read or edit')
    $('.edit-buttons').html('')
    $('main').html('<nav role="navigation"><button id="createButton">Create</button></nav>');
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/acts/",
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "authorization": "Bearer " + localStorage.authToken
        }
    }
    $.ajax(settings).done(function (response) {
        $('main').html(`
            <div class="col-12 create">
                <button id="createButton" class="button">Create New Act</button>
            </div>
        `)
        for (index in response) {
            $('main').append(`
                <div class="col-3">
                    <a href="#" id="readButton" data-id="${index}" class="kindness-rating">
                        <div class="card">
                            <div class="card-content">
                                <h3>${response[index].title}</h3>
                                <p class="kindness-rating">Kindness Rating: ${response[index].kindnessRating}</p>
                            </div>
                        </div>
                    </a>
                </div>
            `);
        }
    });
}

// Cancel button
$('body').on('click', '#cancelButton', function (event) {
    displayActs();
});

// Save button on "update/edit" screen
$('body').on('submit', '#update', function (event) {
    event.preventDefault();
    const title = $(event.target).find('#title').val()
    const date = $(event.target).find('#date').val()
    const location = $(event.target).find('#location').val()
    const description = $(event.target).find('#description').val()
    const kindnessRating = $(event.target).find('#kindnessRating').val()
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/acts/" + IDnumForSelectedItem,
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "authorization": "Bearer " + localStorage.authToken
        },
        "processData": false,
        "data": "{\"id\": \"" + IDnumForSelectedItem + "\", \"title\": \"" + title + "\", \"location\": \"" + location + "\", \"date\": \"" + date + "\", \"description\": \"" + description + "\", \"kindnessRating\": \"" + kindnessRating + "\"  }"
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    console.log('Updated item saved. All items reloaded');
    displayActs();
});

// Save button on "create" screen
$('body').on('submit', '#create', function (event) {
    event.preventDefault();
    const title = $(event.target).find('#title').val()
    const date = $(event.target).find('#date').val()
    const location = $(event.target).find('#location').val()
    const description = $(event.target).find('#description').val()
    const kindnessRating = $(event.target).find('#kindnessRating').val()
    console.log(title, date, location, description, kindnessRating);
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "/api/acts",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "authorization": "Bearer " + localStorage.authToken
        },
        "processData": false,
        "data": "{\"title\": \"" + title + "\", \"location\": \"" + location + "\", \"date\": \"" + date + "\", \"description\": \"" + description + "\", \"kindnessRating\": \"" + kindnessRating + "\"  }"
    }
    $.ajax(settings).done(function (response) {
        console.log(response);
        console.log('New item saved. All items reloaded');
        displayActs();
    });
});

// Create New Act button
$('body').on('click', '#createButton', function (event) {
    $('main').addClass('main-for-read-act')
    $('h1').addClass('h1-for-read-act')
    $('h1').html(`Create Act`)
    $('h2').html('')
    $('main').html(`
    <section class="col-12">
    <form id="create">
    <p><span class="info-headers">Title: </span><input type="text" required id="title" placeholder="Describe what you did in 6 words or less" name="Name"></p> 
    <p><span class="info-headers">Where: </span><input type="text" required id="location" placeholder="Location or place you did it" name="Location"></p> 
    <p><span class="info-headers">When: </span><input type="text" required id="date" placeholder="Date you did it" name="Date"></p>
    <p><span class="info-headers">Kindness Rating: </span>   
        <select id="kindnessRating" name="kindnessRating" required>
            <option class="unselected" value="">Rate</option>
            <option value=1>1</option>
            <option value=2>2</option>
            <option value=3>3</option>
            <option value=4>4</option>
            <option value=5>5</option>
            <option value=6>6</option>
            <option value=7>7</option>
            <option value=8>8</option>
            <option value=9>9</option>
            <option value=10>10</option>
        </select>
    <a class="dark expand">Expand to see how to rate</a></p>
    <div class="hide show"><span class="examples">Rating Examples: </span>
        <div><span class="drop-down">1 - Holding a door open for someone. Welcoming a new co-worker.</span></div>
        <div><span class="drop-down">2 - Complimenting a stranger. Giving your seat to another passenger.</span></div>
        <div><span class="drop-down">3 - Offering spare change to a stranger. Giving directions to someone lost.</span></div>
        <div><span class="drop-down">4 - Lending a friend your vehicle. Buying someone a birthday present.</span></div> 
        <div><span class="drop-down">5 - Donating old possessions. Helping an old lady down the stairs.</span></div>
        <div><span class="drop-down">6 - Babysitting for free. Inviting somebody over for dinner.</span></div>
        <div><span class="drop-down">7 - Manual labor for free. Calling 9-1-1 to report a house fire nearby.</span></div>
        <div><span class="drop-down">8 - Blood donation. Defending a stranger being harassed.</span></div>
        <div><span class="drop-down">9 - Adopting a pet. Saving somebody’s life with CPR.</span></div>
        <div><span class="drop-down">10 - Risking your life to save another life. Adopting a baby. Organ donation.</span></div></div>
    <p><span class="info-headers">What happened:</span> <textarea type="text" required id="description" placeholder="Tell the whole story" name="Description"></textarea></p>
    <button id="cancelButton" class="button">Cancel</button>
    <button id="saveUpdatedButton" class="green-button button">Save</button>
    </form>
    </section> 
    `)
    $('.edit-buttons').html(`
`)
});

const settingsForGETrequest = {
    "async": true,
    "crossDomain": true,
    "url": "/api/acts/",
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "authorization": "Bearer " + localStorage.authToken
    }
}

// This variable is global so that it can be used
// by the "update" and "cancel" event listeners
let IDnumForSelectedItem = null;

// Read act
$('body').on('click', '#readButton', function (event) {
    const index = $(this).attr("data-id")
    $('main').addClass('main-for-read-act')
    $('h1').addClass('h1-for-read-act')
    $('h1').html(`Read Act`)
    $('h2').html('')
    $.ajax(settingsForGETrequest).done(function (response) {
        IDnumForSelectedItem = response[index].id;
        $('main').html(`
            <section class="col-12">
            <h4>${response[index].title}</h4>
            <p><span class="info-headers">Where: </span>${response[index].location}</p> 
            <p><span class="info-headers">When: </span>${response[index].date}</p>
            <p><span class="info-headers">Kindness Rating: </span>${response[index].kindnessRating}
            <a class="dark expand">Expand for info</a></p>
            <div class="hide show"><span class="examples">Rating Examples: </span>
            <div><span class="drop-down">1 - Holding a door open for someone. Welcoming a new co-worker.</span></div>
            <div><span class="drop-down">2 - Complimenting a stranger. Giving your seat to another passenger.</span></div>
            <div><span class="drop-down">3 - Offering spare change to a stranger. Giving directions to someone lost.</span></div>
            <div><span class="drop-down">4 - Lending a friend your vehicle. Buying someone a birthday present.</span></div> 
            <div><span class="drop-down">5 - Donating old possessions. Helping an old lady down the stairs.</span></div>
            <div><span class="drop-down">6 - Babysitting for free. Inviting somebody over for dinner.</span></div>
            <div><span class="drop-down">7 - Manual labor for free. Calling 9-1-1 to report a house fire nearby.</span></div>
            <div><span class="drop-down">8 - Blood donation. Defending a stranger being harassed.</span></div>
            <div><span class="drop-down">9 - Adopting a pet. Saving somebody’s life with CPR.</span></div>
            <div><span class="drop-down">10 - Risking your life to save another life. Adopting a baby. Organ donation.</span></div></div>
            <p><span class="info-headers">What happened:</span> ${response[index].description}</p>
            </section> 
        `)
        $('.edit-buttons').html(`
            <button id="deleteButton" class="red-button button">Delete</button>
            <button id="cancelButton" class="button">Cancel</button>
            <button id="updateButton" data-id="${index}" class="green-button button">Update</button>
        `)
    });
});

// Update button
$('body').on('click', '#updateButton', function (event) {
    const index = $(this).attr("data-id")
    $.ajax(settingsForGETrequest).done(function (response) {
        $('main').addClass('main-for-read-act')
        $('h1').addClass('h1-for-read-act')
        $('h1').html(`Edit Act`)
        $('h2').html('')
        $('.edit-buttons').html('')    
        $('main').html(`
            <section class="col-12">
            <form id="update">
            <p><span class="info-headers">Title: </span><input value="${response[index].title}" type="text" id="title" name="Name"></p> 
            <p><span class="info-headers">Where: </span><input value="${response[index].location}" type="text" id="location" name="Location"></p> 
            <p><span class="info-headers">When: </span><input value="${response[index].date}" type="text" id="date" name="Date"></p>
            <p><span class="info-headers">Kindness Rating: </span>   
                <select id="kindnessRating" name="kindnessRating" required>
                    <option class="unselected" value="${response[index].kindnessRating}">${response[index].kindnessRating}</option>
                    <option value=1>1</option>
                    <option value=2>2</option>
                    <option value=3>3</option>
                    <option value=4>4</option>
                    <option value=5>5</option>
                    <option value=6>6</option>
                    <option value=7>7</option>
                    <option value=8>8</option>
                    <option value=9>9</option>
                    <option value=10>10</option>
                </select>
            <a class="dark expand">Expand to see how to rate</a></p>
            <div class="hide show"><span class="examples">Rating Examples: </span>
                <div><span class="drop-down">1 - Holding a door open for someone. Welcoming a new co-worker.</span></div>
                <div><span class="drop-down">2 - Complimenting a stranger. Giving your seat to another passenger.</span></div>
                <div><span class="drop-down">3 - Offering spare change to a stranger. Giving directions to someone lost.</span></div>
                <div><span class="drop-down">4 - Lending a friend your vehicle. Buying someone a birthday present.</span></div> 
                <div><span class="drop-down">5 - Donating old possessions. Helping an old lady down the stairs.</span></div>
                <div><span class="drop-down">6 - Babysitting for free. Inviting somebody over for dinner.</span></div>
                <div><span class="drop-down">7 - Manual labor for free. Calling 9-1-1 to report a house fire nearby.</span></div>
                <div><span class="drop-down">8 - Blood donation. Defending a stranger being harassed.</span></div>
                <div><span class="drop-down">9 - Adopting a pet. Saving somebody’s life with CPR.</span></div>
                <div><span class="drop-down">10 - Risking your life to save another life. Adopting a baby. Organ donation.</span></div></div>
            <p><span class="info-headers">What happened:</span> <textarea id="description" rows="3" cols="80" name="Description">${response[index].description}</textarea></p>
            <button id="deleteButton" class="red-button button">Delete</button>
            <button id="cancelButton" class="button">Home</button>
            <button id="saveUpdatedButton" class="green-button button">Save</button>
            </form>
            </section> 
        `);
    });
});

// Delete act
$('body').on('click', '#deleteButton', function (event) {
    if (confirm('No act of kindness is too small. Still want to delete this?')) {
        const idNum = $(event.target).data('id');
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "/api/acts/" + idNum,
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "authorization": "Bearer " + localStorage.authToken
            }
        }
        $.ajax(settings).done();
        displayActs();
        console.log('Item deleted. Remaining items reloaded')
    }
});

// Logout button
$('body').on('click', '#logoutButton', function (event) {
    localStorage.clear(); window.location = '/'
}
);

// This is for the "expand" link on the read screen
$('main').on('click', '.expand', (function () {

    $(this).toggleClass("active");
    $('.show').toggleClass("hide");

    if ($(this).hasClass("active")) {
        $(this).text("Hide examples");
    } else {
        $(this).text("Expand for info");
    }

}));



/*
<button id="deleteButton" data-id="${response[index].id}">Delete</button>
<button id="cancelButton">Cancel</button>
<button id="saveUpdatedButton">Save</button>

        <form id="update">
        <input value="${response[index].title}" type="text" id="title" name="Name">
        <input value="${response[index].date}" type="text" id="date" name="Date">
        <input value="${response[index].location}" type="text" id="location" name="Location">        
        <textarea id="description" rows="3" cols="80" name="Description">${response[index].description}</textarea>
        <button id="deleteButton" data-id="${response[index].id}">Delete</button>
        <button id="cancelButton">Cancel</button>
        <button id="saveUpdatedButton">Save</button>
        </form>


*/