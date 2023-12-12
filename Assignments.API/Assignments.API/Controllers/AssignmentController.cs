using Assignments.API.Data;
using Assignments.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Assignments.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        private readonly AssignmentDbContext _AssignmentDbContext;

        public AssignmentController(AssignmentDbContext AssignmentDbContext)
        {
            _AssignmentDbContext = AssignmentDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAssignments()
        {
            var assignments = await _AssignmentDbContext.Assignments
                .OrderByDescending(a => a.StartDate)
                .ToListAsync();
                

            return Ok(assignments);
        }
        
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetAssignmentById([FromRoute] Guid id)
        {
            var assignment = await _AssignmentDbContext.Assignments.FindAsync(id);
            
            if (assignment == null)
                return NotFound();

            return Ok(assignment);
        }
        
        [HttpGet]
        [Route("type/{assignmentType}")]
        public async Task<IActionResult> GetAssignmentsByType([FromRoute] AssignmentType assignmentType)
        {
            try
            {
                var assignments = await _AssignmentDbContext.Assignments
                    .Where(a => a.Type == assignmentType)
                    .OrderByDescending(a => a.StartDate)
                    .ToListAsync();

                return Ok(assignments);
            }
            catch (Exception ex)
            {
                // Handle exceptions and return a proper response
                return StatusCode(500, "Internal Server Error");
            }
        }

        
        [HttpPost]
        public async Task<IActionResult> AddAssignment(Assignments.API.Models.Assignment assignment)
        {
            assignment.Id = Guid.NewGuid();
            // Validate assignment type
            if (!Enum.IsDefined(typeof(AssignmentType), assignment.Type))
            {
                return BadRequest("Invalid assignment type.");
            }

            _AssignmentDbContext.Assignments.Add(assignment);
            await _AssignmentDbContext.SaveChangesAsync();
            return Ok(assignment);
        }
        
        [HttpPut]
        [Route("{id:Guid}/completed")]
        public async Task<IActionResult> UpdateCompletedStatus([FromRoute] Guid id, Assignments.API.Models.Assignment assignmentUpdateRequest)
        {
            var assignment = await _AssignmentDbContext.Assignments.FindAsync(id);
            
            if (assignment == null)
                return NotFound();
            
            assignment.IsCompleted = assignmentUpdateRequest.IsCompleted;
            if (assignment.IsCompleted)
                assignment.CompleteDate = DateTime.Now;
            else
                assignment.CompleteDate = null;

            await _AssignmentDbContext.SaveChangesAsync();
            return Ok(assignment);
        }
        
        [HttpPut]
        [Route("{id:Guid}/archive")]
        public async Task<IActionResult> UpdateArchiveStatus([FromRoute] Guid id, Assignments.API.Models.Assignment archiveUpdateRequest)
        {
            var assignment = await _AssignmentDbContext.Assignments.FindAsync(id);

            if (assignment == null)
                return NotFound();

            assignment.IsArchive = archiveUpdateRequest.IsArchive;

            await _AssignmentDbContext.SaveChangesAsync();
            return Ok(assignment);
        }
        
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteAssignment([FromRoute] Guid id)
        {
            var assignment = await _AssignmentDbContext.Assignments.FindAsync(id);
            if (assignment == null)
                return NotFound();

            _AssignmentDbContext.Assignments.Remove(assignment);
            
            await _AssignmentDbContext.SaveChangesAsync();
            return Ok(assignment);
        }
    }
}