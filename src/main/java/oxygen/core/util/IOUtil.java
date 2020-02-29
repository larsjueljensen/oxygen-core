package oxygen.core.util;

import java.io.InputStream;

public class IOUtil {

    private static final Class<IOUtil> clazz = IOUtil.class;

    public static InputStream getResourceAsStream(String name) {
        return clazz.getResourceAsStream(name);
    }

}
