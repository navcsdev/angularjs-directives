/**
 * This is Portal app module
 */
var app = angular.module('myPortalApp', [ 'ngRoute', 'pascalprecht.translate', 'ui.bootstrap' ]);
app.config(['$translateProvider', '$routeProvider', function($translateProvider, $routeProvider) {
	// For Translate
    $translateProvider.useStaticFilesLoader({  //変換ファイルを読み込む設定。angular-translate-loader-static-filesが必要
        prefix: 'message/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('ja');
    $translateProvider.fallbackLanguage('ja');  //変換に失敗した場合のデフォルトlocaleの設定
    $translateProvider.useSanitizeValueStrategy('escape');

    // For Navigation
	$routeProvider
		.when('/', {
            templateUrl : 'pages/home.html',
            controller : 'homeCtrl'
        })
		.when('/networks', {
		    templateUrl : 'pages/network.html',
		    controller : "networkCtrl"
		})		
		.when('/traffic_applications', {
		    templateUrl : 'pages/trafficApplication.html',
		    controller : "trafficApplicationCtrl"
		})    	
		.when('/networks/:networkId', {
			templateUrl : 'pages/networkDetail.html',
			controller : "networkDetailCtrl"
		})			
		.when('/ibos', {
		    templateUrl : 'pages/ibo.html',
		    controller : "iboCtrl"      
		})
		.when('/policies', {
		    templateUrl : 'pages/policy.html',
		    controller : "policyCtrl"
		})	
        .when('/pathSelectionProfiles', {
            templateUrl : 'pages/pathSelectionProfiles.html',
            controller : "pathSelectionProfilesCtrl"
        })
		.when('/pathSelectionProfiles', {
		    templateUrl : 'pages/pathSelectionProfiles.html',
		    controller : "pathSelectionProfilesCtrl"
		})		
		.when('/hybridWanPolicies', {
		    templateUrl : 'pages/hybridWanPolicy.html',
		    controller : "hybridWanPolicyCtrl"
		})
		.when('/hybridWanPolicies/:hybridWanPolicyId', {
			templateUrl : 'pages/hybridWanPolicyDetail.html',
			controller : "hybridWanPolicyDetailCtrl"
		})
		.when('/hybridWanPolicyList', {
			templateUrl : 'pages/hybridWanPolicyList.html',
			controller : "hybridWanPolicyListCtrl"
		})
		.when('/hybridWanPolicyList/:hybridWanPoliciesId', {
			templateUrl : 'pages/trafficClassProfileMaps.html',
			controller : "trafficClassProfileMapsCtrl"
		})
 		.when('/trafficClass', {
		    templateUrl : 'pages/trafficClass.html',
		    controller : "trafficClassCtrl"
		})		
		.when('/eseDevices', {
		    templateUrl : 'pages/eseDevices.html',
		    controller : "eseDevicesCtrl"
		})
		.when('/sites', {
		    templateUrl : 'pages/sites.html',
		    controller : "sitesCtrl"
		})
		.when('/sites/:siteId', {
			templateUrl : 'pages/siteDetail.html',
			controller : "siteDetailCtrl"
		})
		.otherwise({
			redirectTo: 'index.html'
		});
}]);

// when location change but modal not close then clear and close all
app.run(function ($rootScope, ModalService) {
  $rootScope.$on('$locationChangeSuccess', function() {
    ModalService.Clear();
    angular.element('.modal-backdrop.fade.in').remove();
  });

});