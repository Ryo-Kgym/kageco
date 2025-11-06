package kageco.api.entity.pub;

import java.util.LinkedHashSet;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "\"user\"", schema = "public", uniqueConstraints = {
    @UniqueConstraint(name = "user_email_key", columnNames = {"email"})
})
public class User {
    @Id
    @Size(max = 26)
    @Column(name = "id", nullable = false, length = 26)
    private String id;

    @Size(max = 32)
    @Column(name = "name", length = 32)
    private String name;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Size(max = 64)
    @NotNull
    @Column(name = "email", nullable = false, length = 64)
    private String email;

    @OneToMany(mappedBy = "user")
    private Set<Affiliation> affiliations = new LinkedHashSet<>();

}