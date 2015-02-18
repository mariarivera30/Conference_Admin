﻿(function () {
    'use strict';
    //pa q no hayan global scope variable
    var id = 'app';

    // TODO: Inject modules as needed.
    var app = angular.module('app', [
        // Angular modules 
        'ngAnimate',        // animations
        'ngRoute',           // routing
        'ui.router'
        // Custom modules 

        // 3rd Party Modules
        
    ]);

    // Execute bootstrapping code and any dependencies.
    // TODO: inject services as needed.
    app.run(['$q', '$rootScope',
        function ($q, $rootScope) {

        }]);
    app.config(function ($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
       $urlRouterProvider.otherwise("/Home");
        //
        // Now set up the states
        $stateProvider
          .state('home', {
              url: "/Home",
              views: {
                  'banner': {
                      templateUrl: "views/banner.html"
                  },
                  'dynamic': {
                      templateUrl: "views/home.html"
                  }
                 
              }
          })
        .state('committee', {
            url: "/Committee",
            views: {
                'banner': {
                    templateUrl: "views/banner.html"
                },
                'dynamic': {
                    templateUrl: "views/committee.html"
                }
                
            }
        })
        .state('venue', {
            url: "/Venue",
            views: {
                'banner': {
                    templateUrl: "views/banner.html"
                },
                'dynamic': {
                    templateUrl: "views/venue.html"
                }

            }
        })
        .state('deadline', {
            url: "/Deadlines",
            views: {
                'banner': {
                    templateUrl: "views/banner.html"
                },
                'dynamic': {
                    templateUrl: "views/deadlines.html"
                }
                
            }
        })
        .state('registration', {
            url: "/Registration",
            views: {
                'banner': {
                    templateUrl: "views/banner.html"
                },
                'dynamic': {
                    templateUrl: "views/registration.html"
                }

            }
        })
        .state('sponsors', {
            url: "/Sponsors",
            views: {
                'banner': {
                    templateUrl: "views/banner.html"
                },
                'dynamic': {
                    templateUrl: "views/sponsors.html"
                }
                
            }
        })
        .state('contact', {
            url: "/Contact",
            views: {
                'banner': {
                    templateUrl: "views/banner.html"
                },
                'dynamic': {
                    templateUrl: "views/contact.html"
                }

            }
        })
        .state('schedule', {
            url: "/Schedule",
            views: {
                'banner': {
                    templateUrl: "views/banner.html"
                },
                'dynamic': {
                    templateUrl: "views/schedule.html"
                }
                
            }
        })
        .state('abstracts', {
            url: "/Abstracts",
            views: {
                'banner': {
                    templateUrl: "views/banner.html"
                },
                'dynamic': {
                    templateUrl: "views/abstracts.html"
                }
                
            }
        })
         .state('workshops', {
             url: "/Workshops",
             views: {
                 'banner': {
                     templateUrl: "views/banner.html"
                 },
                 'dynamic': {
                     templateUrl: "views/workshops.html"
                 }
                 
             }
         }
         ).state('papers', {
            url: "/Papers",
            views: {
                'banner': {
                    templateUrl: "views/banner.html"
                },
                'dynamic': {
                    templateUrl: "views/papers.html"
                }
                
            }
        })
         .state('register', {
             url: "/Register",
             views: {
                 'banner': {
                     templateUrl: "views/banner.html"
                 },
                 'dynamic': {
                     templateUrl: "views/register.html"
                 }

             }
         }
         ).state('login', {
             url: "/Login",
             views: {
                 'dynamic': {
                     templateUrl: "views/login.html"
                 },
                 'banner': {
                     templateUrl: "views/abstracts.html"
                 }

             }
         })
        .state('administrator', {
             url: "/Administrator",
             views: {
                 'dynamic': {
                     templateUrl: "views/admin.html"
                 },
                 'banner': {
                     templateUrl: "views/abstracts.html"
                 }

             }
         })
        .state('Admin_Information', { //Start Administrator Menu
            url: "/GeneralInformation",
            views: {
                'dynamic': {
                    templateUrl: "views/admin.html"
                },
                'banner': {
                    templateUrl: "views/abstracts.html"
                }

            }
        })
        .state('Admin_Registration', {
            url: "/RegistrationForm",
            views: {
                'dynamic': {
                    templateUrl: "views/admin.html"
                },
                'banner': {
                    templateUrl: "views/abstracts.html"
                }

            }
        })
        .state('Admin_Agenda', {
            url: "/Agenda",
            views: {
                'dynamic': {
                    templateUrl: "views/admin.html"
                },
                'banner': {
                    templateUrl: "views/abstracts.html"
                }

            }
        })
        .state('Admin_SponsorInformation', {
            url: "/SponsorInformation",
            views: {
                'dynamic': {
                    templateUrl: "views/admin.html"
                },
                'banner': {
                    templateUrl: "views/abstracts.html"
                }

            }
        })
        .state('Admin_ManageAdmins', {
            url: "/ManageAdministrators",
            views: {
                'dynamic': {
                    templateUrl: "views/admin.html"
                },
                'banner': {
                    templateUrl: "views/abstracts.html"
                }

            }
        })
        .state('Admin_Attendants', {
            url: "/ManageAttendants",
            views: {
                'dynamic': {
                    templateUrl: "views/admin.html"
                },
                'banner': {
                    templateUrl: "views/abstracts.html"
                }

            }
        })
        .state('Admin_Evaluators', {
            url: "/ManageEvaluators",
            views: {
                'dynamic': {
                    templateUrl: "views/admin.html"
                },
                'banner': {
                    templateUrl: "views/abstracts.html"
                }

            }
        })
        .state('Admin_Reports', {
            url: "/Reports",
            views: {
                'dynamic': {
                    templateUrl: "views/admin.html"
                },
                'banner': {
                    templateUrl: "views/abstracts.html"
                }

            }
        })
    });
})();