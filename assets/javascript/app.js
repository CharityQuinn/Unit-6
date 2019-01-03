
var artist= [];

// Event listener for all button elements
$("button").on("click", function () {

  event.preventDefault();
  // In this case, the "this" keyword refers to the button that was clicked
  var artist = $(this).attr("data-images");
  console.log("The artist variable is " + artist);
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=OV0hMh6VJXv7nMMPfnB2nnoUIj0JOWW6&q=" + artist + "&limit=10&offset=0&rating=G&lang=en";
  
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
          var artistImage = $("<img>");
          artistImage.attr("src", results[i].images.fixed_height.url);
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
         
          var artImage = $("<img>");
          artImage.attr("data-still", results[i].images.original_still.url);
          artImage.attr("data-animate", results[i].images.fixed_height.url);
          artImage.attr("data-state", "still");
          artImage.css("width", 150);
          artImage.css("height", 150);
          artImage.attr("src", results[i].images.original_still.url);
          artImage.on("click", animate);
          artImage.append(artistImage);
          
          gifDiv.append(imgContainer);
          
          
         


          gifDiv.append(p);
          gifDiv.append(artistImage);

          $("row").prepend(gifDiv);
          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
});

