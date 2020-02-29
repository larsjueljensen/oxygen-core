package oxygen.core.service.imports;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import oxygen.core.util.IOUtil;

import java.io.InputStream;
import java.util.zip.ZipInputStream;

//@SpringBootTest
class ModuleImportServiceTest {

    @Autowired
    private ModuleImportService moduleImportService;

    //@Test
    public void importModuler80() throws Exception {
        try (InputStream inputStream = IOUtil.getResourceAsStream("Moduler80.zip")) {
            moduleImportService.doImport(new ZipInputStream(inputStream) {
                @Override
                public void close() {/* Don't close*/}
            });
        }
    }

}