/**
 * Created by Nguyen Anh Vu on 6/14/2017.
 */
app.directive('dynamictab', function ($compile, TabService) {
  return {
    restrict: 'E',
    templateUrl: '../../portal/app/layout/_dynamicTab.html',
    transclude: true,
    replace: false,
    scope: true,
    link: function (scope, el, attrs, ctrl, transclude) {
      TabService.remove(attrs.id);

      var tabActiveIdx = -1;
      var tabs = [];
      var $tabHeaderTemplate = {};
      var $tabContentTemplate = {};

      var dynamicTab = {
        createTabs: createTabs,
        fillData: fillData,
        getData: getData,
        id: attrs.id,
      };

      TabService.add(dynamicTab);

      transclude(function (trancludeEl) {
        $tabHeaderTemplate = $(_.find(trancludeEl, {nodeName: 'LI'}));
        $tabContentTemplate = $(_.find(trancludeEl, {nodeName: 'DIV'}));
      });

      el.find('.tab-add').on('click', function ($event) {
        clickAddTab($event);
      });

      scope.addTab = function () {
        var tabActive = _.find(tabs, {idx: tabActiveIdx});

        if (!_.isEmpty(tabActive)) {
          tabActive.tabHeader.removeClass('active');
          tabActive.tabContent.removeClass('in active');
        }

        tabActiveIdx += 1;

        var tabNextHeader = $tabHeaderTemplate.clone();
        tabNextHeader.find('span.title').text('Item ' + (tabActiveIdx + 1));
        tabNextHeader.attr('data-idx', tabActiveIdx);
        tabNextHeader.on('click', function ($event) {
          clickTabHeader($event);
        });
        tabNextHeader.find('.tab-remove').on('click', function ($event) {
          clickTabRemove($event);
        });
        el.find('.tab-add').on('click', function ($event) {
          clickAddTab($event);
        });

        var tabNextContent = $tabContentTemplate.clone();

        el.find('.nav.nav-tabs').append(tabNextHeader);
        el.find('.tab-content').append(tabNextContent);

        tabs.push({tabHeader: tabNextHeader, tabContent: tabNextContent, idx: tabActiveIdx});

        activeTab(tabActiveIdx);
      };

      function activeTab(idx) {
        if (idx < 0) {
          tabActiveIdx = -1;
        } else {
          var tab = _.find(tabs, {idx: idx});
          tab.tabHeader.addClass('active');
          tab.tabContent.addClass('in active');
          tabActiveIdx = idx;
        }
      }

      function createTabs(numberTabs) {
        clearAll();
        if (numberTabs === 0) {
          numberTabs = 1;
        }
        for (var i = 0; i < numberTabs; i++) {
          var $tabHeader = $tabHeaderTemplate.clone();
          var $tabContent = $tabContentTemplate.clone();
          $tabHeader.find('span.title').text('Item ' + (i + 1));
          $tabHeader.on('click', function ($event) {
            clickTabHeader($event);
          });
          $tabHeader.find('.tab-remove').on('click', function ($event) {
            clickTabRemove($event);
          });

          $tabHeader.attr('data-idx', i);
          el.find('ul.nav.nav-tabs').append($tabHeader);
          el.find('div.tab-content').append($tabContent);
          tabs.push({tabHeader: $tabHeader, tabContent: $tabContent, idx: i});
        }

        activeTab(numberTabs - 1);
      }

      function fillData(data) {
        if (_.isArray(data)) {
          el.find('form').each(function (idx, formEle) {
            $(formEle).deserialize(data[idx]);
          });
        }
      }

      function getData() {
        return el.find('form').serializeArray();
      }

      function clearAll() {
        _.forEach(tabs, function (tab) {
          tab.tabHeader.remove();
          tab.tabContent.remove();
        });
        tabs = [];
      }

      function clickTabHeader($event) {
        var tabActive = _.find(tabs, {idx: tabActiveIdx});
        tabActive.tabHeader.removeClass('active');
        tabActive.tabContent.removeClass('in active');

        activeTab(parseInt($($event.currentTarget).attr('data-idx')));
      }

      function clickTabRemove($event) {
        $event.stopPropagation();

        var tabRemoveIdx = parseInt($($event.currentTarget).closest('.tab-header').attr('data-idx'));
        var tabRemove = _.find(tabs, {idx: tabRemoveIdx});
        tabRemove.tabHeader.remove();
        tabRemove.tabContent.remove();

        _.pullAt(tabs, tabRemoveIdx);

        for (var i = tabRemoveIdx; i < tabs.length; i++) {
          tabs[i].tabHeader.find('span.title').text('Item ' + (i + 1));
          tabs[i].tabHeader.attr('data-idx', i);
          tabs[i].idx = i;
        }


        if (tabRemoveIdx === tabActiveIdx) {
          activeTab(tabActiveIdx - 1);
        } else {
          tabActiveIdx = tabs.length - 1;
        }
      }

      function clickAddTab($event) {
        var tabActive = _.find(tabs, {idx: tabActiveIdx});

        if (!_.isEmpty(tabActive)) {
          tabActive.tabHeader.removeClass('active');
          tabActive.tabContent.removeClass('in active');
        }

        tabActiveIdx += 1;

        var tabNextHeader = $tabHeaderTemplate.clone();
        tabNextHeader.find('span.title').text('Item ' + (tabActiveIdx + 1));
        tabNextHeader.attr('data-idx', tabActiveIdx);
        tabNextHeader.on('click', function ($event) {
          clickTabHeader($event);
        });
        tabNextHeader.find('.tab-remove').on('click', function ($event) {
          clickTabRemove($event);
        });

        var tabNextContent = $tabContentTemplate.clone();

        el.find('.nav.nav-tabs').append(tabNextHeader);
        el.find('.tab-content').append(tabNextContent);

        tabs.push({tabHeader: tabNextHeader, tabContent: tabNextContent, idx: tabActiveIdx});

        activeTab(tabActiveIdx);
      }

    }

  }
});
