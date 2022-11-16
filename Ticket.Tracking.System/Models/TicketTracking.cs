namespace Ticket.Tracking.System.Models;

public class TicketTracking : BaseModel
{
    public int Id { get; set; }
    public string Summary { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsSovled { get; set; }
    public Guid UserId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdateAt { get; set; } = DateTime.UtcNow;
    public bool Severity { get; set; }
    public PriorityTicket Priority { get; set; }
    public string? Type { get; set; }

}

public enum PriorityTicket
{
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3,
}
