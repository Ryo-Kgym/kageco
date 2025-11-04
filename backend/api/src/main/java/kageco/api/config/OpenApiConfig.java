package kageco.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("Kageco API")
                .version("1.0")
                .description("Kageco API Documentation")
                .contact(new Contact()
                    .name("Kageco Team")
                    .email("contact@example.com")));
    }
}