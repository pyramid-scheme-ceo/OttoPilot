using System.Collections.Generic;
using OttoPilot.Domain.Types;
using Reinforced.Typings.Attributes;

namespace OttoPilot.API.ApiModels.StepParameters
{
    [TsInterface(Namespace = "Api", AutoI = false)]
    public class GetUniqueRowsStepParameters
    {
        public string PrimaryDatasetName { get; set; }
        public string ComparisonDatasetName { get; set; }
        public string OutputDatasetName { get; set; }
        public IEnumerable<ColumnMapping> ComparisonColumns { get; set; }
        [TsProperty(Type = "import('./enums').ColumnMatchType")]
        public ColumnMatchType ColumnMatchType { get; set; }
    }
}