create table tmp (name varchar(10), age int);
insert into tmp values
('tom', 11),
('emily', 50),
('kyle', 32);
select * from tmp;
CREATE OR REPLACE FUNCTION sample() RETURNS table (name_f varchar(100), sql_f text) AS $$
DECLARE	
	myrow tmp%ROWTYPE;
	mytext text ='';
BEGIN
    FOR myrow IN SELECT * FROM tmp LOOP
	name_f := myrow.name;
        mytext := mytext || ',' || myrow.name;
        --sql_f := myrow.name || '+';
	sql_f := mytext;
        RETURN NEXT;
	END LOOP;
    RETURN;
END;	
$$ LANGUAGE plpgsql;

postgres=# select  sample();
          sample          
--------------------------
 (tom,",tom")
 (emily,",tom,emily")
 (kyle,",tom,emily,kyle")
(3 rows)

--select * from sample() as r(a,b);
select max(b) from sample() as r(a,b);

 max
----------
,tom,emily,kyle

