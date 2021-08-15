(function(angular) {
  'use strict';
  
  function PostListController($scope) {
    $scope.$ctrl = this;

    $scope.$root.$on('authed', function(obj){
      $scope.user = $scope.$root.user;
      $scope.getPosts();
      $scope.$apply();
    })

    $scope.$root.$on('authorposted', function(obj){
      console.log("here 2")
      $scope.getPosts();
    })

    $scope.$root.$on('logout', function(obj){
      $scope.user = null;
      $scope.userpostslist = [];
      $scope.$apply();
    })    

    // $scope.check = function() {
    //     if ($scope.timeout)
    //       return false

    //     if (!$scope.$root.user) {
    //       $scope.$root.message = "No Authed User!"
    //       $scope.$root.$broadcast('message');
    //       return false;
    //     }

    //     if (!$scope.name || $scope.name.length <= 3) {
    //       $scope.$root.message = "No name specified!"
    //       $scope.$root.$broadcast('message');
    //       return false;
    //     }

    //     $scope.timeout = setTimeout(function(){
    //       var xhttp = new XMLHttpRequest();
    //       xhttp.onreadystatechange = function() {
    //           if (this.readyState == 4 && this.status == 200) {
    //             let data = JSON.parse(this.response);
    //             if (!data.status && data.length) {
    //               $scope.list = data;
    //               clearTimeout($scope.timeout);
    //             }
    //             $scope.timeout = null;
    //             $scope.$apply();
    //           }
    //       };
    //       xhttp.open("GET", "/api/user/list?name=" + $scope.name + "&sessionId=" + $scope.$root.user.sessionId, true);
    //       xhttp.send();
    //     }, 500) 
    // };

    // $scope.click = function(e) {
    //   $scope.user = e.currentTarget.attributes['data-id'].value;
    //   $scope.getPosts();
    // }

    // $scope.send = function() { 
    //     if (!$scope.post || $scope.post.length == 0) {
    //       $scope.$root.message = "No text specified!"
    //       $scope.$root.$broadcast('message');
    //     }

    //     var xhttp = new XMLHttpRequest();
    //     xhttp.onreadystatechange = function() {
    //         if (this.readyState == 4 && this.status == 200) {      
    //           // $scope.$root.user.balance = $scope.$root.user.balance*1 - $scope.post*1;
    //           // $scope.$root.$broadcast('balanced');        
    //           $scope.$root.message = "Sended";
    //           $scope.$root.$broadcast('message');              
    //         }
    //     };
    //     xhttp.open("GET", "/api/post/add?user=" + $scope.user + "&post=" + $scope.post + "&sessionId=" + $scope.$root.user.sessionId, true);
    //     xhttp.send();
    // }

    $scope.getPosts = function() { 
        // if (!$scope.post || $scope.post.length == 0) {
        //   $scope.$root.message = "No text specified!"
        //   $scope.$root.$broadcast('message');
        // }

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {      
              // $scope.$root.user.balance = $scope.$root.user.balance*1 - $scope.post*1;
              // $scope.$root.$broadcast('balanced');        
              
              // $scope.$root.message = "Sended";
              // $scope.$root.$broadcast('message'); 

              let data = JSON.parse(this.response);
              if (!data.status && data.length) {
                $scope.userpostslist = data;
              } else {
                $scope.userpostslist = [];
              }

              $scope.$apply();
            }
        };
        //console.log($scope.user);
        xhttp.open("GET", "/api/post/list?user=" + $scope.user.name + "&sessionId=" + $scope.$root.user.sessionId, true);
        xhttp.send();
    }
  }

  angular.module('SENDTEXT').component('postlist', {
    templateUrl: './client-app/components/postlist/postlist.html',
    controller: PostListController,
  });
  
})(window.angular);

/*
Copyright 2019 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/