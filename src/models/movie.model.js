export class Movie {
    name;
    description;
    imageURL;
    movieURL;
    country;
    year;
    quality;
    rating;
    genre;
    id;
    countAll;
    duration;

    constructor(movie) {
        this.name = movie.name;
        this.description = movie.description;
        this.imageURL = movie.imageurl;
        this.movieURL = movie.movieurl;
        this.country = movie.country;
        this.year = movie.year;
        this.quality = movie.quality;
        this.rating = movie.rating;
        this.genre = movie.genre;
        this.id = movie.id;
        this.countAll = 100;
        this.duration = movie.duration;
    }
}