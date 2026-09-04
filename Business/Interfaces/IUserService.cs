namespace Business.Interfaces;
public interface IUserService
{
    string? GetCurrentUserId();
    string? GetCurrentUserRole();
    Task<Result<CurrentUserMetaDataDto>> GetCurrentUserMetaDataAsync();
    Task<Result<UserDto>> GetUserByUserNameAsync(string userName);
    Task<Result<PagedList<UserDto>>> GetUsersAsync(PaginationParams p, CancellationToken ct);

}
