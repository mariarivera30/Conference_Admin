﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace NancyService
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class conferenceadminEntities1 : DbContext
    {
        public conferenceadminEntities1()
            : base("name=conferenceadminEntities1")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<address> addresses { get; set; }
        public virtual DbSet<administrator> administrators { get; set; }
        public virtual DbSet<authorizationsubmitted> authorizationsubmitteds { get; set; }
        public virtual DbSet<committeeinterface> committeeinterfaces { get; set; }
        public virtual DbSet<companion> companions { get; set; }
        public virtual DbSet<companionminor> companionminors { get; set; }
        public virtual DbSet<complementarykey> complementarykeys { get; set; }
        public virtual DbSet<documentssubmitted> documentssubmitteds { get; set; }
        public virtual DbSet<evaluationsubmitted> evaluationsubmitteds { get; set; }
        public virtual DbSet<evaluatiorsubmission> evaluatiorsubmissions { get; set; }
        public virtual DbSet<evaluator> evaluators { get; set; }
        public virtual DbSet<interfaceinformation> interfaceinformations { get; set; }
        public virtual DbSet<membership> memberships { get; set; }
        public virtual DbSet<membershiptype> membershiptypes { get; set; }
        public virtual DbSet<minor> minors { get; set; }
        public virtual DbSet<panel> panels { get; set; }
        public virtual DbSet<payment> payments { get; set; }
        public virtual DbSet<paymentbill> paymentbills { get; set; }
        public virtual DbSet<paymentcomplementary> paymentcomplementaries { get; set; }
        public virtual DbSet<paymenttype> paymenttypes { get; set; }
        public virtual DbSet<priviledge> priviledges { get; set; }
        public virtual DbSet<registration> registrations { get; set; }
        public virtual DbSet<sponsor> sponsors { get; set; }
        public virtual DbSet<sponsortype> sponsortypes { get; set; }
        public virtual DbSet<submission> submissions { get; set; }
        public virtual DbSet<submissiontype> submissiontypes { get; set; }
        public virtual DbSet<template> templates { get; set; }
        public virtual DbSet<templatesubmission> templatesubmissions { get; set; }
        public virtual DbSet<topiccategory> topiccategories { get; set; }
        public virtual DbSet<user> users { get; set; }
        public virtual DbSet<usertype> usertypes { get; set; }
        public virtual DbSet<workshop> workshops { get; set; }
    }
}