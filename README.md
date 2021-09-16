# Movie-Picker-App: Groovy Movie

An application that allows you to randomly choose 5 movies to watched based on the genre and year that you are interested in. 

**Link to Repo**: https://github.com/lydiawdesign/Movie-Picker-App
**Link to Live Site**: https://lydiawdesign.github.io/Movie-Picker-App/
**Link to presentation**: https://docs.google.com/presentation/d/1hPBn9gicmnxaEmiOYdOq7IDQ_zCblUUenwas7mDfkTY/edit?usp=sharing

##Elevator Pitch: 

At-home movie nights have become more and more frequent over the past year given the current pandemic. With so many streaming services, it’s difficult to choose what movie to watch.

We are faced with cognitive impairment, struggling to make a choice due to the overload of options out there. Groovy Movie will solve that for you! Simply input what movie genre and release year that interests you and Groovy Movie will select 5 movie titles that fit your criteria. 

Once the 5 films are selected, click on the details button, you'll find more information about that movie. Found more than one recommendation you’d like to watch? Feel free to save movie titles to your “list” to revisit at a later time by accessing the your personalized list page.


**Motivation for development**: difficulty finding a movie to watch within a reasonable amount of time and the desire to limit the number of choices. 

##Concept:

**Groovy Movie** consists of 3 main html pages; an index, a results page, and a list page. The index page includes the logo, a short description of the application, an interactive form where the user chooses the genre and year from dropdowns, and two buttons. The “Find My Movie” button will submit the genre and year information and will bring the user to the results page. The “View My List” button will bring the user to the list page. 
Once on the results page, the user will see two buttons called “View My List” and “Search Again”; the “Search Again” button will bring the user back to the index page to create a new search with new criteria. Below those buttons, there will be 5 movie recommendations displayed. If the user clicks the movie poster image then a short synopsis will appear below. Under each movie poster, there is a button that allows the user to “Save to My List”. Once this button is selected then the movie will be automatically added to the list page and is viewable when the “View My List” button is clicked. 
The list page has two buttons (“Clear My List” and “Search Again”) as well as a working table of movie titles, release years, and genres of all the movies that were saved from the results page. The clear my list button will clear local storage, thus clearing the movie titles. The “Search Again” button will bring the user back to the index page.


##User Story:

**AS AN**
app user

**I WANT**
to supply a release year and a decade

**SO THAT**
I am returned a list of 5 movies for
that year/genre.

**SO THAT**
I can find out more
information about those films  and/or save movies to my list.

##Third-Party APIs: 
- The Movie Database API https://developers.themoviedb.org/3/getting-started/introduction
- New York Times Movie Reviews API https://developer.nytimes.com/docs/movie-reviews-api/1/overview

##CSS framework: 
- Bulma https://bulma.io/

## Screenshots

**Index**
![Groovy Movie Index Screenshot](https://user-images.githubusercontent.com/87274229/133634837-5f2e80da-3d47-4450-8356-e8f0c7fffa7a.jpg)


**Result Page**
![Groovy Movie Results Screenshot](https://user-images.githubusercontent.com/87274229/133634952-76ab8a39-2053-472e-8deb-2dc507ed691b.jpg)


**List page**
![Groovy Movie My List Screenshot](https://user-images.githubusercontent.com/87274229/133634878-3cc81716-fd54-4656-a49e-8d158e9109d6.jpg)

Copyright (c) 2021 Lydia Williamson, Kyle Lux, Hayden Lugo, and Ben Kasper

Contact: lydiawdesign@gmail.com

