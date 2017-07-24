angular.module('app').controller('DetailController',['$scope','$stateParams',function ($scope,$stateParams) {
    var index = $stateParams.id;
    $scope.item = $scope.homeData.posts[index];
    console.log($scope.item);
}])