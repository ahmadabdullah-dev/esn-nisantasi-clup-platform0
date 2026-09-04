using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
    
[Authorize]
public class UserController : BaseApiController
{
    private readonly IUserService _userService;
    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    [HttpGet("current-user")]
    public async Task<ActionResult> GetCurrentUser()
    {
        var result = await _userService.GetCurrentUserMetaDataAsync();
        return HandleResult(result);
    }
    [AllowAnonymous]
    [HttpGet("user-by-username/{userName}")]
    public async Task<ActionResult> GetByUserName(string userName)
    {
        var result = await _userService.GetUserByUserNameAsync(userName);
        return HandleResult(result);
    }
    [AllowAnonymous]
    [HttpGet("paged")]
    public async Task<ActionResult> GetUsers([FromQuery] PaginationParams p, CancellationToken ct)
    {
        var result = await _userService.GetUsersAsync(p, ct);
        return HandleResult(result);
    }
}
