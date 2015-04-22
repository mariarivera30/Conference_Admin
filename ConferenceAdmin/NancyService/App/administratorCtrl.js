﻿(function () {
    'use strict';

    var controllerId = 'administratorCtrl';
    angular.module('app').controller(controllerId,
        ['$scope', '$http', 'restApi', administratorCtrl]);

    function administratorCtrl($scope, $http, restApi) {
        //Variables
        var vm = this;
        vm.activate = activate;
        vm.title = 'administratorCtrl';
        vm.privilegeList = [];
        vm.userID;
        vm.email;
        vm.firstName;
        vm.lastName;
        vm.privilegeID;
        vm.oldPrivilegeID;
        vm.privilegeDelID;
        vm.search;

        //Variables (Paging)
        vm.adminList = []; 
        vm.index = 0;  //Page index [Goes from 0 to rmaxIndex-1]
        vm.maxIndex = 0;   //Max page number

        //Search List Variables (Paging)
        vm.searchList = [];
        vm.searchIndex = 0;  //Page index [Goes from 0 to pmaxIndex-1]
        vm.searchMaxIndex = 0;   //Max page number
        vm.criteria;
        vm.showSearch = false;
        vm.showResults = false;

        // Functions
        vm.clear = _clear;
        vm.next = _next;
        vm.addAdmin = _addAdmin;
        vm.editAdmin = _editAdmin;
        vm.deleteAdmin = _deleteAdmin;
        vm.selectedAdminEdit = _selectedAdminEdit;
        vm.selectedAdminDelete = _selectedAdminDelete;

        //Functions- Administrator (Paging)
        vm.getAdmin = _getAdmin;
        vm.previousAdmin = _previousAdmin;
        vm.nextAdmin = _nextAdmin;
        vm.getFirstAdminPage = _getFirstAdminPage;
        vm.getLastAdminPage = _getLastAdminPage;

        //Functions- Search (Paging)
        vm.search = _search;
        vm.previousSearch = _previousSearch;
        vm.nextSearch = _nextSearch;
        vm.getFirstSearch = _getFirstSearch;
        vm.getLastSearch = _getLastSearch;
        vm.back = _back;


        //Get list of administrators and privileges
        _getAdmin(vm.index);
        _getPrivilegeList();

        function activate() {

        }

        //Clear AddAdmin Modal Input Fields
        function _clear() {
            vm.email = "";
            vm.firstName = "";
            vm.lastName = "";
            var x = document.getElementsByName("privilegesAdd");
            var i;
            for (i = 0; i < x.length; i++) {
                if (x[i].type == "radio") {
                    x[i].checked = false;
                }
            }
        }

        //Every time a user selects 'Edit' the controller saves the UserID and privilegeID of the administrator selected
        function _selectedAdminEdit(id, privilege) {
            vm.userID = id;
            vm.oldPrivilegeID = privilege;

            //For the editAdmin Modal, pre-select the radio button corresponding to the privilege of the administrator selected
            var x = document.getElementById(privilege);
            if (x.type == "radio") {
                x.checked = true;
            }

            //.blur();
        }

        //Every time a user selects 'Delete' the controller saves the UserID and privilegeID of the administrator selected
        function _selectedAdminDelete(id, privilegeID) {
            vm.userID = id;
            vm.privilegeDelID = privilegeID;
        }

        function _getAdmin(index) {
            restApi.getAdministrators(index)
            .success(function (data, status, headers, config) {
                vm.maxIndex = data.maxIndex;
                if (vm.maxIndex == 0) {
                    vm.index = 0;
                    vm.adminList = [];
                }
                else if (vm.index >= vm.maxIndex) {
                    vm.index = vm.maxIndex - 1;
                    _getAdmin(vm.index);
                }
                else {
                    vm.adminList = data.results;
                }
                load();
            })
           .error(function (data, status, headers, config) {
               vm.adminList = data;
           });
        }

        function _nextAdmin() {
            if (vm.index < vm.maxIndex - 1) {
                vm.index += 1;
                _getAdmin(vm.index);
            }
        }

        function _previousAdmin() {
            if (vm.index > 0) {
                vm.index -= 1;
                _getAdmin(vm.index);
            }
        }

        function _getFirstAdminPage() {
            vm.index = 0;
            _getAdmin(vm.index);
        }

        function _getLastAdminPage() {
            vm.index = vm.maxIndex - 1;
            _getAdmin(vm.index);
        }

        function _getPrivilegeList() {
            restApi.getPrivilegesList()
            .success(function (data, status, headers, config) {
                vm.privilegeList = data;
            })
           .error(function (data, status, headers, config) {
               vm.privilegeList = data;
           });
        }

        //This function checks if there is a user in the system with the email that has been provided
        function _next() {
            if (vm.email != undefined && vm.email != "" && vm.privilegeID != undefined && vm.privilegeID != "") {
                restApi.getNewAdmin(vm.email)
                    .success(function (data, status, headers, config) {
                        if (data) {
                            //Email found: add administrator to the list
                            _addAdmin();
                        }
                        else {
                            //Email not found: Show modal displaying error
                            $("#addError2").modal('show');
                        }
                    })

                    .error(function (error) {
                        $("#addError3").modal('show');
                    });
            }
        }
        
        function _addAdmin() {

            if (vm.email != undefined && vm.email != "" && vm.privilegeID != undefined && vm.privilegeID != "") {
                var info = {
                    firstName: vm.firstName,
                    lastName: vm.lastName,
                    email: vm.email,
                    privilegeID: vm.privilegeID,
                }
                restApi.postNewAdmin(info)
                    .success(function (data, status, headers, config) {
                        if (data.email != null) {
                            vm.adminList.push(data);
                            $("#addAdmin").modal('hide');
                            _clear();
                            $("#addConfirm").modal('show');
                        }
                        else {
                            //User has already another privilege assigned
                            $("#addAdmin").modal('hide');
                            _clear();
                            $("#addError").modal('show');
                        }
                    })

                    .error(function (error) {
                        $("#addError3").modal('show');
                    });
            }
        }

        function _editAdmin() {
            if (vm.userID != undefined && vm.userID != "" && vm.privilegeID != undefined && vm.privilegeDelID != "" && vm.oldPrivilegeID != undefined && vm.oldPrivilegeID != "") {
                restApi.editAdmin(vm.userID, vm.privilegeID, vm.oldPrivilegeID)
                .success(function (data, status, headers, config) {
                    if (data != null) {
                        vm.adminList.forEach(function (admin, index) {
                            if (admin.userID == vm.userID) {
                                admin.privilege = data;
                                admin.privilegeID = vm.privilegeID;
                            }
                        });
                        $("#editConfirm").modal('show');
                    }
                })
                .error(function (data, status, headers, config) {
                    $("#editError").modal('show');
                });
            }
        }

        function _deleteAdmin() {
            if (vm.userID != undefined && vm.userID != "" && vm.privilegeDelID != undefined && vm.privilegeDelID != "") {
                restApi.deleteAdmin(vm.userID, vm.privilegeDelID)
                .success(function (data, status, headers, config) {
                    if (data) {
                        vm.adminList.forEach(function (admin, index) {
                            if (admin.userID == vm.userID) {
                                vm.adminList.splice(index, 1);
                            }
                        });
                        $("#deleteConfirm").modal('show');
                    }
                })
                .error(function (data, status, headers, config) {
                    $("#deleteError").modal('show');
                });
            }
        }

        //Search Methods
        function _search(index) {
            if (vm.criteria != "" && vm.criteria != null) {
                var info = { index: index, criteria: vm.criteria };
                restApi.searchAdmin(info).
                       success(function (data, status, headers, config) {
                           vm.showSearch = true;
                           vm.searchMaxIndex = data.maxIndex;
                           if (vm.searchMaxIndex == 0) {
                               vm.searchIndex = 0;
                               vm.searchResults = [];
                               vm.showResults = false;
                           }
                           else if (vm.searchIndex >= vm.searchMaxIndex) {
                               vm.searchIndex = vm.searchMaxIndex - 1;
                               _search(vm.searchIndex);
                           }
                           else {
                               vm.showResults = true;
                               vm.searchResults = data.results;
                           }
                       }).
                       error(function (data, status, headers, config) {
                       });
            }
        }

        function _nextSearch() {
            if (vm.searchIndex < vm.searchMaxIndex - 1) {
                vm.searchIndex += 1;
                _search(vm.searchIndex);
            }
        }

        function _previousSearch() {
            if (vm.searchIndex > 0) {
                vm.searchIndex -= 1;
                _search(vm.searchIndex);
            }
        }

        function _getFirstSearch() {
            vm.searchIndex = 0;
            _search(vm.searchIndex);
        }

        function _getLastSearch() {
            vm.searchIndex = vm.searchMaxIndex - 1;
            _search(vm.searchIndex);
        }

        function _back() {
            vm.criteria = "";
            vm.searchIndex = 0;
            vm.searchResults = [];
            vm.showSearch = false;
            vm.showResults = false;
        }

        //Avoid flashing when page loads
        var load = function () {
            document.getElementById("loading-icon").style.visibility = "hidden";
            document.getElementById("body").style.visibility = "visible";
        };
    }
})();