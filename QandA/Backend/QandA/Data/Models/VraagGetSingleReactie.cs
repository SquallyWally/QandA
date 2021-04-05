using System;
using System.Collections.Generic;

namespace QandA.Data
{
    public class VraagGetSingleReactie 
        //Matches with Vraag_GetEnkel procedure
    {
        public IEnumerable<AntwoordGetReactie> Antwoorden { get; internal set; }
        public int VraagId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
        public DateTime Created { get; set; }
    }
}