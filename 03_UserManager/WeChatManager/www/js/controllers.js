angular.module('starter.controllers', [])

.controller('mainCtrl', function($scope,deepstreamservice,$state) {
  	$scope.TitleName = "123"

  	angular.extend($scope, {
  		BindData:function(){
  			$scope.UserList = [{index:1,name:'张三',mobile:'18657181338'}
  			,{index:1,name:'李四',mobile:'18657180001'}
  			,{index:1,name:'王五',mobile:'18657180002'}
  			,{index:1,name:'赵六',mobile:'18657180003'}
  			]
  		},
  		ItemClick:function(item){
  			$state.go("chat",{obj:item})
  		}
  	})

  	$scope.BindData()
})
.controller('chatCtrl', function($scope,deepstreamservice,$stateParams) {
	$scope.TitleName = $stateParams.obj.mobile
	angular.extend($scope, {

	})
})


