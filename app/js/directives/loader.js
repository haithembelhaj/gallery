'use strict';

angular.module('App')
    .directive('loader', function($http){
        return {
            scope:{
                'progress': '=loader'
            },
            link: function(scope, el, attr){

                scope.$watch('progress', function(index){

                    el.css({
                        'width': scope.progress+'%'
                    })

                })
            }
        }
    });