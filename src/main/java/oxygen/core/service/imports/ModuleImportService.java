package oxygen.core.service.imports;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;
import oxygen.core.util.XmlConversionReader;
import oxygen.xml.nobb.BooleanEnum;
import oxygen.xml.nobb.ModulType;
import oxygen.xml.nobb.VareType;

import javax.annotation.PostConstruct;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamReader;
import javax.xml.stream.events.XMLEvent;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.List;
import java.util.zip.ZipInputStream;

@Service
public class ModuleImportService {

    private final Unmarshaller unmarshaller;

    @Autowired
    private NamedParameterJdbcTemplate template;

    @Autowired
    private PlatformTransactionManager transactionManager;
    private TransactionTemplate transactionTemplate;

    private long counter = 0L;

    public ModuleImportService() throws JAXBException {
            unmarshaller = JAXBContext.newInstance("oxygen.xml.nobb").createUnmarshaller();
    }

    @PostConstruct
    public void setup() {
        transactionTemplate = new TransactionTemplate(transactionManager);
    }

    public synchronized void doImport(ZipInputStream zipInputStream) throws IOException, XMLStreamException, JAXBException {
        counter = 0L;
        while (zipInputStream.getNextEntry() != null) {
            processZipEntry(zipInputStream);
        }
        System.out.println(counter + " items processed.");
    }

    private void processZipEntry(ZipInputStream zipInputStream) {

        transactionTemplate.execute(new TransactionCallbackWithoutResult() {

            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {

                JAXBElement<ModulType> modul;
                List<MapSqlParameterSource> batchParameters = Lists.newArrayList();

                try {

                    XMLStreamReader reader = XMLInputFactory.newInstance().createXMLStreamReader(
                            new XmlConversionReader(new InputStreamReader(zipInputStream, Charset.forName("iso-8859-1"))));


                    while (reader.hasNext() && (modul = readModul(reader)) != null) {
                        System.out.println(modul);
                        batchParameters.add(convertToParam(modul.getValue()));
                        counter += 1;
                        if (counter % 25000 == 0) {
                            System.out.println(counter + " items processed.");
                        }
                    }
                }

                catch (XMLStreamException | JAXBException e) {
                    e.printStackTrace();
                }
            }
        });

    }

    private JAXBElement<ModulType> readModul(XMLStreamReader reader) throws XMLStreamException, JAXBException {

        int event = -1;

        while (reader.hasNext()) {
            event = reader.next();
            if (event == XMLEvent.START_ELEMENT && "Modul".equals(reader.getLocalName())) break;
        }

        return (event == XMLEvent.START_ELEMENT) ? unmarshaller.unmarshal(reader, ModulType.class) : null;
    }

    private MapSqlParameterSource convertToParam(ModulType modulType) {

        return new MapSqlParameterSource();
    }

    private Boolean toBoolean(BooleanEnum booleanEnum) {
        return (booleanEnum != null) ? "Ja".equals(booleanEnum.value()) : false;
    }

}

