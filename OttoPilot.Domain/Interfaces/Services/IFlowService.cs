using System.Threading;
using System.Threading.Tasks;

namespace OttoPilot.Domain.Interfaces.Services
{
    public interface IFlowService
    {
        Task RunFlow(long flowId, CancellationToken cancel);
    }
}