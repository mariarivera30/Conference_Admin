using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace NancyService.Models.Mapping
{
    public class complementarykeyMap : EntityTypeConfiguration<complementarykey>
    {
        public complementarykeyMap()
        {
            // Primary Key
            this.HasKey(t => t.complementarykeyID);

            // Properties
            // Table & Column Mappings
            this.ToTable("complementarykey", "conferenceadmin");
            this.Property(t => t.complementarykeyID).HasColumnName("complementarykeyID");
            this.Property(t => t.sponsorID).HasColumnName("sponsorID");
            this.Property(t => t.isUsed).HasColumnName("isUsed");
            this.Property(t => t.creationDate).HasColumnName("creationDate");
            this.Property(t => t.deleitionDate).HasColumnName("deleitionDate");

            // Relationships
            this.HasRequired(t => t.sponsor)
                .WithMany(t => t.complementarykeys)
                .HasForeignKey(d => d.sponsorID);

        }
    }
}
