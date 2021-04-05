using System;

namespace QandA.Data
{
    public class AntwoordGetReactie
    //Matches [Antwoord_Get_ByVraagId] procedure
    {
        public int AntwoordId { get; set; }

        public string Content { get; set; }
        public string UserName { get; set; }
        public DateTime Created { get; set; }
    }
}