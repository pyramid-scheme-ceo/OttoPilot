using System.Data;
using System.Threading;
using System.Threading.Tasks;
using Moq;
using NUnit.Framework;
using OttoPilot.Domain.BusinessLayer;
using OttoPilot.Domain.BusinessLayer.StepImplementations;
using OttoPilot.Domain.BusinessObjects.StepParameters;
using OttoPilot.Domain.Interfaces;

namespace OttoPilot.Domain.UnitTests.BusinessLayer.StepImplementations
{
    [TestFixture]
    public class LoadCsvStepImplementationUnitTests
    {
        private LoadCsvStepImplementation _sut;
        private Mock<IFileProvider> _mockFileProvider;
        private IDatasetPool _datasetPool;

        [SetUp]
        public void SetUp()
        {
            SetUpDependencies();
            _sut = new LoadCsvStepImplementation(_mockFileProvider.Object, _datasetPool);
        }

        [Test]
        public async Task Execute_ExistingValidFile_FileLoadedToDatasetPool()
        {
            var result = await _sut.Execute(new LoadCsvStepParameters
            {
                FileName = TestFileName,
                OutputDatasetName = TestDatasetName
            }, CancellationToken.None);
            
            Assert.AreEqual(TestDatasetName, result.OutputDatasetName);

            var loadedDataset = _datasetPool.GetDataSet(TestDatasetName);
            
            Assert.AreEqual(1, loadedDataset.Rows.Count);
            Assert.AreEqual(MockFirstName, loadedDataset.Rows[0][TestColumn1]);
            Assert.AreEqual(MockLastName, loadedDataset.Rows[0][TestColumn2]);
            Assert.AreEqual(MockEmail, loadedDataset.Rows[0][TestColumn3]);
        }

        private const string TestFileName = "File.csv";
        private const string TestDatasetName = "Dataset1";
        private const string TestColumn1 = "FirstName";
        private const string TestColumn2 = "LastName";
        private const string TestColumn3 = "Email";
        private const string MockFirstName = "Stacey's";
        private const string MockLastName = "Mom";
        private const string MockEmail = "its.going.on@test.com";

        private void SetUpDependencies()
        {
            _mockFileProvider = new Mock<IFileProvider>();

            var mockDataTable = new DataTable
            {
                Columns =
                {
                    new DataColumn(TestColumn1),
                    new DataColumn(TestColumn2),
                    new DataColumn(TestColumn3)
                }
            };

            mockDataTable.Rows.Add(MockFirstName, MockLastName, MockEmail);

            _mockFileProvider.Setup(fp => fp.ReadFromCsv(TestFileName))
                .ReturnsAsync(mockDataTable);
            
            _datasetPool = new DatasetPool();
        }
    }
}