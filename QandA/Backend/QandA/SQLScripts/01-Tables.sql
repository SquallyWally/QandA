CREATE TABLE dbo.Vraag(
	VraagId int IDENTITY(1,1) NOT NULL,
	Title nvarchar(100) NOT NULL,
	Content nvarchar(max) NOT NULL,
	UserId nvarchar(150) NOT NULL,
	UserName nvarchar(150) NOT NULL,
	Created datetime2(7) NOT NULL,
 CONSTRAINT PK_Vraag PRIMARY KEY CLUSTERED 
(
	VraagId ASC
)
)
GO

CREATE TABLE dbo.Antwoord(
	AntwoordId int IDENTITY(1,1) NOT NULL,
	VraagId int NOT NULL,
	Content nvarchar(max) NOT NULL,
	UserId nvarchar(150) NOT NULL,
	UserName nvarchar(150) NOT NULL,
	Created datetime2(7) NOT NULL,
 CONSTRAINT PK_Antwoord PRIMARY KEY CLUSTERED 
(
	AntwoordId ASC
)
)
GO
ALTER TABLE dbo.Antwoord  WITH CHECK ADD  CONSTRAINT FK_Antwoord_Vraag FOREIGN KEY(VraagId)
REFERENCES dbo.Vraag (VraagId)
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE dbo.Antwoord CHECK CONSTRAINT FK_Antwoord_Vraag
GO
--vanaf hier gaat het goed mis
SET IDENTITY_INSERT dbo.Vraag ON
GO
INSERT INTO dbo.Vraag(VraagId,Title,Content,UserId,UserName,Created)
VALUES(1,'Waarom zou ik FF XIV: Shadowbringers spelen?','Ik heb veel goeie dingen over dat uitbreiding gehoord en staat momenteel op 91 op Metacritic',
	   '1',	'Cayde','2020-05-18 14:32')

INSERT INTO dbo.Vraag(VraagId,Title,Content,UserId,UserName,Created)
VALUES(2,'Destiny 2 of Division 2?','Allebei zijn online looter shooters maar welke is het beste?',
	   '2',	'Mario','2020-05-18 14:48')
GO
SET IDENTITY_INSERT dbo.Vraag OFF
GO


SET IDENTITY_INSERT dbo.Antwoord ON
GO
INSERT INTO dbo.Antwoord(AntwoordId,VraagId ,Content ,UserId ,UserName ,Created)
VALUES(1,1,'Want dat uitbreiding staat bekend voor zijn fantastische verhaal, klassen en locaties','2','Milo','2020-05-18-14:40')


insert into dbo.antwoord(antwoordid,vraagid ,content ,userid ,username ,created)
values(2,1,'so, that you can use the javascript features of tomorrow, today','3','jane','2020-05-18-16:18')
go
set identity_insert dbo.antwoord off
go