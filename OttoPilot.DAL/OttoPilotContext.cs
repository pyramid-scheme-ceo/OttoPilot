using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OttoPilot.Domain.BusinessObjects.Entities;

namespace OttoPilot.DAL
{
    public class OttoPilotContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public OttoPilotContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        public DbSet<Flow> Flows { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseSqlite(
                _configuration.GetConnectionString("OttoPilotDb"), 
                b => b.MigrationsAssembly("OttoPilot.DAL"));
    }
}