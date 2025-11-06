package kageco.api.entity.household;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Converter;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;


@Getter
@Setter
@Entity
@Table(name = "condition_session")
public class ConditionSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "data_type", nullable = false, length = Integer.MAX_VALUE)
    private String dataType;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = JsonListMapConverter.class)
    private List<Map<String, Object>> value;


    @Converter
    public static class JsonListMapConverter implements AttributeConverter<List<Map<String, Object>>, String> {
        private final ObjectMapper objectMapper = new ObjectMapper();

        @Override
        public String convertToDatabaseColumn(List<Map<String, Object>> attribute) {
            if (attribute == null || attribute.isEmpty()) {
                return null;
            }
            try {
                return objectMapper.writeValueAsString(attribute);
            } catch (JsonProcessingException e) {
                throw new IllegalArgumentException("Error converting List<Map<String, Object>> to JSON", e);
            }
        }

        @Override
        public List<Map<String, Object>> convertToEntityAttribute(String dbData) {
            if (dbData == null || dbData.trim().isEmpty()) {
                return new ArrayList<>();
            }
            try {
                return objectMapper.readValue(dbData,
                    new TypeReference<List<Map<String, Object>>>() {});
            } catch (JsonProcessingException e) {
                return new ArrayList<>();
            }
        }
    }
}