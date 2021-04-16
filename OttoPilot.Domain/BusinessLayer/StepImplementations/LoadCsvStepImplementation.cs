using System.Threading;
using System.Threading.Tasks;
using OttoPilot.Domain.BusinessObjects;
using OttoPilot.Domain.BusinessObjects.StepParameters;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.Domain.BusinessLayer.StepImplementations
{
    public class LoadCsvStepImplementation : IStepImplementation<LoadCsvStepParameters>
    {
        private readonly IFileProvider _fileProvider;
        private readonly IDatasetPool _datasetPool;

        public LoadCsvStepImplementation(IFileProvider fileProvider, IDatasetPool datasetPool)
        {
            _fileProvider = fileProvider;
            _datasetPool = datasetPool;
        }
        
        public async Task<StepResult> Execute(LoadCsvStepParameters parameters, CancellationToken cancel)
        {
            var data = await _fileProvider.ReadFromCsv(parameters.FileName);
            _datasetPool.InsertOrReplace(parameters.OutputDatasetName, data);

            return new StepResult
            {
                OutputDatasetName = parameters.OutputDatasetName
            };
        }
    }
}