﻿(function () {
    'use strict';

    var controllerId = 'registrationCtrl';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['$scope', '$http', 'restApi', registrationCtrl]);

    function registrationCtrl($scope, $http, restApi) {
        var vm = this;
        vm.activate = activate;
        //add registration fields        
        vm.title = 'registrationCtrl';
        vm.userID;
        vm.paymentID;
        vm.date1;
        vm.date2;
        vm.date3;

        vm.registrationsList = {};
        vm.userTypesList = {};
        vm.firstname;
        vm.lastname;
        vm.usertypeid;
        vm.affiliationName;
        vm.title;
        vm.registrationstatus;
        vm.hasapplied;
        vm.acceptancestatus;

        vm.currentid;
        vm.editfirstname;


        // Functions
        vm.activate = activate;
        vm.addRegistration = _addRegistration;
        vm.getRegistrations = _getRegistrations;
        vm.updateRegistration = _updateRegistration;
        vm.deleteRegistration = _deleteRegistration;
        vm.selectedRegistrationUpdate = _selectedRegistrationUpdate;
        vm.selectedRegistrationDelete = _selectedRegistrationDelete;
        vm.getUserTypes = _getUserTypes;
        vm.clear = clear;


        _getRegistrations();
        _getUserTypes();



        // Functions
        function activate() {
            firstname = vm.firstname;
            lastname = vm.lastname;
            usertypeid = vm.usertypeid;
            affiliationName = vm.affiliationName;
            registrationstatus = vm.registrationstatus;
            hasapplied = vm.hasapplied;
            acceptancestatus = vm.acceptancestatus;
            date1 = vm.date1;
            date2 = vm.date2;
            date3 = vm.date3;
        }

        function clear() {
            vm.firstname = "";
            vm.lastname = "";
            vm.usertypeid = 0;
            vm.affiliationName = "";
            vm.title = "";
            vm.registrationstatus = "";
            vm.hasapplied = false;
            vm.acceptancestatus = "";
            date1 = false;
            date2 = false;
            date3 = false;
        }

        function _addRegistration() {
            var userTypeName = vm.usertypeid.userTypeName;
            vm.usertypeid = vm.usertypeid.userTypeID;            
            if (vm.firstname != null && vm.lastname != null && vm.usertypeid != 0 && vm.affiliationName != null && !(vm.date1 == false && vm.date2 == false) ) {
                restApi.postNewRegistration(vm)
                    .success(function (data, status, headers, config) {
                        vm.usertypeid = userTypeName;
                        vm.registrationsList.push(vm);
                    })

                    .error(function (error) {
                        alert("Failed to add Registration.");
                    });
            }
            else {
                alert("There is information missing.");
            }
            activate();
        }


        function _getRegistrations() {
            restApi.getRegistrations().
                   success(function (data, status, headers, config) {
                       // this callback will be called asynchronously
                       // when the response is available
                       vm.registrationsList = data;
                   }).
                   error(function (data, status, headers, config) {
                       // called asynchronously if an error occurs
                       // or server returns response with an error status.
                       vm.registrationsList = data;
                   });
        }



        function _selectedRegistrationUpdate(id, firstname, lastname, usertypeid, affiliation, date1, date2, date3) {
            vm.currentid = id;
            vm.editfirstname = firstname;
        }

        function _updateRegistration() {
            if (vm.currentid != undefined && vm.editfirstname != null && vm.editfirstname != "") {
                var registration = { registrationID: vm.currentid, firstname: vm.editfirstname }
                restApi.updateRegistration(registration)
                .success(function (data, status, headers, config) {
                    vm.registrationsList.forEach(function (registration, index) {
                        if (registration.registrationID == vm.currentid) {
                            registration.firstname = vm.editfirstname;
                        }
                    });
                })
                .error(function (data, status, headers, config) {
                });
            }
            else {
                alert("You must provide a valid name.");
            }
            clear();
        }



        function _selectedRegistrationDelete(id) {
            vm.currentid = id;
        }

        function _deleteRegistration() {
            if (vm.currentid != undefined) {
                restApi.deleteRegistration(vm.currentid)
                .success(function (data, status, headers, config) {
                    vm.registrationsList.forEach(function (registration, index) {
                        if (registration.registrationID == vm.currentid) {
                            vm.registrationsList.splice(index, 1);
                        }
                    });
                })
                .error(function (data, status, headers, config) {
                });
            }
        }


        function _getUserTypes() {
            restApi.getUserTypes().
                   success(function (data, status, headers, config) {
                       vm.userTypesList = data;
                   }).
                   error(function (data, status, headers, config) {
                       vm.userTypesList = data;
                   });
        }

    }
})();
