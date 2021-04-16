using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.Domain.BusinessLayer.FileProviders
{
    public class InMemoryFileProvider : IFileProvider
    {
        private readonly IDictionary<string, string> _fileSystem;

        public InMemoryFileProvider()
        {
            _fileSystem = new Dictionary<string, string>();
        }
        
        public Task<DataTable> ReadFromCsv(string fileName)
        {
            if (!_fileSystem.ContainsKey(fileName))
            {
                throw new KeyNotFoundException($"File not found: {fileName}");
            }

            var result = new DataTable();
            var csvString = _fileSystem[fileName];
            var headers = csvString.Split('\n')[0].Split(',');
            var rows = csvString.Split('\n').Skip(1);

            foreach (var header in headers)
            {
                result.Columns.Add(header);
            }

            foreach (var row in rows)
            {
                var rowData = row.Split(',').ToArray();

                if (rowData.Length > 0)
                {
                    result.Rows.Add((object[])rowData);   
                }
            }

            return Task.FromResult(result);
        }

        public Task WriteToCsv(string fileName, DataTable data)
        {
            var csvString = "";
            
            var headers = string.Join(',', data.Columns.Cast<DataColumn>().Select(c => c.ColumnName));

            csvString += headers;

            foreach (DataRow row in data.Rows)
            {
                csvString += '\n';
                csvString += string.Join(',', row.ItemArray.Select(item => item?.ToString() ?? string.Empty));
            }

            _fileSystem[fileName] = csvString;

            return Task.CompletedTask;
        }
    }
}