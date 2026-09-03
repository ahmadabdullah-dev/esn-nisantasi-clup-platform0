using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace Business.Services;

public class UserService : IUserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ILogger<UserService> _logger;
    private readonly IHttpContextAccessor _httpContextAccessor;
    public UserService(
        IHttpContextAccessor httpContextAccessor,
        UserManager<AppUser> userManager,
        ILogger<UserService> logger)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _logger = logger;
    }
    public string? GetCurrentUserId()
    {
        return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
    }
    public string? GetCurrentUserRole()
    {
        return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Role);
    }
    public async Task<Result<CurrentUserMetaDataDto>> GetCurrentUserMetaDataAsync()
    {
        var userId = GetCurrentUserId();
        var role = GetCurrentUserRole();
       
        if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(role))
            return Result<CurrentUserMetaDataDto>.Failure("You must be logged in to perform this action.", 403);
       
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null)
            return Result<CurrentUserMetaDataDto>.Failure("User not found!. You may have been removed or deactivated.",404);

        var userDto = new CurrentUserMetaDataDto
        {
            Id = userId,
            UserName = user.UserName!,
            IsActive = user.IsActive,
            Role = role,
        };
        return Result<CurrentUserMetaDataDto>.Success(userDto);
    }
    public async Task<Result<UserDto>> GetUserByUserNameAsync(string userName)
    {

        var user = await _userManager.FindByNameAsync(userName);

        if (user == null)
            return Result<UserDto>.Failure("User not found", 404);

        var userDto = new UserDto()
        {
            Id = user.Id,
            ProfilePhotoPublicId = user.ProfilePhotoPublicId,
            UserName = user.UserName!,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Country = user.Country,
            Email = user.Email!,
            Department = user.Department,
            IsActive = user.IsActive,
        };
        return Result<UserDto>.Success(userDto);
    }


}