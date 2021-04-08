using Microsoft.AspNetCore.Mvc;
using QandA.Data;
using QandA.Data.Models;
using System;
using System.Collections.Generic;

namespace QandA.Controllers
{   //Pagina 311
    [Route("api/[controller]")]
    [ApiController]
    public class VragenController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;

        public VragenController(IDataRepository dataRepository)
        {     //Dependancy Injection
            _dataRepository = dataRepository;
        }

        [HttpGet]
        //https://localhost:44399/api/vragen
        //https://localhost:44399/api/vragen?zoek={woord in titel}
        public IEnumerable<VraagGetManyReactie> GetVragen(string zoek)
        {
            if (string.IsNullOrEmpty(zoek))
            {
                return _dataRepository.GetVragen();
            }
            else
            {
                return _dataRepository.GetVragenBySearch(zoek);
            }
        }

        [HttpGet("{vraagId}")]
        public ActionResult<VraagGetSingleReactie> GetVraag(int vraagId)
        {
            //Call data repo to get the question
            var vraag = _dataRepository.GetVraag(vraagId);
            //Return HTTP status copde 404
            if (vraag == null)
            {
                return NotFound();
            }
            //Return with status code 200
            return vraag;
        }

        [HttpPost]
        public ActionResult<VraagGetSingleReactie> PostVraag(VraagPostRequest vraagPostRequest)
        {
            //Call data with hardcoded UserId and UserName
            var savedVraag = _dataRepository.PostVraag(new VraagPostFullRequest
            {
                Title = vraagPostRequest.Title,
                Content = vraagPostRequest.Content,
                UserId = "1",
                UserName = "Cayde",
                Created = DateTime.UtcNow
            });
            //Return HTTP 201
            return CreatedAtAction(nameof(GetVraag), new { vraagId = savedVraag.VraagId }, savedVraag);
        }

        [HttpPost("antwoord")]
        public ActionResult<AntwoordGetReactie> PostAntwoord(AntwoordPostRequest antwoordPostRequest)
        {
            var vraagBestaat = _dataRepository.VraagBestaat(antwoordPostRequest.VraagId.Value);

            if (!vraagBestaat)
            {
                return NotFound();
            }

            //Saved Antwoord
            var savedAntwoord = _dataRepository.PostAntwoord(new AntwoordPostFullRequest
            {
                VraagId = antwoordPostRequest.VraagId.Value,
                Content = antwoordPostRequest.Content,
                UserId = "1",
                UserName = "Cayde",
                Created = DateTime.UtcNow
            });

            return savedAntwoord;
        }

        [HttpPut("{vraagId}")]
        public ActionResult<VraagGetSingleReactie> PutVraag(int vraagId, VraagPutRequest vraagPutRequest)
        {
            var oldVraag = _dataRepository.PutVraag(vraagId, vraagPutRequest);

            if (oldVraag == null)
            {
                return NotFound();
            }

            //update
            vraagPutRequest.Title = string.IsNullOrEmpty(vraagPutRequest.Title) ? oldVraag.Title : vraagPutRequest.Title;
            vraagPutRequest.Content = string.IsNullOrEmpty(vraagPutRequest.Content) ? oldVraag.Content : vraagPutRequest.Content;

            //Call new data
            return _dataRepository.PutVraag(vraagId, vraagPutRequest);
        }

        [HttpDelete("{vraagId}")]
        public ActionResult DeleteVraag(int vraagId)
        {
            var vraag = _dataRepository.GetVraag(vraagId);
            if (vraag == null)
            {
                return NotFound();
            }

            _dataRepository.DeleteVraag(vraagId);
            return NoContent();
        }
    }
}