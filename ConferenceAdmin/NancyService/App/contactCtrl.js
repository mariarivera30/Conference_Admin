﻿(function () {
    'use strict';

    var controllerId = 'contactCtrl';

    // TODO: replace app with your module name
    angular.module('app').controller(controllerId,
        ['$scope', '$http', 'restApi', contactCtrl]);

    function contactCtrl($scope, $http, restApi) {
        var vm = this;
        vm.activate = activate;
        vm.title = 'contactCtrl';

        //Admin
        vm.temp;
        vm.contactName;
        vm.contactPhone;
        vm.contactEmail;
        vm.contactAdditionalInfo;
        vm.loading=false;

        //Interface
        vm.icontactName;
        vm.icontactPhone;
        vm.icontactEmail;
        vm.icontactAdditionalInfo;

        //Functions
        vm.getContact = _getContact;
        vm.saveContact = _saveContact;
        vm.reset = _reset;

        _getContact();

        function activate() {

        }

        function _reset() {
            vm.contactName = vm.temp.contactName;
            vm.contactPhone = vm.temp.contactPhone;
            vm.contactEmail = vm.temp.contactEmail;
            vm.contactAdditionalInfo = vm.temp.contactAdditionalInfo;
        }

        function _getContact() {
            restApi.getContact()
            .success(function (data, status, headers, config) {
                if (data != null) {
                    vm.temp = data;
                    vm.icontactName = data.contactName;
                    vm.icontactPhone = data.contactPhone;
                    vm.icontactEmail = data.contactEmail;
                    vm.icontactAdditionalInfo = data.contactAdditionalInfo;

                    vm.contactName = data.contactName;
                    vm.contactPhone = data.contactPhone;
                    vm.contactEmail = data.contactEmail;
                    vm.contactAdditionalInfo = data.contactAdditionalInfo;

                    load();
                }
            })

            .error(function (error) {

            });
        }

        function _saveContact() {
            vm.loading = true;
            var newContact = {
                contactName: vm.contactName,
                contactPhone: vm.contactPhone,
                contactEmail: vm.contactEmail,
                contactAdditionalInfo: vm.contactAdditionalInfo,
            }
            restApi.saveContact(newContact)
            .success(function (data, status, headers, config) {
                if (data != null) {
                    vm.temp.contactName = newContact.contactName;
                    vm.temp.contactPhone = newContact.contactPhone;
                    vm.temp.contactEmail = newContact.contactEmail;
                    vm.temp.contactAdditionalInfo = newContact.contactAdditionalInfo;
                    vm.loading = false;
                    $("#updateConfirm").modal('show');
                }
            })
            .error(function (error) {
                vm.loading = false;
                $("#updateError").modal('show');
            });
        }

        //Avoid flashing when page loads
        var load = function () {
            document.getElementById("body").style.visibility = "visible";
        };

    }
})();