// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports === exports) {
    // Export the *name* of this Angular module
    // Sample usage:
    //
    //   import lbServices from './lb-services';
    //   angular.module('app', [lbServices]);
    //
    module.exports = "SupplyApiServices";
}

(function(window, angular, undefined) {
    'use strict';

    var urlBase = EshineSupplyAdmin.urlBase;
    // var urlBase = "http://192.168.0.95:8877/api/";
    var module = angular.module("SupplyApiServices", []);

    module.factory("SupplyApiMethod", function($http, $state,CommonServices) {
        return {

            getData: function(methodUrl, data, api,Hastoken) {
                if (!api) {
                    api = ''
                }

                CommonServices.waiting(true)
                return $http({
                    method: 'GET',
                    url: urlBase + api + methodUrl,
                    params: data,
                    headers: {
                        Token: localStorage.getItem("eshine_supply_token")
                    }
                }).then(function(data) {
                     CommonServices.waiting(false)
                    var cookie_brandid = localStorage.getItem("brandid")
                    if(typeof data.data.token != 'undefined'){
                        localStorage.setItem("eshine_supply_token", data.data.token);
                    }
                    if (typeof data.data.errorId != 'undefined') {
                        CommonServices.toasterInfo(data.data.errorMsg,'error')
                        return null;
                    } else {
                        return data.data;
                    }

                }).catch(function(data) {
                     CommonServices.waiting(false)
                    if (data.status == 401 ) {
                        $state.go('login');
                    };
                    return null;
                });
            },
            postData: function(methodUrl, data, api) {
                if (!api) {
                    api = ''
                }

                CommonServices.waiting(true)
                return $http({
                    method: 'POST',
                    url: urlBase + api + methodUrl,
                    headers: {
                        Token: localStorage.getItem("eshine_supply_token")
                    },
                    data: data
                }).then(function(data) {
                    CommonServices.waiting(false)
                    var cookie_brandid = localStorage.getItem("brandid")
                    if(typeof data.data.token != 'undefined'){
                        localStorage.setItem("eshine_supply_token", data.data.token);
                    }
                    if (typeof data.data.errorId != 'undefined') {
                        CommonServices.toasterInfo(data.data.errorMsg,'error')
                        return null;
                    } else {
                        return data.data;
                    }
                }).catch(function(data) {
                    CommonServices.waiting(false)
                    if (data.status == 401 ) {
                        $state.go('login');
                    };
                    return null;
                });
            },
            sendMobile: function(methodUrl, data, api) {
                return $http({
                    method: 'POST',
                    url: EshineSupplyAdmin.MobileBase + methodUrl,
                    data: data
                }).
                success(function(data, status, headers, config) {
                    return data;
                }).
                error(function(data, status, headers, config) {
                    return null;
                });
            },
            validMobile: function(methodUrl, data, api) {

                return $http({
                    method: 'POST',
                    url: EshineSupplyAdmin.MobileBase + methodUrl,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: data
                }).
                success(function(data, status, headers, config) {
                    return data;
                }).
                error(function(data, status, headers, config) {
                    return null;
                });
            },
            getHost: function() {
                return urlBase;
            },
            setUrlBase: function(url) {
                urlBase = url;
                return urlBase;
            }
        }
    });
})(window, window.angular);