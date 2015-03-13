using System;
using System.Collections.Generic;

namespace NancyService.Models
{
    public partial class paymentcomplementary
    {
        public long paymentcomplementaryID { get; set; }
        public long paymentID { get; set; }
        public long complementaryKeyID { get; set; }
        public virtual complementarykey complementarykey { get; set; }
        public virtual payment payment { get; set; }
    }
}
