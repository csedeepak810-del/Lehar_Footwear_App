'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');

var VideoPlayer = /** @class */ (function (_super) {
    tslib.__extends(VideoPlayer, _super);
    function VideoPlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VideoPlayer.prototype.play = function (fileUrl, options) { return core.cordova(this, "play", {}, arguments); };
    VideoPlayer.prototype.close = function () { return core.cordova(this, "close", { "sync": true }, arguments); };
    VideoPlayer.pluginName = "VideoPlayer";
    VideoPlayer.plugin = "https://github.com/moust/cordova-plugin-videoplayer.git";
    VideoPlayer.pluginRef = "VideoPlayer";
    VideoPlayer.repo = "https://github.com/moust/cordova-plugin-videoplayer";
    VideoPlayer.platforms = ["Android"];
    VideoPlayer.decorators = [
        { type: core$1.Injectable }
    ];
    return VideoPlayer;
}(core.IonicNativePlugin));

exports.VideoPlayer = VideoPlayer;
