var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://<johnalexander>:<S0TOlAVTnJahn53j>@gallery.wc344.mongodb.net/darkroom?retryWrites=true&w=majority',
    development: 'mongodb+srv://<johnalexander>:<S0TOlAVTnJahn53j>@gallery.wc344.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    test: 'mongodb+srv://<johnalexander>:<S0TOlAVTnJahn53j>@gallery.wc344.mongodb.net/darkroom-test?retryWrites=true&w=majority',
}
module.exports = config;
