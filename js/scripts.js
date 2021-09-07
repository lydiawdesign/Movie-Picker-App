
$(function() {
    $("#year").datepicker({
        changeYear: true,
        yearRange: "-100:+0",
        dateFormat: "yy",
    })
    // console.log("Help")
});

var userSearchyear = "";
var userSearchGenre = "";

var searchButton = $("#search-btn");
var yearInput = $("#year");
var genreInput = $("#dropdown-menu4");

var listResults = [];

var tmdbApiKey = "ab1b96d8093598b55845446ca45cff2f";
var nytReviewApiKey = "zQiVNyj3jaUrAJuxqJ6cXAWiQkq1JwxU";

function getMovieList(year,genre) {
    listResults = [];
    var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + tmdbApiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=" + year + "&with_genres=" + genre + "&with_original_language=en&with_watch_monetization_types=flatrate";
    // $.ajax({
    //     url:queryURL,
    //     method:"GET",
    fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
        // console.log(data);
        listResults.push(data.results[0].id);
        listResults.push(data.results[1].id);
        listResults.push(data.results[2].id);
        listResults.push(data.results[3].id);
        listResults.push(data.results[4].id);
        // console.log(listResults);
        getRecommendedList(listResults);
    });
}

function getRecommendedList(array) {
    var movieDetailURL = "";
    for (var i =0; i<array.length; i++) {
        movieDetailURL = "https://api.themoviedb.org/3/movie/" + array[i] + "?api_key=" + tmdbApiKey + "&language=en-US";
        fetch(movieDetailURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            var movieName = data.original_title;
            var posterPath = "https://image.tmdb.org/t/p/original/" + data.poster_path;
            console.log(movieName);
            console.log(posterPath);
            console.log(data.overview);
            var reviewURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movieName.trim() + "&api-key=" + nytReviewApiKey;
            fetch(reviewURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(review) {
                console.log(review);
                // var nytReviewUrl = data.results[0].link[2];
                // console.log(nytReviewUrl);
            });
        });
    }
}



