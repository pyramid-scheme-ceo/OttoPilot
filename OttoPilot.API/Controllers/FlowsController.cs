using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OttoPilot.API.ApiModels;
using OttoPilot.Domain;
using OttoPilot.Domain.Exceptions;
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
        
        #region CRUD

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

            if (flow == null)
            {
                return NotFound();
            }

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

        [HttpPut("{flowId:long}")]
        public IActionResult Update(long flowId, ApiModels.Flow flowModel)
        {
            var flow = _flowRepository.GetById(flowId);

            if (flow == null)
            {
                return NotFound();
            }

            flow.Name = flowModel.Name;
            flow.Steps.Clear();
            flow.Steps = flowModel.Steps.Select(s => new Step
            {
                StepType = s.StepType,
                Order = s.Order,
                SerialisedParameters = s.SerialisedParameters,
            }).ToList();
            
            _unitOfWork.Complete();

            return Ok(ApiResponse.Success());
        }

        [HttpDelete("{flowId:long}")]
        public IActionResult Delete(long flowId)
        {
            try
            {
                _flowRepository.Delete(flowId);
                _unitOfWork.Complete();

                return Ok(ApiResponse.Success());
            }
            catch (NotFoundException<Flow>)
            {
                return NotFound();
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
        
        #endregion
        
        [HttpPost("{flowId:long}/run")]
        public async Task<IActionResult> RunFlow(long flowId, CancellationToken cancel)
        {
            await _flowService.RunFlow(flowId, cancel);

            return Ok();
        }
    }
}