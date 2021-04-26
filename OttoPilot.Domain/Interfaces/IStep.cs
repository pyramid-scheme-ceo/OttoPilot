using OttoPilot.Domain.Types;

namespace OttoPilot.Domain.Interfaces
{
    public interface IStep
    {
        StepType StepType { get; set; }
        int Order { get; set; }
        string SerialisedParameters { get; set; }
    }
}