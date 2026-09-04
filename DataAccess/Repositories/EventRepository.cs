using DataAccess.Common;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories;

public class EventRepository : IEventRepository
{
    private readonly AppDbContext _appDbContext;

    public EventRepository(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }
    public async Task<string> AddPlanAsync(Event entity, CancellationToken ct = default)
    {
        await _appDbContext.Events.AddAsync(entity);
        await _appDbContext.SaveChangesAsync(ct);
        return entity.Id;
    }
    public async Task<PagedList<Event>> GetEventsAsync(PaginationParams p, CancellationToken ct = default)
    {
        var query = _appDbContext.Events
            .OrderByDescending(x => x.PlannedAt)
            .AsNoTracking()
            .Select(x => new Event
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                LocationName = x.LocationName,
                PlannedAt = x.PlannedAt,
                HostId = x.HostId,
            });
        return await PagedList<Event>.CreateAsync(query, p.Page, p.PageSize, ct);
    }
}
