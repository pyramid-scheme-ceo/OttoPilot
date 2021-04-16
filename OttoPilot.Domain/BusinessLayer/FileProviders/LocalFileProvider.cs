using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GenericParsing;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.Domain.BusinessLayer.FileProviders
{
    public class LocalFileProvider : IFileProvider
    {
        /// <inheritdoc />
        public Task<DataTable> ReadFromCsv(string fileName)
        {
            using var parser = new GenericParserAdapter(fileName);
            return Task.FromResult(parser.GetDataTable());
        }

        /// <inheritdoc />
        public Task WriteToCsv(string fileName, DataTable data)
        {
            var sb = new StringBuilder();
            var columnNames = data.Columns.Cast<DataColumn>().Select(column => column.ColumnName);
            
            sb.AppendLine(string.Join(',', columnNames));

            foreach (DataRow row in data.Rows)
            {
                var fields = row.ItemArray.Select(f =>
                    string.Concat("\"", (f?.ToString() ?? string.Empty).Replace("\"", "\"\""), "\""));
                
                sb.AppendLine(string.Join(',', fields));
            }

            File.WriteAllText(fileName, sb.ToString());

            return Task.CompletedTask;
        }
    }
}