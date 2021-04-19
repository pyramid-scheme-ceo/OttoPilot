using Reinforced.Typings.Attributes;

namespace OttoPilot.API.ApiModels.StepParameters
{
    [TsInterface(Namespace = "Api", AutoI = false)]
    public class LoadCsvStepParameters
    {
        public string FileName { get; set; }
        public string OutputDatasetName { get; set; }
    }
}