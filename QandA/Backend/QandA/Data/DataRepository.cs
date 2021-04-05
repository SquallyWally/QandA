using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace QandA.Data
{
    public class DataRepository : IDataRepository
    {
        //Pagina 267
        private readonly string _connString;

        public DataRepository(IConfiguration config)
        {
            _connString = config["ConnectionStrings:DefaultConnection"];
        }

        public void DeleteVraag(int vraagId)
        {
            using (var conn = new SqlConnection(_connString))
            {
                conn.Open();
                conn.Execute(@"EXEC dbo.Vraag_delete
                             @VraagId = @VraagId", new { VraagId = vraagId });
            }
        }

        public AntwoordGetReactie GetAntwoord(int antwoordId)
        {
            using (var conn = new SqlConnection(_connString))
            {
                conn.Open();

                return conn.QueryFirstOrDefault<AntwoordGetReactie>
                    (@"EXEC dbo.Antwoord_Get_ByAntwoordId @AntwoordId = @AntwoordId",
                    new { AntwoordId = antwoordId });
            }
        }

        public IEnumerable<VraagGetManyReactie> GetOpenVragen()
        {
            using (var conn = new SqlConnection(_connString))
            {
                conn.Open();
                return conn.Query<VraagGetManyReactie>(@"EXEC dbo.Vraag_GetUnanswered");
            }
        }


        public VraagGetSingleReactie GetVraag(int vraagId)
        {
            using (var conn = new SqlConnection(_connString))
            {
                conn.Open();
                var vraag = conn.QueryFirstOrDefault<VraagGetSingleReactie>
                    (@"EXEC dbo.Vraag.GetEnkel @VraagId = @VraagId", new { VraagId = vraagId });
               
                vraag.Antwoorden = conn.Query<AntwoordGetReactie>
                    (@"EXEC dbo.Antwoord_Get_ByVraagId
                     @VraagId = @VraagId", new { VraagId = vraagId });

                if (vraag != null)
                {
                    vraag.Antwoorden = conn.Query<AntwoordGetReactie>
                        (@"EXEC dbo.Antwoord.Get_ByVraagId @VraagId = @VraagId", new { VraagId = vraagId });
                }

                return vraag;
            }
        }

        public IEnumerable<VraagGetManyReactie> GetVragen()
        {
            using (var conn = new SqlConnection(_connString))
            {
                conn.Open();
                return conn.Query<VraagGetManyReactie>(@"EXEC dbo.Vraag_getMany");
            }
        }

        public IEnumerable<VraagGetManyReactie> GetVragenBySearch(string zoek)
        {
            using (var conn = new SqlConnection(_connString))
            {
                conn.Open();
                //TODO = exec Vraag_GetMany_BySearch stored proc
                //Tegen SQL injections
                //Search OF Zoek, ff testen
                return conn.Query<VraagGetManyReactie>(@"EXEC dbo.Vraag_GetMany_BySearch @Search = @Search", new { Search = zoek });
            }
        }

        //266
        public bool VraagBestaat(int vraagId)
        {
            using (var conn = new SqlConnection(_connString))
            {
                conn.Open();
                return conn.QueryFirst<bool>(@"EXEC dbo.Vraag_bestaat @VraagId = @VraagId", new { VraagId = vraagId });
            }
        }

        public AntwoordGetReactie PostAntwoord(AntwoordPostRequest antwoord)
        {
            using (var conn = new SqlConnection(_connString))
            {
                conn.Open();
                return conn.QueryFirst<AntwoordGetReactie>(@"EXEC dbo.Antwoord_Post
                                                            @VraagId = vraagId,
                                                            @Content = @Content,
                                                            @UserId = @UserId,
                                                            @UserName = @UserName,
                                                            @Created = @Created,
                                                            ", antwoord);
            }
        }

        public VraagGetSingleReactie PostVraag(VraagPostRequest vraag)
        {
            using (var conn = new SqlConnection(_connString))
            {
                conn.Open();
                var vraagId = conn.QueryFirst<int>(
                    @"EXEC dbo.Vraag_Post
                    @Title = @Title,
                    @Content = @Content,
                    @UserId = @UserId,
                    @UserName = @UserName,
                    @Created = @Created",
                    vraag
                    );
                return GetVraag(vraagId);
            }
        }

      
        public VraagGetSingleReactie PutVraag(int vraagId, VraagPutRequest vraag)
        {
            using (var conn = new SqlConnection(_connString))
            {
                conn.Open();
                conn.Execute(
                    @"EXEC dbo.Vraag_Put
                    @VraagId = @VraagId,
                    @Title = @Title,
                    @Content = @Content",
                    new { VraagId = vraagId, vraag.Title, vraag.Content }
                    );
                return GetVraag(vraagId);
            }
        }
    }
}