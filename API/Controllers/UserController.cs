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
        var result = await _userService.GetCurrentUserAsync();
        return HandleResult(result);
    }

}
