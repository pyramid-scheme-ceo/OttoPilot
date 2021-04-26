using System.Text.Json;
using OttoPilot.Domain.Interfaces;
using OttoPilot.Domain.Types;

namespace OttoPilot.Domain.BusinessObjects.Entities
{
    public class Step : Entity, IStep
    {
        public StepType StepType { get; set; }
        public int Order { get; set; }
        public string SerialisedParameters { get; set; }
        public virtual Flow Flow { get; set; }
        public TParameters Parameters<TParameters>() => JsonSerializer.Deserialize<TParameters>(SerialisedParameters);
    }
}