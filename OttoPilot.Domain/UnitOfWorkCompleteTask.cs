using System.Collections.Generic;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.Domain
{
    public class UnitOfWork
    {
        private readonly IEnumerable<IUnitOfWorkCompleteTask> _completeTasks;

        public UnitOfWork(IEnumerable<IUnitOfWorkCompleteTask> completeTasks)
        {
            _completeTasks = completeTasks;
        }

        public void Complete()
        {
            foreach (var task in _completeTasks)
            {
                task.Complete();
            }
        }
    }
}