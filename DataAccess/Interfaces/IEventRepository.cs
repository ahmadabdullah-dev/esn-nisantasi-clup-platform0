namespace DataAccess.Interfaces;

public interface IEventRepository
{
    Task<string> AddPlanAsync(Event entity, CancellationToken ct);
}
