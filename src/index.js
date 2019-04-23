const app = require('./server');
const config = require('./config/env/env');

app.listen(config.env.webPort, function () {
    console.log('Server listening on port ' + app.get('port'));
});