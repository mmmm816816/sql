drop table if exists tbl;
create table tbl as
select * from (values
(1,'a@mail.com','b_info','c'),
(2,'a@mail.com','a_info','b'),
(3,'a@mail.com','a_info','a'),
(4,'b@mail.com','d_info','d'),
(5,'a@mail.com','c_info','e'),
(6,'b@mail.com','b_info','f')
)t;
select column2, min(column3) from tbl group by column2; -- unable to the row
select column2, min(column3), min(column4) from tbl group by column2; -- unable to the row
select distinct on (column2) * from tbl;
select t1.*, t2.* from tbl t1 join on tbl t2;
select t1.*, t2.* from tbl t1 cross join tbl t2 where t1.column2 = t2.column2 and t1.column4 < t2.column4;

select
  t1.column1,
  t1.column2,
  t1.column3,
  t1.column4
from 
  tbl t1 
  cross join
  tbl t2
where
  t1.column2 = t2.column2
;
/*
---------+------------+---------+---------+---------+------------+---------+---------
       1 | a@mail.com | b_info  | c       |       3 | a@mail.com | a_info  | a
       1 | a@mail.com | b_info  | c       |       2 | a@mail.com | a_info  | b
       1 | a@mail.com | b_info  | c       |       1 | a@mail.com | b_info  | c
       2 | a@mail.com | a_info  | b       |       3 | a@mail.com | a_info  | a
       2 | a@mail.com | a_info  | b       |       2 | a@mail.com | a_info  | b
       2 | a@mail.com | a_info  | b       |       1 | a@mail.com | b_info  | c
       3 | a@mail.com | a_info  | a       |       3 | a@mail.com | a_info  | a
       3 | a@mail.com | a_info  | a       |       2 | a@mail.com | a_info  | b
       3 | a@mail.com | a_info  | a       |       1 | a@mail.com | b_info  | c
       4 | b@mail.com | d_info  | d       |       4 | b@mail.com | d_info  | d
(10 rows)
*/

select
  t1.column1,
  t1.column2,
  t1.column3,
  t1.column4
from 
  tbl t1 
  cross join
  tbl t2
where
  t1.column2 = t2.column2
  and
  t1.column1 < t2.column1
;

/*
 column1 |  column2   | column3 | column4 | column1 |  column2   | column3 | column4 
---------+------------+---------+---------+---------+------------+---------+---------
       2 | a@mail.com | a_info  | b       |       1 | a@mail.com | b_info  | c
       3 | a@mail.com | a_info  | a       |       2 | a@mail.com | a_info  | b
       3 | a@mail.com | a_info  | a       |       1 | a@mail.com | b_info  | c
(3 rows)
*/

select
  t1.column1,
  t1.column2,
  t1.column3,
  t1.column4
from 
  tbl t1 
  cross join
  tbl t2
where
  t1.column2 = t2.column2
  and
  t1.column1 < t2.column1
;

/*
 column1 |  column2   | column3 | column4 | column1 |  column2   | column3 | column4 
---------+------------+---------+---------+---------+------------+---------+---------
       1 | a@mail.com | b_info  | c       |       3 | a@mail.com | a_info  | a
       1 | a@mail.com | b_info  | c       |       2 | a@mail.com | a_info  | b
       2 | a@mail.com | a_info  | b       |       3 | a@mail.com | a_info  | a
(3 rows)
*/

select
  count(t1.column1), -- not distinct
  t1.column1,
  t1.column2,
  t1.column3,
  t1.column4
from 
  tbl t1 
  cross join
  tbl t2
where
  t1.column2 = t2.column2
  and
  t1.column1 < t2.column1
group by
  t1.column1,
  t1.column2,
  t1.column3,
  t1.column4
having
  --count(t1.column1) = 2
  --count(t1.column1) = (select count(column2)-1 from tbl where column2 = 'a@mail.com') --"-1" means exclude me
  count(t1.column1) = (select count(column2)-1 from tbl where column2 = t1.column2)
;

/*
 count | column1 |  column2   | column3 | column4 
-------+---------+------------+---------+---------
     2 |       1 | a@mail.com | b_info  | c
(1 row)
*/