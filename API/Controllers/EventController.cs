using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class EventController: BaseApiController
{
    private readonly IEventService _eventService;
    public EventController(IEventService eventService)
    {
        _eventService = eventService;
    }

    
    [HttpPost("add")]
    public async Task<ActionResult> AddEvent(CreateEventDto dto, CancellationToken ct)
    {
        var result = await _eventService.AddEventAsync(dto, ct);
        return HandleResult(result);
    }
    [AllowAnonymous]
    [HttpGet("paged")]
    public async Task<ActionResult> GetEvents([FromQuery] PaginationParams p, CancellationToken ct)
    {
        var result = await _eventService.GetEventsAsync(p, ct);
        return HandleResult(result);
    }
}