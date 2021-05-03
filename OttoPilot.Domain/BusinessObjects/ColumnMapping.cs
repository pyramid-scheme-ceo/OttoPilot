using System;

namespace OttoPilot.Domain.BusinessObjects
{
    public class ColumnMapping
    {
        public ColumnMapping(string sourceColumnName, string destinationColumnName)
        {
            if (string.IsNullOrEmpty(sourceColumnName))
            {
                throw new ArgumentNullException(nameof(sourceColumnName));
            }

            if (string.IsNullOrEmpty(destinationColumnName))
            {
                throw new ArgumentNullException(nameof(destinationColumnName));
            }
            
            SourceColumnName = sourceColumnName;
            DestinationColumnName = destinationColumnName;
        }
        
        public string SourceColumnName { get; }
        public string DestinationColumnName { get; }
    }
}