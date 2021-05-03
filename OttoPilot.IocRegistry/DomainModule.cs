using System;
using System.Collections.Generic;
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
        private readonly IDictionary<StepType, Type> _stepTypes;

        public DomainModule()
        {
            _stepTypes = new Dictionary<StepType, Type>
            {
                {StepType.LoadCsv, typeof(LoadCsvStepParameters)},
                {StepType.TransformFile, typeof(TransformDatasetStepParameters)},
                {StepType.GenerateCsv, typeof(GenerateCsvStepParameters)},
                {StepType.GetUniqueRows, typeof(GetUniqueRowsStepParameters)},
                {StepType.FindAndReplace, typeof(FindAndReplaceStepParameters)},
            };
        }
        
        protected override void Load(ContainerBuilder builder)
        {
            RegisterStepSupervisorFactory(builder);
            
            #region Services
            builder.RegisterType<FlowService>().As<IFlowService>();
            #endregion

            #region StepRegistrations
            builder.RegisterStep<LoadCsvStepParameters, LoadCsvStepImplementation>();
            builder.RegisterStep<TransformDatasetStepParameters, TransformDatasetStepImplementation>();
            builder.RegisterStep<GenerateCsvStepParameters, GenerateCsvStepImplementation>();
            builder.RegisterStep<GetUniqueRowsStepParameters, GetUniqueRowsStepImplementation>();
            builder.RegisterStep<FindAndReplaceStepParameters, FindAndReplaceStepImplementation>();
            #endregion
            
            builder.RegisterType<LocalFileProvider>().As<IFileProvider>();
            builder.RegisterType<DatasetPool>().As<IDatasetPool>().SingleInstance();
            builder.RegisterType<UnitOfWork>().InstancePerLifetimeScope();
        }

        private void RegisterStepSupervisorFactory(ContainerBuilder builder)
        {
            builder.Register((c, p) =>
            {
                var step = p.TypedAs<IStep>();
                var parametersType = _stepTypes[step.StepType];

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