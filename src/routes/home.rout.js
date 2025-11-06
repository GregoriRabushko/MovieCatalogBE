import express from 'express';
import {MovieController} from '../controllers/movie.controller.js';


export const homeRouter = express.Router();
const movieController = new MovieController();
homeRouter.use('/movies/recommendations', movieController.getRecommendations);
homeRouter.use('/movies/search', movieController.searchMovies);
homeRouter.use('/movies/:id', movieController.getMovie);
homeRouter.use('/movies', movieController.getMoviesByPagination);
homeRouter.use('/get_img/:name', movieController.getImg);
homeRouter.use('/get_videos/:name', movieController.getVideo);

