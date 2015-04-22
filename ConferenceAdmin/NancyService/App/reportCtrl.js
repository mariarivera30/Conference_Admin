﻿(function () {
    'use strict';

    var controllerId = 'reportCtrl';
    angular.module('app').controller(controllerId,
        ['$scope', '$http', 'restApi', reportCtrl]);

    function reportCtrl($scope, $http, restApi) {
        //Variables
        var vm = this;
        vm.activate = activate;
        vm.title = 'reportCtrl'; 

        //Report Variables
        vm.copy = [];
        vm.totalAmount;
        var fontSize = 8, height = 0, doc;
        vm.downloadLoading = false;

        //Registration Payments- Variables (Paging)
        vm.registrationList = []; //Results to Display
        vm.rindex = 0;  //Page index [Goes from 0 to rmaxIndex-1]
        vm.rmaxIndex = 0;   //Max page number
        vm.rfirstPage = true;

        //Sponsor Payments- Variables (Paging)
        vm.sponsorList = []; //Results to Display
        vm.sindex = 0;  //Page index [Goes from 0 to smaxIndex-1]
        vm.smaxIndex = 0;   //Max page number
        vm.sfirstPage = true;

        //Search List Variables (Paging)
        vm.searchList = [];
        vm.searchIndex = 0;  //Page index [Goes from 0 to pmaxIndex-1]
        vm.searchMaxIndex = 0;   //Max page number
        vm.criteria;
        vm.showSearch = false;
        vm.showResults = false;

        // Functions- General
        vm.downloadBillReport = _downloadBillReport;
        vm.load = _load;

        //Functions- Registration (Paging)
        vm.getRegistrationListFromIndex = _getRegistrationListFromIndex;
        vm.previousRegistration = _previousRegistration;
        vm.nextRegistration = _nextRegistration;
        vm.getFirstRegistrationPage = _getFirstRegistrationPage;
        vm.getLastRegistrationPage = _getLastRegistrationPage;

        //Functions- Sponsors (Paging)
        vm.getSponsorListFromIndex = _getSponsorListFromIndex;
        vm.previousSponsor = _previousSponsor;
        vm.nextSponsor = _nextSponsor;
        vm.getFirstSponsorPage = _getFirstSponsorPage;
        vm.getLastSponsorPage = _getLastSponsorPage;

        //Functions- Search (Paging)
        vm.search = _search;
        vm.previousSearch = _previousSearch;
        vm.nextSearch = _nextSearch;
        vm.getFirstSearch = _getFirstSearch;
        vm.getLastSearch = _getLastSearch;
        vm.back = _back;

        activate();

        function activate() {
            _getRegistrationListFromIndex(vm.rindex);
            _getSponsorListFromIndex(vm.sindex);
            _load();
        }

        //Registration Methods
        function _getRegistrationListFromIndex(index) {
            restApi.getRegistrationPaymentsFromIndex(index)
            .success(function (data, status, headers, config) {
                vm.rmaxIndex = data.maxIndex;
                if (vm.rmaxIndex == 0) {
                    vm.rindex = 0;
                    vm.registrationList = [];
                }
                else if (vm.rindex >= vm.rmaxIndex) {
                    vm.rindex = vm.rmaxIndex - 1;
                    _getRegistrationListFromIndex(vm.rindex);
                }
                else {
                    vm.registrationList = data.results;
                }

                /*if (vm.rfirstPage) {
                    vm.rfirstPage = false;
                    vm.rmaxIndex = data.maxIndex;
                }*/
            })
           .error(function (data, status, headers, config) {
           });
        }

        function _nextRegistration() {
            if (vm.rindex < vm.rmaxIndex-1) {
                vm.rindex += 1;
                _getRegistrationListFromIndex(vm.rindex);
            }
        }

        function _previousRegistration() {
            if (vm.rindex > 0) {
                vm.rindex -= 1;
                _getRegistrationListFromIndex(vm.rindex);
            }
        }

        function _getFirstRegistrationPage() {
            vm.rindex = 0;
            _getRegistrationListFromIndex(vm.rindex);
        }

        function _getLastRegistrationPage() {
            vm.rindex = vm.rmaxIndex - 1;
            _getRegistrationListFromIndex(vm.rindex);
        }

        //Sponsor Methods
        function _getSponsorListFromIndex(index) {
            restApi.getSponsorPaymentsFromIndex(index)
            .success(function (data, status, headers, config) {
                vm.smaxIndex = data.maxIndex;
                if (vm.smaxIndex == 0) {
                    vm.sindex = 0;
                    vm.sponsorList = [];
                }
                else if (vm.sindex >= vm.smaxIndex) {
                    vm.sindex = vm.smaxIndex - 1;
                    _getSponsorListFromIndex(vm.sindex);
                }
                else {
                    vm.sponsorList = data.results;
                }
                /*if (vm.sfirstPage) {
                    vm.sfirstPage = false;
                    vm.smaxIndex = data.maxIndex;
                }*/
            })
           .error(function (data, status, headers, config) {
           });
        }

        function _nextSponsor() {
            if (vm.sindex < vm.smaxIndex - 1) {
                vm.sindex += 1;
                _getSponsorListFromIndex(vm.sindex);
            }
        }

        function _previousSponsor() {
            if (vm.sindex > 0) {
                vm.sindex -= 1;
                _getSponsorListFromIndex(vm.sindex);
            }
        }

        function _getFirstSponsorPage() {
            vm.sindex = 0;
            _getSponsorListFromIndex(vm.sindex);
        }

        function _getLastSponsorPage() {
            vm.sindex = vm.smaxIndex - 1;
            _getSponsorListFromIndex(vm.sindex);
        }

        //Report Method
        function _downloadBillReport() {
            vm.downloadLoading = true;
            restApi.getBillReport(0)
            .success(function (data, status, headers, config) {
                var report = data.results;
                var maxIndex = data.maxIndex;
                var i;
                for (i = 1; i < maxIndex; i++) {
                    restApi.getBillReport(i)
                    .success(function (data, status, headers, config) {                   
                        report = report.concat(data.results);
                    })
                    .error(function (data, status, headers, config) {
                    });
                }

                vm.totalAmount = data.totalAmount;
                if (report != null) {
                    report.forEach(function (pay, index) {
                        vm.copy[index] = {
                            "Transaction ID": pay.transactionID,
                            "Date": pay.paymentDate,
                            "Name": pay.name,
                            "Affiliation": pay.affiliation,
                            "User Type": pay.userType,
                            "Amount Paid ($)": pay.amountPaid,
                            "Payment Method": pay.paymentMethod
                        }
                    });
                }

                doc = new jsPDF('p', 'pt', 'ledger', true);
                doc.setFont("times", "normal");
                doc.setFontSize(fontSize);
                doc.text(30, 20, "Caribbean Celebration of Women in Computing- Bill Report");
                var d = new Date();
                var n = d.toDateString();
                doc.text(425, 20, n);
                height = doc.drawTable(vm.copy, {
                    xstart: 50,
                    ystart: 50,
                    tablestart: 50,
                    marginright: 40,
                    xOffset: 10,
                    yOffset: 10
                });
                doc.text(50, height + 20, "Total Amount: $" + vm.totalAmount);
                vm.downloadLoading = false;
                doc.save('billreport.pdf');
                vm.copy = [];
            })
           .error(function (data, status, headers, config) {
               vm.downloadLoading = false;
           });
        }

        //Search Methods
        function _search(index) {
            if (vm.criteria != "" && vm.criteria != null) {
                var info = { index: index, criteria: vm.criteria };
                restApi.searchReport(info).
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

        //Load
        function _load() {
            document.getElementById("loading-icon").style.visibility = "hidden";
            document.getElementById("body").style.visibility = "visible";
        }
    }
})();