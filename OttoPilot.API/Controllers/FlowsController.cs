using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OttoPilot.Domain.BusinessObjects;
using OttoPilot.Domain.BusinessObjects.Entities;
using OttoPilot.Domain.BusinessObjects.StepParameters;
using OttoPilot.Domain.Interfaces;
using OttoPilot.Domain.Types;

namespace OttoPilot.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlowsController : Controller
    {
        private readonly Func<IStep, IStepSupervisor> _stepSupervisorFactory;
        private readonly IDatasetPool _datasetPool;

        public FlowsController(Func<IStep, IStepSupervisor> stepSupervisorFactory, IDatasetPool datasetPool)
        {
            _stepSupervisorFactory = stepSupervisorFactory;
            _datasetPool = datasetPool;
        }

        // GET
        public async Task<IActionResult> Index(CancellationToken cancel)
        {
            return Ok("hello");
        }
        
        [HttpPost("{flowId:long}/run")]
        public async Task<IActionResult> RunFlow(long flowId, CancellationToken cancel)
        {
            var steps = new List<Step>
            {
                new Step<LoadCsvStepParameters>
                {
                    Order = 1,
                    StepType = StepType.LoadCsv,
                    SerialisedParameters = JsonSerializer.Serialize(new LoadCsvStepParameters
                    {
                        FileName = @"C:\Users\matta\Documents\Test.csv",
                        OutputDatasetName = "TestDataset"
                    })
                },
                new Step<TransformDatasetStepParameters>
                {
                    Order = 2,
                    StepType = StepType.TransformFile,
                    SerialisedParameters = JsonSerializer.Serialize(new TransformDatasetStepParameters
                    {
                        InputDatasetName = "TestDataset",
                        OutputDatasetName = "TransformedDataset",
                        ColumnMappings = new List<ColumnMapping>
                        {
                            new ColumnMapping
                            {
                                SourceColumnName = "LastName",
                                DestinationColumnName = "Surname",
                            },
                        },
                    })
                }
            };

            foreach (var step in steps)
            {
                try
                {
                    var supervisor = _stepSupervisorFactory(step);
                    var result = await supervisor.Run(cancel);
                    var x = _datasetPool.GetDataSet("TestDataset");
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }

            var ds1 = _datasetPool.GetDataSet("TestDataset");
            var ds2 = _datasetPool.GetDataSet("TransformedDataset");

            return Ok("Flow complete");
        }
    }
}