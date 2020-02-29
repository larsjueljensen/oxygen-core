package oxygen.core.rest;

import org.springframework.stereotype.Component;
import oxygen.core.service.items.ItemService;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ResourceContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Component
@Path("items")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class ItemsResource {

    @Context
    private ResourceContext context;

    @Inject
    private ItemService service;

    @GET
    public Response get50RandomArticles() {
        return Response.ok(service.getRandom50()).build();
    }

    @Path("{id}")
    public ItemResource getItem() {
        return context.getResource(ItemResource.class);
    }
}
