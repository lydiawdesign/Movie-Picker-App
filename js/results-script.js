var userSearchyear = "";
var userSearchGenre = "";

const buttons = [
    $("#savebtn1"),
    $("#savebtn2"),
    $("#savebtn3"),
    $("#savebtn4")
]

var listResults = [];

var tmdbApiKey = "ab1b96d8093598b55845446ca45cff2f";
var nytReviewApiKey = "zQiVNyj3jaUrAJuxqJ6cXAWiQkq1JwxU";



function getParameters(){
    var searchParameters = document.location.search.split('&');
    // console.log(document.location.search)
    // console.log(`Search Parameters: ${searchParameters}`)

    var genre = searchParameters[0].split('=')[1]
    var year = searchParameters[1]
    // console.log(`Genre: ${genre}`)
    // console.log(`Year: ${year}`)

    getMovieList(year, genre)
}

getParameters()


function getMovieList(year,genre) {
    listResults = [];
    var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + tmdbApiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=" + year + "&with_genres=" + genre + "&with_original_language=en&with_watch_monetization_types=flatrate";
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

    const requests = array.map(function(id) {
        return fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + tmdbApiKey + "&language=en-US"); 
    });
    Promise.all(requests)
        .then(function(results){
            return Promise.all(results.map(function(result) {
                return result.json();
            }))
        
        })
        .then(function(data){
            for (var i =0; i < data.length; i++) {
                // console.log(data);
                var movieName = data[i].original_title;
                var movieId = data[i].id;
                var posterPath = "https://image.tmdb.org/t/p/original/" + data[i].poster_path;
                
                // console.log(movieName);
                $("#movie-name" + i).html(movieName);
                // console.log(movieId);
                $("#movie-name" + i).attr('movie-id', movieId);
                // console.log(posterPath);
                $("#movie-poster-" + i).attr("src", posterPath );
            }
        })
}
    

// function getMovieDetails(id) {
//     // console.log(data.overview);
//     var movieId = id.
//             var reviewURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movieName.trim() + "&api-key=" + nytReviewApiKey;
//             fetch(reviewURL)
//             .then(function(response) {
//                 return response.json();
//             })
//             .then(function(review) {
//                 console.log(review);
//                 for (var i=0; i<review.results.length; i++) {
//                     if (movieName === review.results[i].display_title) {
//                         console.log(review.results[i].display_title);
//                     } else {
//                         console.log("No NYT reviews")
//                     }
//                 }
//                 // console.log(review.results[0].display_title)
//                 // var nytReviewUrl = data.results[0].link[2];
//                 // console.log(nytReviewUrl);
//             });
// }

// $(".detail-btn").on("click", getMovieDetails($(this).siblings('p')));
// {
//     event.preventDefault();
//     userSearchGenre = $genreInput.val();
//     // console.log(userSearchGenre);
//     userSearchyear = $yearInput.val();
//     // console.log(userSearchyear);
//     document.location.href='Results.html?q='+userSearchGenre+'&'+userSearchyear;
// })

