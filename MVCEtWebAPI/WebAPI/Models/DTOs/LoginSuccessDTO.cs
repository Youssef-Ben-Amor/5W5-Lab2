using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.DTOs
{
    public class LoginSuccessDTO
    {
        [Required]
        public string Token { get; set; } = "";
    }
}
