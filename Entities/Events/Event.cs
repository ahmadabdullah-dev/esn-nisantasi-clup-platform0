namespace Entities.Events;

public class Event : BaseEntity
{
    public required string HostId { get; set; }
    public AppUser Host { get; set; } = null!;
    public required string Title { get; set; }
    public required string LocationName { get; set; }
    public string? Description { get; set; }
    public required DateTime PlannedAt { get; set; }

    public ICollection<EventParticipant> Participants { get; set; } = new List<EventParticipant>();
}