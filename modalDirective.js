(function () {
  'use strict';

  angular
    .module('myPortalApp')
    .directive('modal', Directive);

  function Directive(ModalService) {
    return {
      link: function (scope, element, attrs) {
        ModalService.Remove(attrs.id);
        // ensure id attribute exists
        if (!attrs.id) {
          console.error('modal must have an id');
          return;
        }

        // add self (this modal instance) to the modal service so it's accessible from controllers
        var modal = {
          id: attrs.id,
          open: Open,
          close: Close
        };
        ModalService.Add(modal);

        // open modal
        function Open() {
          $(element).modal("show");
        }

        // close modal
        function Close() {
          $(element).modal("hide");
        }
      }
    };
  }
})();