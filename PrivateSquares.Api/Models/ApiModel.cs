using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApi.Models
{

    public class BaseEntitty
    {

        public int ID { get; set; }
    }
    public class ResponseModel
    {
        public bool Success { get; set; }
        public object Data { get; set; }

    }
    public class RequestModel
    {
        public string Data { get; set; }
        //  public string Method { get; set; }
    }

    public class TokenModel
    {

        public string Token { get; set; }
        public DateTime ExpireDate { get; set; }

    }
    public partial class AddressDTO : BaseEntitty
    {

        public long ProfileId { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
    }
    public partial class ProfileListDTO : BaseEntitty
    {
         public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Company { get; set; }
        public string JobTitle { get; set; }
        public string PhoneNo { get; set; }
        public byte[] Image { get; set; }
        public string Note { get; set; }


        public CategoryDTO Category { get; set; }
        public RegisterationDTO User { get; set; }
        public RegisterationDTO Ownership { get; set; }
    }


    public partial class ProfileDTO : BaseEntitty
    {

        public long UserId { get; set; }
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

        public ICollection<AddressDTO> Addresses { get; set; }
        public CategoryDTO Category { get; set; }
        public RegisterationDTO User { get; set; }
    }

    public class CategoryDTO : BaseEntitty
    {
        public string CategoryName { get; set; }
    }

    public class RegisterationDTO : BaseEntitty
    {
        [MaxLength(8)]
        [MinLength(5)]
        public string UserName { get; set; }
        [MaxLength(200)]
        public string Email { get; set; }
        [MaxLength(20)]
        public string Password { get; set; }


    }




}