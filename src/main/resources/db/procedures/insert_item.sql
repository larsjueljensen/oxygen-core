drop function if exists insert_item;

create or replace function insert_item (
    source varchar,
    has_expiry_date boolean,
    is_stocked boolean,
    text1 varchar,
    text2 varchar,
    long_text varchar,

    number varchar) returns void as $$
declare
        new_item_id bigint;
        language char(3);
begin
    language := coalesce((select value from system_preferences where key = 'language'), 'sys');

    select item_id into new_item_id from item_numbers where type = source and number = insert_item.number;

    if new_item_id is null then

        insert into items (source, has_expiry_date, is_stocked) values (source, has_expiry_date, is_stocked) returning item_id into new_item_id;
        insert into items_lang (item_id, language, text1, text2, long_text) values (new_item_id, language, text1, text2, long_text);
        insert into item_numbers (item_id, type, number) values (new_item_id, source, number);

    else

        update items set
                         has_expiry_date = has_expiry_date,
                         is_stocked = is_stocked
        where item_id = new_item_id;

    end if;


end;
$$
language plpgsql;
