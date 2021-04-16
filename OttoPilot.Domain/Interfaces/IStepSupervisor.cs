using System.Threading;
using System.Threading.Tasks;
using OttoPilot.Domain.BusinessObjects;

namespace OttoPilot.Domain.Interfaces
{
    public interface IStepSupervisor
    {
        Task<StepResult> Run(CancellationToken cancel);
    }
    
    public interface IStepSupervisor<TParameters> : IStepSupervisor { }
}