using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace NancyService.Models.Mapping
{
    public class minorMap : EntityTypeConfiguration<minor>
    {
        public minorMap()
        {
            // Primary Key
            this.HasKey(t => t.minorsID);

            // Properties
            this.Property(t => t.authorizationStatus)
                .HasMaxLength(45);


            // Relationships
            this.HasRequired(t => t.user)
                .WithMany(t => t.minors)
                .HasForeignKey(d => d.userID);

        }
    }
}