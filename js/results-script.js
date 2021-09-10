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
    var movieDetailURL = "";
    for (var i =0; i<array.length; i++) {
        // console.log("i:\t"+i+"\n");
        movieDetailURL = "https://api.themoviedb.org/3/movie/" + array[i] + "?api_key=" + tmdbApiKey + "&language=en-US";
        let selector = ".button_" + i;
        fetch(movieDetailURL)
        .then(function(response) {
            // console.log("i:\t"+i+"\n");
            return response.json();
        })
        .then(function(data) {
            console.log(data.release_date);
            var movieName = data.original_title;
            var releaseDate = JSON.stringify(data.release_date).split("-");
            releaseDate[0] = releaseDate[0].replace('"', '');
            console.log(`\n\tRelease date:\t${releaseDate[0]}\n`);
            $(selector)[0].setAttribute("data-year", releaseDate[0]);
            console.log(releaseDate);
            // console.log(buttons[0][0]);
            // console.log("i:\t"+selector+"\n");
            var posterPath = "https://image.tmdb.org/t/p/original/" + data.poster_path;
            $(selector)[0].setAttribute("data-title", movieName);
            var Gs = [];
            var tempArrary = [];
            for (let i=0; i<data.genres.length; i++) {
                if (i == 0) {
                    tempArrary = data.genres[i].name;
                } else {
                    tempArrary = " "+data.genres[i].name;
                }
                Gs.push(tempArrary);
                // console.log(Gs);
                Gs.toString();
                // console.log(`Gs:\t\t${Gs}`);
            }
            $(selector)[0].setAttribute("data-genre", Gs);
            console.log($(selector));
            // console.log(movieName);
            // console.log(posterPath);
            // console.log(data.overview);
            var reviewURL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=" + movieName.trim() + "&api-key=" + nytReviewApiKey;
            // fetch(reviewURL)
            // .then(function(response) {
            //     return response.json();
            // })
            // .then(function(review) {
            //     // console.log(review);
            //     // var nytReviewUrl = data.results[0].link[2];
            //     // console.log(nytReviewUrl);
            // });
        });
        
    }
}