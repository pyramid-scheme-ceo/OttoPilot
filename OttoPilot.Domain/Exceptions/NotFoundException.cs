using System;

namespace OttoPilot.Domain.Exceptions
{
    public class NotFoundException<T> : Exception
    {
        public NotFoundException(long id)
            : base($"Could not find {typeof(T).FullName} with ID: {id}")
        {}
    }
}