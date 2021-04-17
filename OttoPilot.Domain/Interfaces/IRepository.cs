using System.Linq;
using OttoPilot.Domain.BusinessObjects.Entities;

namespace OttoPilot.Domain.Interfaces
{
    public interface IRepository<TEntity> where TEntity : Entity
    {
        TEntity GetById(long id);
        IQueryable<TEntity> All();
        void Insert(TEntity entity);
        void Delete(long id);
    }
}