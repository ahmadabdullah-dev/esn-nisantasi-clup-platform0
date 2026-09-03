using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;

namespace API;

public static class DependencyInjection
{
    public static IServiceCollection AddAPI(this IServiceCollection services)
    {
        services.ConfigureApplicationCookie(options =>
        {
            options.ExpireTimeSpan = TimeSpan.FromDays(120);
            options.SlidingExpiration = true;

            options.Cookie.HttpOnly = true;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            options.Cookie.SameSite = SameSiteMode.None; 

            options.Events.OnRedirectToLogin = context =>
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                return Task.CompletedTask;
            };
            options.Events.OnRedirectToAccessDenied = context =>
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                return Task.CompletedTask;
            };
        });

        services.AddCors(options =>
        {
            options.AddPolicy("AllowWeb",
                policy =>
                {
                    policy.WithOrigins("https://localhost:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
        });

        services.AddRateLimiter(options =>
        {
            options.AddFixedWindowLimiter("auth", opt =>
            {
                opt.Window = TimeSpan.FromSeconds(30);
                opt.PermitLimit = 5;
                opt.QueueLimit = 0;
            });

            options.RejectionStatusCode = 429;
        });
        return services;
    }
}
