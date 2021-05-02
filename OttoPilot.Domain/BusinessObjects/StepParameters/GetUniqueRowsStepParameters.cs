using System.Collections.Generic;
using OttoPilot.Domain.Types;

namespace OttoPilot.Domain.BusinessObjects.StepParameters
{
    public class GetUniqueRowsStepParameters
    {
        public string PrimaryDatasetName { get; set; }
        public string ComparisonDatasetName { get; set; }
        public string OutputDatasetName { get; set; }
        public IEnumerable<ColumnMapping> ComparisonColumns { get; set; }
        public ColumnMatchType ColumnMatchType { get; set; }
    }
}