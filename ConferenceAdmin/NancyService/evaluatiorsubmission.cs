//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class evaluatiorsubmission
    {
        public evaluatiorsubmission()
        {
            this.evaluationsubmitteds = new HashSet<evaluationsubmitted>();
        }
    
        public long evaluationsubmissionID { get; set; }
        public long evaluatorID { get; set; }
        public long submissionID { get; set; }
        public string statusEvaluation { get; set; }
        public System.DateTime creationDate { get; set; }
        public Nullable<System.DateTime> deleitionDate { get; set; }
    
        public virtual ICollection<evaluationsubmitted> evaluationsubmitteds { get; set; }
        public virtual evaluator evaluator { get; set; }
        public virtual submission submission { get; set; }
    }
}