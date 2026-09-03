using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Event> Events => Set<Event>();
    public DbSet<EventParticipant> EventParticipants => Set<EventParticipant>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AppUser>(e =>
        {
            e.Property(u => u.FirstName).HasMaxLength(100).IsRequired();
            e.Property(u => u.LastName).HasMaxLength(100).IsRequired();
            e.Property(u => u.Country).HasMaxLength(100).IsRequired();
            e.Property(u => u.Department).HasMaxLength(100).IsRequired();
        });

        builder.Entity<Event>(e =>
        {
            e.Property(p => p.Title).HasMaxLength(200).IsRequired();
            e.Property(p => p.LocationName).HasMaxLength(200).IsRequired();
            e.Property(p => p.Description).HasMaxLength(1000);

            e.HasOne(p => p.Host)
                .WithMany()
                .HasForeignKey(p => p.HostId)
                .OnDelete(DeleteBehavior.Restrict); 

            e.HasIndex(p => p.PlannedAt);
        });

        builder.Entity<EventParticipant>(e =>
        {
            e.HasIndex(pp => new { pp.EventId, pp.ParticipantId }).IsUnique();

            e.HasOne(pp => pp.Event)
                .WithMany(p => p.Participants)
                .HasForeignKey(pp => pp.EventId)
                .OnDelete(DeleteBehavior.Cascade); 

            e.HasOne(pp => pp.Participant)
                .WithMany()
                .HasForeignKey(pp => pp.ParticipantId)
                .OnDelete(DeleteBehavior.Restrict);
        });

      
    }
}