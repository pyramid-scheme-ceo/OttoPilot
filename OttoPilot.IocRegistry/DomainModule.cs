using System;
using System.Linq;
using Autofac;
using OttoPilot.Domain.BusinessLayer;
using OttoPilot.Domain.BusinessLayer.FileProviders;
using OttoPilot.Domain.BusinessLayer.StepImplementations;
using OttoPilot.Domain.BusinessObjects.Entities;
using OttoPilot.Domain.BusinessObjects.StepParameters;
using OttoPilot.Domain.Interfaces;
using OttoPilot.Domain.Types;

namespace OttoPilot.IocRegistry
{
    public class DomainModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            RegisterStepSupervisorFactory(builder);
            
            #region StepRegistrations
            builder.RegisterStep<LoadCsvStepParameters, LoadCsvStepImplementation>();
            #endregion
            
            builder.RegisterType<InMemoryFileProvider>().As<IFileProvider>();
            builder.RegisterType<DatasetPool>().As<IDatasetPool>();
        }

        private static void RegisterStepSupervisorFactory(ContainerBuilder builder)
        {
            builder.Register((c, p) =>
            {
                var step = p.TypedAs<IStep>();
                var parametersType = step.StepType switch
                {
                    StepType.LoadCsv => typeof(LoadCsvStepParameters),
                    _ => throw new ArgumentException("Unexpected step type")
                };

                var supervisorType = typeof(IStepSupervisor<>).MakeGenericType(parametersType);

                return (IStepSupervisor)c.Resolve(supervisorType, new NamedParameter("step", step));
            }).As<IStepSupervisor>();
        }
    }

    internal static class ContainerBuilderExtensions
    {
        public static void RegisterStep<TParameters, TImplementation>(this ContainerBuilder builder)
            where TImplementation : IStepImplementation<TParameters>
        {
            builder.RegisterType<TImplementation>().As<IStepImplementation<TParameters>>();
            builder.RegisterType<StepSupervisor<TParameters>>().As<IStepSupervisor<TParameters>>();
        }
    }
}