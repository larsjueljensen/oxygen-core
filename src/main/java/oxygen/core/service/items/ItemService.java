package oxygen.core.service.items;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import oxygen.core.model.Item;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;

@Service
public class ItemService {

    @Autowired
    private NamedParameterJdbcTemplate template;

    @Transactional(readOnly = true)
    public List<Item> getRandom50() {
        return template.query("select * from items limit 50", this::mapRow);
    }

    @Transactional(readOnly = true)
    public Item getById(long itemId) {
        return template.query(
                "select * from items where item_id = :itemId",
                new MapSqlParameterSource("itemId", itemId),
                this::extractRow);
    }

    private Item extractRow(ResultSet resultSet) throws SQLException {
        if (resultSet.next()) {
            return mapRow(resultSet, 1);
        }
        return null;
    }

    private Item mapRow(ResultSet resultSet, int rowNum) throws SQLException {
        return new Item(
                resultSet.getLong("id"),
                resultSet.getString("language"),
                resultSet.getString("text1"),
                resultSet.getString("text2"),
                resultSet.getString("long_text")
        );
    }
}
