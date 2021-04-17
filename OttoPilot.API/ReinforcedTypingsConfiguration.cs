using Reinforced.Typings.Fluent;

namespace OttoPilot.API
{
    public static class ReinforcedTypingsConfiguration
    {
        public static void Configure(ConfigurationBuilder builder)
        {
            builder.Global(x =>
            {
                x.CamelCaseForMethods();
                x.CamelCaseForProperties();
                x.UseModules(true, false);
            });
        }
    }
}