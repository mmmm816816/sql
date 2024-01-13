-- min(last friday of last month, max(date_of_contract))
create table tbl_date as
select
  generate_series as d
from
  generate_series(
    date(date_trunc('day', current_date)+'-30 day'),
    date(date_trunc('day', current_date)+'-1 day'),
    '1 day'
  );

create or replace function sample() returns timestamp as $$
declare
  d1 timestamp; --last friday of last month
  d2 timestamp; --max(date) in table
begin
select
  generate_series as d into d1
from
  generate_series(
    date(date_trunc('month', current_date)+'-7 day'),
    date(date_trunc('month', current_date)+'-1 day'),
    '1 day'
  )
where
  extract(dow from generate_series) = 5;
select
  max(d) into d2
from
  tbl_date;
if d1 <= d2 then
  return d1;
else
  return d2;
end if;
end;
$$ language plpgsql;
