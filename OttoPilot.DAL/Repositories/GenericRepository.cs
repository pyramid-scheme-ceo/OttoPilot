using System.Linq;
using Microsoft.EntityFrameworkCore;
using OttoPilot.Domain.BusinessObjects.Entities;
using OttoPilot.Domain.Exceptions;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.DAL.Repositories
{
    public class GenericRepository<TEntity> : IRepository<TEntity> where TEntity : Entity
    {
        private readonly DbSet<TEntity> _dbSet;

        public GenericRepository(DbContext context)
        {
            _dbSet = context.Set<TEntity>();
        }

        public TEntity GetById(long id)
        {
            var entity = _dbSet.Find(id);

            if (entity == null)
            {
                throw new NotFoundException<TEntity>(id);
            }

            return entity;
        }

        public IQueryable<TEntity> All() => _dbSet;

        public void Insert(TEntity entity) => _dbSet.Add(entity);

        public void Delete(long id)
        {
            var entity = GetById(id);

            if (entity == null)
            {
                throw new NotFoundException<TEntity>(id);
            }
            
            _dbSet.Remove(entity);
        }
    }
}