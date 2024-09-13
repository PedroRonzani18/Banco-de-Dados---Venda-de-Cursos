insert into ECLBDIT215.tema (nome) values ('Programacao');
insert into ECLBDIT215.topicotema(idtema, idtopico) values (6, 11); 

select * from ECLBDIT215.topicoProfessor;

insert into ECLBDIT215.topico (numero, titulo, descricao, idcurso) values (1, 'Introducao', 'Introducao a programacao', 50);
delete from ECLBDIT215.topico;

delete from ECLBDIT215.curso where idcurso != 50 and idcurso != 52;
COMMIT;

insert into ECLBDIT215.professor (nome) values ('Augusto');
select * from ECLBDIT215.professor;
insert into ECLBDIT215.topicoprofessor (idprofessor, idtopico) values (6, 11);

select * from ECLBDIT215.curso;

-- list all of temas from a specific topico with their names

select t.nome 
from ECLBDIT215.tema t
join ECLBDIT215.topicotema tt on t.idtema = tt.idtema
join ECLBDIT215.topico top on top.idtopico = tt.idtopico
where top.idtopico = 11;

-- list all of professor from a specific topico with their names

select p.nome
from ECLBDIT215.professor p
join ECLBDIT215.topicoprofessor tp on p.idprofessor = tp.idprofessor
join ECLBDIT215.topico top on top.idtopico = tp.idtopico
where top.idtopico = 11;

-- list all of professor from a curso with their names

select p.nome
from ECLBDIT215.professor p
join ECLBDIT215.topicoprofessor tp on p.idprofessor = tp.idprofessor
join ECLBDIT215.topico top on top.idtopico = tp.idtopico
join ECLBDIT215.curso c on top.idcurso = c.idcurso
where c.idcurso = 50;

-- list all of temas from a curso with their names

select t.nome
from ECLBDIT215.tema t
join ECLBDIT215.topicotema tt on t.idtema = tt.idtema
join ECLBDIT215.topico top on top.idtopico = tt.idtopico
join ECLBDIT215.curso c on top.idcurso = c.idcurso
where c.idcurso = 50;

select * from ECLBDIT215.tema;

select t.nome
from ECLBDIT215.tema t
join ECLBDIT215.topicotema tt on t.idtema = tt.idtema
join ECLBDIT215.topico top on top.idtopico = tt.idtopico
join ECLBDIT215.curso c on top.idcurso = c.idcurso
where c.idcurso = 50;
