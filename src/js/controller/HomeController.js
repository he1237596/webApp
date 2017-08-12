angular.module('app').controller('HomeController',['$scope','myHttp',function ($scope,myHttp) {
    // $http({
    //     url:'http://localhost/api/home.php',
    //     method:'jsonp'
    // }).then(function (regs) {
    //     $scope.homeData = regs.data;
    // }).catch(function (err) {
    //     console.log('err')
    // })
    var url = 'http://localhost/api/home.php';
    myHttp.jsonp(url,null,function (regs) {
        console.log(regs);
        $scope.homeData = regs.data;
    },function (err) {
        console.log(err);
    })
}]);

