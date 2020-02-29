package oxygen.core.config;

import org.glassfish.jersey.server.ResourceConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JerseyConfig extends ResourceConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(JerseyConfig.class);
    private static final String[] PACKAGES = new String[] { "oxygen.core.rest" };

    public JerseyConfig() {
        packages(true, PACKAGES);
        for (String aPackage : PACKAGES) {
            LOGGER.info("Setting up REST API - scanned package " + aPackage);
        }
    }

}
