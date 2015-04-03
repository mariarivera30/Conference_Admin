﻿(function () {
    'use strict';

    var controllerId = 'layoutCtrl';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['$scope', '$rootScope', '$http', '$window', '$location', 'restApi',layoutCtrl]);

    function layoutCtrl($scope, $rootScope, $http, $window, $location, restApi) {

        var vm = this;

        vm.activate = activate;
        vm.title = 'layoutCtrl';
        vm.conferenceName;
        vm.conferenceLogo;

        //Functions
        vm.getGeneralInfo = _getGeneralInfo;
        vm.tabViewControl = _tabViewControl;
        vm.logout = _logout;

        _getGeneralInfo();
        activate();

        $rootScope.$on('Login', function (data) {
            vm.messageLogOut = $window.sessionStorage.getItem('email').substring(1, $window.sessionStorage.getItem('email').length - 1);
            vm.showProfile = true;
            vm.showAdminsitrator = data;
        });

        $rootScope.$on('Logout', function (data) {

            vm.showProfile = false;
            vm.messageLogOut = "";

        });

        $rootScope.$on('headerPage', function (event,hideAlias) {

            vm.conferenceName = hideAlias;
           

        });


        function activate() {

            _tabViewControl();
            if ($window.sessionStorage.length == 0) {
                vm.showProfile = false;
            }
            else {
                vm.showProfile = true;
                vm.messageLogOut = $window.sessionStorage.getItem('email').substring(1, $window.sessionStorage.getItem('email').length - 1);

            }

        }


        function _tabViewControl() {


            if ($window.sessionStorage.length != 0) {

                var list = JSON.parse(sessionStorage.getItem('claims'));
                list.forEach(function (claim) {

                    if (claim.localeCompare('admin') == 0 || claim.localeCompare('master') == 0 ||
                        claim.localeCompare('adminFinance') == 0 || claim.localeCompare('adminCommittee') == 0) {
                        vm.showAdminsitrator = true;
                    }

                });
            }
            else { vm.loged = false; }


        };

        function _logout() {
            $rootScope.$emit('Logout', { hideAlias: true });

            $window.sessionStorage.clear();
            vm.loged = false;
            $location.path('/Home');

        }

        $rootScope.$on('ConferenceAcronym', function (event, data) {
            vm.conferenceAcronym = data;
        });

        $rootScope.$on('ConferenceName', function (event, data) {
            vm.conferenceName = data;
        });

        $rootScope.$on('ConferenceLogo', function (event, data) {
            vm.conferenceLogo = data;
        });

        function _getGeneralInfo() {
            restApi.getGeneralInfo()
            .success(function (data, status, headers, config) {
                if (data != null) {
                    vm.conferenceAcronym = data.conferenceAcronym;
                    vm.conferenceName = data.conferenceName;
                    vm.conferenceLogo = data.logo;
                }
            })
            .error(function (error) {

            });
        }
    }
})();
