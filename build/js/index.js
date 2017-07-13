/**
 * Created by rxc on 2017/7/13.
 */
var app = angular.module('app',[]);
app.controller('AppController',['$scope',function ($scope) {
    $scope.appTitle = '每日一刻';
    $scope.title = '首页';

    $scope.$on('tab_notifice',function (e,regs) {
        var titleArray = ['首页','作者','栏目','我'];
        $scope.$broadcast('home_notifice',{title:titleArray[regs.id]});
    })
}]);
app.directive('navs',function () {
    return {
        restrict:'EA',
        templateUrl:'../views/nav_tpl.html',
        controller:['$scope',function ($scope) {
            $scope.$on('home_notifice',function (e,regs) {
                 $scope.title = regs.title
                console.log(regs.title);
            })
        }]
    }
});
app.directive('tabbar',function () {
    return {
        restrict:'EA',
        templateUrl:'../views/tabbar_tpl.html',
        controller:'TabbarController'
    }
});
app.controller('TabbarController',['$scope',function ($scope) {
    $scope.tabChange = function (index) {
        $scope.$emit('tab_notifice',{id:index})
    }
}])