angular.module('app').directive('details',function () {
    return{
        restrict:'EA',
        template:'<div class="home_detail"></div>',
        replace:true,
        link:function ($scope,ele,attr) {
            ele.html($scope.item.content);

        }
    }
})

angular.module('app').config(['$sceDelegateProvider',function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://localhost/api/**'
    ]);
}])
