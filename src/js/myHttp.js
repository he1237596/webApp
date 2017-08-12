/**
 * Created by rxc on 2017/7/25.
 */
angular.module('app').service('myHttp',['$http',function ($http) {
    this.jsonp = function (url,params,success,error) {
        $http({
            url:url,
            method:'jsonp',
            params:params
        }).then(function (regs) {
            if (success) success(regs);
        }).catch(function (err) {
            if(error) error(err);
        });
    };
        //get请求
    this.getData = function () {

        };
    //post请求
    this.postData = function () {

    };
}]);