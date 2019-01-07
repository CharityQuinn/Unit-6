var artist1 = "";

$(document).ready(function () {
  var artist = ["John Lennon", "Sofie Tukker", "Foster The People", "AJR"];

  function renderButtons() {


    $(".performers").empty();


    for (var i = 0; i < artist.length; i++) {

      var a = $("<button>");

      a.addClass("gif-btn");

      a.attr("data-name", artist[i]);

      a.text(artist[i]);
      $(".performers").append(a);
    }

  }
  $("#button").on("click", function (event) {
    event.preventDefault();

    var gifInput = $("#gif-input").val().trim();

    artist.push(gifInput);

    $("#gif-input").val("")
    renderButtons();


  });
  renderButtons();
  $(document.body).on("click", ".gif-btn", function () {

    artist1 = $(this).attr("data-name");
    console.log("The name of artist is " + artist1);
    var queryURL = "https://api.giphy.com/v1/gifs/search?" +
      "api_key=QqAT80q1iqn6a6N232lBJvRK9I7zNL9J" + "&q=" + artist1 +
      "&limit=10&offset=0&lang=en";;

    //Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

      // Storing an array of results in the results variable
      var results = response.data;

    
      for (var i = 0; i < results.length; i++) {
        var artistDiv = $("<div class=artist>");

        var p = $("<p>").text("Rating: " + results[i].rating);

        var artistImage = $("<img>").attr("src", results[i].images.fixed_height_still.url);
        artistImage.attr("data-still", results[i].images.fixed_height_still.url);
        artistImage.attr("data-animate", results[i].images.fixed_height.url);
        artistImage.attr("data-state", "still");
        artistImage.addClass("image");

        

        artistDiv.append(p);
        artistDiv.prepend(artistImage);
        $("#gifs-appear-here").prepend(artistDiv);
        myFunction(artist1);
       
      }
    });
  });
  $(document.body).on("click", "img", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

})
var bull = false;

$("#favButton").on("click", function() {
  bull = true
  console.log("This is favButton clicked if bull is true " + bull);
  myFunction(bull);
  
});


function myFunction() {
  if(bull) {
    console.log("The value of bull is "+ bull);
    var arrayFav = [];
    console.log("This was received by myFunction " + artist1);
    $("#favorites").append(artist1);
    $("#favorites").append(" | ");
    console.log("This is the array of favorite bands " + arrayFav);
  bull= false;
  }
  
}