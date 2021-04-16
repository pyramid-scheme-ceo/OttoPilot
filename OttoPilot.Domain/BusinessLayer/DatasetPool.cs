using System.Collections.Generic;
using System.Data;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.Domain.BusinessLayer
{
    public class DatasetPool : IDatasetPool
    {
        private readonly IDictionary<string, DataTable> _dataTables;

        public DatasetPool()
        {
            _dataTables = new Dictionary<string, DataTable>();
        }

        public void InsertOrReplace(string key, DataTable data) => _dataTables[key] = data;

        public DataTable GetDataSet(string key) => _dataTables[key];
    }
}