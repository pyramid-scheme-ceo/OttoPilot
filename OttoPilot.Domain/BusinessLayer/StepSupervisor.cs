using System.Threading;
using System.Threading.Tasks;
using OttoPilot.Domain.BusinessObjects;
using OttoPilot.Domain.BusinessObjects.Entities;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.Domain.BusinessLayer
{
    public class StepSupervisor<TParameters> : IStepSupervisor<TParameters>
    {
        private readonly Step _step;
        private readonly IStepImplementation<TParameters> _stepImplementation;

        public StepSupervisor(Step step, IStepImplementation<TParameters> stepImplementation)
        {
            _step = step;
            _stepImplementation = stepImplementation;
        }

        public Task<StepResult> Run(CancellationToken cancel) =>
            _stepImplementation.Execute(_step.Parameters<TParameters>(), cancel);
    }
}