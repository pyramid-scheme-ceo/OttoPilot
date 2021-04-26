using System.Collections.Generic;

namespace OttoPilot.Domain.BusinessObjects.Entities
{
    public class Flow : Entity
    {
        public string Name { get; set; }
        public ICollection<Step> Steps { get; set; }
    }
}