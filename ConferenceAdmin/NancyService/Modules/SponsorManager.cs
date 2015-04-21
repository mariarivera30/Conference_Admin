﻿using NancyService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using Nancy;


namespace NancyService.Modules
{
    public class SponsorManager
    {
        public class addComplementary
        {
            public long sponsorID { get; set; }
            public string company { get; set; }
            public int quantity { get; set; }

        }
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
            public string logoName { get; set; }
            public string city { get; set; }
            public string line1 { get; set; }
            public string line2 { get; set; }
            public string state { get; set; }
            public string zipcode { get; set; }
            public string country { get; set; }
            public string transactionID { get; set; }
            public string method { get; set; }
            public string typeName { get; set; }
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

        public class ComplementaryQuery
        {
            public long complementarykeyID { get; set; }
            public long userID { get; set; }
            public string key { get; set; }
            public bool isUsed { get; set; }
            public long sponsorID { get; set; }
            public int quantity { get; set; }
            public string company { get; set; }
            public string name { get; set; }
        }

        public class SponsorPagingQuery
        {
            public int indexPage;
            public int maxIndex;
            public int rowCount;
            public List<SponsorQuery> results;

            public SponsorPagingQuery()
            {
                results = new List<SponsorQuery>();
            }
        }

        public class ComplimentaryPagingQuery
        {
            public int indexPage { get; set; }
            public int maxIndex { get; set; }
            public int rowCount { get; set; }
            public long sponsorID { get; set; }
            public int index { get; set; }
            public List<ComplementaryQuery> results { get; set; }

            public ComplimentaryPagingQuery()
            {
                results = new List<ComplementaryQuery>();
            }
        }

        //public static string getComplementaryPDF()
        //{

        //    var uploadDirectory = Path.Combine(pathProvider.GetRootPath(), "Content", "uploads");

        //    if (!Directory.Exists(uploadDirectory))
        //    {
        //        Directory.CreateDirectory(uploadDirectory);
        //    }

        //    foreach (var file in Request.Files)
        //    {
        //        var filename = Path.Combine(uploadDirectory, file.Name);
        //        using (FileStream fileStream = new FileStream(filename, FileMode.Create))
        //        {
        //            file.Value.CopyTo(fileStream);
        //        }
        //    }

        //    Document doc = new Document(iTextSharp.text.PageSize.LETTER, 10, 10, 42, 35);
        //    PdfWriter wri = PdfWriter.GetInstance(doc, new FileStream("Test.pdf", FileMode.Create));
        //    Paragraph par = new Paragraph("Test\n\n");
        //    doc.Add(par);
        //    doc.Close();

        //    System.IO.MemoryStream memoryStream = new System.IO.MemoryStream();


        //    PdfWriter writer = PdfWriter.GetInstance(doc, memoryStream);

        //    byte[] bytes = memoryStream.ToArray();

        //    String stringToStore = Convert.ToBase64String(bytes,Base64FormattingOptions.InsertLineBreaks);
        //    return stringToStore;
        //}

        public SponsorQuery addSponsorPaid(SponsorQuery x, PaymentXML p)
        {
            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    address address = new address();
                    address.city = x.city;
                    address.country = x.country;
                    address.state = x.state;
                    address.zipcode = x.zipcode;
                    address.line1 = x.line1;
                    address.line2 = x.line2;
                    context.addresses.Add(address);
                    context.SaveChanges();

                    payment payment2 = new payment();
                    payment2.paymentTypeID = 1;
                    payment2.deleted = false;
                    payment2.creationDate = DateTime.Now;
                    context.payments.Add(payment2);
                    context.SaveChanges();

                    paymentbill bill = new paymentbill();
                    bill.AmountPaid = (double)x.amount;
                    bill.deleted = false;
                    bill.ip = p.IP;
                    bill.quantity = p.quantity;
                    bill.paymentID = payment2.paymentID;
                    context.paymentbills.Add(bill);
                    context.SaveChanges();

                    sponsor sponsor = new sponsor();
                    sponsor.firstName = x.firstName;
                    sponsor.lastName = x.lastName;
                    sponsor.company = x.company;
                    sponsor.email = x.email;
                    sponsor.logo = x.logo;
                    sponsor.phone = x.phone;
                    sponsor.sponsorType = x.sponsorType;
                    sponsor.addressID = address.addressID;
                    sponsor.paymentID = payment2.paymentID;
                    sponsor.deleted = false;


                    context.sponsors.Add(sponsor);
                    context.SaveChanges();
                    x.sponsorID = sponsor.sponsorID;
                    x.paymentID = payment2.paymentID;
                    x.addressID = address.addressID;
                    return x;
                }


            }
            catch (Exception ex)
            {
                Console.Write("AdminManager.registrationSponsor error " + ex);
                return null;
            }

        }

        public SponsorQuery addSponsor(SponsorQuery x)
        {
            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    address address = new address();
                    address.city = x.city;
                    address.country = x.country;
                    address.state = x.state;
                    address.zipcode = x.zipcode;
                    address.line1 = x.line1;
                    address.line2 = x.line2;
                    context.addresses.Add(address);
                    context.SaveChanges();

                    payment payment2 = new payment();
                    payment2.paymentTypeID = 1;
                    context.payments.Add(payment2);
                    context.SaveChanges();

                    paymentbill bill = new paymentbill();
                    bill.AmountPaid = (double)x.amount;
                    bill.paymentID = payment2.paymentID;
                    bill.methodOfPayment = x.method;
                    bill.transactionid = x.transactionID;
                    context.paymentbills.Add(bill);
                    context.SaveChanges();


                    sponsor sponsor = new sponsor();
                    sponsor.firstName = x.firstName;
                    sponsor.lastName = x.lastName;
                    sponsor.company = x.company;
                    sponsor.email = x.email;
                    sponsor.logo = x.logo;
                    sponsor.phone = x.phone;
                    sponsor.sponsorType = x.sponsorType;
                    sponsor.addressID = address.addressID;
                    sponsor.paymentID = payment2.paymentID;
                    sponsor.deleted = false;


                    context.sponsors.Add(sponsor);
                    context.SaveChanges();
                    x.sponsorID = sponsor.sponsorID;
                    x.paymentID = payment2.paymentID;
                    x.addressID = address.addressID;
                    return x;
                }


            }
            catch (Exception ex)
            {
                Console.Write("AdminManager.addSponsor error " + ex);
                return null;
            }

        }

        public List<SponsorQuery> getSponsorList()
        {
            try
            {
                //string f = this.getComplementaryPDF();

                using (conferenceadminContext context = new conferenceadminContext())
                {


                    var sponsor = (from s in context.sponsors
                                   from type in context.sponsortypes
                                   from a in context.addresses
                                   from pay in context.paymentbills
                                   where (s.sponsorType == type.sponsortypeID) && (s.addressID == a.addressID) && (s.paymentID == pay.paymentID) && (s.deleted == false)
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
                                       transactionID = pay.transactionid,
                                       paymentID = (long)pay.paymentID,
                                       method = pay.methodOfPayment,
                                       typeName = type.name,

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

        public SponsorPagingQuery getSponsorList(int index)
        {
            SponsorPagingQuery page = new SponsorPagingQuery();

            try
            {
                //string f = this.getComplementaryPDF();

                using (conferenceadminContext context = new conferenceadminContext())
                {

                    int pageSize = 10;
                    var sponsor = (from s in context.sponsors
                                   from type in context.sponsortypes
                                   from a in context.addresses
                                   from pay in context.paymentbills
                                   where (s.sponsorType == type.sponsortypeID) && (s.addressID == a.addressID) && (s.paymentID == pay.paymentID) && (s.deleted == false)
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
                                       transactionID = pay.transactionid,
                                       paymentID = (long)pay.paymentID,
                                       method = pay.methodOfPayment,
                                       typeName = type.name,

                                   }).OrderBy(x => x.sponsorID);

                    page.rowCount = sponsor.Count();
                    if (page.rowCount > 0)
                    {
                        page.maxIndex = (int)Math.Ceiling(page.rowCount / (double)pageSize);
                        var sponsorList = sponsor.Skip(pageSize * index).Take(pageSize).ToList(); //Skip past rows and take new elements
                        page.results = sponsorList;
                    }

                    return page;
                }


            }
            catch (Exception ex)
            {
                Console.Write("SponsorManager.getSponsor(index) error " + ex);
                return null;
            }

        }

        public SponsorQuery getSponsorbyID(long x)
        {
            try
            {


                using (conferenceadminContext context = new conferenceadminContext())
                {


                    var sponsor = (from s in context.sponsors
                                   from type in context.sponsortypes
                                   from a in context.addresses
                                   from pay in context.paymentbills
                                   where (s.sponsorID == x && s.sponsorType == type.sponsortypeID) && (s.addressID == a.addressID) && (s.paymentID == pay.paymentID) && (s.deleted == false)
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
                                       transactionID = pay.transactionid,
                                       paymentID = (long)pay.paymentID,
                                       method = pay.methodOfPayment,
                                       typeName = type.name,

                                   }).FirstOrDefault();


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
                                 select new SponsorTypeQuery
                                 {
                                     sponsortypeID = s.sponsortypeID,
                                     name = s.name,
                                     amount = s.amount,
                                     benefit1 = s.benefit1,
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

        public SponsorQuery updateSponsor(SponsorQuery x)
        {
            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    var sponsor = (from s in context.sponsors
                                   where s.sponsorID == x.sponsorID
                                   select s).FirstOrDefault();
                    if (sponsor != null)
                    {
                        sponsor.firstName = x.firstName;
                        sponsor.lastName = x.lastName;
                        sponsor.company = x.company;
                        sponsor.email = x.email;
                        sponsor.logo = x.logo;
                        sponsor.phone = x.phone;
                        sponsor.sponsorType = x.sponsorType;

                        var payment = (from p in context.paymentbills
                                       where p.paymentID == x.paymentID
                                       select p).First();
                        payment.AmountPaid = x.amount;
                        payment.transactionid = x.transactionID;

                        var address = (from a in context.addresses
                                       where (a.addressID == x.addressID)
                                       select a).First();
                        address.city = x.city;
                        address.country = x.country;
                        address.state = x.state;
                        address.zipcode = x.zipcode;
                        address.line1 = x.line1;
                        address.line2 = x.line2;

                        context.SaveChanges();
                        x.addressID = address.addressID;
                        x.paymentID = payment.paymentID;

                    }

                    return x;
                }
            }
            catch (Exception ex)
            {
                Console.Write("SponsorManager.updateTopic error " + ex);
                return null;
            }
        }

        public bool deleteSponsor(long x)
        {
            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {

                    var sponsor = (from s in context.sponsors
                                   where s.sponsorID == x
                                   select s).FirstOrDefault();
                    if (sponsor != null)
                    {
                        sponsor.deleted = true;
                        context.SaveChanges();
                    }
                    return true;
                }
            }
            catch (Exception ex)
            {
                Console.Write("SponsorManager.deleteSponsor error " + ex);
                return false;
            }
        }

        public List<ComplementaryQuery> getComplementaryList()
        {
            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {

                    var keysUsed = (from s in context.complementarykeys
                                    from pay in context.paymentcomplementaries
                                    from k in context.payments
                                    from r in context.registrations
                                    from u in context.users
                                    where s.isUsed == true && s.deleted == false && pay.paymentID == k.paymentID &&
                                    s.complementarykeyID == pay.complementaryKeyID && r.paymentID == k.paymentID &&
                                    r.userID == u.userID
                                    select new ComplementaryQuery
                                    {
                                        complementarykeyID = s.complementarykeyID,
                                        key = s.key,
                                        isUsed = (bool)s.isUsed,
                                        sponsorID = s.sponsorID,
                                        userID = r.userID,
                                        name = u.firstName + " " + u.lastName,



                                    }).ToList();

                    var keysUnused = (from s in context.complementarykeys
                                      where s.isUsed == false && s.deleted == false
                                      select new ComplementaryQuery
                                      {
                                          complementarykeyID = s.complementarykeyID,
                                          key = s.key,
                                          isUsed = (bool)s.isUsed,
                                          userID = 0,
                                          name = "",
                                      }).ToList();

                    List<ComplementaryQuery> allKeys = (List<ComplementaryQuery>)keysUnused.Concat(keysUnused);

                    return allKeys;
                }

            }
            catch (Exception ex)
            {
                Console.Write("SponsorManager.getSponsorType error " + ex);
                return null;
            }

        }

        public List<ComplementaryQuery> getSponsorComplentaryList(long id)
        {
            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {

                    var keysUsed = (from s in context.complementarykeys
                                    from pay in context.paymentcomplementaries
                                    from k in context.payments
                                    from r in context.registrations
                                    from u in context.users
                                    where s.sponsorID == id && s.isUsed == true && s.deleted == false && pay.paymentID == k.paymentID &&
                                    s.complementarykeyID == pay.complementaryKeyID && r.paymentID == k.paymentID &&
                                    r.userID == u.userID
                                    select new ComplementaryQuery
                                    {
                                        complementarykeyID = s.complementarykeyID,
                                        key = s.key,
                                        isUsed = (bool)s.isUsed,
                                        sponsorID = s.sponsorID,
                                        userID = r.userID,
                                        name = u.firstName + " " + u.lastName,



                                    }).ToList();

                    var keysUnused = (from s in context.complementarykeys
                                      where s.sponsorID == id && s.isUsed == false && s.deleted == false
                                      select new ComplementaryQuery
                                      {
                                          complementarykeyID = s.complementarykeyID,
                                          key = s.key,
                                          isUsed = (bool)s.isUsed,
                                          userID = 0,
                                          name = "",
                                      }).ToList();

                    var list = keysUnused.Concat(keysUsed).ToList();
                    return list;



                }

            }
            catch (Exception ex)
            {
                Console.Write("SponsorManager.getSponsorComplentaryList error " + ex);
                return null;
            }

        }

        public ComplimentaryPagingQuery getSponsorComplentaryList(ComplimentaryPagingQuery page)
        {
            try
            {
                int pageSize = 10;
                using (conferenceadminContext context = new conferenceadminContext())
                {

                    var keys = (from s in context.complementarykeys
                                from pay in context.paymentcomplementaries
                                from k in context.payments
                                from r in context.registrations
                                from u in context.users
                                where s.sponsorID == page.sponsorID && s.isUsed == true && s.deleted == false && pay.paymentID == k.paymentID &&
                                s.complementarykeyID == pay.complementaryKeyID && r.paymentID == k.paymentID &&
                                r.userID == u.userID
                                select new ComplementaryQuery
                                {
                                    complementarykeyID = s.complementarykeyID,
                                    key = s.key,
                                    isUsed = (bool)s.isUsed,
                                    sponsorID = s.sponsorID,
                                    userID = r.userID,
                                    name = u.firstName + " " + u.lastName,
                                }).Concat((from s in context.complementarykeys
                                           where s.sponsorID == page.sponsorID && s.isUsed == false && s.deleted == false
                                           select new ComplementaryQuery
                                           {
                                               complementarykeyID = s.complementarykeyID,
                                               key = s.key,
                                               isUsed = (bool)s.isUsed,
                                               sponsorID = s.sponsorID,
                                               userID = 0,
                                               name = "",
                                           })).OrderBy(x => x.complementarykeyID);

                    page.rowCount = keys.Count();
                    if (page.rowCount > 0)
                    {
                        page.maxIndex = (int)Math.Ceiling(page.rowCount / (double)pageSize);
                        var keyList = keys.Skip(pageSize * page.index).Take(pageSize).ToList(); //Skip past rows and take new elements
                        page.results = keyList;
                    }

                    return page;
                }

            }
            catch (Exception ex)
            {
                Console.Write("SponsorManager.getSponsorComplentaryList(index) error " + ex);
                return null;
            }

        }

        public bool deleteComplementary(long x)
        {
            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    //delete si nadie ha pagado con el hasta este momento. 
                    var key = (from s in context.complementarykeys
                               where s.complementarykeyID == x && s.isUsed == false
                               select s).FirstOrDefault();

                    key.deleted = true;
                    context.SaveChanges();
                    return true;

                }
            }
            catch (Exception ex)
            {
                Console.Write("SponsorManager.Deletekey error " + ex);
                return false;
            }


        }

        public ComplimentaryPagingQuery deleteComplementarySponsor(long x)
        {
            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    //delete si nadie ha pagado con el hasta este momento. 
                    context.complementarykeys
                               .Where(s => s.sponsorID == x && s.isUsed == false)
                               .ToList().ForEach(s => { s.deleted = true; });

                    context.SaveChanges();

                    ComplimentaryPagingQuery page = new ComplimentaryPagingQuery();
                    page.index = 0;
                    page.sponsorID = x;
                    return getSponsorComplentaryList(page);
                }
            }
            catch (Exception ex)
            {
                Console.Write("SponsorManager.Deletekey error " + ex);
                return null;
            }


        }

        public ComplimentaryPagingQuery addKeysTo(addComplementary obj)
        {
            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {


                    for (int i = 0; i < obj.quantity; i++)
                    {
                        complementarykey c = new complementarykey();
                        c.sponsorID = obj.sponsorID;
                        c.isUsed = false;
                        c.deleted = false;
                        c.key = "CCWIC-" + obj.company + "-" + GenerateComplementary(30);
                        context.complementarykeys.Add(c);
                    }

                    context.SaveChanges();

                    ComplimentaryPagingQuery page = new ComplimentaryPagingQuery();
                    page.index = 0;
                    page.sponsorID = obj.sponsorID;
                    //return getSponsorComplentaryList(obj.sponsorID);
                    return getSponsorComplentaryList(page);
                }
            }
            catch (Exception ex)
            {
                Console.Write("SponsorManager.CoplementarykeyGenerator error " + ex);
                return null;
            }


        }
        public string checkEmail(string email)
        {
            using (conferenceadminContext context = new conferenceadminContext())
            {

                try
                {
                    var s = (from m in context.sponsors
                             where (m.email.Equals(email) && m.deleted == false)
                             select m).FirstOrDefault();
                    if (s != null)
                    {
                        //Check if have at leas one paymentBill completed
                        if (s.payment.paymentbills.Count > 0)
                        {
                            foreach (paymentbill p in s.payment.paymentbills)
                            {
                                if (p.completed)
                                    return "paid";//at leas one payment completed
                            }
                        }
                        return "noPaid";

                    }

                    return "newSponsor";

                }
                catch (Exception ex)
                {
                    Console.Write("Sponsorcheckemail error " + ex);
                    return null;
                }
            }

        }

       

        private string GenerateComplementary(int length)
        {
            return Guid.NewGuid().ToString().Substring(0, 9);
        }
    }
}

