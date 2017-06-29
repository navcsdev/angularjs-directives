/**
 * Created by Nguyen Anh Vu on 6/20/2017.
 */
app.directive('tenant', function ($route, TenantService, $window) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: "layout/_tenant.html",
    scope: {
      showView: "="
    },
    link: function ($scope, $element, $attrs) {
      $scope.titleView = $attrs.titleView;
      $scope.tenant = {};
      $scope.closeModal = function () {
        $('#tenant-select').modal("hide");
        $('.modal-backdrop.fade.in').remove();
      };

      $scope.openModal = function () {
        if (!_.isEmpty(TenantService.getTenantIdCurrent()) && !_.isEmpty($scope.tenant.selectedTenant)) {
          $scope.tenant.selectedTenant.id = TenantService.getTenantIdCurrent();
        }
        $('#tenant-select').modal("show");
        console.log($scope);
      };

      $scope.choiceTenant = function () {
        TenantService.setTenantIdCurrent($scope.tenant.selectedTenant.id);
        $scope.closeModal();
        if (!$scope.showView) {
          $scope.showView = !$scope.showView;
          $route.reload();
          document.body.style.overflow = 'scroll';
        }
      };

      // TenantService.setTitleView = function (titleViewKey) {
      //   $scope.titleView = TranslateService.getTranslatedTextByLangKey(titleViewKey);
      // };

      init();

      function init() {
        TenantService.getTenants()
          .then(function (data) {
            $scope.tenants = data.tenants;
            if (_.isEqual(_.findIndex($scope.tenants, {id: TenantService.getTenantIdCurrent()}), -1)) {
              $scope.openModal();
            } else {
              $scope.showView = true;

              TenantService.getTenant(TenantService.getTenantIdCurrent())
                .then(function (data) {
                  $scope.tenant.selectedTenant = data.tenant;
                })
            }
          });
      }
    }
  }
});
