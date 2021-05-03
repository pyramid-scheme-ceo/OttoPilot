using System.Collections.Generic;
using Reinforced.Typings.Attributes;

namespace OttoPilot.API.ApiModels.StepParameters
{
    [TsInterface(Namespace = "Api", AutoI = false)]
    public class FindAndReplaceStepParameters
    {
        public string DatasetName { get; set; }
        public string SearchText { get; set; }
        public string ReplaceText { get; set; }
        public IEnumerable<string> SearchColumns { get; set; }
    }
}