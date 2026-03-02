cordova.define("cordova-plugin-gpsmockchecker.GPSMockChecker", function(require, exports, module) {
var exec = require('cordova/exec');

exports.check = function (whiteList, successCallback, errorCallback) {
    exec(successCallback, errorCallback, 'GPSMockChecker', 'check', whiteList);
};
});
