'use strict';

/**
 * @ngdoc function
 * @name copcastAdminApp.controller:ModalvideoctrlCtrl
 * @description
 * # ModalvideoctrlCtrl
 * Controller of the copcastAdminApp
 */
angular.module('copcastAdminApp')
  .controller('ModalVideoCtrl', function ($scope, $modalInstance, user, peerManager) {
    $scope.user = user;

    peerManager.start();
    peerManager.peerInit(user.id, function(){
      $scope.stopStream(user.id);
    });

    $scope.ok = function () {
      peerManager.clearPeers();
      $modalInstance.close();

      $scope.activeStreams[user.id].modal = null;
    };
  });
