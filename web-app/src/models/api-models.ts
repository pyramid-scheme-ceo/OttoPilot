//     This code was generated by a Reinforced.Typings tool. 
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.

export namespace Api {
  export interface ApiResponse<T = any> {
    successful: boolean;
    message: string;
    data: T
  }
	export interface ColumnMapping
	{
		sourceColumnName: string;
		destinationColumnName: string;
	}
	export interface CreateResponse
	{
		id: number;
	}
	export interface Flow
	{
		id: number;
		name: string;
		steps: Api.Step[];
	}
	export interface Step
	{
		name: string;
		stepType: import('./enums').StepType;
		order: number;
		serialisedParameters: string;
	}
	export interface FindAndReplaceStepParameters
	{
		datasetName: string;
		searchText: string;
		replaceText: string;
		searchColumns: string[];
	}
	export interface GenerateCsvStepParameters
	{
		datasetName: string;
		fileName: string;
	}
	export interface GetUniqueRowsStepParameters
	{
		primaryDatasetName: string;
		comparisonDatasetName: string;
		outputDatasetName: string;
		comparisonColumns: Api.ColumnMapping[];
		columnMatchType: import('./enums').ColumnMatchType;
	}
	export interface LoadCsvStepParameters
	{
		fileName: string;
		outputDatasetName: string;
	}
}
