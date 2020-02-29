package oxygen.core.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.stereotype.Component;
import oxygen.core.service.users.UserService;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ResourceContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Component
@Path("users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class UsersResource {

    @Context
    private ResourceContext context;

    @Autowired
    private UserService userService;

    @GET
    public Response getAll() {
        return Response.ok(userService.findAllUsers()).build();
    }

    @Path("{username}")
    public UserResource getUser() {
        return context.getResource(UserResource.class);
    }

}
