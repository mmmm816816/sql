drop table if exists tbl;
create table tbl as
select * from (values ('a'),('b'),('c'),('d'),('c'),('d'))c;


CREATE OR REPLACE FUNCTION sample4() RETURNS text[] AS $$
DECLARE	
  r record;
  arr text[];
BEGIN
  FOR r IN select distinct column1 from tbl order by 1 desc LOOP
    arr := array_append(arr, r.column1);
  END LOOP;
  RETURN arr;
END;	
$$ LANGUAGE plpgsql;

/*
postgres=# select sample4();
  sample4  
-----------
 {d,c,b,a}
(1 row)
*/


create or replace procedure sample6() as $$
declare
  arr text[];
  sql text := 'drop table if exists tbl_created; create table tbl_created as select ';
begin
  arr := sample4();
  for i in 1..array_length(arr,1) loop
    --raise info '%', arr[i];
    sql := sql || 'sum(case when column1 = ''' || arr[i] || ''' then 1 else 0 end) ' || arr[i] || ',';
  end loop;
  sql := substr(sql, 1, length(sql)-1);
  sql := sql || ' from tbl;';
  --raise info '%', sql;
  execute sql;
end;
$$ language plpgsql;

/*
postgres=# call sample6();
CALL
postgres=# select * from tbl_created;
 d | c | b | a 
---+---+---+---
 2 | 2 | 1 | 1
(1 row)
*/


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