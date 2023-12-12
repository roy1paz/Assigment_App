using Assignments.API.Data;

namespace Assignments.API.Models
{

    public enum AssignmentType
    {
        Personal,
        Studies,
        Work
    }
    public class Assignment
    {
        public Guid Id { get; set; }
        public AssignmentType Type { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Cyclic { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime? CompleteDate { get; set; }
        public bool IsArchive { get; set; }
        // public bool IsSelected { get; set; }

    }
}