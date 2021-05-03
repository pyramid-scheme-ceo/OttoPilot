using System.Data;
using System.Threading;
using System.Threading.Tasks;
using NUnit.Framework;
using OttoPilot.Domain.BusinessLayer;
using OttoPilot.Domain.BusinessLayer.StepImplementations;
using OttoPilot.Domain.BusinessObjects.StepParameters;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.Domain.UnitTests.BusinessLayer.StepImplementations
{
    public class FindAndReplaceStepImplementationUnitTests
    {
        private FindAndReplaceStepImplementation _sut;
        private IDatasetPool _datasetPool;

        [SetUp]
        public void SetUp()
        {
            _datasetPool = new DatasetPool();
            _sut = new FindAndReplaceStepImplementation(_datasetPool);
        }

        [Test]
        public async Task Execute_EmptyDataset_DatasetIsSameAfterExecution()
        {
            _datasetPool.InsertOrReplace(TestDatasetName, MockDataset1);
            
            _ = await _sut.Execute(new FindAndReplaceStepParameters
            {
                DatasetName = TestDatasetName,
                SearchText = "TestSearch",
                ReplaceText = "TestReplace",
                SearchColumns = new [] { "FirstName", "LastName", "Age" },
            }, CancellationToken.None);

            var result = _datasetPool.GetDataSet(TestDatasetName);
            
            Assert.AreEqual(3, result.Columns.Count);
            Assert.AreEqual(0, result.Rows.Count);
        }

        [Test]
        public async Task Execute_SingleSearchColumn_OnlySearchColumnTextReplaced()
        {
            var mockDataset = MockDataset1;

            mockDataset.Rows.Add("The big", "Lebowski", 39);
            mockDataset.Rows.Add("It's", "big show", 25);

            _datasetPool.InsertOrReplace(TestDatasetName, mockDataset);

            _ = await _sut.Execute(new FindAndReplaceStepParameters
            {
                DatasetName = TestDatasetName,
                SearchText = "big",
                ReplaceText = "",
                SearchColumns = new[] {"FirstName"},
            }, CancellationToken.None);

            var result = _datasetPool.GetDataSet(TestDatasetName);
            
            Assert.AreEqual(3, result.Columns.Count);
            Assert.AreEqual(2, result.Rows.Count);
            
            Assert.AreEqual("The ", result.Rows[0]["FirstName"]);
            Assert.AreEqual("Lebowski", result.Rows[0]["LastName"]);
            Assert.AreEqual(39.ToString(), result.Rows[0]["Age"]);
            Assert.AreEqual("It's", result.Rows[1]["FirstName"]);
            Assert.AreEqual("big show", result.Rows[1]["LastName"]);
            Assert.AreEqual(25.ToString(), result.Rows[1]["Age"]);
        }

        [Test]
        public async Task Execute_MatchingNonStringValue_ValueReplacedCorrectly()
        {
            var mockDataset = MockDataset1;

            mockDataset.Rows.Add("The big", "Lebowski", 39);
            mockDataset.Rows.Add("It's", "big show", 25);

            _datasetPool.InsertOrReplace(TestDatasetName, mockDataset);

            _ = await _sut.Execute(new FindAndReplaceStepParameters
            {
                DatasetName = TestDatasetName,
                SearchText = "3",
                ReplaceText = "4",
                SearchColumns = new[] { "FirstName", "LastName", "Age" },
            }, CancellationToken.None);

            var result = _datasetPool.GetDataSet(TestDatasetName);
            
            Assert.AreEqual(3, result.Columns.Count);
            Assert.AreEqual(2, result.Rows.Count);
            
            Assert.AreEqual("The big", result.Rows[0]["FirstName"]);
            Assert.AreEqual("Lebowski", result.Rows[0]["LastName"]);
            Assert.AreEqual(49.ToString(), result.Rows[0]["Age"]);
            Assert.AreEqual("It's", result.Rows[1]["FirstName"]);
            Assert.AreEqual("big show", result.Rows[1]["LastName"]);
            Assert.AreEqual(25.ToString(), result.Rows[1]["Age"]);
        }

        private const string TestDatasetName = "Test";

        private static DataTable MockDataset1 => new DataTable
        {
            Columns =
            {
                new DataColumn("FirstName"),
                new DataColumn("LastName"),
                new DataColumn("Age"),
            }
        };
    }
}