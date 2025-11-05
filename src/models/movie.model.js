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
    createdAt;
    id;
    countAll;
    countWatched;
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
        this.createdAt = movie.createdAt;
        this.id = movie.id;
        this.countAll = movie.countAll;
        this.countWatched = movie.countWatched;
        this.duration = movie.duration;
    }
}