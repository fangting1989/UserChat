angular.module('starter.controllers', [])

.controller('loginCtrl', function($scope,deepstreamservice) {
	deepstreamservice.init()

  $scope.TitleName = "123"
})


