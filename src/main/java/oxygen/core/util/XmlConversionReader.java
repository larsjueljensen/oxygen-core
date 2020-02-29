package oxygen.core.util;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import java.io.IOException;
import java.io.PushbackReader;
import java.io.Reader;
import java.util.Map;
import java.util.regex.Pattern;

public class XmlConversionReader extends PushbackReader {

    private static final Map<String, String> TOKEN_REPLACEMENTS;
    static {
        TOKEN_REPLACEMENTS = Maps.newHashMap();
        TOKEN_REPLACEMENTS.put("&#xB", "\t");
    }

    public XmlConversionReader(Reader in) {
        super(in);
    }

    @Override
    public int read(char[] cbuf, int off, int len) throws IOException {
        char[] buffer = new char[len];
        int numCharsRead = super.read(buffer, 0, len);
        if (numCharsRead >= 0) {
            String bufferString = new String(buffer, 0, numCharsRead);
            for (Map.Entry<String, String> entry : TOKEN_REPLACEMENTS.entrySet()) {
                bufferString = bufferString.replaceAll(entry.getKey(), entry.getValue());
            }

            for (int index = 0; index < bufferString.length(); index++) {
                cbuf[off + index] = bufferString.charAt(index);
            }

            return bufferString.length();
        }

        return numCharsRead;
    }

}
