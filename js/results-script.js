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
                var releaseDate = JSON.stringify(data[i].release_date).split("-");
                releaseDate[0] = releaseDate[0].replace('"', '');
                // console.log(releaseDate[0]);
                var movieId = data[i].id;
                var posterPath = "https://image.tmdb.org/t/p/original/" + data[i].poster_path;
                let selector = ".button_" + i;
                
                // console.log(movieName);
                $("#movie-name" + i).html(movieName);
                // console.log(movieId);
                $("#movie-name" + i).attr('movie-id', movieId);
                // console.log(posterPath);
                $("#movie-poster-" + i).attr("src", posterPath );

                $(selector)[0].setAttribute("data-title", movieName);
                $(selector)[0].setAttribute("data-year", releaseDate[0]);
                var Gs = [];
                var tempArrary = [];
                for (let i=0; i<data[0].genres.length; i++) {
                    if (i == 0) {
                        tempArrary = data[0].genres[i].name;
                    } else {
                        tempArrary = " "+data[0].genres[i].name;
                    }
                    Gs.push(tempArrary);
                    // console.log(Gs);
                    Gs.toString();
                    // console.log(`Gs:\t\t${Gs}`);
                }
                $(selector)[0].setAttribute("data-genre", Gs);
            }
        })
}
    

function getMovieDetails(id) {
    // console.log(data.overview);
    var movieId = id;
    var movieName = "";
    var openingYear = "";
    var reviewYear = "";
    var synopsis = "";
    var shortReview = "";
    var reviewLink = "";
    
    var detailUrl = "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + tmdbApiKey + "&language=en-US";
    fetch(detailUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(details){
        // console.log(details);
        movieName = details.original_title;
        openingYear = new Date(details.release_date).getFullYear();
        // console.log(movieName);
        $('#review-name').html(movieName);
        synopsis = details.overview;
        // console.log(synopsis);
        $('#review-synop').html(synopsis);
        if (movieName.includes('(')) {
            var subString = movieName.substring(0, movieName.indexOf('(')).slice(0,-1);
        } else if (movieName.includes(':')) {
            var subString = movieName.substring(0, movieName.indexOf(':'))
            console.log(subString);
        } else {
            var subString = movieName;
        }
        
        // var movieNameNoSpecialChars = movieName.replace('(', '');
        // movieNameNoSpecialChars = movieNameNoSpecialChars.replace(')', '');
        // console.log(movieNameNoSpecialChars);
        var reviewURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + subString.trim() + "&api-key=" + nytReviewApiKey;
        console.log(reviewURL);
        fetch(reviewURL)
        .then(function(response) {
        return response.json();
        })
        .then(function(review){
        console.log(review);
        if (review.num_results === 0) {
            console.log("HELP");
            $('#review-short').html(shortReview);
            $('#review-link').html("NYTimes has not written a review.");
            $("#review-link")[0].href = window.location.href;
        } else {
            for (var i =0; i<review.results.length; i++) {
                reviewYear = new Date(review.results[i].opening_date).getFullYear();
                console.log(review.results[i].display_title)
                if (review.results[i].display_title.includes(":")) {
                    var subStringURL = review.results[i].display_title.substring(0, review.results[i].display_title.indexOf(":"));
                } else {
                    var subStringURL = review.results[i].display_title;
                }
                
                console.log(`${subStringURL}\n${subString}\n\t${openingYear}\n\t${reviewYear}`);
                console.log("\n"+typeof subStringURL+"\n"+typeof subString+"\n\t"+typeof openingYear+"\n\t"+typeof reviewYear);
                console.log(`${subStringURL.length}\n${subString.length}\n\t${openingYear.length}\n\t${reviewYear.length}`);
                if (subString == subStringURL && openingYear == reviewYear) {
                    
                    shortReview = review.results[i].summary_short;
                    reviewLink = review.results[i].link.url;
                    console.log(shortReview);
                    // console.log(reviewLink);
                    $('#review-short').html(shortReview);
                    $('#review-link').html(reviewLink);
                    $("#review-link")[0].href = reviewLink;
                }
                
            }
        }
            
        })
    })
    $('#review').removeClass("is-hidden"); 
}

$(".detail-btn").on("click", function(){
    var passID = $(this).siblings('p').attr('movie-id');
    // console.log(passID);
    getMovieDetails(passID);
});

