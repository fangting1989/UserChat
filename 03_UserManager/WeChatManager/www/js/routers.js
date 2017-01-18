angular.module('starter.routers', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller:"mainCtrl"
  })
  $stateProvider
  .state('chat', {
    url: '/chat',
    templateUrl: 'templates/chat.html',
    controller:"chatCtrl",
    params: {
        "obj": null
    }
  })

   $urlRouterProvider.otherwise('/main');
})

