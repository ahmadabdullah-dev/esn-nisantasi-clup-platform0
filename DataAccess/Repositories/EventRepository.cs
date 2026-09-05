using DataAccess.Common;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

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
    public async Task<Event?> GetEventByIdAsync(string eventId, CancellationToken ct = default)
    {
        var query = _appDbContext.Events.AsNoTracking()
            .Where(x => x.Id == eventId)
            .Select(x => new Event  
            {
                Id = x.Id,
                Title = x.Title,
                Description = x.Description,
                LocationName = x.LocationName,
                PlannedAt = x.PlannedAt,
                HostId = x.HostId,
            });
        return await query.SingleOrDefaultAsync(ct);
    }
    public async Task<bool> UpdateEventAsync(Event @event, CancellationToken ct = default)
    {
        _appDbContext.Events.Update(@event);
        return await _appDbContext.SaveChangesAsync(ct) > 0;
    }
}
