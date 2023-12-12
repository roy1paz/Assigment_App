namespace Assignments.API.Data;
using Microsoft.EntityFrameworkCore;
using Assignments.API.Models;


public class AssignmentDbContext : DbContext
{
    public AssignmentDbContext(DbContextOptions options) : base(options) { }

    public DbSet<Assignment> Assignments { get; set; }
}