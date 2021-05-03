using System;
using System.Threading;
using System.Threading.Tasks;
using OttoPilot.Domain.BusinessObjects.Entities;
using OttoPilot.Domain.Interfaces;
using OttoPilot.Domain.Interfaces.Services;

namespace OttoPilot.Domain.BusinessLayer.Services
{
    public class FlowService : IFlowService
    {
        private readonly IRepository<Flow> _flowRepository;
        private readonly Func<IStep, IStepSupervisor> _stepSupervisorFactory;
        private readonly IDatasetPool _datasetPool;

        public FlowService(IRepository<Flow> flowRepository, Func<IStep, IStepSupervisor> stepSupervisorFactory, IDatasetPool datasetPool)
        {
            _flowRepository = flowRepository;
            _stepSupervisorFactory = stepSupervisorFactory;
            _datasetPool = datasetPool;
        }
        
        public async Task RunFlow(long flowId, CancellationToken cancel)
        {
            var flow = _flowRepository.GetById(flowId);

            if (flow == null)
            {
                throw new ArgumentException($"No flow found for ID: {flowId}");
            }

            foreach (var step in flow.Steps)
            {
                try
                {
                    var supervisor = _stepSupervisorFactory(step);
                    var result = await supervisor.Run(cancel);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }

            var dataSet = _datasetPool.GetDataSet("CurrentUsers");
        }
    }
}