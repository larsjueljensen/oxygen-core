package oxygen.core.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.JdbcUserDetailsManager;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class UserResource {

    @PathParam("username")
    private String username;

    @Autowired
    private UserDetailsService userDetailsService;

    @GET
    public UserDetails getByUsername() {
        return userDetailsService.loadUserByUsername(username);
    }
}
