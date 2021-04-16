using System.Threading;
using System.Threading.Tasks;
using OttoPilot.Domain.BusinessObjects;

namespace OttoPilot.Domain.Interfaces
{
    public interface IStepImplementation<TParameters>
    {
        Task<StepResult> Execute(TParameters parameters, CancellationToken cancel);
    }
}