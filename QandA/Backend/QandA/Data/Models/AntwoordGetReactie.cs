using System;

namespace QandA.Data
{
    public class AntwoordGetReactie
    {
        public int AntwoordId { get; set; }

        public string Content { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }
    }
}