using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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

        public FlowsController(Func<IStep, IStepSupervisor> stepSupervisorFactory)
        {
            _stepSupervisorFactory = stepSupervisorFactory;
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
                        FileName = "TestInput.csv",
                        DatasetName = "Input"
                    })
                }
            };

            foreach (var step in steps)
            {
                try
                {
                    var supervisor = _stepSupervisorFactory(step);
                    var result = await supervisor.Run(cancel);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }
            }

            return Ok("Flow complete");
        }
    }
}