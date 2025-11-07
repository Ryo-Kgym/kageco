package kageco.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ApiApplication {
  public static void main(String[] args) {
    // .envファイルを読み込んでシステムプロパティに設定
    Dotenv dotenv =
        Dotenv.configure()
            .directory("./") // プロジェクトルートの.envを指定
            .ignoreIfMissing() // .envファイルが存在しない場合はエラーにしない
            .load();

    dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

    SpringApplication.run(ApiApplication.class, args);
  }
}
