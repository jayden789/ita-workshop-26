```
use itaweb;
select
  ur.id user_id,
  ur.firstname user_first,
  ur.lastname user_last,
  ui.id inviter_id,
  ui.firstname inviter_first,
  ui.lastname inviter_last
from workshop18_registration r
join users ui
  on ui.id = cast(r.inviter as unsigned)
join users ur
  on r.user_id = ur.id
where
  r.inviter is not null
  and r.inviter <> ""
  and r.inviter <> 0
;
```
