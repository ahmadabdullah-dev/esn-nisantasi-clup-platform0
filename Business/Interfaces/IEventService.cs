using DataAccess.Common;

namespace Business.Interfaces;
public interface IEventService
{
    Task<Result<string>> AddPlanAsync(CreateEventDto dto, CancellationToken ct);
    Task<Result<PagedList<EventDto>>> GetPlansAsync(PaginationParams p, CancellationToken ct);

}
