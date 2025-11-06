package kageco.api.entity;

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
@Table(name = "template", schema = "household")
public class Template {
    @Id
    @Size(max = 26)
    @Column(name = "id", nullable = false, length = 26)
    private String id;

    @Size(max = 50)
    @NotNull
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Size(max = 26)
    @NotNull
    @Column(name = "account_id", nullable = false, length = 26)
    private String accountId;

    @Size(max = 26)
    @NotNull
    @Column(name = "genre_id", nullable = false, length = 26)
    private String genreId;

    @Size(max = 8)
    @NotNull
    @Column(name = "iocome_type", nullable = false, length = 8)
    private String iocomeType;

    @Size(max = 26)
    @NotNull
    @Column(name = "category_id", nullable = false, length = 26)
    private String categoryId;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Size(max = 100)
    @Column(name = "memo", length = 100)
    private String memo;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

}