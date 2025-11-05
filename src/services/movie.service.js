import { connectDb } from '../db-connect.js';
import {Movie} from "../models/movie.model.js";
// import {ApiError} from '../components/errors.js';



export class MovieService {
    async getMoviesByPagination(limit, offset) {
        if (offset && !limit) {
            const movies = await connectDb('movies_catalog').select('*').limit(0).offset(offset);
            if (movies.length === 0) {
                return [];
            }
            return {
                data: movies.map(movie => new Movie(movie)),
            };
        }
        if (limit && !offset) {
            const movies = await connectDb('movies_catalog').select('*').limit(limit).offset(0);
            if (movies.length === 0) {
                return [];
            }
            return {
                data: movies.map(movie => new Movie(movie)),
            };
        }
        if (limit && offset) {
            const movies = await connectDb('movies_catalog').select('*').limit(limit).offset(offset);
            if (movies.length === 0) {
                return [];
            }
            return {
                data: movies.map(movie => new Movie(movie)),
            };
        }
        const movies = await connectDb('movies_catalog').select('*');
        if (movies.length === 0) {
            return [];
        }
        return  {
            data: movies.map(movie => new Movie(movie)),
        }
    }
    async getRecommendations() {
        const movies = await connectDb('movies_catalog').select('*').where('rating', '>', 7).orderBy('rating', 'desc').limit(10).offset(0).as('rating');
        if (movies.length === 0) {
            return [];
        }
        return {
            data: movies.map(movie => new Movie(movie)),
        };
    }

    async getMovie(id) {
        const movie = await connectDb('movies_catalog').select('*').where('id', '=', id);
        return {
            data: new Movie(movie[0]),
        };
    }
}