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
        console.log(this);
        artist1 = $(this).attr("data-name");

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
          console.log("These are the results " + results);

          for (var i = 0; i < results.length; i++) {
            var artistDiv = $("<div class=artist>");

            var p = $("<p>").text("Rating: " + results[i].rating);

            var artistImage = $("<img>").attr("src", results[i].images.fixed_height_still.url);
            artistImage.attr("data-still", results[i].images.fixed_height_still.url);
            artistImage.attr("data-animate", results[i].images.fixed_height.url);
            artistImage.attr("data-state", "still");
            artistImage.addClass("image");
            
            myFunction(artist1);

            artistDiv.append(p);
            artistDiv.prepend(artistImage);
            $("#gifs-appear-here").prepend(artistDiv);
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
      // var el = document.getElementById('#bandLike');
      // if (el) {
      //   el.addEventListener('click', favoriteBand, false);
      //   console.log("About to get a click from favArray");
      //   var band = document.getElementById("#favArray");
      //   band.onclick = favoriteBand(); 
      var test = document.getElementById('favorites');
      test.addEventListener("click", myFunction());

      document.getElementById("favorites").addEventListener("click", myFunction());


      function myFunction() {
        console.log("Arrive in favoriteBand");
        if (test) {
          var arrayFav = [];
          //($().attr("data-name"));
          console.log("This is this in favorites " + test);
          $("#bandLike").append(arrayFav);
          document.getElementById("#bandLike").innerHTML = arrayFav.join();

        }

      }