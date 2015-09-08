;(function(angular) {
  'use strict';

  var app = angular.module('copcastAdminApp');

  app.directive('player', function($sce, $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'app/history/player/player.html',
      replace: true,
      scope: {
        users: '=',
        src: '=',
        currentVideo: '=?',
        onChangeUser: '&',
        onPreviousVideo: '&',
        onNextVideo: '&'
      },
      link: function(scope, el) {
        var onChangeUser = scope.onChangeUser(); // Unwrap
        var onPreviousVideo = scope.onPreviousVideo(); // Unwrap
        var onNextVideo = scope.onNextVideo(); // Unwrap

        var $video = el.find('video');
        var video = $video[0];
        var lastSrc;

        scope.time = formatTime(0);

        /*
         * Watchers
         */
        scope.$watchCollection('users', function() {
          var hasUsers = scope.users && scope.users.length > 0;
          var user = hasUsers ? scope.users[0] : null;
          scope.setUser(user);
        });

        scope.$watch('src', function() {
          if(lastSrc === scope.src) {
            return;
          }
          formatTime(0);
          lastSrc = scope.src;
          video.src = scope.src ? scope.src : '';
          video.load();
        });

        /*
         * Scope functions
         */
        scope.setUser = function setUser(user) {
          scope.selectedUser = user;
          onChangeUser(user);
        };

        scope.playVideo = function playVideo() {
          if(video.src) {
            video.play();
          }
        }

        scope.previousVideo = function previousVideo() {
          onPreviousVideo();
        }

        scope.nextVideo = function nextVideo() {
          onNextVideo();
        }

        /*
         * Video functions
         */
        scope.trustSrc = function trustSrc(src) {
          return $sce.trustAsResourceUrl(src);
        };

        $video.on('timeupdate', function(event){
          onTrackedVideoFrame(this.currentTime, this.duration);
        });

        function onTrackedVideoFrame(currentTime, duration){
          $timeout(function() {
            scope.time = formatTime(currentTime);
          });
        }

        function formatTime(time) {
          var seconds = rightPad(time | 0, '00', 2);
          var minutes = rightPad(time / 60 | 0, '00', 2);
          var hours = rightPad(time / 60 / 60 | 0, '00', 2);
          return '<strong>' + hours + ':' + minutes + '</strong>:' + seconds;
        }

        function rightPad(str, padStr, size) {
          var strPad = padStr + str;
          return strPad.substr(strPad.length - size, size);
        }
      }
    };
  });
})(window.angular);
