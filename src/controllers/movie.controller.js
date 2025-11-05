import { MovieService } from '../services/movie.service.js';
import * as fs from "node:fs";

const movieService = new MovieService();
const draculaName = 'dracula.webp';
const secondName = '1744216552-242951142.webp';
const imgPath = 'src/db-files/imgs/';
const videoPath = 'src/db-files/videos/default.mp4';

export class MovieController {
    async getMoviesByPagination(req, res) {
        try {
            const { limit, offset } = req.query;
            const movies = await movieService.getMoviesByPagination(limit, offset);
            return res.status(200).json(movies);
        } catch (e) {
            console.error(e);
        }
    }

    async getRecommendations(req, res) {
        try {
            const movies = await movieService.getRecommendations();
            return res.status(200).json(movies);
        } catch (e) {
            console.error(e);
        }
    }

    async getMovie(req, res) {
        try {
            const { id } = req.params;
            console.log(id)
            const movie = await movieService.getMovie(id);
            return res.status(200).json(movie);
        } catch (e) {
            console.error(e);
        }
    }

    async getImg(req, res) {
        try {
            let path;
            if (req.params.name === draculaName) path = `${imgPath}${draculaName}`;
            if (req.params.name === secondName) path = `${imgPath}${secondName}`;
            const buffer = await fs.promises.readFile(path);
            res.setHeader('Content-Type', 'image/webp');
            return res.status(200).send(buffer);
        } catch (e) {
            console.error(e);
        }
    }

    async getVideo(req, res) {
        try {
            const buffer = await fs.promises.readFile(videoPath);
            console.log('get video')
            res.setHeader('Content-Type', 'video/mp4');
            return res.status(200).send(buffer);
        } catch (e) {
            console.error(e);
        }
    }
}