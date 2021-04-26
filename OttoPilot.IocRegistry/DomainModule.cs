using System;
using Autofac;
using OttoPilot.Domain;
using OttoPilot.Domain.BusinessLayer;
using OttoPilot.Domain.BusinessLayer.FileProviders;
using OttoPilot.Domain.BusinessLayer.Services;
using OttoPilot.Domain.BusinessLayer.StepImplementations;
using OttoPilot.Domain.BusinessObjects.StepParameters;
using OttoPilot.Domain.Interfaces;
using OttoPilot.Domain.Interfaces.Services;
using OttoPilot.Domain.Types;

namespace OttoPilot.IocRegistry
{
    public class DomainModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            RegisterStepSupervisorFactory(builder);
            
            #region Services
            builder.RegisterType<FlowService>().As<IFlowService>();
            #endregion

            #region StepRegistrations
            builder.RegisterStep<LoadCsvStepParameters, LoadCsvStepImplementation>();
            builder.RegisterStep<TransformDatasetStepParameters, TransformDatasetStepImplementation>();
            #endregion
            
            builder.RegisterType<LocalFileProvider>().As<IFileProvider>();
            builder.RegisterType<DatasetPool>().As<IDatasetPool>().SingleInstance();
            builder.RegisterType<UnitOfWork>().InstancePerLifetimeScope();
        }

        private static void RegisterStepSupervisorFactory(ContainerBuilder builder)
        {
            builder.Register((c, p) =>
            {
                var step = p.TypedAs<IStep>();
                var parametersType = step.StepType switch
                {
                    StepType.LoadCsv => typeof(LoadCsvStepParameters),
                    StepType.TransformFile => typeof(TransformDatasetStepParameters),
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