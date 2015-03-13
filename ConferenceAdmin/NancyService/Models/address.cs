using System;
using System.Collections.Generic;

namespace NancyService.Models
{
    public partial class address
    {
        public address()
        {
            this.sponsors = new List<sponsor>();
            this.users = new List<user>();
        }

        public long addressID { get; set; }
        public string line1 { get; set; }
        public string line2 { get; set; }
        public string city { get; set; }
        public string state { get; set; }
        public string country { get; set; }
        public string zipcode { get; set; }
        public virtual ICollection<sponsor> sponsors { get; set; }
        public virtual ICollection<user> users { get; set; }
    }
}
