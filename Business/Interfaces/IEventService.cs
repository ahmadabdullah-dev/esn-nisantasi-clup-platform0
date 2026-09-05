using DataAccess.Common;

namespace Business.Interfaces;
public interface IEventService
{
    Task<Result<string>> AddEventAsync(CreateEventDto dto, CancellationToken ct);
    Task<Result<PagedList<EventDto>>> GetEventsAsync(PaginationParams p, CancellationToken ct);
    Task<Result<EventDto>> GetEventByIdAsync(string eventId, CancellationToken ct);
    Task<Result<string>> UpdateEventAsync(UpdateEventDto dto, CancellationToken ct);


}
