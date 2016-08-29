(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('widgetColorpicker', widgetColorpicker)
        .controller('WidgetSettingsCtrl-colorpicker', WidgetSettingsCtrlColorpicker)
        .config(function (WidgetsProvider) { 
            WidgetsProvider.$get().registerType({
                type: 'colorpicker',
                displayName: 'Color Picker',
                description: 'Displays an color picker'
            });
        });

    widgetColorpicker.$inject = ['$rootScope', '$uibModal', 'OHService'];
    function widgetColorpicker($rootScope, $modal, OHService) {
        // Usage: <widget-colorpicker ng-model="widget" />
        //
        // Creates: A colorpicker widget
        //
        var directive = {
            bindToController: true,
            controller: ColorpickerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'AE',
            templateUrl: 'app/widgets/colorpicker/colorpicker.tpl.html',
            scope: {
                ngModel: '='
            }
        };
        return directive;
        
        function link(scope, element, attrs) {
        }
    }
    ColorpickerController.$inject = ['$rootScope', '$scope', 'OHService'];
    function ColorpickerController ($rootScope, $scope, OHService) {
        var vm = this;
        this.widget = this.ngModel;


        function updateValue() {
            vm.value = OHService.getItem(vm.widget.item).state;
            if (vm.value === vm.widget.command) {
                vm.background = vm.widget.background_active;
                vm.foreground = vm.widget.foreground_active;
            } else {
                vm.background = vm.widget.background;
                vm.foreground = vm.widget.foreground;
            }
        }

        OHService.onUpdate($scope, vm.widget.item, function () {
            updateValue();
        });

    }


    // settings dialog
    WidgetSettingsCtrlColorpicker.$inject = ['$scope', '$timeout', '$rootScope', '$uibModalInstance', 'widget', 'OHService'];

    function WidgetSettingsCtrlColorpicker($scope, $timeout, $rootScope, $modalInstance, widget, OHService) {
        $scope.widget = widget;
        $scope.items = OHService.getItems();

        $scope.form = {
            name: widget.name,
            sizeX: widget.sizeX,
            sizeY: widget.sizeY,
            col: widget.col,
            row: widget.row,
            url: widget.url,
            iconset: widget.item
        };

        $scope.dismiss = function() {
            $modalInstance.dismiss();
        };

        $scope.remove = function() {
            $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
            $modalInstance.close();
        };

        $scope.submit = function() {
            angular.extend(widget, $scope.form);

            $modalInstance.close(widget);
        };

    }


})();