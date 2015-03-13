using System;
using System.Collections.Generic;

namespace NancyService.Models
{
    public partial class templatesubmission
    {
        public int templatesubmissionID { get; set; }
        public long templateID { get; set; }
        public long submissionID { get; set; }
        public System.DateTime creationDate { get; set; }
        public Nullable<System.DateTime> deleitionDate { get; set; }
        public virtual submission submission { get; set; }
        public virtual template template { get; set; }
    }
}