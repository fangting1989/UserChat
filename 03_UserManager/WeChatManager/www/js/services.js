angular.module('starter.services', [])

.service('deepstreamservice', function ($q, $rootScope) {
    var scope = $rootScope;
    var ds, initedflag;

    function doinit(cb) {
      var defered = $q.defer();
      ds = deepstream(globleService.ChannelApi + ":6020", {
        rpcAckTimeout: 30000,
        rpcResponseTimeout: 60000,
        path: '/deepstream'
      });
      ds.on('error', function (msg, event, topic) {
        if (event === 'connectionError') {
          cb && cb();
          defered.resolve(false);
        }
      });
      ds.on('connectionStateChanged', function (connectionState) {
        console.log("FTFT--1")
        var connection = ds._connection;
        if (connectionState === 'RECONNECTING' && (connection._reconnectionAttempt >= connection._options.maxReconnectAttempts - 1)) {
          console.log("FTFT--2")
          connection._reconnectionAttempt = 0;
        }
      });
      ds.login({}, function (success, errorCode, data) {
        initedflag = true;
        defered.resolve(ds);
      });
      return defered.promise;
    }

    function init(cb) {
      console.log("FTFT")
      if (initedflag) {
        return $q.when(ds);
      } else {
        return doinit(cb);
      }
    }

    function getds() {
      return ds;
    }

    return {
      init: init,
      getds: getds
    };
})
.service('chatservice',function(deepstreamservice,$q){
    var deferred = $q.defer()
    return{
      Init:function(chatname){
        deepstreamservice.init().then(function (ds) {
          if (ds) {
            var systemR = ds.record.getRecord("wechat");
            systemR.whenReady(function () {
              //console.log('system ready');
              systemR.subscribe(function (info) {
                console.log("data--subscribe")
                if (info) {
                  localStorageService.set('storeInfo', info);
                  angular.extend(serviceConfig, info);
                  localStorageService.set('serviceConfig', serviceConfig);
                }
              }, true);
              deferred.resolve();
            });
          } else {
            deferred.reject();
          }
        });
      }
    }
    
})




