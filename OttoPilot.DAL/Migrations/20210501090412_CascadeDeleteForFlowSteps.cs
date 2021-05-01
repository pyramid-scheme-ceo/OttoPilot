using Microsoft.EntityFrameworkCore.Migrations;

namespace OttoPilot.DAL.Migrations
{
    public partial class CascadeDeleteForFlowSteps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Step_Flows_FlowId",
                table: "Step");

            migrationBuilder.AddForeignKey(
                name: "FK_Step_Flows_FlowId",
                table: "Step",
                column: "FlowId",
                principalTable: "Flows",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Step_Flows_FlowId",
                table: "Step");

            migrationBuilder.AddForeignKey(
                name: "FK_Step_Flows_FlowId",
                table: "Step",
                column: "FlowId",
                principalTable: "Flows",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
