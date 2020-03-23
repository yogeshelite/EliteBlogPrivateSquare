using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Persistance.Data;

namespace WebApiNopCommerce.Persistance
{
    public class UnitOfWork : IUnitOfWork
    {
        private PrivateSquaresEntities _DbContext { get; set; }
        public UnitOfWork(PrivateSquaresEntities dbContext)
        {
            _DbContext = dbContext;
        }
        public void Dispose()
        {
            _DbContext.Dispose();
        }

        public void Savechanges()
        {

            _DbContext.SaveChanges();
        }

        public DbContextTransaction BeginTransaction()
        {
           return  _DbContext.Database.BeginTransaction();
        }

        public void RollbackTransaction(DbContextTransaction transaction)
        {
            transaction.Rollback();
        }

        public void Rollback(DbContextTransaction transaction)
        {
            transaction.Rollback();
        }

        public void Commit(DbContextTransaction transaction)
        {
            transaction.Commit();
        }
    }
}
