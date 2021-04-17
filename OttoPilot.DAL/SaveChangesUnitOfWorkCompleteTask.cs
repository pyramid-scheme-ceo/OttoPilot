using OttoPilot.Domain.Interfaces;

namespace OttoPilot.DAL
{
    public class SaveChangesUnitOfWorkCompleteTask : IUnitOfWorkCompleteTask
    {
        private readonly OttoPilotContext _context;

        public SaveChangesUnitOfWorkCompleteTask(OttoPilotContext context)
        {
            _context = context;
        }
        
        public void Complete()
        {
            _context.SaveChanges();
        }
    }
}