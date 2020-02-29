package oxygen.core.service.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class UserService extends JdbcUserDetailsManager {

    @Autowired
    public UserService(DataSource dataSource, AuthenticationManager authenticationManager) {
        super(dataSource);
        setAuthenticationManager(authenticationManager);
    }


    public List<User> findAllUsers() {
        return getJdbcTemplate().query(
                "select username from users",
                (RowMapper) (resultSet, i) -> loadUserByUsername(resultSet.getString("username")));
    }
}
