select * from ECLBDIT215.topico where idcurso = 149;
select * from ECLBDIT215.aula where idtopico = 117;
select * from ECLBDIT215.atividade where idaula = 37;
select * from ECLBDIT215.alternativa where idatividade = 13;
SELECT * FROM ECLBDIT215.aula;

delete from ECLBDIT215.matriculado where idcurso = 149;
COMMIT;

select * from ECLBDIT215.topico where idcurso = 151;
select * from ECLBDIT215.aula where idtopico = 120;
select * from ECLBDIT215.curso where idcurso = 149;

delete from ECLBDIT215.usuario;
commit;

select * from ECLBDIT215.atividadefeita;

insert into ECLBDIT215.atividadeFeita (DATARESPOSTA, IDUSUARUIO, IDATIVIDADE) values ('2021-06-01', 31, 17);

insert into ECLBDIT215.atividadeFeita (DATARESPOSTA, IDUSUARIO, IDATIVIDADE) values (to_date('2021-06-01', 'YYYY-MM-DD'), 31, 21);

select * from ECLBDIT215.AULAASSISTIDA;

select * from ECLBDIT215.topico where idcurso = 150;

select * from ECLBDIT215.topico where idcurso = 148;

select * from ECLBDIT215.usuario;

delete ECLBDIT215.tema;

select *
from ECLBDIT215.professor prof
join ECLBDIT215.topicoprofessor tp on prof.idprofessor = tp.idprofessor
    -- join ECLBDIT215.topico topic on topic.idtopico = tp.idtopico
    -- join ECLBDIT215.curso cu on topic.idcurso = cu.idcurso
    -- where cu.idcurso = 149;


commit;



select * from ECLBDIT215.usuario;



SELECT a.titulo AS nome_aula, u.nome AS nome_usuario
FROM ECLBDIT215.aula a
LEFT JOIN ECLBDIT215.aulaassistida aa ON a.idaula = aa.idaula AND 
    aa.idusuario = 31
LEFT JOIN ECLBDIT215.usuario u ON u.idusuario = aa.idusuario
JOIN ECLBDIT215.topico t ON a.idtopico = t.idtopico
WHERE t.idcurso = 155;



SELECT t.nome AS nome_tema, COUNT(DISTINCT cur.idcurso) AS total_cursos
FROM ECLBDIT215.tema t
JOIN ECLBDIT215.topicotema tt ON t.idtema = tt.idtema
JOIN ECLBDIT215.topico tp ON tt.idtopico = tp.idtopico
JOIN ECLBDIT215.curso cur ON tp.idcurso = cur.idcurso
GROUP BY t.nome
HAVING COUNT(DISTINCT cur.idcurso) > 1
ORDER BY t.nome DESC;
  

