using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using OttoPilot.Domain.BusinessObjects;
using OttoPilot.Domain.BusinessObjects.StepParameters;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.Domain.BusinessLayer.StepImplementations
{
    public class TransformDatasetStepImplementation : IStepImplementation<TransformDatasetStepParameters>
    {
        private readonly IDatasetPool _datasetPool;

        public TransformDatasetStepImplementation(IDatasetPool datasetPool)
        {
            _datasetPool = datasetPool;
        }
        
        public Task<StepResult> Execute(TransformDatasetStepParameters parameters, CancellationToken cancel)
        {
            var inputDataTable = _datasetPool.GetDataSet(parameters.InputDatasetName);
            var outputDataTable = new DataTable();
            var outputColumnNames = parameters.ColumnMappings.Select(cm => cm.DestinationColumnName);
           
            outputDataTable.Columns.AddRange(outputColumnNames.Select(c => new DataColumn(c)).ToArray());

            foreach (DataRow row in inputDataTable.Rows)
            {
                var outputRow = outputDataTable.NewRow();

                foreach (var columnMapping in parameters.ColumnMappings)
                {
                    var sourceValue = row[columnMapping.SourceColumnName].ToString();
                    outputRow[columnMapping.DestinationColumnName] = sourceValue ?? string.Empty;
                }

                outputDataTable.Rows.Add(outputRow);
            }

            _datasetPool.InsertOrReplace(parameters.OutputDatasetName, outputDataTable);

            return Task.FromResult(new StepResult
            {
                OutputDatasetName = parameters.OutputDatasetName
            });
        }
    }
}