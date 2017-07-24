angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('home',{
        url:'/home',
        views:{
            home:{
                templateUrl:'../views/home_tpl.html',
                controller:'HomeController'
            },
            author:{
                template:'<p>author</p> '
            },
            content:{
                template:'<p>content</p> '
            },
            my:{
                template:'<p>my</p> '
            }
        }
    }).state('home.list',{
        url:'/list',
        templateUrl:'../views/list_tpl.html'
    }).state('home.detail',{
        url:'/detail/:id',
        template:'<details></details>',
        //     templateUrl:'../views/detail_tpl.html',
        controller:'DetailController'
    })
    //     .state('/',{
    //     '/':{
    //         url:'/list',
    //         templateUrl:'../views/list_tpl.html'
    //     }
    // });
    $urlRouterProvider.otherwise('home/list');
}]);
