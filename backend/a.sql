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

delete from ECLBDIT215.curso;
commit;

select * from ECLBDIT215.topico where idcurso = 150;

select * from ECLBDIT215.topico where idcurso = 148;

select * from ECLBDIT215.usuario;

select *
from ECLBDIT215.professor prof
join ECLBDIT215.topicoprofessor tp on prof.idprofessor = tp.idprofessor
-- join ECLBDIT215.topico topic on topic.idtopico = tp.idtopico
-- join ECLBDIT215.curso cu on topic.idcurso = cu.idcurso
-- where cu.idcurso = 149;






select * from ECLBDIT215.usuario;



SELECT a.titulo AS nome_aula, u.nome AS nome_usuario
FROM ECLBDIT215.aula a
LEFT JOIN ECLBDIT215.aulaassistida aa ON a.idaula = aa.idaula AND 
    aa.idusuario = 28
LEFT JOIN ECLBDIT215.usuario u ON u.idusuario = aa.idusuario
JOIN ECLBDIT215.topico t ON a.idtopico = t.idtopico
WHERE t.idcurso = 152;

