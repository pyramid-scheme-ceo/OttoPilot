using Autofac;
using Microsoft.EntityFrameworkCore;
using OttoPilot.DAL;
using OttoPilot.DAL.Repositories;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.IocRegistry
{
    public class DalModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<OttoPilotContext>()
                .InstancePerLifetimeScope()
                .As<OttoPilotContext>()
                .As<DbContext>();
            
            builder.RegisterGeneric(typeof(GenericRepository<>)).As(typeof(IRepository<>));
            builder.RegisterType<SaveChangesUnitOfWorkCompleteTask>().As<IUnitOfWorkCompleteTask>();
        }
    }
}