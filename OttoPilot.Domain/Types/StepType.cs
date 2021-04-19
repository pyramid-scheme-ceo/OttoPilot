using Reinforced.Typings.Attributes;

namespace OttoPilot.Domain.Types
{
    [TsEnum]
    public enum StepType
    {
        LoadCsv,
        TransformFile,
    }
}