using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PrivateSquares.Models
{
    public class ProfileData
    {
        public long Id { get; set; }
        public long? UId { get; set; }
        public Nullable<long> OwnerId { get; set; }
        public long AddId { get; set; }
        public Nullable<long> UserId { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string Email { get; set; }
        public string Company { get; set; }
        public string JobTitle { get; set; }
        public string Address { get; set; }
        public string PhoneNo { get; set; }
        public byte[] Image { get; set; }
        public string ImageBase64 { get; set; }
        public Nullable<long> GroupId { get; set; }
        public string Note { get; set; }

        public string Category1 { get; set; }
       public ICollection<Address> Addresses { get; set; }
        public ICollection<CustomAddress> CustomAddresses { get; set; }

    }


    public class CustomAddress
    {
        public long Id { get; set; }
        public Nullable<long> UserId { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }

    }
}