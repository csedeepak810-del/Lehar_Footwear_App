var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { IonicNativePlugin, cordova } from '@ionic-native/core';
var SmsRetrieverOriginal = /** @class */ (function (_super) {
    __extends(SmsRetrieverOriginal, _super);
    function SmsRetrieverOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmsRetrieverOriginal.prototype.startWatching = function () { return cordova(this, "startWatching", {}, arguments); };
    SmsRetrieverOriginal.prototype.getAppHash = function () { return cordova(this, "getAppHash", {}, arguments); };
    SmsRetrieverOriginal.pluginName = "SmsRetriever";
    SmsRetrieverOriginal.plugin = "cordova-plugin-sms-retriever-manager";
    SmsRetrieverOriginal.pluginRef = "cordova.plugins.smsRetriever";
    SmsRetrieverOriginal.repo = "https://github.com/hanatharesh2712/ionic-native-sms-retriever-plugin-master";
    SmsRetrieverOriginal.install = "ionic cordova plugin add cordova-plugin-sms-retriever-manager --variable PLAY_SERVICES_VERSION=\"15.0.1\"";
    SmsRetrieverOriginal.installVariables = ["PLAY_SERVICES_VERSION"];
    SmsRetrieverOriginal.platforms = ["Android"];
    return SmsRetrieverOriginal;
}(IonicNativePlugin));
var SmsRetriever = new SmsRetrieverOriginal();
export { SmsRetriever };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL3Ntcy1yZXRyaWV2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sOEJBQXNDLE1BQU0sb0JBQW9CLENBQUM7O0lBb0N0QyxnQ0FBaUI7Ozs7SUFNakQsb0NBQWE7SUFTYixpQ0FBVTs7Ozs7Ozs7dUJBcERaO0VBcUNrQyxpQkFBaUI7U0FBdEMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvcmRvdmEsIElvbmljTmF0aXZlUGx1Z2luLCBQbHVnaW4gfSBmcm9tICdAaW9uaWMtbmF0aXZlL2NvcmUnO1xuXG4vKipcbiAqIEBuYW1lIFNtcyBSZXRyaWV2ZXJcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBwbHVnaW4gcmV0cml2ZXMgdGhlIFNNUyB3aGljaCBhcnJpdmUgd2l0aG91dCByZXF1aXJpbmcgUkVBRCBwZXJtaXNzaW9ucy5cbiAqXG4gKiBAdXNhZ2VcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGltcG9ydCB7IFNtc1JldHJpZXZlciB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvc21zLXJldHJpZXZlcic7XG4gKlxuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgc21zUmV0cmlldmVyOiBTbXNSZXRyaWV2ZXIpIHsgfVxuICpcbiAqIC4uLlxuICpcbiAqXG4gKiB0aGlzLnNtc1JldHJpZXZlci5nZXRBcHBIYXNoKClcbiAqICAgLnRoZW4oKHJlczogYW55KSA9PiBjb25zb2xlLmxvZyhyZXMpKVxuICogICAuY2F0Y2goKGVycm9yOiBhbnkpID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcbiAqIHRoaXMuc21zUmV0cmlldmVyLnN0YXJ0V2F0Y2hpbmcoKVxuICogICAudGhlbigocmVzOiBhbnkpID0+IGNvbnNvbGUubG9nKHJlcykpXG4gKiAgIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xuICpcbiAqIGBgYFxuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ1Ntc1JldHJpZXZlcicsXG4gIHBsdWdpbjogJ2NvcmRvdmEtcGx1Z2luLXNtcy1yZXRyaWV2ZXItbWFuYWdlcicsXG4gIHBsdWdpblJlZjogJ2NvcmRvdmEucGx1Z2lucy5zbXNSZXRyaWV2ZXInLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL2hhbmF0aGFyZXNoMjcxMi9pb25pYy1uYXRpdmUtc21zLXJldHJpZXZlci1wbHVnaW4tbWFzdGVyJyxcbiAgaW5zdGFsbDogJ2lvbmljIGNvcmRvdmEgcGx1Z2luIGFkZCBjb3Jkb3ZhLXBsdWdpbi1zbXMtcmV0cmlldmVyLW1hbmFnZXIgLS12YXJpYWJsZSBQTEFZX1NFUlZJQ0VTX1ZFUlNJT049XCIxNS4wLjFcIicsXG4gIGluc3RhbGxWYXJpYWJsZXM6IFsnUExBWV9TRVJWSUNFU19WRVJTSU9OJ10sXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJ10sXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNtc1JldHJpZXZlciBleHRlbmRzIElvbmljTmF0aXZlUGx1Z2luIHtcbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gc3RhcnQgd2F0aGNoaW5nIG1lc3NhZ2UgYXJyaXZlIGV2ZW50IGFuZCByZXRyaXZlIG1lc3NhZ2UgdGV4dC5cbiAgICogQHJldHVybiB7UHJvbWlzZTxzdHJpbmc+fSBSZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gcmV0cml2ZXMgU01TIHRleHQgb3IgVElNRU9VVCBhZnRlciA1IG1pbi5cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgc3RhcnRXYXRjaGluZygpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRvIGdldCBoYXNoIHN0cmluZyBvZiBBUFAuXG4gICAqIEByZXR1cm4ge1Byb21pc2U8c3RyaW5nPn0gUmV0dXJucyBhIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHN1Y2Nlc3NmdWxseSBnZW5lcmF0ZSBoYXNoIG9mIEFQUC5cbiAgICovXG4gIEBDb3Jkb3ZhKClcbiAgZ2V0QXBwSGFzaCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybjtcbiAgfVxufVxuIl19