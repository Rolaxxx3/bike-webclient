const config = Object.freeze({
    API_URL: process.env.API_URL || 'http://localhost:8087',
    NODE_ENV: process.env.NODE_ENV || 'production',
    PUBLIC_URL: process.env.PUBLIC_URL || 'localhost:3000'
});

export default config;
