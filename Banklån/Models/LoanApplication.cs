using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Banklån.Models
{
    public class LoanApplication
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public int RepaymentPeriod { get; set; }
        [Required]
        public int BorrowingLimit { get; set; }
        [Index(IsUnique = true)]
        [StringLength(450)]
        [Required]
        [RegularExpression(@"^((0[1-9]|[12]\d|3[01])([04][1-9]|[15][0-2])\d{7})$")]
        public string BirthNo { get; set; } // Fødselsnummer
        [Required]
        [RegularExpression(@"^\d{8}$")]
        public string MobileNo { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]
        public string Email { get; set; }
        //[RegularExpression(@"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]
    }
}