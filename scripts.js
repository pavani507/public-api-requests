const search = $(".search-container");
const gallery = $(".gallery");

const form = $(`<form></form>`);
$(form).attr("action", "#");
$(form).attr("method", "get");

const input1 = $(`<input>`);
$(input1).attr("type", "search");
$(input1).attr("id", "search-input");
$(input1).attr("class", "search-input");
$(input1).attr("placeholder", "Search...");

const input2 = $(`<input>`);
$(input2).attr("type", "submit");
$(input2).attr("value", "Search");
$(input2).attr("class", "search-submit");
$(input2).attr("id", "search-submit");
search.append(form);
form.append(input1);
form.append(input2);

//Fetch the random user API.
function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => {
      employeeInfo(data.results);
      modelMockup(data.results);
    })
    .catch(error => console.log("its looks like an error", error));
}

//Check the status of the network is resolve or reject.
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}
//Create 12 cards with employee information.
function employeeInfo(data) {
  //Displays 12 users from the Random User API
  data.map(item => {
    const div = $(`<div></div>`);
    div.addClass("card");
    const cardInnerDiv = $(`<div></div>`);
    cardInnerDiv.addClass("card-img-container");
    const img = $(`<img>`);
    img.addClass("card-img");
    $(img).attr("alt", "profile picture");
    const cardInfoDiv = $(`<div></div>`);
    cardInfoDiv.addClass("card-info-container");
    const nameHeading = $(`<h3></h3>`);
    nameHeading.addClass("card-name").addClass("cap");
    $(nameHeading).attr("id", "name");
    const email = $(`<p></p>`);
    email.addClass("card-text");
    const city_state = $(`<p></p>`);
    city_state.addClass("card-text").addClass("cap");
    $(img).attr("src", item.picture.large);
    $(nameHeading).text(item.name.first + " " + item.name.last);
    $(email).text(item.email);
    $(city_state).text(item.location.city + ", " + item.location.state);
    gallery.append(div);
    div.append(cardInnerDiv);
    cardInnerDiv.append(img);
    cardInnerDiv.append(cardInfoDiv);
    cardInfoDiv.append(nameHeading);
    cardInfoDiv.append(email);
    cardInfoDiv.append(city_state);
  });
}

//Add addEventListener for card.
function modelMockup(data) {
  const card = $(".card");
  $(card).each(function(index, item) {
    item.addEventListener("click", function(e) {
      let name = $(this)
        .find(`#name`)
        .prop(`innerText`);
      name = name.toLowerCase();

      for (let i = 0; i < data.length; i++) {
        if (name == `${data[i].name.first} ${data[i].name.last}`) {
          popupMenu(data[i]);
        }
      }
    });
  });
}

// Modal pops up when a user is clicked.
function popupMenu(data) {
  const div = $(`<div></div>`);
  div.addClass("modal-container");

  const modalInnerDiv = $(`<div></div>`);
  modalInnerDiv.addClass("modal");
  modalInnerDiv.css({ backgroundColor: "#33FFD4" });
  const button = $("<button></button>");
  const strong = $("<strong></strong>");
  $(strong).text("X");
  button.append(strong);
  $(button).attr("type", "button");
  $(button).attr("id", "modal-close-btn");
  $(button).attr("class", "modal-close-btn");
  const MIC = $("<div></div>");
  MIC.addClass("modal-info-container");
  const img = $(`<img>`);
  img.addClass("modal-img");
  $(img).attr("alt", "profile picture");
  const nameHeading = $(`<h3></h3>`);
  nameHeading.addClass("modal-name").addClass("cap");
  $(nameHeading).attr("id", "name");
  const email = $(`<p></p>`);
  email.addClass("modal-text");
  const city = $(`<p></p>`);
  city.addClass("modal-text").addClass("cap");
  const hr = $("<hr />");
  const cell = $("<p></p>");
  cell.addClass("modal-text");
  const location = $("<p></p>");
  location.addClass("modal-text");
  const DOB = $("<p></p>");
  DOB.addClass("modal-text");
  $("body").append(div);
  div.append(modalInnerDiv);
  modalInnerDiv.append(button);
  modalInnerDiv.append(MIC);
  MIC.append(img);
  MIC.append(nameHeading);
  MIC.append(email);
  MIC.append(city);
  MIC.append(hr);
  MIC.append(cell);
  MIC.append(location);
  MIC.append(DOB);
  $(img).attr("src", data.picture.large);
  $(nameHeading).text(data.name.first + " " + data.name.last);
  $(email).text(data.email);
  $(city).text(data.location.city + "," + data.location.state);
  $(cell).text(data.cell);
  $(location).text(
    data.location.street +
      ", " +
      data.location.state +
      ", " +
      data.location.postcode
  );
  $(DOB).text("Birthday: " + data.dob.date.split("T")[0]);
  //Close the modal window
  $(`.modal-close-btn`).click(function(e) {
    $(`.modal-container`).remove();
  });
}

//Call the fetchData function.
fetchData("https://randomuser.me/api/?results=12");
