var app = angular.module('my-app', ['ui.router'])
.config([                      // added this config block
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl: '/search.html',
      controller: 'MainCtrl'
    });

  $urlRouterProvider.otherwise('home');
}])
.controller('MainCtrl', [
  '$scope',
  '$http',
  function($scope, $http){

    $scope.posts = [];

    $scope.addPost = function(){
      if(!$scope.title || !$scope.description) { return; }
      $http.post('/posts',
                  {
                    title: $scope.title,
                    description: $scope.description
                  })
                  .success(function(data)
                    {
                      $scope.posts.push(data);
                    });
      //console.log("from inside: ", $scope.postsArr);
      $scope.title = '';
      $scope.description = '';
    };

    $scope.searchPosts = function(){
      console.log("in search posts");
      $http.get('/posts')
          .success( function(data)
                    {
                      angular.copy(data, $scope.posts);
                    }
                  );
        };

    $scope.searchPost = function(title){
      console.log("angular: in searh posts by title");
      console.log("agnular: title ", title);
        $http.get('/posts/'+title)
        .success( function(data){
            angular.copy(data, $scope.posts);
            return data;
        });
      };

  }

]);