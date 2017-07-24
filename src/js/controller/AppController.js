angular.module('app').controller('AppController',['$scope','$window','$location',function ($scope,$window,$location) {
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
