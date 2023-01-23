const {creatProxyMiddleware}  = require('http-proxy-middleware');

module.exports = app => {
    app.use(
        creatProxyMiddleware('/moive?id' ,
            {
                target : 'https://www.2embed.to/embed/tmdb',
                changeOrigin : true
            }
        ) 
    )
}