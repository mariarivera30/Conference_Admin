﻿using NancyService.Models;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Windows.Forms;
using System.Threading;

namespace NancyService.Modules
{
    public class ReportManager
    {
        public ReportManager()
        {

        }

        public ReportQuery getBillReportList(int index)
        {
            ReportQuery b = new ReportQuery();
            String csv = "";

            try
            {
                int pageSize = 10;
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    var payments = (from s in context.registrations
                                    from bill in context.paymentbills
                                    where (s.payment.deleted != true && s.paymentID == bill.paymentID && bill.completed != false)
                                    select new BillQuery
                                        {
                                            transactionID = bill.transactionid,
                                            paymentDate = bill.payment.creationDate.ToString(),
                                            amountPaid = bill.AmountPaid,
                                            paymentMethod = bill.methodOfPayment == "default" ? "" : bill.methodOfPayment,
                                            name = s.user.firstName + " " + s.user.lastName,
                                            email = s.user.membership.email == "default" ? "" : s.user.membership.email,
                                            affiliation = s.user.affiliationName == "Paradigm Innovation" ? "" : s.user.affiliationName,
                                            userType = s.user.usertype.userTypeName,
                                            phoneNumber = bill.telephone == "default" ? "" : bill.telephone,
                                            address1 = bill.address.line1 == "default" ? "" : bill.address.line1,
                                            address2 = bill.address.line2 == "default" ? "" : bill.address.line2,
                                            city = bill.address.city == "default" ? "" : bill.address.city,
                                            state = bill.address.state == "default" ? "" : bill.address.state,
                                            country = bill.address.country == "default" ? "" : bill.address.country,
                                            zipCode = bill.address.zipcode == "default" ? "" : bill.address.zipcode

                                        }).Concat((from s in context.registrations
                                                   from bill in context.paymentcomplementaries
                                                   where (s.payment.deleted != true && s.paymentID == bill.paymentID)
                                                   select new BillQuery
                                                        {
                                                            transactionID = "N/A",
                                                            paymentDate = bill.payment.creationDate.ToString(),
                                                            amountPaid = 0,
                                                            paymentMethod = "Key:" + bill.complementarykey.key,
                                                            name = s.user.firstName + " " + s.user.lastName,
                                                            email = s.user.membership.email == "default" ? "" : s.user.membership.email,
                                                            affiliation = s.user.affiliationName == "Paradigm Innovation" ? "" : s.user.affiliationName,
                                                            userType = s.user.usertype.userTypeName,
                                                            phoneNumber = s.user.phone == "default" ? "" : s.user.phone,
                                                            address1 = s.user.address.line1 == "default" ? "" : s.user.address.line1,
                                                            address2 = s.user.address.line2 == "default" ? "" : s.user.address.line2,
                                                            city = s.user.address.city == "default" ? "" : s.user.address.city,
                                                            state = s.user.address.state == "default" ? "" : s.user.address.state,
                                                            country = s.user.address.country == "default" ? "" : s.user.address.country,
                                                            zipCode = s.user.address.zipcode == "default" ? "" : s.user.address.zipcode

                                                        })).Concat((from s in context.sponsor2
                                                                    from bill in context.paymentbills
                                                                    where (s.payment.deleted != true && s.paymentID == bill.paymentID && s.paymentID != 1 && bill.completed != false && s.active != false)
                                                                    select new BillQuery
                                                                    {
                                                                         transactionID = bill.transactionid,
                                                                         paymentDate = bill.payment.creationDate.ToString(),
                                                                         amountPaid = bill.AmountPaid,
                                                                         paymentMethod = bill.methodOfPayment,
                                                                         name = s.user.firstName + " " + s.user.lastName,
                                                                         email = s.byAdmin == false ? s.user.membership.email : s.emailInfo,
                                                                         affiliation = s.company,
                                                                         userType = "Sponsor",
                                                                         phoneNumber = bill.telephone,
                                                                         address1 = bill.address.line1,
                                                                         address2= bill.address.line2,
                                                                         city = bill.address.city,
                                                                         state= bill.address.state,
                                                                         country= bill.address.country,
                                                                         zipCode= bill.address.zipcode
                                                 
                                                                    })).OrderBy(x => x.name);

                    /*if (csv.Count() > 0)
                    {
                        
                        SaveFileDialog saveFile = new SaveFileDialog();

                        saveFile.Filter = "csv files (*.csv)|*.csv|All files (*.*)|*.*";
                        saveFile.FilterIndex = 2;
                        saveFile.FileName = "billreport";
                        saveFile.DefaultExt = ".csv";
                        saveFile.OverwritePrompt=true;

                        DialogState state = new DialogState();
                        state.dialog = saveFile;
                        Thread t = new Thread(state.ThreadProcShowDialog);
                        t.SetApartmentState(System.Threading.ApartmentState.STA);
                        t.Start();
                        t.Join();

                        //saveFile.ShowDialog() == DialogResult.OK

                        if (state.result == DialogResult.OK)
                        {
                            if (saveFile.OpenFile() != null)
                            {
                                String location = saveFile.FileName;
                                state.dialog.Dispose(); 
                                //File.WriteAllLines(location, csv);    
                                var myFile = File.Create(location);
                                myFile.Close();
                            }
                        }
                    }*/

                    if (payments.Count() > 0)
                    {
                        b.maxIndex = (int)Math.Ceiling(payments.Count() / (double)pageSize);
                        var report = payments.Skip(pageSize * index).Take(pageSize); //Skip past rows and take new elements

                        //Add columns
                        if (index == 0)
                        {
                            csv += ("\"Transaction ID\"," +
                                    "\"Payment Date\"," +
                                    "\"Amount Paid\"," +
                                    "\"Payment Method\"," +
                                    "\"Name\"," +
                                    "\"Email\"," +
                                    "\"Affiliation\"," +
                                    "\"User Type\"," +
                                    "\"Phone Number\"," +
                                    "\"Address Line 1\"," +
                                    "\"Address Line 2\"," +
                                    "\"City\"," +
                                    "\"State\"," +
                                    "\"Country\"," +
                                    "\"Zip Code\"\r\n");
                        }

                        foreach (var p in report)
                        {
                            csv += ("\"" + p.transactionID + "\"," +
                                    "\"" + p.paymentDate + "\"," +
                                    "\"" + p.amountPaid + "\"," +
                                    "\"" + p.paymentMethod + "\"," +
                                    "\"" + p.name + "\"," +
                                    "\"" + p.email + "\"," +
                                    "\"" + p.affiliation + "\"," +
                                    "\"" + p.userType + "\"," +
                                    "\"" + p.amountPaid + "\"," +
                                    "\"" + p.address1 + "\"," +
                                    "\"" + p.address2 + "\"," +
                                    "\"" + p.city + "\"," +
                                    "\"" + p.state + "\"," +
                                    "\"" + p.country + "\"," +
                                    "\"" + p.zipCode + "\"\r\n");
                        }
                        
                        b.results = csv;
                    }

                    b.totalAmount = context.paymentbills.Where(x => x.deleted != true).Sum(x => x.AmountPaid);
                }

                return b;

            }
            catch (Exception ex)
            {
                Console.Write("WebManager.getBillReport error " + ex);
                return null;
            }
        }

        public BillPagingQuery getRegistrationPayments(int index)
        {
            BillPagingQuery page = new BillPagingQuery();

            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    int pageSize = 10;
                    var query = (from s in context.registrations
                                 from bill in context.paymentcomplementaries
                                 where (s.payment.deleted != true && s.paymentID == bill.paymentID)
                                 select new BillQuery
                                    {
                                        transactionID = "N/A",
                                        paymentDate = bill.payment.creationDate.ToString(),
                                        name = s.user.firstName + " " + s.user.lastName,
                                        email=s.user.membership.email,
                                        affiliation = s.user.affiliationName,
                                        userType = s.user.usertype.userTypeName,
                                        amountPaid = 0,
                                        paymentMethod = "Complimentary Key:    " + bill.complementarykey.key

                                     }).Concat((from s in context.registrations
                                                from bill in context.paymentbills
                                                where (s.payment.deleted != true && s.paymentID == bill.paymentID && bill.completed != false)
                                                select new BillQuery
                                                    {
                                                        transactionID = bill.transactionid,
                                                        paymentDate = bill.payment.creationDate.ToString(),
                                                        name = s.user.firstName + " " + s.user.lastName,
                                                        email=s.user.membership.email,
                                                        affiliation = s.user.affiliationName,
                                                        userType = s.user.usertype.userTypeName,
                                                        amountPaid = bill.AmountPaid,
                                                        paymentMethod = bill.methodOfPayment
                                                    })).OrderBy(x => x.name);
                    
                    page.rowCount= query.Count();
                    if (page.rowCount > 0)
                    {
                        page.maxIndex = (int)Math.Ceiling(page.rowCount / (double)pageSize);
                        var registrationPayments = query.Skip(pageSize * index).Take(pageSize).ToList(); //Skip past rows and take new elements
                        page.results = registrationPayments;
                    }
                }

                return page;

            }

            catch (Exception ex)
            {
                Console.Write("WebManager.getRegistrationPayments error " + ex);
                return null;
            }
        }

        public BillPagingQuery getSponsorPayments(int index)
        {
            BillPagingQuery page = new BillPagingQuery();

            try
            {
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    int pageSize = 10;
                    var query = (from s in context.sponsor2
                                 from bill in context.paymentbills
                                 where (s.payment.deleted != true && s.paymentID == bill.paymentID && s.paymentID != 1 && bill.completed != false && s.active != false)
                                 select new BillQuery
                                 {
                                     transactionID = bill.transactionid,
                                     paymentDate = bill.payment.creationDate.ToString(),
                                     name = s.user.firstName + " " + s.user.lastName,
                                     email = s.byAdmin == false ? s.user.membership.email : s.emailInfo,
                                     affiliation = s.company,
                                     userType = "Sponsor",
                                     amountPaid = bill.AmountPaid,
                                     paymentMethod = bill.methodOfPayment
                                 }).OrderBy(x => x.name); 

                    page.rowCount = query.Count();
                    if (page.rowCount > 0)
                    {
                        page.maxIndex = (int)Math.Ceiling(page.rowCount / (double)pageSize);
                        var registrationPayments = query.Skip(pageSize * index).Take(pageSize).ToList(); //Skip past rows and take new elements
                        page.results = registrationPayments;
                    }
                }

                return page;

            }

            catch (Exception ex)
            {
                Console.Write("WebManager.getSponsorPayments error " + ex);
                return null;
            }
        }

        public BillPagingQuery searchReport(int index, String criteria)
        {
            BillPagingQuery b = new BillPagingQuery();

            try
            {
                int pageSize = 10;
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    var payments = (from s in context.registrations
                                    from bill in context.paymentbills
                                    where ((s.payment.deleted != true && s.paymentID == bill.paymentID) && ((s.user.firstName.ToLower() + " " + s.user.lastName.ToLower()).Contains(criteria.ToLower()) || s.user.membership.email.ToLower().Contains(criteria.ToLower())))
                                    select new BillQuery
                                    {
                                        transactionID = bill.transactionid,
                                        paymentDate = bill.payment.creationDate.ToString(),
                                        name = s.user.firstName + " " + s.user.lastName,
                                        email= s.user.membership.email,
                                        affiliation = s.user.affiliationName,
                                        userType = s.user.usertype.userTypeName,
                                        amountPaid = bill.AmountPaid,
                                        paymentMethod = bill.methodOfPayment

                                    }).Concat((from s in context.registrations
                                               from bill in context.paymentcomplementaries
                                               where ((s.payment.deleted != true && s.paymentID == bill.paymentID) && ((s.user.firstName.ToLower() + " " + s.user.lastName.ToLower()).Contains(criteria.ToLower()) || s.user.membership.email.ToLower().Contains(criteria.ToLower())))
                                               select new BillQuery
                                               {
                                                   transactionID = "N/A",
                                                   paymentDate = bill.payment.creationDate.ToString(),
                                                   name = s.user.firstName + " " + s.user.lastName,
                                                   email= s.user.membership.email,
                                                   affiliation = s.user.affiliationName,
                                                   userType = s.user.usertype.userTypeName,
                                                   amountPaid = 0,
                                                   paymentMethod = "Complimentary Key:    " + bill.complementarykey.key

                                               })).Concat((from s in context.sponsor2
                                                           from bill in context.paymentbills
                                                           where ((s.payment.deleted != true && s.paymentID == bill.paymentID && bill.completed != false && s.active != false) && ((s.user.firstName.ToLower() + " " + s.user.lastName.ToLower()).Contains(criteria.ToLower()) || s.emailInfo.ToLower().Contains(criteria.ToLower()) || s.user.membership.email.ToLower().Contains(criteria.ToLower())))
                                                           select new BillQuery
                                                           {
                                                               transactionID = bill.transactionid,
                                                               paymentDate = bill.payment.creationDate.ToString(),
                                                               name = s.user.firstName + " " + s.user.lastName,
                                                               email = s.byAdmin == false ? s.user.membership.email : s.emailInfo,
                                                               affiliation = s.company,
                                                               userType = "Sponsor",
                                                               amountPaid = bill.AmountPaid,
                                                               paymentMethod = bill.methodOfPayment
                                                           })).OrderBy(x => x.name);

                    if (payments.Count() > 0)
                    {
                        b.maxIndex = (int)Math.Ceiling(payments.Count() / (double)pageSize);
                        var report = payments.Skip(pageSize * index).Take(pageSize).ToList(); //Skip past rows and take new elements
                        b.results = report;
                    }

                }

                return b;

            }
            catch (Exception ex)
            {
                Console.Write("WebManager.searchReport error " + ex);
                return null;
            }
        }

        public ReportQuery getAttendanceReport(int index)
        {
            ReportQuery b = new ReportQuery();
            String csv = "";
            RegistrationManager registration = new RegistrationManager();
            List<String> conferenceDates = registration.getDates();

            try
            {
                int pageSize = 10;
                using (conferenceadminContext context = new conferenceadminContext())
                {
                    var registrationList = new List<RegisteredUserInformation>();
                    registrationList = context.registrations.Where(reg => reg.deleted == false).Select(reg => new RegisteredUserInformation
                    {
                        registrationID = reg.registrationID,
                        name = reg.user.firstName+ " " +reg.user.lastName,
                        email = reg.byAdmin == true ? "" : reg.user.membership.email,
                        phone = reg.byAdmin == true ? "" : reg.user.phone,
                        usertypeid = reg.user.usertype.userTypeName,
                        date1 = reg.date1,
                        date2 = reg.date2,
                        date3 = reg.date3,
                        affiliationName = reg.user.affiliationName,
                        line1 = reg.byAdmin == true ? "" : reg.user.address.line1,
                        line2 = reg.byAdmin == true ? "" : reg.user.address.line2,
                        city = reg.byAdmin == true ? "" : reg.user.address.city,
                        state = reg.byAdmin == true ? "" : reg.user.address.state,
                        country = reg.byAdmin == true ? "" : reg.user.address.country,
                        zipCode = reg.byAdmin == true ? "" : reg.user.address.zipcode,
                        notes = reg.note,
                        usertype = reg.user.usertype.userTypeName

                    }).OrderBy(f => f.registrationID).ToList();

                    if (registrationList.Count() > 0)
                    {
                        b.maxIndex = (int)Math.Ceiling(registrationList.Count() / (double)pageSize);
                        var report = registrationList.Skip(pageSize * index).Take(pageSize); //Skip past rows and take new elements

                        //Add columns
                        if (index == 0)
                        {
                            csv += ("\"Registration ID\"," +
                                    "\"Name\"," +
                                    "\"Email\"," +
                                    "\"Phone Number\"," +
                                    "\"User Type\",");

                            if (conferenceDates.Count() > 0)
                            {
                                string[] date = conferenceDates[0].Split(',');
                                if(date.Count() ==3)
                                csv += ("\""+date[1]+","+date[2]+"\",");
                            }
                            if (conferenceDates.Count() > 1)
                            {
                                string[] date = conferenceDates[1].Split(',');
                                if (date.Count() == 3)
                                csv += ("\"" + date[1] + "," + date[2] + "\",");
                            }
                            if (conferenceDates.Count() > 2)
                            {
                                string[] date = conferenceDates[2].Split(',');
                                if (date.Count() == 3)
                                csv += ("\"" + date[1] + "," + date[2] + "\",");
                            }

                            csv += ("\"Affiliation\"," +
                                    "\"Address Line 1\"," +
                                    "\"Address Line 2\"," +
                                    "\"City\"," +
                                    "\"State\"," +
                                    "\"Country\"," +
                                    "\"Zip Code\"," +
                                    "\"Notes\"\r\n");
                        }

                        foreach (var p in report)
                        {
                            csv += ("\"" + p.registrationID + "\"," +
                                    "\"" + p.name + "\"," +
                                    "\"" + p.email + "\"," +
                                    "\"" + p.phone + "\"," +
                                    "\"" + p.usertype + "\",");

                            if (conferenceDates.Count() > 0 && conferenceDates[0].Split(',').Count() ==3)
                            {
                                string date = p.date1 == true ? "X" : "";
                                csv += "\"" + date + "\",";
                            }
                            if (conferenceDates.Count() > 1 && conferenceDates[1].Split(',').Count() ==3)
                            {
                                string date = p.date2 == true ? "X" : "";
                                csv += "\"" + date + "\",";
                            }
                            if (conferenceDates.Count() > 2 && conferenceDates[2].Split(',').Count() == 3)
                            {
                                string date = p.date3 == true ? "X" : "";
                                csv += "\"" + date + "\",";
                            }

                            csv +=  ("\"" + p.affiliationName + "\"," +
                                    "\"" + p.line1 + "\"," +
                                    "\"" + p.line2 + "\"," +
                                    "\"" + p.city + "\"," +
                                    "\"" + p.state + "\"," +
                                    "\"" + p.country + "\"," +
                                    "\"" + p.zipCode + "\"," +
                                    "\"" + p.notes + "\"\r\n");
                        }

                        b.results = csv;
                    }
                }

                return b;

            }
            catch (Exception ex)
            {
                Console.Write("WebManager.getAttendanceReport error " + ex);
                return null;
            }
        }
    }

    public class BillQuery
    {
        public String csvString;
        public String transactionID;
        public String paymentDate;
        public String name;
        public String email;
        public String affiliation;
        public String userType;
        public double amountPaid;
        public String paymentMethod;
        public String phoneNumber;
        public String address1;
        public String address2;
        public String city;
        public String state;
        public String country;
        public String zipCode;

    }

    public class BillPagingQuery
    {
        public int indexPage;
        public int maxIndex;
        public int rowCount;
        public List<BillQuery> results;

        public BillPagingQuery()
        {
            results = new List<BillQuery>();
        }
    }

    public class ReportQuery
    {
        public String results;
        public double totalAmount;
        public int maxIndex;

        public ReportQuery()
        {
        }
    }

    public class RegisteredUserInformation
    {
        public long registrationID;
        public string name;
        public string phone;
        public string email;
        //Address
        public string line1;
        public string line2;
        public string city;
        public string state;
        public string country;
        public string zipCode;
        //General
        public string usertypeid;
        public bool? date1;
        public bool? date2;
        public bool? date3;
        public string affiliationName;
        public bool? byAdmin;
        public string usertype;
        public string notes;

        public RegisteredUserInformation() { }

    }
        
}