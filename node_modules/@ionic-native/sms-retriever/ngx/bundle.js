'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');

var SmsRetriever = /** @class */ (function (_super) {
    tslib.__extends(SmsRetriever, _super);
    function SmsRetriever() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmsRetriever.prototype.startWatching = function () { return core.cordova(this, "startWatching", {}, arguments); };
    SmsRetriever.prototype.getAppHash = function () { return core.cordova(this, "getAppHash", {}, arguments); };
    SmsRetriever.pluginName = "SmsRetriever";
    SmsRetriever.plugin = "cordova-plugin-sms-retriever-manager";
    SmsRetriever.pluginRef = "cordova.plugins.smsRetriever";
    SmsRetriever.repo = "https://github.com/hanatharesh2712/ionic-native-sms-retriever-plugin-master";
    SmsRetriever.install = "ionic cordova plugin add cordova-plugin-sms-retriever-manager --variable PLAY_SERVICES_VERSION=\"15.0.1\"";
    SmsRetriever.installVariables = ["PLAY_SERVICES_VERSION"];
    SmsRetriever.platforms = ["Android"];
    SmsRetriever.decorators = [
        { type: core$1.Injectable }
    ];
    return SmsRetriever;
}(core.IonicNativePlugin));

exports.SmsRetriever = SmsRetriever;
