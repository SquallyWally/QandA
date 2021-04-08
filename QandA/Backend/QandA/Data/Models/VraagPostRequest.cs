using System;
using System.ComponentModel.DataAnnotations;

//303
namespace QandA.Data
{
    public class VraagPostRequest
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required(ErrorMessage = "Please include some content for the question")]
        public string Content { get; set; }
    }
}