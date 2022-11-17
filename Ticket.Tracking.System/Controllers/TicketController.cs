using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Ticket.Tracking.System.Models;
using Ticket.Tracking.System.Models.DTOS;
using Ticket.Tracking.System.RepositoryInterfaces;

namespace Ticket.Tracking.System.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class TicketController : ControllerBase
{
    private readonly ITicketTrackingRepository _context;
    public TicketController(ITicketTrackingRepository context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<TicketTracking>>> Get()
    {
        var teams = await _context.GetTicketTrackingsAsync();
        return Ok(teams);
    }

    [HttpGet]
    [Route("{id:int}")]
    public async Task<ActionResult<TicketTracking?>> Get(int id)
    {
        var ticket = await _context.GetTicketTrackingByIdAsync(id);
        if (ticket == null) return BadRequest("Invalid id");
        return Ok(ticket);
    }

    [HttpPost()]
    [Authorize(Roles = "Admin, QA")]
    public async Task<IActionResult> Post([FromBody] CreateTicketTrackingRequestDto ticketDto)
    {
        var claimsIdentity = User.Identity as ClaimsIdentity;
        string id = claimsIdentity?.FindFirst("id")?.Value ?? "";
        TicketTracking ticket = new()
        {
            CreatedAt = DateTime.UtcNow,
            Description = ticketDto.Description,
            Id = 0,
            IsSovled = false,
            Summary = ticketDto.Summary,
            UpdateAt = DateTime.UtcNow,
            UserId = Guid.Parse(id),
            Priority = ticketDto.Priority,
            Severity = ticketDto.Severity,
        };

        await _context.CreateTicketTrackingAsync(ticket);

        return CreatedAtAction("Get", ticket.Id, ticket);
    }

    [HttpPost]
    [Route("CreateTicketTypeFeatureRequest")]
    [Authorize(Roles = "Admin, PM")]
    public async Task<IActionResult> CreateTicketTypeFeatureRequest([FromBody] CreateTicketTrackingRequestDto ticketDto)
    {
        var claimsIdentity = User.Identity as ClaimsIdentity;
        string id = claimsIdentity?.FindFirst("id")?.Value ?? "";
        TicketTracking ticket = new()
        {
            CreatedAt = DateTime.UtcNow,
            Description = ticketDto.Description,
            Id = 0,
            IsSovled = false,
            Summary = ticketDto.Summary,
            UpdateAt = DateTime.UtcNow,
            UserId = Guid.Parse(id),
            Type = "FeatureRequest",
            Priority = ticketDto.Priority,
            Severity = ticketDto.Severity,
        };

        await _context.CreateTicketTrackingAsync(ticket);

        return CreatedAtAction("Get", ticket.Id, ticket);
    }

    [HttpPut]
    [Route("ResolveTicketTypeFeatureRequest/{id:int}/{isResovled:bool}")]
    [Authorize(Roles = "Admin, RD")]
    public async Task<IActionResult> ResolveTicketTypeFeatureRequest(int id, bool isResovled)
    {
        var ticket = await _context.GetTicketTrackingByIdAndTypeAsync(id, "FeatureRequest");
        if (ticket == null) return BadRequest("Invalid id or type");
        ticket.IsSovled = isResovled;
        ticket.UpdateAt = DateTime.UtcNow;
        await _context.UpdateTicketTrackingAsync(ticket);

        return NoContent();
    }

    [HttpPost]
    [Route("CreateTicketTypeTestCase")]
    [Authorize(Roles = "Admin, QA")]
    public async Task<IActionResult> CreateTicketTypeTestCase([FromBody] CreateTicketTrackingRequestDto ticketDto)
    {
        var claimsIdentity = User.Identity as ClaimsIdentity;
        string id = claimsIdentity?.FindFirst("id")?.Value ?? "";
        TicketTracking ticket = new()
        {
            CreatedAt = DateTime.UtcNow,
            Description = ticketDto.Description,
            Id = 0,
            IsSovled = false,
            Summary = ticketDto.Summary,
            UpdateAt = DateTime.UtcNow,
            UserId = Guid.Parse(id),
            Type = "TestCase",
            Priority = ticketDto.Priority,
            Severity = ticketDto.Severity,
        };

        await _context.CreateTicketTrackingAsync(ticket);

        return CreatedAtAction("Get", ticket.Id, ticket);
    }

    [HttpPut]
    [Route("ResolveTicketTypeTestCase/{id:int}/{isResovled:bool}")]
    [Authorize(Roles = "Admin, QA")]
    public async Task<IActionResult> ResolveTicketTypeTestCase(int id, bool isResovled)
    {
        var ticket = await _context.GetTicketTrackingByIdAndTypeAsync(id, "TestCase");
        if (ticket == null) return BadRequest("Invalid id or type");
        ticket.IsSovled = isResovled;
        ticket.UpdateAt = DateTime.UtcNow;
        await _context.UpdateTicketTrackingAsync(ticket);

        return NoContent();
    }


    [HttpPut()]
    [Authorize(Roles = "Admin, QA")]
    public async Task<IActionResult> Put([FromBody] UpdateTicketTrackingRequestDto ticketDto)
    {
        TicketTracking ticket = new()
        {
            Description = ticketDto.Description,
            Id = ticketDto.Id,
            IsSovled = false,
            Summary = ticketDto.Summary,
            UpdateAt = DateTime.UtcNow,
            UserId = Guid.Parse(ticketDto.UserId!),
            CreatedAt = ticketDto.CreatedAt,
            Type = ticketDto.Type,
            Priority = ticketDto.Priority,
            Severity = ticketDto.Severity,
        };
        await _context.UpdateTicketTrackingAsync(ticket);
        return NoContent();
    }

    [HttpPut]
    [Route("MarkAsSolved/{id:int}/{isSovled:bool}")]
    [Authorize(Roles = "Admin, RD")]
    public async Task<IActionResult> MarkAsSolved(int id, bool isSovled)
    {
        var ticket = await _context.GetTicketTrackingByIdAsync(id);
        if (ticket == null) return BadRequest("Invalid id");
        ticket.IsSovled = isSovled;
        ticket.UpdateAt = DateTime.UtcNow;
        await _context.UpdateTicketTrackingAsync(ticket);
        return NoContent();
    }

    [HttpDelete]
    [Route("{id:int}")]
    [Authorize(Roles = "Admin, QA")]
    public async Task<IActionResult> Delete(int id)
    {
        var team = await _context.GetTicketTrackingByIdAsync(id);
        if (team == null) return BadRequest("Invalid id");
        await _context.DeleteTicketTrackingAsync(team);
        return NoContent();
    }
}
