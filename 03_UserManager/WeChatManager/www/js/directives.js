angular.module('starter.directives', [])
.directive('popupKeyboard', function($timeout,$parse) {
        return {
            restrict: 'AE',
            replace: false,
            link: function link(scope, element, attr) {
                 angular.element(element).css({
                        'transition':'transform 0.22s ease'
                    })

                window.addEventListener('native.keyboardshow', function(e) {
                    var transformY = -150;
                    //接受参数
                    var modelData = $parse(attr.popupKeyboard);
                    if(typeof modelData() == 'undefined'){
                        transformY = -150
                    }else{
                        transformY = modelData()
                    }
                    angular.element(element).css({
                        'transform':'translateY('+transformY+'px)',
                    })

                })

                // window.addEventListener('native.keyboardhide', function(e) {
                //     angular.element(element).css({
                //         'transform':'translateY(0px)',
                //     })

                // })
            }
        };
    })