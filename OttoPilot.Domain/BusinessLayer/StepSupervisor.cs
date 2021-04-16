using System.Threading;
using System.Threading.Tasks;
using OttoPilot.Domain.BusinessObjects;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.Domain.BusinessLayer
{
    public class StepSupervisor<TParameters> : IStepSupervisor<TParameters>
    {
        private readonly IStep<TParameters> _step;
        private readonly IStepImplementation<TParameters> _stepImplementation;

        public StepSupervisor(IStep<TParameters> step, IStepImplementation<TParameters> stepImplementation)
        {
            _step = step;
            _stepImplementation = stepImplementation;
        }

        public Task<StepResult> Run(CancellationToken cancel) => _stepImplementation.Execute(_step.Parameters, cancel);
    }
}