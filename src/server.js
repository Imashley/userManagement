"use strict";
//=============================================================================
/**
 * Module dependencies
 */
//=============================================================================
const
    http = require('http'),
    app = require('./app'),
    server = http.createServer(app);
//=============================================================================
/**
 * Module variables
 */
//=============================================================================
const
    port = app.get('port'),
    env = app.get('env');
//=============================================================================
/**
 * Bind to port
 */
//=============================================================================
server.listen(port, () => {
    return console.log(`User Management server up on port:${server.address().port} in ${env} mode.`);
});
//=============================================================================
/**
 * Conditionally export module
 */
//=============================================================================
if (require.main != module) {
    module.exports = server;
}

//=============================================================================
