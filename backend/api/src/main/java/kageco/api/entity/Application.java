package kageco.api.entity;

import java.util.LinkedHashSet;
import java.util.Set;

import org.hibernate.annotations.ColumnDefault;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "application", schema = "public")
public class Application {
    @Id
    @Size(max = 26)
    @Column(name = "id", nullable = false, length = 26)
    private String id;

    @Size(max = 50)
    @NotNull
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @ColumnDefault("true")
    @Column(name = "valid_flag")
    private Boolean validFlag;

    @Size(max = 128)
    @NotNull
    @Column(name = "top_url", nullable = false, length = 128)
    private String topUrl;

    @OneToMany(mappedBy = "application")
    private Set<GroupApplication> groupApplications = new LinkedHashSet<>();

}