var genre;
var year;
var localArray = [];



const titleElement = $(".title");
const yearElement = $(".year");
const genreElement = $(".genre");
const appendThis = $(".appendThis");



function easyPie(g,y) {
    var key= {
        genre: g,
        year: y
    }
    console.log("Helppppp");
    window.localStorage.setItem("savedGenreYear", JSON.stringify(key));
    genre=g;
    year=y;
    console.log(`\nGenre:\t${genre}\nYear: \t${year}`);
}

function saveToTable(element) {
    console.log("\n\n\t\t\t\tSAVE TO TABLE\n\n");
    // console.log(element);
    // console.log(element[0].attributes)
    var titl = element[0].attributes[3].nodeValue;
    var yea =  element[0].attributes[4].nodeValue;
    var genr = element[0].attributes[5].nodeValue;
    var htmlToTable = {
        title: titl,
        year: yea,
        genre: genr
    }
    window.localStorage.setItem("newFavoriteMovie", JSON.stringify(htmlToTable));
    checkForDupes(htmlToTable);
}



function checkForDupes(element) {
    // console.log(element)
    if (typeof window.localStorage.favoriteMovies === "string") {
        var tempArray = JSON.parse(window.localStorage.getItem("favoriteMovies"));
        // console.log("HELP")
    } else {
        var tempArray = [];
    }
    var prevArray = tempArray;
    const pushLocation = (obj) => {
        var flag = 0;
        console.log("object:\t"+obj.title)
        if (typeof window.localStorage.favoriteMovies === "string") {
            // console.log("HELP")
        }
        // console.log(elem)
        prevArray.forEach((elem) => {
            // console.log("object:\t"+obj)
            // console.log(elem.title)
            if (obj.title === elem.title) {
                flag = 1;
            }
        });
        if (flag === 1) {
            return false;
        } else {
            return true;
        }
    }
    if (pushLocation(element)) {
        tempArray.push(element);
        console.log("HELP")
    }
    console.log("Temp:\t"+tempArray);
    window.localStorage.setItem("favoriteMovies", JSON.stringify(tempArray));
}



function loadFunct() {
    if (typeof window.localStorage.favoriteMovies === "string") {
        // var tbl = document.createElement("table");
        console.log(window.localStorage.favoriteMovies);
        var tempArray = JSON.parse(window.localStorage.favoriteMovies);
        console.log(tempArray.length);
        for (i=0; i<tempArray.length; i++) {
            var title = document.createElement("td");
            var space = document.createElement("tr");
            var year = document.createElement("td");
            var genre = document.createElement("td");
            title.setAttribute("class", "content is-medium");
            title.innerHTML = tempArray[i].title;
            year.setAttribute("class", "content is-medium");
            year.innerHTML = tempArray[i].year;
            genre.setAttribute("class", "content is-medium");
            genre.innerHTML = tempArray[i].genre;
            console.log(tempArray[i]);
            appendThis[0].appendChild(title);
            appendThis[0].appendChild(year);
            appendThis[0].appendChild(genre);
            appendThis[0].appendChild(space);
        }
    }
}

function abortFeat() {
    window.localStorage.clear();
    window.location.reload();
}