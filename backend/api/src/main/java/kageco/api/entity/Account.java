package kageco.api.entity;

import java.util.LinkedHashSet;
import java.util.Set;

import org.hibernate.annotations.ColumnDefault;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Getter
@Setter
@Entity
@Table(name = "account", schema = "household")
public class Account {
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

    @NotNull
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @OneToMany(mappedBy = "account")
    private Set<CreditCardSummary> creditCardSummaries = new LinkedHashSet<>();

    @OneToMany(mappedBy = "account")
    private Set<DailyDetail> dailyDetails = new LinkedHashSet<>();

}