// Various variables, followed by event listeners 


// This const is used by the GET and PUT requests
const settingsForGETrequest = {
    "async": true,
    "crossDomain": true,
    "url": `/api/acts/`,
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "authorization": "Bearer " + localStorage.authToken
    }
}

// This appears in the screens for Create, Read, and Update
const dropDownMenuForRatings = {
    "examples": `
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
    <div><span class="drop-down">10 - Risking your life to save another life. Adopting a baby. Organ donation.</span></div></div>`,
    "selections": `
    <option value=1>1</option>
    <option value=2>2</option>
    <option value=3>3</option>
    <option value=4>4</option>
    <option value=5>5</option>
    <option value=6>6</option>
    <option value=7>7</option>
    <option value=8>8</option>
    <option value=9>9</option>
    <option value=10>10</option>`
}

// This is for the "expand" link for the drop-down menu above
$('main').on('click', '.expand', (function () {
        // Showing and hiding the drop-down menu
        $(this).toggleClass("active");
        $('.show').toggleClass("hide");
        if ($(this).hasClass("active")) {
            $(this).text("Hide Examples");
        } else {
            $(this).text("Show Examples");
        }
    })
);

// This is used by the "update" and "cancel" event listeners
let IDnumForSelectedItem = null;


// This loads the main dashboard screen
$(function () {
    displayActs();
})

function displayActs() {
    $('main').html(`
        <div class="col-12 create">
            <button id="createButton" class="button buttonCreate">Create New Act</button>
        </div>
    `)
    $.ajax(settingsForGETrequest).done(function (response) {
        for (index in response) {
            $('main').append(`
                <button class="col-3 card-button">
                    <a href="#" id="readButton" data-id="${index}" class="kindness-rating">
                        <div class="card">
                            <div class="card-content">
                                <h3>${response[index].title}</h3>
                                <p class="kindness-rating">Kindness Rating: ${response[index].kindnessRating}</p>
                            </div>
                        </div>
                    </a>
                </button>
            `);
        }
    });
    $('main').removeClass('main-for-read-act')
    $('h1').removeClass('h1-for-read-act')
    $('h1').html(`My Acts of Kindness`)
    $('h2').html('Click on an act to read or edit it')
    $('.blurb').html(`
    Kindly is where you record acts of humanity, charity, or generosity that you perform.
      Whether it's small, like holding a door open, or profound, like saving a life, 
      keeping track of them reminds you of your positive impact on the world,
      and encourages you to keep making that impact.
    `)
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
    });
    window.location = "dashboard.html"
});

// Save button on "create" screen
$('body').on('submit', '#create', function (event) {
    event.preventDefault();
    const title = $(event.target).find('#title').val()
    const date = $(event.target).find('#date').val()
    const location = $(event.target).find('#location').val()
    const description = $(event.target).find('#description').val()
    const kindnessRating = $(event.target).find('#kindnessRating').val()
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
        window.location = "dashboard.html"
    });
});

// Create New Act button
$('body').on('click', '#createButton', function (event) {
    $('main').addClass('main-for-read-act')
    $('h1').addClass('h1-for-read-act')
    $('h1').html('Create Act')
    $('h2').html('')
    $('.blurb').html('')
    $('main').html(`
        <section class="col-12">
        <form id="create">
        <p><span class="info-headers">Title: </span><input type="text" required id="title" placeholder="Describe what you did in 2-6 words" name="Name"></p> 
        <p><span class="info-headers">Where: </span><input type="text" required id="location" placeholder="Location or place you did it" name="Location"></p> 
        <p><span class="info-headers">When: </span><input type="date" required id="date" placeholder="Date you did it" name="Date"></p>
        <p><span class="info-headers">Kindness Rating: </span> 
            <select id="kindnessRating" name="kindnessRating" required>
                <option class="unselected" value="">Rate</option>
                ${dropDownMenuForRatings.selections}
            </select>
        <a href="#" class="dark expand">Expand to see how to rate</a></p>
        ${dropDownMenuForRatings.examples}
        <p><span class="info-headers">What happened:</span> <textarea type="text" required id="description" placeholder="Tell the whole story" name="Description"></textarea></p>
        <div class="edit-buttons">
            <button id="cancelButton" class="button buttonCancelUpdateSave">Cancel</button>
            <button id="saveUpdatedButton" class="button buttonCancelUpdateSave">Save</button>
        </div>
        </form>
        </section> 
    `)
});

// Read button (i.e. clicking on an item on the dashboard)
$('body').on('click', '#readButton', function (event) {
    const index = $(this).attr("data-id")
    $('h1').html(`Read Act`)
    $('h1').addClass('h1-for-read-act')
    $('h2').html(``)
    $('.blurb').html('')
    $.ajax(settingsForGETrequest).done(function (response) {
        IDnumForSelectedItem = response[index].id;
        $('main').html(`
            <section class="col-12">
            <h4>${response[index].title}</h4>
            <p><span class="info-headers">Where: </span>${response[index].location}</p> 
            <p><span class="info-headers">When: </span>${response[index].date.substring(5, 7)}/${response[index].date.substring(8, 10)}/${response[index].date.substring(0, 4)}</p>
            <p><span class="info-headers">Kindness Rating: </span>${response[index].kindnessRating}
            <a class="dark expand">Expand for info</a></p>
            ${dropDownMenuForRatings.examples}
            <p><span class="info-headers">What happened:</span> ${response[index].description}</p>
            <div class="edit-buttons">
                <button id="cancelButton" class="button buttonCancelUpdateSave">Cancel</button>
                <button id="deleteButton" class="red-button button">Delete</button>
                <button id="updateButton" data-id="${index}" class="button buttonCancelUpdateSave">Update</button>
            </div>
            </section> 
        `)
        $('main').addClass('main-for-read-act')
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
            <p><span class="info-headers">Title: </span><input value="${response[index].title}" required type="text" id="title" name="Name"></p> 
            <p><span class="info-headers">Where: </span><input value="${response[index].location}" required type="text" id="location" name="Location"></p> 
            <p><span class="info-headers">When: </span> <input value="${response[index].date.substring(0, 10)}" required type="date" id="date" name="Date"></p>
            <p><span class="info-headers">Kindness Rating: </span>   
                <select id="kindnessRating" name="kindnessRating" required>
                    <option class="unselected" value="${response[index].kindnessRating}">${response[index].kindnessRating} (Current)</option>
                    ${dropDownMenuForRatings.selections}
                </select>
            <a class="dark expand">Expand to see how to rate</a></p>
            ${dropDownMenuForRatings.examples}
            <p><span class="info-headers">What happened:</span> <textarea id="description" rows="3" cols="80" name="Description">${response[index].description}</textarea></p>
            <div class="edit-buttons">
                <button id="cancelButton" class="button buttonCancelUpdateSave">Cancel</button>
                <button id="deleteButton" class="red-button button">Delete</button>
                <button id="saveUpdatedButton" class="button buttonCancelUpdateSave">Save</button>
            </div>
            </form>
            </section> 
        `);
    });
});

// Delete button
$('body').on('click', '#deleteButton', function (event) {
    if (confirm('No act of kindness is too small. Still want to delete this?')) {
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "/api/acts/" + IDnumForSelectedItem,
            "method": "DELETE",
            "headers": {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "authorization": "Bearer " + localStorage.authToken
            }
        }
        $.ajax(settings).done();
        window.location = "dashboard.html"
    }
});

// Logout button
$('body').on('click', '#logoutButton', function (event) {
        localStorage.clear(); window.location = '/'
    }
);