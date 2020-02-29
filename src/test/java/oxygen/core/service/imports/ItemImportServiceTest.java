package oxygen.core.service.imports;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import oxygen.core.util.IOUtil;

import java.io.IOException;
import java.io.InputStream;
import java.util.zip.ZipInputStream;

//@SpringBootTest
public class ItemImportServiceTest {

    @Autowired
    private ItemImportService itemImportService;

    //@Test
    public void importVarer80() throws Exception {
        try (InputStream inputStream = IOUtil.getResourceAsStream("Varer80.zip")) {
            itemImportService.doImport(new ZipInputStream(inputStream) {
                @Override
                public void close() {/* Don't close*/}
            });
        }
    }

}
