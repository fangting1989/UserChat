angular.module('starter.controllers', [])

.controller('mainCtrl', function($scope,deepstreamservice,$state) {
  	$scope.TitleName = "123"

  	angular.extend($scope, {
  		BindData:function(){
  			$scope.UserList = [{index:1,name:'张三',mobile:'18657181338',guid:'chat-f7e8e628-0880-42de-8678-1c2ab06615ad'}
  			,{index:1,name:'李四',mobile:'18657180001',guid:'chat-7a3310d5-c1e4-40cf-8502-8d0e94103cfd'}
  			,{index:1,name:'王五',mobile:'18657180002',guid:'chat-b3c6c416-2457-4fae-82ac-978b59f73e84'}
  			,{index:1,name:'赵六',mobile:'18657180003',guid:'chat-54b29dee-dd54-4c21-adc6-5e8b14e47d84'}
  			]
  		},
  		ItemClick:function(item){
  			$state.go("chat",{obj:item})
  		}
  	})

  	$scope.BindData()
})
.controller('chatCtrl', function($scope,deepstreamservice,$stateParams,CommonServices,uuid2,chatservice,$ionicScrollDelegate) {
	$scope.TitleName = $stateParams.obj.mobile
  console.log($stateParams.obj.guid)
  $scope.data = {}

  $scope.chatarray = []
  $scope.chatarray.push({fromPerson:"1",chatType:'1',msg:'1231313131331331331'})

  var chatRecord = null;
  deepstreamservice.init().then(function (ds) {
    if (ds) {
      chatRecord = ds.record.getRecord("wechat");
      chatRecord.whenReady(function () {
        console.log('record ready');
          chatRecord.subscribe('firstname',function (info) {
            console.log(info)
            if(info.type == 'WeChatManager'){
              return;
            }
            $scope.chatarray.push({fromPerson:"2",chatType:'1',msg:info.data})
            $scope.$apply();
            $ionicScrollDelegate.scrollBottom(true);
          })
      });
    }
  })


	angular.extend($scope, {
    SendChatMessage:function(){
      console.log(uuid2.newuuid())
      if($scope.data.sendchat == '' || $scope.data.sendchat == null || typeof $scope.data.sendchat == 'undefined'){
        CommonServices.toasterInfo("对不起，输入的内容不能为空",'error')
        return
      }
      chatRecord.set("firstname", {type:'WeChatManager',data:$scope.data.sendchat})
      // chatservice.Init($stateParams.obj.guid).then(function(data){
      //   $scope.chatarray.push({fromPerson:"1",chatType:'1',msg:data})
      // })
      $scope.chatarray.push({fromPerson:"1",chatType:'1',msg:$scope.data.sendchat})
      $scope.data.sendchat = ''
      $ionicScrollDelegate.scrollBottom(true);
    }
	})
})


