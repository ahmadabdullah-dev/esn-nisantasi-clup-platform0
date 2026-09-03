using Microsoft.AspNetCore.Identity;

namespace Entities.Users;

public class AppUser : IdentityUser
{
    public string? ProfilePhotoUrl { get; set; }
    public string? ProfilePhotoPublicId { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Country { get; set; }
    public required string Department { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string FullName => string.Join(" ", new[] { FirstName, LastName }
        .Where(s => !string.IsNullOrWhiteSpace(s)));
}