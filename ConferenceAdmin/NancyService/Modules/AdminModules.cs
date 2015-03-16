﻿using Nancy;
using Nancy.Responses;
using NancyService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy.ModelBinding;

namespace NancyService.Modules
{
    public class AdminModules : NancyModule
    {
        public AdminModules(conferenceadminContext context)
            : base("/admin")
        {
            AdminManager admin = new AdminManager();
            List<sponsor> sponsorList = new List<sponsor>();
            
            Post["/addsponsor"] = parameters =>
            {
                var sponsor = this.Bind<sponsor>();

                if (admin.addSponsor(sponsor))
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
                
               
                return Response.AsJson(admin.getSponsorList());
                
            };

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
        }
    }
}