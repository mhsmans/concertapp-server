var env = {
    webPort: process.env.PORT || 3050,
    dbHost: process.env.DB_HOST || 'local',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbDatabase: process.env.DB_DATABASE || 'concertapp'
}

var dburl = process.env.NODE_ENV === 'production' ?
    'mongodb+srv://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost :
    'mongodb://localhost/' + env.dbDatabase

module.exports = {
    env: env,
    dburl: dburl
};