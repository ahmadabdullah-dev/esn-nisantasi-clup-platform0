namespace DataAccess.Interfaces;

public interface IEventRepository
{
    Task<string> AddPlanAsync(Event @event, CancellationToken ct);
    Task<PagedList<Event>> GetEventsAsync(PaginationParams p, CancellationToken ct);
    Task<Event?> GetEventByIdAsync(string eventId, CancellationToken ct);
    Task<bool> UpdateEventAsync(Event @event, CancellationToken ct);

}
