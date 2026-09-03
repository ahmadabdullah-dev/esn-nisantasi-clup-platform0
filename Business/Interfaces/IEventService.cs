namespace Business.Interfaces;
public interface IEventService
{
    Task<Result<string>> AddPlanAsync(CreateEventDto dto, CancellationToken ct);
}
