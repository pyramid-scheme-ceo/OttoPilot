using System.Threading;
using System.Threading.Tasks;
using OttoPilot.Domain.BusinessObjects;
using OttoPilot.Domain.BusinessObjects.StepParameters;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.Domain.BusinessLayer.StepImplementations
{
    public class GenerateCsvStepImplementation : IStepImplementation<GenerateCsvStepParameters>
    {
        private readonly IDatasetPool _datasetPool;
        private readonly IFileProvider _fileProvider;

        public GenerateCsvStepImplementation(IDatasetPool datasetPool, IFileProvider fileProvider)
        {
            _datasetPool = datasetPool;
            _fileProvider = fileProvider;
        }
        
        public async Task<StepResult> Execute(GenerateCsvStepParameters parameters, CancellationToken cancel)
        {
            var dataset = _datasetPool.GetDataSet(parameters.DatasetName);
            await _fileProvider.WriteToCsv(parameters.FileName, dataset);

            return new StepResult
            {
                OutputDatasetName = parameters.DatasetName
            };
        }
    }
}