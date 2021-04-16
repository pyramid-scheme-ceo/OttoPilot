using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using NUnit.Framework;
using OttoPilot.Domain.BusinessLayer.FileProviders;

namespace OttoPilot.Domain.UnitTests.BusinessLayer.FileProviders
{
    [TestFixture]
    public class InMemoryFileProviderUnitTests
    {
        private InMemoryFileProvider _sut;

        [SetUp]
        public void SetUp()
        {
            _sut = new InMemoryFileProvider();
        }

        [Test]
        public void Read_NonExistentFile_ExceptionThrown()
        {
            Assert.ThrowsAsync<KeyNotFoundException>(async () => await _sut.ReadFromCsv("hello"));
        }

        [Test]
        public async Task WriteAndRead_WrittenDataReturnedCorrectly()
        {
            var dt = new DataTable
            {
                Columns =
                {
                    new DataColumn("FirstName"),
                    new DataColumn("LastName"),
                    new DataColumn("Age"),
                }
            };

            dt.Rows.Add("Jason", "Derulo", 35);
            dt.Rows.Add("Calvin", "Harris", 42);
            
            await _sut.WriteToCsv("TestFile.csv", dt);

            var result = await _sut.ReadFromCsv("TestFile.csv");
            
            Assert.AreEqual(2, result.Rows.Count);
            Assert.AreEqual("Jason", result.Rows[0]["FirstName"]);
            Assert.AreEqual("Derulo", result.Rows[0]["LastName"]);
            Assert.AreEqual("35", result.Rows[0]["Age"]);
            Assert.AreEqual("Calvin", result.Rows[1]["FirstName"]);
            Assert.AreEqual("Harris", result.Rows[1]["LastName"]);
            Assert.AreEqual("42", result.Rows[1]["Age"]);
        }
    }
}