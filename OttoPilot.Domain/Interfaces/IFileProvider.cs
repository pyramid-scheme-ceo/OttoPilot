using System.Data;
using System.Threading.Tasks;

namespace OttoPilot.Domain.Interfaces
{
    public interface IFileProvider
    {
        /// <summary>
        /// Reads the CSV data from the filesystem using the provided filename and returns the data formatted as a
        /// <see cref="DataTable" /> object
        /// </summary>
        /// <param name="fileName">The name of the file to read</param>
        /// <returns>The file data formatted into a DataTable</returns>
        Task<DataTable> ReadFromCsv(string fileName);
        
        /// <summary>
        /// Writes the provided data table to a CSV file in the file system, under the provided filename
        /// </summary>
        /// <param name="fileName">The name to be given to the written file</param>
        /// <param name="data">The data to write to the file</param>
        Task WriteToCsv(string fileName, DataTable data);
    }
}