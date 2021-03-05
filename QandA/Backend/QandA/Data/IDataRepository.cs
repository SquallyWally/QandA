using System.Collections.Generic;

namespace QandA.Data
{
    public interface IDataRepository
    {
        IEnumerable<VraagGetManyReactie> GetVragen();

        IEnumerable<VraagGetManyReactie> GetVragenBySearch(string zoek);

        IEnumerable<VraagGetManyReactie> GetOpenVragen();

        VraagGetSingleReactie GetVraag(int vraagId);

        bool VraagBestaat(int vraagId);

        AntwoordGetReactie GetAntwoord(int antwoordId);

        VraagGetSingleReactie PostVraag(VraagPostRequest vraag);

        VraagGetSingleReactie PutVraag(int vraagId, VraagPutRequest vraag);

        void DeleteVraag(int vraagId);

        AntwoordGetReactie PostAntwoord(AntwoordPostRequest antwoord);
    }
}