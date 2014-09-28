'use strict';

angular.module('App')
    .directive('slider', function($http){
       return {
           scope:{
               'actualScene': '=slider',
               'scenes': '='
           },
           link: function(scope, el, attr){

               function slideTo(index){
                   el.css({
                       'transform': 'translate3d('+scope.ratio * -index+'%, 0, 0)'
                   })
               }


               scope.$watch('scenes', function(scenes){

                   if(scenes && scenes.length){
                       scope.ratio = (100 / scenes.length);

                       el.css({
                           'width': (100 * scenes.length)+'%'
                       });


                       angular.forEach(document.querySelectorAll('.scene'), function(scene){
                          scene.style.width =  scope.ratio+'%'
                       });
                   }


               })


               scope.$watch('actualScene', function(index){
                   console.log('here', scope.actualScene);
                   slideTo(scope.actualScene);
               })
           }
       }
    });