package kageco.api.entity.household;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "favorite_filter_args", schema = "household")
public class FavoriteFilterArg {
    @Id
    @Size(max = 26)
    @Column(name = "id", nullable = false, length = 26)
    private String id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "filter_id", nullable = false)
    private FavoriteFilter filter;

    @Size(max = 32)
    @NotNull
    @Column(name = "key", nullable = false, length = 32)
    private String key;

    @Size(max = 32)
    @NotNull
    @Column(name = "value", nullable = false, length = 32)
    private String value;

}