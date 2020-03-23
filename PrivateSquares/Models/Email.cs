using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PrivateSquares.Models
{
    public class Email
    {
        public string FromName { get; set; }
        public string FromEmail { get; set; }
        public string Tomail { get; set; }
        public string Message { get; set; }
    }
}