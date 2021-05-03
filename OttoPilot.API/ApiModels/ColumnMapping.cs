using Reinforced.Typings.Attributes;

namespace OttoPilot.API.ApiModels
{
    [TsInterface(Namespace = "Api", AutoI = false)]
    public class ColumnMapping
    {
        public string SourceColumnName { get; set; }
        public string DestinationColumnName { get; set; }
    }
}