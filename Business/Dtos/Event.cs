namespace Business.Dtos;

public class CreateEventDto
{
    public required string Title { get; set; }
    public required string LocationName { get; set; }
    public string? Description { get; set; }
    public required DateTime PlannedAt { get; set; }
}
public class EventDto
{
    public required string Id { get; set; }
    public required string HostId { get; set; }
    public required string Title { get; set; }
    public required string LocationName { get; set; }
    public string? Description { get; set; }
    public required DateTime PlannedAt { get; set; }
}
public class UpdateEventDto
{
    public required string EventId { get; set; }
    public string? Title { get; set; }
    public string? LocationName { get; set; }
    public string? Description { get; set; }
    public DateTime? PlannedAt { get; set; }
}