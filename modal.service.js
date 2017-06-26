(function () {
  'use strict';

  angular
    .module('myPortalApp')
    .factory('ModalService', Service);

  function Service() {
    var modals = []; // array of modals on the page
    var service = {};

    service.Add = Add;
    service.Remove = Remove;
    service.Open = Open;
    service.Close = Close;
    service.Clear = Clear;

    return service;

    function Add(modal) {
      // add modal to array of active modals
      if (_.isEqual(_.findIndex(modals, {id: modal.id}), -1)) {
        modals.push(modal);
      }
    }

    function Remove(id) {
      // remove modal from array of active modals
      var modalToRemove = _.find(modals, {id: id});
      modals = _.without(modals, modalToRemove);
    }

    function Open(id) {
      // open modal specified by id
      var modal = _.find(modals, {id: id});
      modal.open();
    }

    function Close(id) {
      // close modal specified by id
      var modal = _.find(modals, {id: id});
      modal.close();
    }

    function Clear() {
      modals = [];
    }
  }

})();
