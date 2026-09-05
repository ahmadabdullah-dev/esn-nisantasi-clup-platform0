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
    [AllowAnonymous]
    [HttpGet("by-id/{eventId}")]
    public async Task<ActionResult> GetEventById([FromRoute] string eventId, CancellationToken ct)
    {
        var result = await _eventService.GetEventByIdAsync(eventId, ct);
        return HandleResult(result);
    }
    [HttpPut]
    public async Task<ActionResult> UpdateEvent(UpdateEventDto dto, CancellationToken ct)
    {
        var result = await _eventService.UpdateEventAsync(dto, ct);
        return HandleResult(result);
    }
}