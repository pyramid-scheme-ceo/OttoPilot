using OttoPilot.Domain.Types;
using Reinforced.Typings.Attributes;

namespace OttoPilot.API.ApiModels
{
    [TsInterface(Namespace = "Api", AutoI = false)]
    public class Step
    {
        public string Name { get; set; }
        public StepType StepType { get; set; }
        public int Order { get; set; }
        public string SerialisedParameters { get; set; }
    }
}