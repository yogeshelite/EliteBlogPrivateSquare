using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiNopCommerce.Persistance
{
    public interface IUnitOfWork 
    {
        void Savechanges();
        DbContextTransaction BeginTransaction();
        void Rollback(DbContextTransaction transaction);

        void Commit(DbContextTransaction transaction);
    }
}
