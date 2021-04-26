using Microsoft.EntityFrameworkCore;
using OttoPilot.Domain.BusinessObjects.Entities;

namespace OttoPilot.DAL
{
    public class OttoPilotContext : DbContext
    {
        public DbSet<Flow> Flows { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseSqlite(
                "Data Source=C:\\Sqlite\\ottopilot.db", 
                b => b.MigrationsAssembly("OttoPilot.DAL"));
    }
}