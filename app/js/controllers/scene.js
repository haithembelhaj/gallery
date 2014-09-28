'use strict';

angular.module('App')
    .controller('Scene', function($http, $timeout, $interval, $scope){

        var scope = this;
        var slideTimeout;
        var slideProgress;
        var WAITTIME = 2000;
        var STEPS = 10;

        scope.scenes = [];
        scope.actualScene = 0;
        scope.progress = 0;

        scope.goTo = _.debounce(function(index){

            if(index >= 0 && index < scope.scenes.length){
                scope.actualScene = index;
                scope.progress = 0;
                $scope.$apply();
            }

        }, 150);

        scope.waitAndGo = function(index){

            slideTimeout = $timeout(function(){
                scope.goTo(index);
            }, WAITTIME);

            slideProgress = $interval(function(){
                scope.progress += 100 / STEPS;
            }, WAITTIME / STEPS, STEPS)
        };

        scope.next = function(){
            if(scope.actualScene < scope.scenes.length - 1)
                scope.waitAndGo(scope.actualScene + 1);
        };

        scope.prev = function(){
            if(scope.actualScene > 0)
                scope.waitAndGo(scope.actualScene - 1);
        };

        scope.cancel = function(){

            scope.progress = 0;

            if(slideTimeout)
                $timeout.cancel(slideTimeout);

            if(slideProgress)
                $interval.cancel(slideProgress);
        };

        $http.get('/data/scenes.json').success(function(scenes){
            scope.scenes = scenes;
        })


    });