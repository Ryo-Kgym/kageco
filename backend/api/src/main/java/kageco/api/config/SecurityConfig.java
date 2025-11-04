package kageco.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    @Profile({"local"}) // 開発環境用
    public SecurityFilterChain devSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(authz -> authz
                // ヘルスチェックとH2コンソールは認証不要
                .requestMatchers("/actuator/health", "/h2-console/**").permitAll()
                // APIエンドポイントは認証必要
                .requestMatchers("/api/**").authenticated()
                // その他のリクエストは認証不要
                .anyRequest().permitAll()
            )
            .httpBasic(httpBasic -> {}) // Basic認証を有効化
            .csrf(AbstractHttpConfigurer::disable) // CSRFを無効化
            .headers(headers -> headers
                .frameOptions(HeadersConfigurer.FrameOptionsConfig::disable) // H2 Console用
            )
            .build();
    }

    // 本番環境用の設定
    @Bean
    @Profile("!local")
    public SecurityFilterChain prodSecurityFilterChain(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated()
            )
            .httpBasic(httpBasic -> {}) // Basic認証のみ
            .csrf(AbstractHttpConfigurer::disable)
            .build();
    }
}