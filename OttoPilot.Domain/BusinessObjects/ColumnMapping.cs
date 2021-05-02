namespace OttoPilot.Domain.BusinessObjects
{
    public class ColumnMapping
    {
        public ColumnMapping(string sourceColumnName, string destinationColumnName)
        {
            SourceColumnName = sourceColumnName;
            DestinationColumnName = destinationColumnName;
        }
        
        public ColumnMapping() { }
        
        public string SourceColumnName { get; set; }
        public string DestinationColumnName { get; set; }
    }
}