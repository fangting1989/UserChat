angular.module('starter.controllers', [])

.controller('loginCtrl', function($scope,deepstreamservice) {
  	$scope.TitleName = "123"
})
.controller('chatCtrl', function($scope,deepstreamservice,$stateParams,$ionicScrollDelegate,Upload,CommonServices) {
	$scope.TitleName = "联系方式"
  $scope.data={}
  $scope.chatarray = []
  $scope.chatarray.push({fromPerson:1,chatType:'1',msg:'ceshiyixia'})
  // var chatR = {}
  // chatR.fromPerson = 1
  // chatR.chatType = 1
  // chatR.msg = 'ceshiyixia'
  // $scope.chatarray.push(chatR)

  var chatRecord = null;
  deepstreamservice.init().then(function (ds) {
    if (ds) {
      chatRecord = ds.record.getRecord("wechat");
      chatRecord.whenReady(function () {
        console.log('record ready');
        chatRecord.subscribe('firstname',function (info) {
          console.log(info)
          if(info.type == 'userclient'){
            return;
          }
          $scope.chatarray.push({fromPerson:2,chatType:1,msg:info.data})
          $scope.$apply();
          $ionicScrollDelegate.scrollBottom(true);
        })
      });
    }
  })




    angular.extend($scope,{
        SendContent:function(){
            $ionicScrollDelegate.scrollBottom(true);
            if($scope.data.sendchat == '' || $scope.data.sendchat == null || typeof $scope.data.sendchat == 'undefined'){
              CommonServices.toasterInfo("对不起，输入的内容不能为空",'error')
              return
            }
            $scope.chatarray.push({fromPerson:"1",chatType:'1',msg:$scope.data.sendchat})
            // chatservice.Init("abc",$scope.data.sendchat)
            chatRecord.set("firstname", {type:'userclient',data:$scope.data.sendchat})
            $scope.data.sendchat = ''
        },
        uploadFiles:function($files){
            CommonServices.toasterInfo("file uplad ...",'success')

      //       if (files && files.length) {
      //   for (var i = 0; i < files.length; i++) {
      //     Upload.upload({..., data: {file: files[i]}, ...})...;
      //   }
      //   // or send them all together for HTML5 browsers:
      //   Upload.upload({..., data: {file: files}, ...})...;
      // }


       // Upload.upload({
       //      url: 'upload/url',
       //      data: {file: file, 'username': $scope.username}
       //  }).then(function (resp) {
       //      console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
       //  }, function (resp) {
       //      console.log('Error status: ' + resp.status);
       //  }, function (evt) {
       //      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
       //      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
       //  });
        
            if ($scope.form.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            }

        }
    })
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
