using Reinforced.Typings.Attributes;

namespace OttoPilot.Domain.Types
{
    [TsEnum]
    public enum StepType
    {
        LoadCsv = 0,
        TransformFile = 1,
        GenerateCsv = 2,
        GetUniqueRows = 3,
    }
}