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
        return deepstreamservice.init().then(function (ds) {
          if (ds) {
            var systemR = ds.record.getRecord("wechat");
            systemR.whenReady(function () {
              //console.log('system ready');
              var infodata = null;
              systemR.subscribe('firstname',function (info) {
                console.log(info)
                infodata = info
                // if (info) {
                //   localStorage.set('storeInfo', info);
                //   angular.extend(serviceConfig, info);
                //   localStorage.set('serviceConfig', serviceConfig);
                // }
              }, true);
              deferred.resolve(infodata);
            });
          } else {
            deferred.reject();
          }
        });
      }
    }
    
})




