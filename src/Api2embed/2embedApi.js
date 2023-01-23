import axiosClient from "./axiosClient";

// export const category = {
//     movie: 'movie',
//     tv: 'tv'
// }



const twoembedApi = {
    getMovieVideo: (params) => {
        const url = 'movie';
        return axiosClient.get(url, params);
    },
    getTvVideo: (params) => {
        const url = 'tv' ;
        return axiosClient.get(url, params);
    },
}


export default twoembedApi;
