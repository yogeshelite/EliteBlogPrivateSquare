
using AutoMapper;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web;
using WebApi.Models;
using WebApi.Persistance.Data;
using WebApi.Services;
using WebApiNopCommerce.Persistance;

namespace WebApi.Persistance.Repositary
{
    public interface IRepositoryApi
    {



        ProfileDTO GetCustomerProfile(int userId);

        int InsertContact(ProfileDTO profile);
        int UpdateContact(ProfileDTO profile);

        int ChangeOwnership(ProfileDTO profileDTO);

        List<ProfileListDTO> GetProfilList(int CategoryId);

    }
    public class RepositoryApi : IRepositoryApi
    {

        private readonly PrivateSquaresEntities _dbContext;
        readonly IUnitOfWork _unitOfWork;

        public RepositoryApi(IUnitOfWork unitOfWork, PrivateSquaresEntities dbContext)
        {
            _dbContext = dbContext;
            _unitOfWork = unitOfWork;
        }
        public ProfileDTO GetCustomerProfile(int userId)
        {
            var data = _dbContext.Profiles.FirstOrDefault(F => (F.UserId.Equals(userId)));
            return Mapper.Map<ProfileDTO>(data);
        }

        public bool InsertContact(ProfileDTO profile)
        {
            var transaction = _unitOfWork.BeginTransaction();

            try
            {

                var register = Mapper.Map<Data.Register>(profile.User);
                _dbContext.Registers.Add(register);
                _unitOfWork.Savechanges();
                if (register.Id > 0) profile.UserId = register.Id;

                var contact = Mapper.Map<Data.Profile>(profile);
                contact.Addresses.ToList().ForEach(f => f.ProfileId = contact.Id);

                _dbContext.Profiles.Add(contact);
                _unitOfWork.Savechanges();
                if (contact.Id > 0) { _unitOfWork.Commit(transaction); return contact.Id > 0; }
                _unitOfWork.Rollback(transaction);
                return false;


            }
            catch (Exception ex)
            { _unitOfWork.Rollback(transaction); return false; }
        }

        public bool UpdateContact(ProfileDTO profile)
        {
            var transaction = _unitOfWork.BeginTransaction();

            try
            {

            

                var contact = Mapper.Map<Data.Profile>(profile);
                contact.Addresses.ToList().ForEach(f => {
                    if (f.Id == 0) { f.ProfileId = contact.Id; _dbContext.Addresses.Add(f); }
                });
 
                _unitOfWork.Savechanges();
                if (contact.Id > 0) { _unitOfWork.Commit(transaction); return contact.Id > 0; }
                _unitOfWork.Rollback(transaction);
                return false;


            }
            catch (Exception ex)
            { _unitOfWork.Rollback(transaction); return false; }
        }

        public int ChangeOwnership(ProfileDTO profileDTO)
        {
            throw new NotImplementedException();
        }

        public List<ProfileListDTO> GetProfilList(int CategoryId)
        {
            var data = _dbContext.Profiles.ToList().Where(F => (CategoryId.Equals(0) | F.Category.Id.Equals(CategoryId))).ToList();
            return Mapper.Map<List<ProfileListDTO>>(data);
        }

 


    }
}