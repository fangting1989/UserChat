angular.module('starter.controllers', [])

.controller('loginCtrl', function($scope,deepstreamservice) {
  	$scope.TitleName = "123"
})
.controller('chatCtrl', function($scope,deepstreamservice,$stateParams) {
	$scope.TitleName = "联系方式"
})
.controller('testCtrl', function($scope,deepstreamservice,$stateParams,$ionicModal) {



	$scope.reader = new FileReader();   //创建一个FileReader接口
    $scope.form = {     //用于绑定提交内容，图片或其他数据
        image:{},
    };
    $scope.thumb = {};      //用于存放图片的base64
    $scope.thumb_default = {    //用于循环默认的‘加号’添加图片的框
        1111:{}
    };

    $scope.img_upload = function(files) {       //单次提交图片的函数
        $scope.guid = (new Date()).valueOf();   //通过时间戳创建一个随机数，作为键名使用
        $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
        $scope.reader.onload = function(ev) {
        	console.log("123")
            $scope.$apply(function(){
                $scope.thumb[$scope.guid] = {
                    imgSrc : ev.target.result,  //接收base64
                }
            });
        };
        
        
    };
 
 $ionicModal.fromTemplateUrl('templates/modal/PreViewPic.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.modal = modal;
		 });

    angular.extend($scope,{
    	ShowImg:function(item){
    		$scope.preViewImg = item.imgSrc
    		$scope.modal.show()
    	},
    	ClosePreView:function(){
    		$scope.modal.hide()
    	}
    })


     $scope.$on('$destroy', function() {
	    $scope.modal.remove();
	  });

})
