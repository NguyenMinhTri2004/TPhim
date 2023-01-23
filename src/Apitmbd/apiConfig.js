import axios from "axios"; 



const apiConfig = {
    timeout: 1000,
    apiKey: 'c4962b5665258faa8893cdfc3225f9ae',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;