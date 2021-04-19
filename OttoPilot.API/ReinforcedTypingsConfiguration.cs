using System.IO;
using System.Text;
using Reinforced.Typings;
using Reinforced.Typings.Ast;
using Reinforced.Typings.Fluent;
using Reinforced.Typings.Visitors.TypeScript;

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
                x.UseVisitor<CustomVisitor>();
            });
        }
    }

    internal class CustomVisitor : TypeScriptExportVisitor
    {
        public CustomVisitor(TextWriter writer, ExportContext exportContext) : base(writer, exportContext)
        {
        }

        public override void Visit(RtInterface node)
        {
            if (node.Name.TypeName != "ApiResponse")
            {
                base.Visit(node);
                return;
            }

            var sb = new StringBuilder();

            sb.AppendLine("  export interface ApiResponse<T = any> {");
            sb.AppendLine("    successful: boolean;");
            sb.AppendLine("    message: string;");
            sb.AppendLine("    data: T");
            sb.AppendLine("  }");
            
            Writer.Write(sb);
        }
    }
}