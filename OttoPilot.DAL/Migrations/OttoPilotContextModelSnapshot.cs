// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using OttoPilot.DAL;

namespace OttoPilot.DAL.Migrations
{
    [DbContext(typeof(OttoPilotContext))]
    partial class OttoPilotContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.5");

            modelBuilder.Entity("OttoPilot.Domain.BusinessObjects.Entities.Flow", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Flows");
                });

            modelBuilder.Entity("OttoPilot.Domain.BusinessObjects.Entities.Step", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<long?>("FlowId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Order")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SerialisedParameters")
                        .HasColumnType("TEXT");

                    b.Property<int>("StepType")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("FlowId");

                    b.ToTable("Step");
                });

            modelBuilder.Entity("OttoPilot.Domain.BusinessObjects.Entities.Step", b =>
                {
                    b.HasOne("OttoPilot.Domain.BusinessObjects.Entities.Flow", "Flow")
                        .WithMany("Steps")
                        .HasForeignKey("FlowId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Flow");
                });

            modelBuilder.Entity("OttoPilot.Domain.BusinessObjects.Entities.Flow", b =>
                {
                    b.Navigation("Steps");
                });
#pragma warning restore 612, 618
        }
    }
}
