
var artist="";

// Event listener for all button elements
$("button").on("click", function () {

  event.preventDefault();
  // In this case, the "this" keyword refers to the button that was clicked
  var artist = $(this).attr("data");
  console.log("The artist variable is " + artist);
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=OV0hMh6VJXv7nMMPfnB2nnoUIj0JOWW6&q=enertainment&limit=10&offset=0&rating=G&lang=en";
  

  // Performing our AJAX GET request
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After the data comes back from the API
    .then(function (response) {
      // Storing an array of results in the results variable
      var results = response.data;
        console.log("This is the response " + results);
        for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div for the gif
          var gifDiv = $("<div>");
          var artistImage = $("button").attr("src", response.thumb_url);
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          
          //animalImage.attr("src", results[i].images.fixed_height.url);


          gifDiv.append(p);
          gifDiv.append(artistImage);


          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
});