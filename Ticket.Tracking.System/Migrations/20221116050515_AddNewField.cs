using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ticket.Tracking.System.Migrations
{
    public partial class AddNewField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "TicketTrackings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Severity",
                table: "TicketTrackings",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "TicketTrackings",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Priority",
                table: "TicketTrackings");

            migrationBuilder.DropColumn(
                name: "Severity",
                table: "TicketTrackings");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "TicketTrackings");
        }
    }
}
