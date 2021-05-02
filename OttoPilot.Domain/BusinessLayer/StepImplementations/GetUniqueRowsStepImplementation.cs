using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using OttoPilot.Domain.BusinessObjects;
using OttoPilot.Domain.BusinessObjects.StepParameters;
using OttoPilot.Domain.Interfaces;
using OttoPilot.Domain.Types;

namespace OttoPilot.Domain.BusinessLayer.StepImplementations
{
    public class GetUniqueRowsStepImplementation : IStepImplementation<GetUniqueRowsStepParameters>
    {
        private readonly IDatasetPool _datasetPool;
        private GetUniqueRowsStepParameters _parameters;

        public GetUniqueRowsStepImplementation(IDatasetPool datasetPool)
        {
            _datasetPool = datasetPool;
        }
        
        public Task<StepResult> Execute(GetUniqueRowsStepParameters parameters, CancellationToken cancel)
        {
            _parameters = parameters;
            
            var primaryDataset = _datasetPool.GetDataSet(parameters.PrimaryDatasetName);
            var uniqueRowsDataset = new DataTable();

            foreach (DataColumn column in primaryDataset.Columns)
            {
                uniqueRowsDataset.Columns.Add(column.ColumnName);
            }

            foreach (DataRow row in primaryDataset.Rows)
            {
                var matchValues = parameters.ComparisonColumns
                    .Select(c => new MatchValue
                    {
                        ColumnMapping = c,
                        SourceValue = row[c.SourceColumnName].ToString(),
                    })
                    .ToList();

                if (!MatchInComparisonDataset(matchValues))
                {
                    uniqueRowsDataset.Rows.Add(row.ItemArray);
                }
            }

            _datasetPool.InsertOrReplace(_parameters.OutputDatasetName, uniqueRowsDataset);

            return Task.FromResult(new StepResult());
        }

        private bool MatchInComparisonDataset(IList<MatchValue> matchValues)
        {
            var comparisonDataset = _datasetPool.GetDataSet(_parameters.ComparisonDatasetName);

            foreach (DataRow row in comparisonDataset.Rows)
            {
                foreach (var matchValue in matchValues)
                {
                    matchValue.DestinationValue = row[matchValue.ColumnMapping.DestinationColumnName].ToString()?? string.Empty;
                }

                switch (_parameters.ColumnMatchType)
                {
                    case ColumnMatchType.All:
                        if (matchValues.All(mv => mv.SourceValue.Equals(mv.DestinationValue, StringComparison.OrdinalIgnoreCase)))
                        {
                            return true;
                        }

                        break;
                    
                    case ColumnMatchType.Any:
                        if (matchValues.Any(mv => mv.SourceValue.Equals(mv.DestinationValue, StringComparison.OrdinalIgnoreCase)))
                        {
                            return true;
                        }

                        break;
                }
            }

            return false;
        }
    }

    internal class MatchValue
    {
        public ColumnMapping ColumnMapping { get; init; }
        public string SourceValue { get; init; }
        public string DestinationValue { get; set; }
    }
}