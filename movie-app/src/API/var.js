/**
 * this class just hold const-static strings for make the path requests simple
 */
class Var{
    static #API_KEY = "a91996f9139a47dc2e63eaf369cc1d0e";
    static #MOVIE_CATEGORY = "/3/genre/movie/list";
    static #MAIN_PATH = "https://api.themoviedb.org";
    static #TV_CATEGORY = "/3/genre/tv/list";
    static #MOVIE_DETAILS = "/3/movie";
    static #LIST_FROM_CATEGORY = "/3/list";
    static #POSTER = "https://image.tmdb.org/t/p/original";
    static #DISCOVER_MOVIE = "/3/discover/movie";
    static #DISCOVER_TV = "/3/discover/tv";
    static #SEARCH_MOVIE = "/3/search/movie";
    static #SEARCH_TV = "/3/search/movie";

    static getApiKey(){
        return this.#API_KEY;
    }

    static getMovieGenresPath(){
        return `${this.#MAIN_PATH}/${this.#MOVIE_CATEGORY}`;
    }

    static getMainPath(){
        return `${this.#MAIN_PATH}/${this.#MAIN_PATH}`;
    }

    static  getTvGenresPath(){
        return `${this.#MAIN_PATH}${this.#TV_CATEGORY}`;
    }

    static getMovieDetailsPath(movieId){
        return `${this.#MAIN_PATH}/${this.#MOVIE_DETAILS}/${movieId}`;
    }

    static getPosterPath(posterEnd){
        return `${this.#POSTER}/${posterEnd}`;
    }

    static getDiscoverMoviePath(){
        return `${this.#MAIN_PATH}/${this.#DISCOVER_MOVIE}`;
    }

    static getDiscoverTvPath(){
        return `${this.#MAIN_PATH}/${this.#DISCOVER_TV}`;
    }

    static getSearchTvPath(){
        return `${this.#MAIN_PATH}/${this.#SEARCH_TV}`;
    }

    static getSearchMoviePath(){
        return `${this.#MAIN_PATH}/${this.#SEARCH_MOVIE}`;
    }

    static getAllFromGenrePath(categoryId){
        return `${this.#MAIN_PATH}/${this.#LIST_FROM_CATEGORY}/${categoryId}`;
    }
}


export default Var;