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
    window.localStorage.setItem("savedGenreYear", JSON.stringify(key));
    genre=g;
    year=y;
    console.log(`\nGenre:\t${genre}\nYear: \t${year}`);
}

function saveToTable(element) {
    console.log("\n\n\t\t\t\tSAVE TO TABLE\n\n");
    console.log(element);
    console.log(element[0].attributes[4].nodeValue)
    var titl = element[0].attributes[4].nodeValue;
    var yea =  element[0].attributes[3].nodeValue;
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
    if (typeof window.localStorage.favoriteMovies === "string") {
        var tempArray = JSON.parse(window.localStorage.getItem("favoriteMovies"));
    } else {
        var tempArray = localArray;
    }
    var prevArray = tempArray;
    const pushLocation = (obj) => {
        var flag = 0;
        prevArray.forEach((elem) => {
            if (obj === elem) {
                flag = 1;
            }
        });
        if (flag === 1) {
            return false;
        } else {
            
        }
    }
}



function loadFunct() {
    if (typeof window.localStorage.newFavoriteMovie === "string") {
        var tbl = document.createElement("table");

    }
}