//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PrivateSquares.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class Profile
    {
        public long Id { get; set; }
        public Nullable<long> UId { get; set; }
        public Nullable<long> OwnerId { get; set; }
     
        public string FirstName { get; set; }
       
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Company { get; set; }
        public string JobTitle { get; set; }
        public string PhoneNo { get; set; }
        public byte[] Image { get; set; }
        public Nullable<long> GroupId { get; set; }
        public string Note { get; set; }
    }
}
