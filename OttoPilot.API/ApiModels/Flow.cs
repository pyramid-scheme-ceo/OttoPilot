using System.Collections.Generic;
using Reinforced.Typings.Attributes;

namespace OttoPilot.API.ApiModels
{
    [TsInterface(Namespace = "Api", AutoI = false)]
    public class Flow
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<Step> Steps { get; set; }
    }
}