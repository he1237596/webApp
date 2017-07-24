angular.module('app').directive('navs',function () {
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

