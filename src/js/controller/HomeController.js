angular.module('app').controller('HomeController',['$scope','$http',function ($scope,$http) {
    $http({
        url:'http://localhost/api/home.php',
        method:'jsonp'
    }).then(function (regs) {
        $scope.homeData = regs.data;
    }).catch(function (err) {
        console.log('err')
    })
}]);

