namespace Entities.Events;

public class EventParticipant : BaseEntity
{
    public required string EventId { get; set; }
    public Event Event { get; set; } = null!;
    public required string ParticipantId { get; set; }
    public AppUser Participant { get; set; } = null!;
}
    