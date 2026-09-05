using DataAccess.Common;

namespace DataAccess.Interfaces;

public interface IEventRepository
{
    Task<string> AddPlanAsync(Event entity, CancellationToken ct);
    Task<PagedList<Event>> GetEventsAsync(PaginationParams p, CancellationToken ct);
    Task<Event?> GetEventByIdAsync(string eventId, CancellationToken ct);

}
