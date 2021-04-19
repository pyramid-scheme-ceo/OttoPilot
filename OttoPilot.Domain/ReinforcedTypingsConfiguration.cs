using Reinforced.Typings.Fluent;

namespace OttoPilot.Domain
{
    public static class ReinforcedTypingsConfiguration
    {
        public static void Configure(ConfigurationBuilder builder)
        {
            builder.Global(x =>
            {
                x.UseModules();
            });
        }
    }
}