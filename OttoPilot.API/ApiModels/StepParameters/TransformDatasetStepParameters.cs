using System.Collections.Generic;
using Reinforced.Typings.Attributes;

namespace OttoPilot.API.ApiModels.StepParameters
{
    [TsInterface(Namespace = "Api", AutoI = false)]
    public class TransformDatasetStepParameters
    {
        public string InputDatasetName { get; set; }
        public string OutputDatasetName { get; set; }
        public IEnumerable<ColumnMapping> ColumnMappings { get; set; }
    }
}