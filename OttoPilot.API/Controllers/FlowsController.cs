using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OttoPilot.API.ApiModels;
using OttoPilot.Domain;
using OttoPilot.Domain.Interfaces;
using OttoPilot.Domain.Interfaces.Services;
using Flow = OttoPilot.Domain.BusinessObjects.Entities.Flow;
using Step = OttoPilot.Domain.BusinessObjects.Entities.Step;

namespace OttoPilot.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlowsController : Controller
    {
        private readonly IRepository<Flow> _flowRepository;
        private readonly IFlowService _flowService;
        private readonly UnitOfWork _unitOfWork;

        public FlowsController(
            IRepository<Flow> flowRepository,
            IFlowService flowService,
            UnitOfWork unitOfWork)
        {
            _flowRepository = flowRepository;
            _flowService = flowService;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var result = _flowRepository.All().Select(f => new ApiModels.Flow
            {
                Id = f.Id,
                Name = f.Name,
                Steps = new List<ApiModels.Step>(),
            });
            
            return Ok(ApiResponse.Success(result));
        }

        [HttpPost]
        public IActionResult Create(ApiModels.Flow flowModel)
        {
            var flow = new Flow
            {
                Name = flowModel.Name,
                Steps = flowModel.Steps.Select(s => new Step
                {
                    StepType = s.StepType,
                    Order = s.Order,
                    SerialisedParameters = s.SerialisedParameters,
                }).ToList(),
            };
            
            _flowRepository.Insert(flow);
            _unitOfWork.Complete();
            
            return Ok(ApiResponse.Success());
        }

        [HttpGet("{flowId:long}")]
        public IActionResult GetById(long flowId)
        {
            var flow = _flowRepository.All().Include(f => f.Steps).Single(f => f.Id == flowId);

            var result = new ApiModels.Flow
            {
                Id = flow.Id,
                Name = flow.Name,
                Steps = flow.Steps.Select(s => new ApiModels.Step
                {
                    Name = string.Empty,
                    Order = s.Order,
                    StepType = s.StepType,
                    SerialisedParameters = s.SerialisedParameters
                }).ToList(),
            };
            
            return Ok(ApiResponse.Success(result));
        }
        
        [HttpPost("{flowId:long}/run")]
        public async Task<IActionResult> RunFlow(long flowId, CancellationToken cancel)
        {
            await _flowService.RunFlow(flowId, cancel);

            return Ok();

            // var steps = new List<Step>
            // {
            //     new Step<LoadCsvStepParameters>
            //     {
            //         Order = 1,
            //         StepType = StepType.LoadCsv,
            //         SerialisedParameters = JsonSerializer.Serialize(new LoadCsvStepParameters
            //         {
            //             FileName = @"C:\Users\matta\Documents\Test.csv",
            //             OutputDatasetName = "TestDataset"
            //         })
            //     },
            //     new Step<TransformDatasetStepParameters>
            //     {
            //         Order = 2,
            //         StepType = StepType.TransformFile,
            //         SerialisedParameters = JsonSerializer.Serialize(new TransformDatasetStepParameters
            //         {
            //             InputDatasetName = "TestDataset",
            //             OutputDatasetName = "TransformedDataset",
            //             ColumnMappings = new List<ColumnMapping>
            //             {
            //                 new ColumnMapping
            //                 {
            //                     SourceColumnName = "LastName",
            //                     DestinationColumnName = "Surname",
            //                 },
            //             },
            //         })
            //     }
            // };
            //
            // foreach (var step in steps)
            // {
            //     try
            //     {
            //         var supervisor = _stepSupervisorFactory(step);
            //         var result = await supervisor.Run(cancel);
            //         var x = _datasetPool.GetDataSet("TestDataset");
            //     }
            //     catch (Exception e)
            //     {
            //         Console.WriteLine(e);
            //         throw;
            //     }
            // }
            //
            // var ds1 = _datasetPool.GetDataSet("TestDataset");
            // var ds2 = _datasetPool.GetDataSet("TransformedDataset");
            //
            // return Ok("Flow complete");
        }
    }
}