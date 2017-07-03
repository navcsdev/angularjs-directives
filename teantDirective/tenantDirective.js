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
        $('#tenant-select').modal("show");
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

      init();

      function init() {
        TenantService.getTenants()
          .then(function (data) {
            $scope.tenants = data.tenants;
            if (_.isEqual(_.findIndex($scope.tenants, {id: TenantService.getTenantIdCurrent()}), -1)) {
              $scope.openModal();
            } else {
              $scope.showView = true;
              $scope.tenant.selectedTenant = _.find($scope.tenants, {id: TenantService.getTenantIdCurrent()});
            }
          });
      }
    }
  }
});
