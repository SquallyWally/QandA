using System.ComponentModel.DataAnnotations;

namespace QandA.Data
{
    public class VraagPutRequest
    {
        [StringLength(100)]
        public string Title { get; set; }

        public string Content { get; set; }
    }
}