using System.Collections.Generic;

namespace OttoPilot.Domain.BusinessObjects.StepParameters
{
    public class TransformDatasetStepParameters
    {
        public string InputDatasetName { get; set; }
        public string OutputDatasetName { get; set; }
        public IEnumerable<ColumnMapping> ColumnMappings { get; set; }
    }
}