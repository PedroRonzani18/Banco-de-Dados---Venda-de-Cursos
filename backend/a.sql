insert into ECLBDIT215.tema (nome) values ('Programacao');
insert into ECLBDIT215.topicotema(idtema, idtopico) values (6, 11); 

select * from ECLBDIT215.atividade;

insert into ECLBDIT215.matriculado (datamatricula, idusuario, idcurso) values (TO_DATE('2021-01-01', 'YYYY-MM-DD'), 28, 118);
delete from ECLBDIT215.matriculado;

insert into ECLBDIT215.topico (numero, titulo, descricao, idcurso) values (1, 'Introducao', 'Introducao a programacao', 50);
delete from ECLBDIT215.topico;
delete from ECLBDIT215.curso;
COMMIT;

insert into ECLBDIT215.professor (nome) values ('Augusto');
select * from ECLBDIT215.aula;
insert into ECLBDIT215.topicoprofessor (idprofessor, idtopico) values (6, 11);

select * from ECLBDIT215.atividade;

