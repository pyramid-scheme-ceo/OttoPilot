using System.Data;

namespace OttoPilot.Domain.Interfaces
{
    /// <summary>
    /// A general purpose pool of data tables which is held in memory during flow execution. DataTables are accessed
    /// using a key, which allows saving/retrieving data in independent steps
    /// </summary>
    public interface IDatasetPool
    {
        void InsertOrReplace(string key, DataTable data);
        DataTable GetDataSet(string key);
    }
}