using System.Collections.Generic;

namespace OttoPilot.Domain.BusinessObjects.StepParameters
{
    public class FindAndReplaceStepParameters
    {
        public string DatasetName { get; set; }
        public string SearchText { get; set; }
        public string ReplaceText { get; set; }
        public IEnumerable<string> SearchColumns { get; set; }
    }
}