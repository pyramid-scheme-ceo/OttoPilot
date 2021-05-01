using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OttoPilot.Domain.BusinessObjects.Entities;

namespace OttoPilot.DAL.Configuration
{
    public class FlowConfiguration : IEntityTypeConfiguration<Flow>
    {
        public void Configure(EntityTypeBuilder<Flow> builder)
        {
            builder
                .HasMany(f => f.Steps)
                .WithOne(s => s.Flow)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}