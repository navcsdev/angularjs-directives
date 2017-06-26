/**
 * Created by Nguyen Anh Vu on 6/14/2017.
 */
app.factory('TabService', function () {
    var dynamicTabs = [];

    function add(dynamicTab) {
        // add modal to array of active modals
        if (_.isEqual(_.findIndex(dynamicTabs, {id: dynamicTab.id}), -1)) {
            dynamicTabs.push(dynamicTab);
        }
    }

    function remove(id) {
        // remove modal from array of active modals
        var dynamicTabToRemove = _.find(dynamicTabs, { id: id });
        dynamicTabs = _.without(dynamicTabs, dynamicTabToRemove);
    }

    function get(id) {
        // open modal specified by id
        return _.find(dynamicTabs, { id: id });
    }

    function showAll() {
        return dynamicTabs;
    }

    function clear() {
      dynamicTabs = [];
    }

    return {
        get: get,
        add: add,
        remove: remove,
        showAll: showAll,
        clear: clear,
    };
});
