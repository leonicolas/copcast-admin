'use strict';

describe('Service: UserService', function () {
  var ServerUrl;
  var httpBackend;
  var userService;

  beforeEach(module('copcastAdminApp'));

  beforeEach(inject(function (_userService_, $httpBackend, _ServerUrl_) {
    userService = _userService_;
    httpBackend = $httpBackend;
    ServerUrl = _ServerUrl_;
  }));

  describe('when get the active users from backend', function () {
    // given
    beforeEach(function () {
      httpBackend
        .whenGET(ServerUrl + '/users')
        .respond(angular.copy(activeUsers));
    });

    it('should return the list of active users', function () {
      var expectedUsers = angular.copy(activeUsers);
      expectedUsers[0].profilePicture = ServerUrl + '/pictures/u74353/original/show';

      userService
        .listUsers()
        .then(function(users) {
          expect(users).toEqual(expectedUsers);
        });

      httpBackend.flush();
    });
  });

  describe('when get the user videos from backend', function () {
    // given
    beforeEach(function () {
      httpBackend
        .whenGET(ServerUrl + '/users/u74353/videos/from/2015-05-25')
        .respond(angular.copy(user1Videos));

      httpBackend
        .whenGET(ServerUrl + '/users/u54510/videos/from/2015-05-24')
        .respond(angular.copy(user2Videos));
    });

    it('should return the user videos', function () {
      var expectedUser1Videos = angular.copy(user1Videos);
      expectedUser1Videos[0].src = ServerUrl + '/users/u74353/videos/v3933.mp4';
      expectedUser1Videos[1].src = ServerUrl + '/users/u74353/videos/v5394.mp4';

      var expectedUser2Videos = angular.copy(user2Videos);
      expectedUser2Videos[0].src = ServerUrl + '/users/u54510/videos/v6545.mp4';
      expectedUser2Videos[1].src = ServerUrl + '/users/u54510/videos/v0367.mp4';

      userService
        .getUserVideos('u74353', moment('2015-05-25'))
        .then(function(videos) {
          expect(videos).toEqual(expectedUser1Videos);
        });

      userService
        .getUserVideos('u54510', moment('2015-05-24'))
        .then(function(videos) {
          expect(videos).toEqual(expectedUser2Videos);
        });

      httpBackend.flush();
    });
  });
});