using System;
using System.ComponentModel.DataAnnotations;

namespace QandA.Data
{
    public class AntwoordPostRequest
    {
        [Required]
        //Nullable it come out of the model binding processing
        //with a null value anmd fail the validation check if null
        public int? VraagId { get; set; }

        [Required]
        public string Content { get; set; }
    }
}