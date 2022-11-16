using Ticket.Tracking.System.Models;

namespace Ticket.Tracking.System.RepositoryInterfaces;

public interface ITicketTrackingRepository
{
    Task<List<TicketTracking>> GetTicketTrackingsAsync();
    Task<TicketTracking?> GetTicketTrackingByIdAsync(int id);
    Task<TicketTracking?> GetTicketTrackingByIdAndTypeAsync(int id, string type);
    Task CreateTicketTrackingAsync(TicketTracking ticket);
    Task UpdateTicketTrackingAsync(TicketTracking ticket);
    Task DeleteTicketTrackingAsync(TicketTracking ticket);
}
