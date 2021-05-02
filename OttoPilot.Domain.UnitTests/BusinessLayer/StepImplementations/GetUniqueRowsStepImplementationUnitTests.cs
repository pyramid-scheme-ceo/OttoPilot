using System.Data;
using System.Threading;
using System.Threading.Tasks;
using NUnit.Framework;
using OttoPilot.Domain.BusinessLayer;
using OttoPilot.Domain.BusinessLayer.StepImplementations;
using OttoPilot.Domain.BusinessObjects;
using OttoPilot.Domain.BusinessObjects.StepParameters;
using OttoPilot.Domain.Interfaces;
using OttoPilot.Domain.Types;

namespace OttoPilot.Domain.UnitTests.BusinessLayer.StepImplementations
{
    [TestFixture]
    public class GetUniqueRowsStepImplementationUnitTests
    {
        private GetUniqueRowsStepImplementation _sut;
        private IDatasetPool _datasetPool;

        [SetUp]
        public void SetUp()
        {
            _datasetPool = new DatasetPool();
            _sut = new GetUniqueRowsStepImplementation(_datasetPool);
        }

        [TestCase(ColumnMatchType.All)]
        [TestCase(ColumnMatchType.Any)]
        public async Task Execute_BothInputDatasetsEmpty_EmptyDatasetReturned(ColumnMatchType columnMatchType)
        {
            _datasetPool.InsertOrReplace(TestPrimaryDatasetName, MockDatatable1);
            _datasetPool.InsertOrReplace(TestComparisonDatasetName, MockDatatable2);
            
            _ = await _sut.Execute(new GetUniqueRowsStepParameters
            {
                PrimaryDatasetName = TestPrimaryDatasetName,
                ComparisonDatasetName = TestComparisonDatasetName,
                OutputDatasetName = TestOutputDatasetName,
                ComparisonColumns = new []
                {
                    new ColumnMapping
                    {
                        SourceColumnName = "FirstName",
                        DestinationColumnName = "FirstName",
                    }
                },
                ColumnMatchType = columnMatchType,
            }, CancellationToken.None);

            var result = _datasetPool.GetDataSet(TestOutputDatasetName);
            
            Assert.IsNotNull(result);
            Assert.AreEqual(3, result.Columns.Count);
            Assert.AreEqual(0, result.Rows.Count);
        }

        [TestCase(ColumnMatchType.All)]
        [TestCase(ColumnMatchType.Any)]
        public async Task Execute_EmptyComparisonDataset_AllPrimaryDatasetRowsReturned(ColumnMatchType columnMatchType)
        {
            var primaryDataset = MockDatatable1;

            primaryDataset.Rows.Add(MockFirstName1, MockLastName1, MockEmail1);
            primaryDataset.Rows.Add(MockFirstName2, MockLastName2, MockEmail2);
            
            _datasetPool.InsertOrReplace(TestPrimaryDatasetName, primaryDataset);
            _datasetPool.InsertOrReplace(TestComparisonDatasetName, MockDatatable2);
            
            _ = await _sut.Execute(new GetUniqueRowsStepParameters
            {
                PrimaryDatasetName = TestPrimaryDatasetName,
                ComparisonDatasetName = TestComparisonDatasetName,
                OutputDatasetName = TestOutputDatasetName,
                ComparisonColumns = new[]
                {
                    new ColumnMapping
                    {
                        SourceColumnName = "FirstName",
                        DestinationColumnName = "FirstName",
                    }
                },
                ColumnMatchType = columnMatchType,
            }, CancellationToken.None);

            var result = _datasetPool.GetDataSet(TestOutputDatasetName);
            
            Assert.AreEqual(3, result.Columns.Count);
            Assert.AreEqual(2, result.Rows.Count);
        }

        #region TestHelpers

        private const string TestPrimaryDatasetName = "Primary";
        private const string TestComparisonDatasetName = "Comparison";
        private const string TestOutputDatasetName = "Output";
        private const string MockFirstName1 = "Tex";
        private const string MockLastName1 = "Walker";
        private const string MockEmail1 = "tex.waler@afc.com";
        private const string MockFirstName2 = "Rory";
        private const string MockLastName2 = "Sloane";
        private const string MockEmail2 = "rory.sloane@afc.com";

        private static DataTable MockDatatable1 => new DataTable
        {
            Columns =
            {
                new DataColumn("FirstName"),
                new DataColumn("LastName"),
                new DataColumn("Email"),
            }
        };

        private static DataTable MockDatatable2 => new DataTable
        {
            Columns =
            {
                new DataColumn("FirstName"),
                new DataColumn("Surname"),
                new DataColumn("WorkEmail"),
            }
        };
        
        #endregion
    }
}