using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace NancyService.Models.Mapping
{
    public class evaluatiorsubmissionMap : EntityTypeConfiguration<evaluatiorsubmission>
    {
        public evaluatiorsubmissionMap()
        {
            // Primary Key
            this.HasKey(t => t.evaluationsubmissionID);

            // Properties
            this.Property(t => t.evaluationsubmissionID)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            this.Property(t => t.statusEvaluation)
                .HasMaxLength(45);


            // Relationships
            this.HasRequired(t => t.evaluator)
                .WithMany(t => t.evaluatiorsubmissions)
                .HasForeignKey(d => d.evaluatorID);
            this.HasRequired(t => t.submission)
                .WithMany(t => t.evaluatiorsubmissions)
                .HasForeignKey(d => d.submissionID);

        }
    }
}
