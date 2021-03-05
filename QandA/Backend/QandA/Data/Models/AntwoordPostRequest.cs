using System;

namespace QandA.Data
{
    public class AntwoordPostRequest
    {
        public int VraagId { get; set; }

        public string Content { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }
    }
}