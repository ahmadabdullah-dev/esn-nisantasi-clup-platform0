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
}
