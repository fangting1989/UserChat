angular.module('starter.controllers', [])

.controller('loginCtrl', function($scope,deepstreamservice) {
	
  	$scope.TitleName = "123"
})
.controller('chatCtrl', function($scope,deepstreamservice,$stateParams) {
	$scope.TitleName = "联系方式"
	//deepstreamservice.init()
	angular.extend($scope, {

	})
})
