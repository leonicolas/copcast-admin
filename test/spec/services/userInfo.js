/**
 * Created by brunosiqueira on 06/04/15.
 */
'use strict';

describe('Directives: UserInfo', function() {
  var $compile,
    $rootScope,
    loginService;

  // Load the myApp module, which contains the directive
  beforeEach(module('copcastAdminApp'));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_, _loginService_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    loginService = _loginService_
  }));

  it('returns the name of the current user', function() {
    loginService.getUserName = function(){return "userTestName";}
    // Compile a piece of HTML containing the directive
    var element = $compile("<user-name></user-name>")($rootScope);

    $rootScope.$digest();
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("userTestName");
  });
});
