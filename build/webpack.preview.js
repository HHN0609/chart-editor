module.exports = {
    mode: "production",
    devServer: {
        host: "127.0.0.1",
        port: 8081,
        hot: true,
        proxy: {
            "/api": "http://127.0.0.1:3000",
        },
        static: './dist',
    },
}