/**
 * Created by rxc on 2017/7/13.
 */
var app = angular.module('app',['ui.router']);
//顶部navs模块
app.directive('navs',function () {
    return {
        restrict:'EA',
        templateUrl:'../views/nav_tpl.html',
        controller:['$scope',function ($scope) {
            //接收主控制器转发来的广播,参数
            $scope.$on('home_notifice',function (e,regs) {
                 $scope.title = regs.title;
                console.log(regs.title);
            })
        }],
        //用link获取并操作tabbar元素
/*        link:function ($scope,ele,attr) {
            //监听attr属性,实现返回按钮的显示与否
            if (attr.isBack != 'true'){
                ele.find('span').css({
                    display:'none'
                })
            }
        }*/
    }
});
app.controller('AppController',['$scope','$window','$location',function ($scope,$window,$location) {
    $scope.appTitle = '每日一刻';
    $scope.title = '首页';
    //设置默认id,选中home
    $scope.id = 0;
    $scope.hidde = false;

//监听tabbar切换
    $scope.$on('tab_notifice',function (e,regs) {
        var titleArray = ['首页','作者','栏目','我'];
        //转发tabbar切换后标题切换广播
        $scope.$broadcast('home_notifice',{title:titleArray[regs.id]});
        $scope.id = regs.id
    });
    // 返回按钮
    $scope.back = function () {
        //自动记录历史
        $window.history.back();
    };
        //实现返回按钮/tabbar的显示隐藏
        $scope.location = $location;
    //检测是否是详情页
    //$watch必须只能监听$scope上的属性
    $scope.$watch('location.url()',function (newV,oldV) {
        var index = newV.toString().indexOf('detail');
        if(index==-1){
            $scope.hidde = false;
        }else{
            $scope.hidde = true;
        }
    })
}]);
//底部tabbar模块
app.directive('tabbar',function () {
    return {
        restrict:'EA',
        templateUrl:'../views/tabbar_tpl.html',
        controller:'TabbarController',
        replace:true,
        //个改变文字颜色tab栏的
        // link:function ($scope,ele,attr) {
        //     $scope.$watch('id',function (newV,oldV) {
        //         var list = ele.children()[0].children;
        //         for(var i=0;i<list.length;i++){
        //             list[i].className = '';
        //         }
        //         list[$scope.id].className = 'active';
        //     })
        // }
    }
});
app.controller('TabbarController',['$scope',function ($scope) {
    //dom点击实现的方法
    $scope.tabChange = function (index) {
        //想父控制器发送广播
        $scope.$emit('tab_notifice',{id:index})
    }
}]);
//配置路由
app.config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
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
app.controller('HomeController',['$scope','$http',function ($scope,$http) {
    $http({
        url:'http://localhost/api/home.php',
        method:'jsonp'
    }).then(function (regs) {
        $scope.homeData = regs.data;
    }).catch(function (err) {
        console.log('err')
    })
}]);
app.controller('DetailController',['$scope','$stateParams',function ($scope,$stateParams) {
    var index = $stateParams.id;
    $scope.item = $scope.homeData.posts[index];
    console.log($scope.item);
}])

app.config(['$sceDelegateProvider',function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://localhost/api/**'
    ]);
}])

// 自定义指令
app.directive('details',function () {
    return{
        restrict:'EA',
        template:'<div class="home_detail"></div>',
        replace:true,
        link:function ($scope,ele,attr) {
            ele.html($scope.item.content);

        }
    }
})