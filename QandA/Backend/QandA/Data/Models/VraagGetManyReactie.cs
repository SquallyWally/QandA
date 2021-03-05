using System;

namespace QandA.Data
{
    public class VraagGetManyReactie
    {
        public int VraagId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }
    }
}