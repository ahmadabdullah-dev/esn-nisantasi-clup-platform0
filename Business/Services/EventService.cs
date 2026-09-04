using DataAccess.Common;

namespace Business.Services;

public class EventService : IEventService
{
    private readonly IEventRepository _eventRepository;
    private readonly IUserService _userService;
    public EventService(IEventRepository eventRepository,
        IUserService userService)
    {
        _eventRepository = eventRepository;
        _userService = userService;
    }

    public async Task<Result<string>> AddPlanAsync(CreateEventDto dto, CancellationToken ct)
    {
        var userId = _userService.GetCurrentUserId();

        if (string.IsNullOrEmpty(userId))
            return Result<string>.Failure("User is not authenticated", 401);

        var plan = new Event
        {
            Title = dto.Title,
            LocationName = dto.LocationName,
            Description = dto.Description,
            PlannedAt = dto.PlannedAt,
            HostId = userId
        };

        try
        {
            await _eventRepository.AddPlanAsync(plan,ct);
            return Result<string>.Success("Event added succcessfully");
        }
        catch
        {
            return Result<string>.Failure("Unexpected error happened", 500);
        }
    }
    public async Task<Result<PagedList<EventDto>>> GetEventsAsync(PaginationParams p, CancellationToken ct)
    {
        var events = await _eventRepository.GetEventsAsync(p, ct);

        var dtos = new PagedList<EventDto>
        {
            Items = events.Items.Select(x => new EventDto
            {
                Id = x.Id,
                HostId = x.HostId,
                Title = x.Title,
                Description = x.Description,
                LocationName = x.LocationName,
                PlannedAt = x.PlannedAt
            }).ToList(),

            CurrentPage = events.CurrentPage,
            TotalCount = events.TotalCount,
            TotalPages = events.TotalPages,
        };
        return Result<PagedList<EventDto>>.Success(dtos);
    }
}
