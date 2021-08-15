(function(angular) {
  'use strict';
  
  function ProfileController($scope) {
    $scope.$root.$on('authed', function(obj){
      $scope.user = $scope.$root.user;
      $scope.$apply();
    })

    $scope.$root.$on('posts', function(obj){
      $scope.posts = $scope.$root.posts;
      $scope.$apply();
    })    

    // $scope.$root.$on('balanced', function(obj){
    //   $scope.user.balance = $scope.$root.user.balance;
    //   $scope.$apply();
    // })

    $scope.$root.$on('logout', function(obj){
      $scope.user = null;
      $scope.$apply();
    })
  }

  angular.module('SENDTEXT').component('profile', {
    templateUrl: './client-app/components/profile/profile.html',
    controller: ProfileController
  });
  
})(window.angular);

/*
Copyright 2019 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/