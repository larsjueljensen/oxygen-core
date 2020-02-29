package oxygen.core.rest;

import oxygen.core.service.items.ItemService;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class ItemResource {

    @Inject
    private ItemService service;

    @PathParam("id")
    private Long itemId;

    @GET
    public Response getItemById() {
        return Response.ok(service.getById(itemId)).build();
    }


}
