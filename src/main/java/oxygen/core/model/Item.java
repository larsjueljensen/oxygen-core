package oxygen.core.model;

import com.google.common.collect.Maps;

import java.util.Map;

public class Item implements HasMetaData {

    private final Long id;
    private final String language;
    private final String text1;
    private final String text2;
    private final String longText;
    private final Map<String, String> metaData = Maps.newHashMap();

    public Item(Long id, String language, String text1, String text2, String longText) {
        this.id = id;
        this.language = language;
        this.text1 = text1;
        this.text2 = text2;
        this.longText = longText;
    }

    public Long getId() {
        return id;
    }

    public String getLanguage() {
        return language;
    }

    public String getText1() {
        return text1;
    }

    public String getText2() {
        return text2;
    }

    public Map<String, String> getMetaData() {
        return metaData;
    }
}

