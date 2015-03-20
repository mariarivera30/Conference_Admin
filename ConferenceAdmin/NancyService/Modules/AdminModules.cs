﻿using Nancy;
using Nancy.Responses;
using NancyService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy.ModelBinding;
using Nancy.Authentication.Token;
using Nancy.Security;

namespace NancyService.Modules
{
    public class AdminModules : NancyModule
    {
        public AdminModules(ITokenizer tokenizer)
            : base("/admin")
        {
            AdminManager admin = new AdminManager();
            SponsorManager sponsorManager = new SponsorManager();
            List<sponsor> sponsorList = new List<sponsor>();
            RegistrationManager registration = new RegistrationManager();


/* ----- Sponsor -----*/

            Post["/addsponsor"] = parameters =>
            {
                var sponsor = this.Bind<NancyService.Modules.SponsorManager.SponsorQuery>();

                if (sponsorManager.addSponsor(sponsor))
                {
                    return HttpStatusCode.Created;
                }

                else
                {
                    return HttpStatusCode.Conflict;
                }
            };

            Get["/getSponsor"] = parameters =>
             {
                 try
                 {    
                     //this.RequiresAuthentication();
                     //this.RequiresClaims(new[] { "admin" });
                     return Response.AsJson(sponsorManager.getSponsorList());
                 }
                 catch { return null; }
             };

            Put["/updateSponsor"] = parameters =>
            {
                var sponsor = this.Bind<NancyService.Modules.SponsorManager.SponsorQuery>();

                if (sponsorManager.updateSponsor(sponsor))
                {
                    return HttpStatusCode.OK;
                }

                else
                {
                    return HttpStatusCode.Conflict;
                }
            };       

            Get["/getSponsorTypesList"] = parameters =>
            {
                try
                {
                    //this.RequiresAuthentication();
                    //this.RequiresClaims(new[] { "admin" });
                    return Response.AsJson(sponsorManager.getSponsorTypesList());
                }
                catch { return null; }
            };


/* ----- Topic -----*/

            Post["/addTopic"] = parameters =>
            {
                var topic = this.Bind<topiccategory>();
                return Response.AsJson(admin.addTopic(topic));
            };

            Get["/getTopic"] = parameters =>
            {
                
                return Response.AsJson(admin.getTopicList());
            };

            Delete["/deleteTopic/{topiccategoryID:int}"] = parameters =>
            {
                if (admin.deleteTopic(parameters.topiccategoryID))
                {
                    return HttpStatusCode.OK;
                }

                else
                {
                    return HttpStatusCode.Conflict;
                }
            };

            Put["/updateTopic"] = parameters =>
            {
                var topic = this.Bind<topiccategory>();

                if (admin.updateTopic(topic))
                {
                    return HttpStatusCode.OK;
                }

                else
                {
                    return HttpStatusCode.Conflict;
                }
            };


/* ----- Registration -----*/

            Get["/getRegistrations"] = parameters =>
            {
                List<RegisteredUser> list = registration.getRegistrationList();
                return Response.AsJson(list);
            };

            Put["/updateRegistration/{registrationID:int, firstname:string}"] = parameters =>
            {
                if (registration.updateRegistration(parameters.registrationID, parameters.firstname))
                {
                    return HttpStatusCode.OK;
                }

                else
                {
                    return HttpStatusCode.Conflict;
                }
            };

            Delete["/deleteRegistration/{registrationID:int}"] = parameters =>
            {
                if (registration.deleteRegistration(parameters.registrationID))
                {
                    return HttpStatusCode.OK;
                }

                else
                {
                    return HttpStatusCode.Conflict;
                }
            };

            Post["/addRegistration"] = parameters =>
            {
                var user = this.Bind<user>();
                var reg = this.Bind<registration>();
                return Response.AsJson(registration.addRegistration(reg: reg, user: user));
            };

        }
    }
}