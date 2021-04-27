using Reinforced.Typings.Attributes;

namespace OttoPilot.API.ApiModels.StepParameters
{
    [TsInterface(Namespace = "Api", AutoI = false)]
    public class GenerateCsvStepParameters
    {
        public string DatasetName { get; set; }
        public string FileName { get; set; }
    }
}