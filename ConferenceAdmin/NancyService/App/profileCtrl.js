﻿(function () {
    'use strict';

    var controllerId = 'profileCtrl';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['$scope', '$http', 'restApi', '$window', '$location','$rootScope', profileCtrl]);

    function profileCtrl($scope, $http, restApi, $window, $location, $rootScope) {
        var vm = this;
        //Website content tabs
        vm.activate = activate;
        vm.generalInfo = false;
        vm.application = false;
        vm.submission = false;
        vm.authorization = false;
        vm.receipt = false;
        vm.evaluation = false;
        vm.isAdmin = false;
        
        

        // Functions
        vm.tabViewControl = _tabViewControl;
        activate();
        function activate() {
           _tabViewControl();
            
        }

        function _tabViewControl() {
            var list = JSON.parse($window.sessionStorage.getItem('claims'));
            if (list != null) {
                list.forEach(function (claim) {
                    if (claim.localeCompare('participant') == 0) {
                        vm.generalInfo = true;
                        vm.application = true;
                        vm.submission = true;
                        vm.receipt = true;
                        $rootScope.$emit('Loginpart');

                    }

                    if (claim.localeCompare('minor') == 0) {
                        vm.generalInfo = true;
                        vm.application = true;
                        vm.submission = false;
                        vm.authorization = true;
                        vm.receipt = true;
                        $rootScope.$emit('Login', event, vm.isAdmin);

                    }

                    if (claim.localeCompare('companion') == 0) {
                        vm.generalInfo = true;
                        vm.application = true;
                        $rootScope.$emit('Login', event, vm.isAdmin);

                    }
                    if (claim.localeCompare('Evaluator') == 0) {
                        vm.evaluation = true;
                    }
                    //Esto lo puedo quitar cuando se de unable al button de Profile.
                    if (claim.localeCompare('Finance') == 0 || claim.localeCompare('CommitteEvaluator') == 0 ||
                        claim.localeCompare('Master') == 0 || claim.localeCompare('Admin') == 0) {
                        vm.generalInfo = true;
                        vm.application = true;
                        vm.receipt = true;
                        vm.authorization = false;
                        vm.submission = true;
                        vm.isAdmin = true;
                        $rootScope.$emit('Login', event, vm.isAdmin);

                    }
                });



            }
            else {
                $location.path('/Home');
            }

        }

   






        }
    }
)();
