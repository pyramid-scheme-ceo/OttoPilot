using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using OttoPilot.Domain.BusinessObjects;
using OttoPilot.Domain.BusinessObjects.StepParameters;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.Domain.BusinessLayer.StepImplementations
{
    public class FindAndReplaceStepImplementation : IStepImplementation<FindAndReplaceStepParameters>
    {
        private readonly IDatasetPool _datasetPool;

        public FindAndReplaceStepImplementation(IDatasetPool datasetPool)
        {
            _datasetPool = datasetPool;
        }
        
        public Task<StepResult> Execute(FindAndReplaceStepParameters parameters, CancellationToken cancel)
        {
            var dataset = _datasetPool.GetDataSet(parameters.DatasetName);

            foreach (DataRow row in dataset.Rows)
            {
                foreach (var column in parameters.SearchColumns)
                {
                    var cellValue = row[column].ToString();
                    
                    if (string.IsNullOrWhiteSpace(cellValue))
                    {
                        continue;
                    }
                    
                    if (cellValue.Contains(parameters.SearchText, StringComparison.OrdinalIgnoreCase))
                    {
                        row[column] = cellValue.Replace(
                            parameters.SearchText,
                            parameters.ReplaceText,
                            StringComparison.OrdinalIgnoreCase);
                    }
                }
            }

            return Task.FromResult(new StepResult());
        }
    }
}