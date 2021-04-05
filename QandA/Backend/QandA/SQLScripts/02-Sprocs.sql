create PROC dbo.Antwoord_Delete
	(
	@AntwoordId int
)
AS
BEGIN
	SET NOCOUNT ON

	DELETE
	FROM dbo.Antwoord
	WHERE AntwoordId = @AntwoordId
END
go

create PROC dbo.Antwoord_Get_ByAnswerId
	(
	@AntwoordId int
)
AS
BEGIN
	SET NOCOUNT ON

	SELECT AntwoordId, Content, Username, Created
	FROM dbo.Antwoord 
	WHERE AntwoordId = @AntwoordId
END
go


CREATE PROC dbo.Antwoord_Post
	(
	@VraagId int,
	@Content nvarchar(max),
	@UserId nvarchar(150),
	@UserName nvarchar(150),
	@Created datetime2
)
AS
BEGIN
	SET NOCOUNT ON

	INSERT INTO dbo.Antwoord
		(VraagId, Content, UserId, UserName, Created)
	SELECT @VraagId, @Content, @UserId, @UserName, @Created

	SELECT AntwoordId, Content, UserName, UserId, Created
	FROM dbo.Antwoord
	WHERE AntwoordId = SCOPE_IDENTITY()
END
go

CREATE PROC dbo.Antwoord_Put
	(
	@AntwoordId int,
	@Content nvarchar(max)
)
AS
BEGIN
	SET NOCOUNT ON

	UPDATE dbo.Antwoord
	SET Content = @Content
	WHERE AntwoordId = AntwoordId

	SELECT a.AntwoordId, a.VraagId, a.Content, u.UserName, a.Created
	FROM dbo.Answer a
		LEFT JOIN AspNetUsers u ON a.UserId = u.Id
	WHERE AntwoordId = @AntwoordId
END
GO

create PROC dbo.Vraag_AddForLoadTest
AS
BEGIN
	DECLARE @i int = 1

	WHILE @i < 10000
	BEGIN
		INSERT INTO dbo.Vraag
			(Title, Content, UserId, UserName, Created)
		VALUES('Vraag ' + CAST(@i AS nvarchar(5)), 'Content ' + CAST(@i AS nvarchar(5)), 'User1', 'User1', GETUTCDATE())
		SET @i = @i + 1
	END
END
go


create PROC dbo.Vraag_delete
	(
	@VraagId int
)
AS
BEGIN
	SET NOCOUNT ON

	DELETE
	FROM dbo.Vraag
	WHERE VraagID = @VraagId
END
go

create PROC dbo.Vraag_bestaat
	(
	@VraagId int
)
AS
BEGIN
	SET NOCOUNT ON

	SELECT CASE WHEN EXISTS (SELECT @VraagId
		FROM dbo.Vraag
		WHERE VraagId = @VraagId) 
		THEN CAST (1 AS BIT) 
		ELSE CAST (0 AS BIT) END AS Result

END
go

create PROC dbo.Vraag_getMany
AS
BEGIN
	SET NOCOUNT ON

	SELECT VraagId, Title, Content, UserId, UserName, Created
	FROM dbo.Vraag 
END
go

create PROC dbo.Vraag_GetMany_BySearch
	(
	@Search nvarchar(100)
)
AS
BEGIN
	SET NOCOUNT ON

		SELECT VraagId, Title, Content, UserId, UserName, Created
		FROM dbo.Vraag 
		WHERE Title LIKE '%' + @Search + '%'

	UNION

		SELECT VraagId, Title, Content, UserId, UserName, Created
		FROM dbo.Vraag 
		WHERE Content LIKE '%' + @Search + '%'
END
go



create PROC dbo.Vraag_GetMany_BySearch_WithPaging
	(
	@Search nvarchar(100),
	@PageNumber int,
	@PageSize int
)
AS
BEGIN
	SELECT VraagId, Title, Content, UserId, UserName, Created
	FROM
		(	SELECT VraagId, Title, Content, UserId, UserName, Created
			FROM dbo.Vraag 
			WHERE Title LIKE '%' + @Search + '%'

		UNION

			SELECT VraagId, Title, Content, UserId, UserName, Created
			FROM dbo.Vraag 
			WHERE Content LIKE '%' + @Search + '%') Sub
	ORDER BY VraagId
	OFFSET @PageSize * (@PageNumber - 1) ROWS
	FETCH NEXT @PageSize ROWS ONLY
END

go


create PROC dbo.Vraag_GetMany_WithAnswers
AS
BEGIN
	SET NOCOUNT ON

	SELECT q.VraagId, q.Title, q.Content, q.UserName, q.Created,
		a.VraagId, a.AntwoordId, a.Content, a.Username, a.Created
	FROM dbo.Vraag q
		LEFT JOIN dbo.Antwoord a ON q.VraagId = a.VraagId
END
go

create proc dbo.Vraag_GetEnkel
(@VraagId int)
as 
begin
set nocount on

select VraagId, Title, Content, UserId, Username,Created
from dbo.Vraag
where VraagId = @VraagId
end 
go


create PROC dbo.Vraag_GetUnanswered
AS
BEGIN
	SET NOCOUNT ON

	SELECT VraagId, Title, Content, UserId, UserName, Created
	FROM dbo.Vraag q
	WHERE NOT EXISTS (SELECT *
	FROM dbo.Antwoord a
	WHERE a.VraagId = q.VraagId)
END
go



create PROC dbo.Vraag_Post
	(
	@Title nvarchar(100),
	@Content nvarchar(max),
	@UserId nvarchar(150),
	@UserName nvarchar(150),
	@Created datetime2
)
AS
BEGIN
	SET NOCOUNT ON

	INSERT INTO dbo.Vraag
		(Title, Content, UserId, UserName, Created)
	VALUES(@Title, @Content, @UserId, @UserName, @Created)

	SELECT SCOPE_IDENTITY() AS VraagId
END
go

create PROC dbo.Vraag_Put
	(
	@VraagId int,
	@Title nvarchar(100),
	@Content nvarchar(max)
)
AS
BEGIN
	SET NOCOUNT ON

	UPDATE dbo.Vraag
	SET Title = @Title, Content = @Content
	WHERE VraagID = @VraagId
END
go


create PROC  dbo.Antwoord_Get_ByVraagId
	(
	@VraagId int
)
AS
BEGIN
	SET NOCOUNT ON

	SELECT AntwoordId, VraagId, Content, Username, Created
	FROM dbo.Antwoord 
	WHERE VraagId = @VraagId
END
go