angular.module('app').controller('TabbarController',['$scope',function ($scope) {
    //dom点击实现的方法
    $scope.tabChange = function (index) {
        //想父控制器发送广播
        $scope.$emit('tab_notifice',{id:index})
    }
}]);


