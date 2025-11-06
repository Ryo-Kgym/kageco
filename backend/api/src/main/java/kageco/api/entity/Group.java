package kageco.api.entity;

import java.util.LinkedHashSet;
import java.util.Set;

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
@Table(name = "\"group\"", schema = "public")
public class Group {
    @Id
    @Size(max = 26)
    @Column(name = "id", nullable = false, length = 26)
    private String id;

    @Size(max = 50)
    @NotNull
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @OneToMany(mappedBy = "group")
    private Set<Affiliation> affiliations = new LinkedHashSet<>();

    @OneToMany(mappedBy = "group")
    private Set<App> apps = new LinkedHashSet<>();

    @OneToMany(mappedBy = "group")
    private Set<GroupApplication> groupApplications = new LinkedHashSet<>();

}