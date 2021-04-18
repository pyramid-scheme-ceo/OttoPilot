using Reinforced.Typings.Attributes;

namespace OttoPilot.API.ApiModels
{
    [TsInterface(Namespace = "Api", AutoI = false)]
    public class ApiResponse
    {
        public bool Successful { get; set; }
        public string Message { get; set; }

        [TsIgnore]
        public static ApiResponse Success()
        {
            return new ApiResponse
            {
                Successful = true,
                Message = string.Empty
            };
        }

        [TsIgnore]
        public static ApiResponse Failed(string message = "")
        {
            return new ApiResponse
            {
                Successful = false,
                Message = message
            };
        }

        [TsIgnore]
        public static ApiResponse<T> Success<T>(T data)
        {
            return new()
            {
                Successful = true,
                Message = string.Empty,
                Data = data
            };
        }
    }

    [TsInterface(Namespace = "Api", AutoI = false)]
    public class ApiResponse<T> : ApiResponse
    {
        public T Data { get; set; }
    }
}