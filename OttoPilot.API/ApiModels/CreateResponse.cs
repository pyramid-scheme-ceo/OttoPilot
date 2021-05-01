using Reinforced.Typings.Attributes;

namespace OttoPilot.API.ApiModels
{
    [TsInterface(Namespace = "Api", AutoI = false)]
    public class CreateResponse
    {
        public CreateResponse(long id)
        {
            Id = id;
        }
        
        public long Id { get; set; }
    }
}