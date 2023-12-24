with have_mail_info as (
  select
    c.customer_name,
    c.customer_id,
    c.mail,
    c.gas,
    c.agency,
    c.category,
    case when i.mail is null then 'mail delivery' else 'e-mail' end as notification
  from
    yhr.smart_customer c
    left outer join
    yhr.info i
    on c.mail = i.mail
), case1 as (
  select
    *,
    'case1' as ty
  from
    have_mail_info h
  where
    gas = 'True'
), case2 as (
  select
    *,
    'case2' as ty
  from
    have_mail_info h
  where
    agency = '0.0' and category = 'keizoku'
), case3 as (
  select
    *,
    'case3' as ty
  from
    have_mail_info h
  where
    agency = '1.0' and category = 'keizoku'
), case1_email_distinct as (
  select distinct on (mail)
    *
  from
    case1
  where
    notification = 'e-mail'
), case2_email_distinct as (
  select distinct on (mail)
    *
  from
    case2
  where
    notification = 'e-mail'
), case3_email_distinct as (
  select distinct on (mail)
    *
  from
    case3
  where
    notification = 'e-mail'
)
select
  *
from
  case1_email_distinct
union all
select
  *
from
  case1
where
  notification = 'mail delivery'
union all
select
  *
from
  case2_email_distinct
union all
select
  *
from
  case2
where
  notification = 'mail delivery'
union all
select
  *
from
  case3_email_distinct
union all
select
  *
from
  case3
where
  notification = 'mail delivery'
