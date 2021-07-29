/* eslint-disable import/no-commonjs, filenames/match-regex, import/unambiguous, global-require */

// console.log("~~craco.config.js~~")
// console.log(process.env);

module.exports = {
    webpack: {
        configure: {
            target: 'electron-renderer'
        }
    }
};