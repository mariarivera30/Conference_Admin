﻿using NancyService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NancyService.Modules
{
    public class SponsorManager
    {
        public class SponsorQuery
        {
            public long sponsorID { get; set; }
            public int sponsorType { get; set; }
            public long addressID { get; set; }
            public double amount { get; set; }
            public string firstName { get; set; }
            public string lastName { get; set; }
            public string title { get; set; }
            public string company { get; set; }
            public string phone { get; set; }
            public string email { get; set; }
            public string logo { get; set; }
            public string city { get; set; }
            public string line1 { get; set; }
            public string line2 { get; set; }
            public string state { get; set; }
            public string zipcode { get; set; }
            public string country { get; set; }
            public string card { get; set; }
            public string method { get; set; }
            public long paymentID { get; set; }
        }
        public class SponsorTypeQuery
        {
            public int sponsortypeID { get; set; }
            public string name { get; set; }
            public double amount { get; set; }
            public string benefit1 { get; set; }
            public string benefit2 { get; set; }
            public string benefit3 { get; set; }
            public string benefit4 { get; set; }
            public string benefit5 { get; set; }
            public string benefit6 { get; set; }
            public string benefit7 { get; set; }
            public string benefit8 { get; set; }
            public string benefit9 { get; set; }
            public string benefit10 { get; set; }
        }

        public SponsorManager()
        {

        }

        public bool addSponsor(SponsorQuery x)
        {
            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    //sponsor sponsor = new sponsor();
                    //sponsor.firstName = x.firstName;
                    //sponsor.lastName = x.lastName;
                    //sponsor.company = x.company;
                    //sponsor.email = x.email;
                    //sponsor.logo = x.logo;
                    //sponsor.phone = x.phone;
                    //sponsor.sponsorType = x.sponsorType;

                    //payment payment2 = new payment();
                    //paymentbill bill = new paymentbill();
                    //bill.AmountPaid =x.amount;
                    //bill.creditCardNumber = x.card;
                    //payment2.paymentTypeID = 1;
                    //payment2.paymentbills.Add(bill);



                    //address address = new address();
                    //address.city = x.city;
                    //address.country = x.country;
                    //address.state = x.state;
                    //address.zipcode = x.zipcode;
                    //address.line1 = x.line1;
                    //address.line2 = x.line2;
                    //context.sponsors.Add(sponsor);

                    //address.sponsors.Add(sponsor);
                    //payment2.sponsors.Add(sponsor);
                    //context.addresses.Add(address);
                    //context.payments.Add(payment2);

                    //context.SaveChanges();
                   
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.Write("AdminManager.addSponsor error " + ex);
                return false;
            }

        }
       

        public List<SponsorQuery> getSponsorList()
        {
            try
            {
               
                using (conferenceadminContext context = new conferenceadminContext())
                {
                   
                    
                    var sponsor = (from s in context.sponsors
                                   from type in context.sponsortypes
                                   from a in context.addresses
                                   from pay in context.paymentbills
                                   where (s.sponsorType == type.sponsortypeID) &&(s.addressID == a.addressID) && (s.paymentID == pay.paymentID)                              
                                   select new SponsorQuery
                               {
                                   sponsorID = s.sponsorID,
                                   firstName = s.firstName,
                                   lastName = s.lastName,
                                   company = s.company,
                                   title = s.title,
                                   logo = s.logo,
                                   phone = s.phone,
                                   email = s.email,
                                   addressID = (long)s.addressID,
                                   city = a.city,
                                   line1 = a.line1,
                                   line2 = a.line2,
                                   state = a.state,
                                   zipcode = a.zipcode,
                                   country = a.country,
                                   sponsorType = s.sponsorType,
                                   amount = pay.AmountPaid,
                                   card =pay.creditCardNumber,
                                   paymentID = (long)pay.paymentID,
                                   method =pay.methodOfPayment,
                                   
                               }).ToList();
                                  
                  
                    return sponsor;
                }


            }
            catch (Exception ex)
            {
                Console.Write("SponsorManager.getSponsor error " + ex);
                return null;
            }

        }
        public List<SponsorTypeQuery> getSponsorTypesList()
        {
            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    var types = (from s in context.sponsortypes
                                 select new SponsorTypeQuery {sponsortypeID = s.sponsortypeID, name =s.name, amount = s.amount, benefit1=s.benefit1,
                                                              benefit2 = s.benefit2,
                                                              benefit3 = s.benefit3,
                                                              benefit4 = s.benefit4,
                                                              benefit5 = s.benefit5,
                                                              benefit6 = s.benefit6,
                                                              benefit7 = s.benefit7,
                                                              benefit8 = s.benefit8,
                                                              benefit9 = s.benefit9,
                                                              benefit10 = s.benefit10,

                                 }).ToList();
                    return types;
                }

            }
            catch (Exception ex)
            {
                Console.Write("SponsorManager.getSponsorType error " + ex);
                return null;
            }

        }

        public bool deleteSponsor(int id)
        {
            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    var topic = (from s in context.topiccategories
                                 where s.topiccategoryID == id
                                 select s).First();
                    context.topiccategories.Remove(topic);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.Write("AdminManager.deleteTopic error " + ex);
                return false;
            }
        }

        public bool updateSponsor(SponsorQuery x)
        {
            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    var sponsor = (from s in context.sponsors
                                 where s.sponsorID == x.sponsorID
                                 select s).First();
                    sponsor.firstName = x.firstName;
                    sponsor.lastName = x.lastName;
                    sponsor.company = x.company;
                    sponsor.email = x.email;
                    sponsor.logo = x.logo;
                    sponsor.phone = x.phone;
                    sponsor.sponsorType = x.sponsorType;

                    var payment = (from p in context.paymentbills
                                   where (long)p.paymentID == x.paymentID
                                   select p).First();
                    payment.AmountPaid = x.amount;
                    payment.creditCardNumber = x.card;

                    var address = (from a in context.addresses
                                   where (a.addressID == x.addressID)
                                   select a).First();
                    address.city = x.city;
                    address.country = x.country;
                    address.state = x.state;
                    address.zipcode = x.zipcode;
                    address.line1 =x.line1;
                    address.line2 =x.line2;
                

                    context.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.Write("SponsorManager.updateTopic error " + ex);
                return false;
            }
        }
    }
}
